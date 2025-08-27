import logging
from flask import Flask
from flask_cors import CORS
from app.config import Config


logger = logging.getLogger(__name__)


def create_app(config: Config) -> Flask:
    """
    Create and configure the Flask application.
    """

    app = Flask(__name__)
    app.config.from_object(config)

    # Configure CORS using the allowed origins from config
    CORS(app, resources={r"/*": {"origins": config.ALLOWED_ORIGINS}})

    logger.info("Quantum Circuit Builder Flask app created successfully.")
    return app
