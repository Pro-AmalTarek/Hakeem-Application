from fastapi import FastAPI, APIRouter, status, Depends
from fastapi.responses import JSONResponse
from helpers.config import Settings, get_settings
from routes.schemes.data import PromptInput, SearchRequest
from models.ProjectModel import ProjectModel
from models.ChunkModel import ChunkModel
from controllers import NLPController
from models import ResponseSignals

import logging

logger = logging.getLogger('uvicorn.error')

nlp_router = APIRouter(
    prefix="/api/v1/nlp",
    tags=["api_v1", "nlp"],
)

@nlp_router.post("/allam-prompt")
async def upload_data(prompt_input: PromptInput,
                      app_settings: Settings = Depends(get_settings)):
    
    nlp_controller = NLPController()
    response = await nlp_controller.call_allam_prompt_api(prompt_input.user_input)

    if response is None:
         return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "signal": ResponseSignals.ALLAM_CONNECT_FAILED.value
            }
        )
    
    return JSONResponse(
    content={
        "signal": ResponseSignals.ALLAM_CONNECT_SUCCESS.value,
        "response": response
    }
)
    

@nlp_router.post("/search/cases")
async def upload_data(search_req: SearchRequest,
                      app_settings: Settings = Depends(get_settings)):
    
    nlp_controller = NLPController()
    response = await nlp_controller.search_by_vector(question=search_req.question)
    return JSONResponse(
        content={
            "signal": ResponseSignals.RAG_ANSWER_SUCCESS.value,
            "response": response
        }
    )