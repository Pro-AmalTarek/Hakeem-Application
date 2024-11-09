from .BaseController import BaseController
from fastapi import UploadFile
from models import ResponseSignals
from .ProjectController import ProjectController
import re, os
import logging
from ibm_watsonx_ai.foundation_models import Model
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings

logger = logging.getLogger('uvicorn.error')

class NLPController(BaseController):

    def __init__(self):
        super().__init__()

    def get_credentials(self):
        return {
            "url" : "https://eu-de.ml.cloud.ibm.com",
            "apikey": "OC_7cjdptqQMNQ9EgRmGI2wNN7WgT0id6xjQi8LJaVKy"
        }

    async def call_allam_prompt_api(self, user_input):
        project_id = "88e18ddc-8484-4fb6-9a70-ec7cd477c5dc"
        model_id = "sdaia/allam-1-13b-instruct"
        
        data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", 
        "apikey": "OC_7cjdptqQMNQ9EgRmGI2wNN7WgT0id6xjQi8LJaVKy"}

        parameters = {
            "decoding_method": "greedy",
            "temperature": 0.7,  # For more varied responses
            "max_new_tokens": 900,
            "repetition_penalty": 1.1
        }

        model = Model(
        model_id = model_id,
        params = parameters,
        credentials = self.get_credentials(),
        project_id = project_id
        )

        
        input_body = f"""
        مستخدم: {user_input}
        مساعد:"""

        try:      
            return model.generate_text(prompt=input_body)
        except Exception as e:
            logger.error(f"Error connecting to allam model: {e}")
            return None
        

    async def search_by_vector(self, question: str):
        embedding_model = HuggingFaceEmbeddings(model_name="BAAI/bge-m3")
        persist_directory= os.path.join(
            self.base_dir,
            "stores/vectordb"
        )

        loaded_vector = Chroma(persist_directory=persist_directory, embedding_function=embedding_model)

        return loaded_vector.similarity_search(question,k=3)