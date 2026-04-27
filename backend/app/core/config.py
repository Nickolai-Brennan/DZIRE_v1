"""backend/app/core/config.py — App settings loaded from environment."""
import os
from functools import lru_cache


class Settings:
    project_name: str = "DZIRE_v1"
    api_prefix: str = "/api/v1"

    # Database
    database_url: str = os.getenv("DATABASE_URL", "")
    motherduck_token: str = os.getenv("MOTHERDUCK_TOKEN", "")

    # JWT
    jwt_secret: str = os.getenv("JWT_SECRET", "changeme")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "15")
    )
    refresh_token_expire_days: int = int(
        os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "30")
    )

    # CORS
    allowed_origins: list[str] = os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:5173"
    ).split(",")


@lru_cache
def get_settings() -> Settings:
    return Settings()
