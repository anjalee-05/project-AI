from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Fullstack FastAPI Backend")

origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class SubmitPayload(BaseModel):
    message: str

@app.get("/api/hello")
async def hello():
    return {"message": "👋 Hello from FastAPI Backend!"}

@app.get("/api/data")
async def get_data():
    return {
        "status": "success",
        "data": [
            {"id": 1, "name": "Item 1"},
            {"id": 2, "name": "Item 2"},
            {"id": 3, "name": "Item 3"}
        ]
    }

@app.post("/api/submit")
async def submit(payload: SubmitPayload):
    return {
        "status": "success",
        "received": payload.message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@app.get("/health")
async def health():
    return {"status": "Server is running"}
