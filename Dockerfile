# Backend Build Stage
FROM node:16 AS backend

WORKDIR /app

# Copy backend-specific files
COPY package*.json ./
COPY requirements.txt ./

# Install Node.js dependencies
RUN npm install

# Install Python and pip dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    python3 -m pip install --upgrade pip && \
    pip3 install -r requirements.txt

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

# Install OpenSSL
RUN apk add --no-cache openssl

# Create SSL certificate directories
RUN mkdir -p /etc/ssl/private /etc/ssl/certs

# Generate SSL certificates with proper permissions
RUN openssl req -x509 -nodes -days 365 -newkey rsa:4096 \
    -keyout /etc/ssl/private/key.pem \
    -out /etc/ssl/certs/cert.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost" \
    && chmod 600 /etc/ssl/private/key.pem \
    && chmod 644 /etc/ssl/certs/cert.pem

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files from backend stage
COPY --from=backend /app/public /usr/share/nginx/html

# Expose HTTPS port
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]