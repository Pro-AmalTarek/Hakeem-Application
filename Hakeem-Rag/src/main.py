from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import base, data, nlp
from motor.motor_asyncio import AsyncIOMotorClient
from helpers.config import get_settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Adjust this to your front-end origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
async def startup_db_client():
    settings = get_settings()

    app.mongo_connection = AsyncIOMotorClient(settings.MONGODB_URL)
    app.db_client = app.mongo_connection[settings.MONGODB_DATABASE] 

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongo_connection.close()

app.include_router(base.base_router)
app.include_router(data.data_router)
app.include_router(nlp.nlp_router)