from app.api import api
from app import create_app
from app.settings import Config
from flask_cors import CORS
import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

config = Config()
app = create_app(config)

# CORS: allow the Vite dev server origins
CORS(
    app,
    resources={
        r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}
    },
    supports_credentials=False,
    methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Accept both /simulate and /simulate/
app.url_map.strict_slashes = False

# Initialize RESTX after CORS wraps the app
api.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)
