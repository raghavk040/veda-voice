from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://vedauser:vedapassword@localhost:5432/vedavoice"
    openai_api_key: str = ""
    debug: bool = False

    class Config:
        env_file = ".env"


settings = Settings()
