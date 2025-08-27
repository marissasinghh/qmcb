from flask_restx import Api
from app.api.simulate import simulate_ns

api = Api(
    title="Quantum Circuit Builder API",
    version="1.0",
    prefix="/api",
    doc="/docs",
    description="API for simulating quantum circuits",
)

# Add the simulate namespace
api.add_namespace(simulate_ns, path="/simulate")
