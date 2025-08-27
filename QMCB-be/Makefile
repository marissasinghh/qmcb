PYTHON = python
VENV_NAME = venv

ifeq ($(OS),Windows_NT)
	PIP = $(VENV_NAME)/Scripts/pip
	ACTIVATE = .\$(VENV_NAME)\Scripts\activate
else
	PIP = $(VENV_NAME)/bin/pip
	ACTIVATE = . $(VENV_NAME)/bin/activate
endif

.PHONY: init run clean install-deps update-deps lint fmt fmt-check check help

.DEFAULT_GOAL := run

# First-time setup
init:
	@echo "Creating virtual environment..."
	$(PYTHON) -m venv $(VENV_NAME)
	@echo "Activating virtual environment and installing dependencies..."
	$(PYTHON) -m pip install --upgrade pip
	$(PIP) install -r requirements.txt
	@echo "Virtual environment created and dependencies installed."

# Run Flask app
run:
	@echo "Starting Flask application..."
	$(ACTIVATE) && set PYTHONPATH=. && $(PYTHON) -m app.main

# Install new Python packages
install-deps:
	@echo "Installing packages: $(filter-out $@,$(MAKECMDGOALS))"
	$(PIP) install $(filter-out $@,$(MAKECMDGOALS))
	@echo "Updating requirements.txt..."
	$(PYTHON) -m pip freeze > requirements.txt
	@echo "Packages installed and requirements.txt updated."

# Update all dependencies

update-deps:
	@echo "Updating dependencies..."
	$(PIP) list --outdated --format=freeze | cut -d = -f 1 | xargs -n1 $(PIP) install -U
	@echo "Updating requirements.txt..."
	python -m pip freeze | Out-File -Encoding utf8 requirements.txt
	@echo "Dependencies updated."

# Linting
lint:
	@echo "Running flake8 lint check..."
	$(ACTIVATE) && flake8 app

# Formatting
fmt:
	@echo "Formatting code with black..."
	$(ACTIVATE) && black app

fmt-check:
	@echo "Checking code formatting..."
	$(ACTIVATE) && black --check app

# Type checking
check:
	@echo "Running mypy type check..."
	$(ACTIVATE) && mypy app --ignore-missing-imports

# Clean virtual environment
clean:
	@echo "Removing virtual environment..."
	@if [ -d "$(VENV_NAME)" ]; then rm -rf $(VENV_NAME); fi
	@echo "Clean complete."

# Help command
help:
	@echo "Available commands:"
	@echo "  make init           - Create venv and install dependencies"
	@echo "  make run            - Run Flask application"
	@echo "  make install-deps    - Install and save new Python packages"
	@echo "  make update-deps     - Update Python dependencies"
	@echo "  make lint           - Run lint checks"
	@echo "  make fmt            - Format code with black"
	@echo "  make fmt-check      - Check if code is formatted"
	@echo "  make check          - Run mypy type checks"
	@echo "  make clean          - Remove virtual environment"
