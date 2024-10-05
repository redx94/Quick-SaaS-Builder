# Dockerfile for Quick SaaS Builder
# Author: Reece Dixon
# Copyright (c) 2024 Reece Dixon. All Rights Reserved.
# Path: Quick-SaaS-Builder-main/Dockerfile

# Use an official Python runtime as a base image
FROM python:3.8-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to install dependencies
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code
COPY . .

# Install Node.js dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Expose the port that Flask runs on
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=backend/assistant_api.py
ENV FLASK_ENV=production

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]