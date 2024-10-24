# Backend Build Stage
FROM node:16 AS backend

WORKDIR /app

# Copy backend-specific files
COPY package*.json ./
COPY requirements.txt ./

# Install dependencies
RUN npm install
RUN apt-get update && apt-get install -y python3-pip && pip install -r requirements.txt

# Copy all backend source code
COPY src/ ./src
COPY start.js ./start.js

# Expose backend port
EXPOSE 5000

# Build command for backend service
CMD ["node", "start.js"]

# Frontend Build Stage
FROM node:16 AS frontend

WORKDIR /frontend

# Copy frontend-specific files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend source code
COPY frontend/ ./

# Build frontend
RUN npm run build

# Final Deployment Stage with Nginx for SSL Handling
FROM nginx:alpine

# Copy frontend build to Nginx directory
COPY --from=frontend /frontend/build /usr/share/nginx/html

# Copy custom SSL certificates for Nginx if applicable
# This assumes SSL certificates are available in the specified directory.
COPY path/to/ssl/cert.pem /etc/ssl/certs/cert.pem
COPY path/to/ssl/key.pem /etc/ssl/private/key.pem

# Nginx configuration for SSL
COPY nginx.conf /etc/nginx/nginx.conf

# Expose standard HTTPS port
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
