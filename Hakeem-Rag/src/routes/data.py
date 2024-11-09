from fastapi import FastAPI, APIRouter, Depends, UploadFile, status, Request
from fastapi.responses import JSONResponse
from helpers.config import get_settings, Settings
from controllers import DataController, ProcessController
from models import ResponseSignals
import aiofiles, logging
import os
from models.enums.AssetTypeEnums import AssetTypeEnum
from .schemes.data import ProcessRequest
from models.ProjectModel import ProjectModel
from models.ChunkModel import ChunkModel
from models.AssetModal import AssetModel
from models.db_schemes import DataChunk, Asset

logger = logging.getLogger('uvicorn.error')

data_router = APIRouter(
    prefix="/api/v1/data",
    tags=["api_v1", "data"]
)

@data_router.post("/upload/{project_id}")
async def upload_data(request: Request,project_id: str, file: UploadFile,
                      app_settings: Settings = Depends(get_settings)):
    
    project_model = await ProjectModel.create_instance(
        db_client=request.app.db_client
    )

    project = await project_model.get_project_or_create_one(project_id=project_id)

    #validate the file prop
    data_controller = DataController()
    is_valid, result_signal = data_controller.validate_uploaded_file(file=file)

    if not is_valid:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
            "signal": result_signal
            }
        )
    
    file_path, file_id= data_controller.generate_unique_filepath(
        origin_filename=file.filename,
        project_id=project_id
    )

    try:
        async with aiofiles.open(file_path, "wb") as f:
            while chunk := await file.read(app_settings.FILE_DEFUALT_CHUNK_SIZE):
                await f.write(chunk)
    except Exception as e:
         logger.error(f"Error while uploading file: {e}")
         
         return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "signal": ResponseSignals.FILE_UPLOAD_FAILED.value
            }
        )

    # store the assets into database
    asset_modal = await AssetModel.create_instance(
        db_client=request.app.db_client
    )

    asset_record = await asset_modal.create_asset(Asset(
        asset_project_id = project.id,
        asset_type = AssetTypeEnum.FILE.value,
        asset_name = file_id,
        asset_size = os.path.getsize(file_path)
    ))

    return JSONResponse(
        content={
            "signal": ResponseSignals.FILE_UPLOAD_SUCCESS.value,
            "file_id": str(asset_record.id)
        }
    )

@data_router.post("/process/{project_id}")
async def process_file(request: Request,project_id:str, process_request: ProcessRequest):
    #file_id = process_request.file_id

    project_model = await ProjectModel.create_instance(
        db_client=request.app.db_client
    )

    project = await project_model.get_project_or_create_one(project_id=project_id)

    asset_modal = await AssetModel.create_instance(
                db_client=request.app.db_client
    )

    project_files_ids = {}
    if process_request.file_id:
        asset_record = await asset_modal.get_asset_record(
            asset_project_id=project.id, 
            asset_name=process_request.file_id)
        
        if asset_record is None:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "signal": ResponseSignals.FILE_ID_ERROR.value
                }
            )
        project_files_ids = {asset_record.id: asset_record.asset_name}
    else:
        # get all assets of this project
       
        
        project_files = await asset_modal.get_all_project_assets(
            asset_project_id=project.id,
            asset_type=AssetTypeEnum.FILE.value
        )

        project_files_ids = {
            record.id: record.asset_name
            for record in project_files
        }

    if len(project_files_ids) == 0:
         return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "signal": ResponseSignals.NO_FILES_ERROR.value
            }
        )
    
    process_controller = ProcessController(project_id=project_id)

    chunk_model = await ChunkModel.create_instance(db_client=request.app.db_client)

    if process_request.do_reset == 1:
        # delete all old chunks
        await chunk_model.delete_chunks_by_project_id(project_id=project.id)

    no_records = 0
    no_files = 0

    for asset_id, file_id in project_files_ids.items():
        file_content = process_controller.get_file_content(file_id=file_id)

        if file_content is None:
            logger.error(f"Error while processing file: {file_id}")
            continue

        file_chunks = process_controller.process_file_content(
            file_content=file_content,
            file_id=file_id,
            chunk_size=process_request.chunk_size,
            overlap_size=process_request.overlap_size
        )

        if file_chunks is None or len(file_chunks) == 0:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "signal": ResponseSignals.PROCESSING_FAILED.value
                }
            )

        # Insert chunks in Database
        file_chunks_records = [
            DataChunk(
                chunk_text= chunk.page_content,
                chunk_metadata= chunk.metadata,
                chunk_order= i+1,
                chunk_project_id= project.id,
                chunk_asset_id=asset_id
            )
            for i, chunk in enumerate(file_chunks)
        ]

        no_records += await chunk_model.insert_many_chunks(chunks= file_chunks_records)
        no_files += 1

    return JSONResponse(
            content={
                "signal": ResponseSignals.PROCESSING_SUCCESS.value,
                "inserted_chunks": no_records,
                "processed_files": no_files
            }
        )