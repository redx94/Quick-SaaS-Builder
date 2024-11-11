# Define the Node.js executable
NODE = node

# Define the Vite executable
VITE = $(NODE) node_modules/.bin/vite

# Define the concurrently executable
CONCURRENTLY = $(NODE) node_modules/.bin/concurrently

# Define the Python executable
PYTHON = python

# Start target
start:
	$(CONCURRENTLY) "python src/backend/backend_chat_interface.py" "python src/backend/assistant_api.py" "vite"

# Install target
install:
	npm install
	pip install -r requirements.txt

# Build target
build:
	npm run build

# Build dev target
build-dev:
	$(NODE) scripts/build.js

# Open app target
open:
	open http://localhost:3000

# Default target
all: install build-dev start open