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
COPY index.html ./public/index.html

# Serve static assets if any
RUN mkdir -p /app/public
COPY public/ ./public

# Expose backend port
EXPOSE 5000

# Command to start the backend server
CMD ["node", "start.js"]

# Final Deployment Stage with Nginx for SSL Handling
FROM nginx:alpine

# Copy custom SSL certificates for Nginx if available
COPY ssl/cert.pem /etc/ssl/certs/cert.pem
COPY ssl/key.pem /etc/ssl/private/key.pem

# Nginx configuration for SSL
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files (from backend or public)
COPY --from=backend /app/public /usr/share/nginx/html

# Expose standard HTTPS port
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
