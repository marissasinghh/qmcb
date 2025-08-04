# Quantum Circuit Builder (QMC)

This project is the **prototype backend** for a web application where students can practice building quantum circuits.

## Prerequisites

- Python 3.x
- Make

## Getting Started

### First Time Setup

1. Clone the repository:
```bash
git clone https://github.com/marissasinghh/qmc-backend.git
cd qmc-backend
```

2. Initialize the project (creates virtual environment, installs dependencies, and sets up your environment variables):
```bash
make init
```

3. Run the Flask application:
```bash
make run
```

### Development Workflow

For daily development, you typically need to:

1. Activate the virtual environment:
```bash
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

2. Run the Flask application:
```bash
make run
```


### Environment Variables

The application uses the following environment variables:
- `SECRET_KEY`=dev_secret_key
- `ALLOWED_ORIGINS`=http://localhost:3000
- `API_VERSION`=v1
- `MONGO_URI`=mongodb://localhost:27017/qmc_project


### API Endpoints

1. POST /simulate: Simulates a quantum circuit build from gates provided by the frontend and returns a truth table

## Example Request: 
{
  "target_unitary": "SWAP",
  "number_of_qubits": 2,
  "gates": ["CNOT", "CNOT", "CNOT"],
  "qubit_order": [[0, 1], [1, 0], [0, 1]]
}

## Example Response: 
{
  "truth_table": {
    "00": "00",
    "01": "10",
    "10": "01",
    "11": "11"
  }
}


### Makefile Commands

- make init → Creates virtual environment, installs dependencies
- make run → Runs Flask application


### Project Structure

```
.
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── simulate.py
│   ├── controllers/
│   │   └── simulate_controller.py
│   ├── repositories/
│   ├── utils/
│   └── dto/
├── requirements.txt
├── .env
├── main.py
└── README.md

```