from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    app_name: str = "Veda Voice AI Service"
    debug: bool = False

    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-4o"
    whisper_model: str = "whisper-1"

    # Database
    database_url: str = "postgresql://vedavoice:vedavoice_pass@localhost:5432/vedavoice"

    # CORS
    cors_origins: List[str] = ["http://localhost:4200", "http://localhost:8080"]

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
