from os import getenv
from dotenv import load_dotenv

load_dotenv()


class Config:
    """
    Base configuration for Quantum Circuit Builder (QMC) Flask app.
    """

    # CORS – allow all origins for now (planning to adjust for production)
    ALLOWED_ORIGINS = getenv("ALLOWED_ORIGINS", "*")

    # API versioning
    API_VERSION = getenv("API_VERSION", "v1")

    # Flask secret key (required for sessions/security)
    SECRET_KEY = getenv("SECRET_KEY", "dev_secret_key")

    # MongoDB URI – not currently used
    MONGO_URI = getenv("MONGO_URI", "")

    # Optional: Validate target circuits by computing them
    # Set to False in development for faster iteration
    VALIDATE_TARGET_CIRCUITS = (
        getenv("VALIDATE_TARGET_CIRCUITS", "true").lower() == "true"
    )
