from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, voice

app = FastAPI(
    title="Veda Voice AI Service",
    description="AI-powered healthcare assistant service",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://frontend:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(voice.router, prefix="/api/v1/voice", tags=["voice"])
