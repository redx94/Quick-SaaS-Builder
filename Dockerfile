
# Backend Dockerfile
FROM python:3.9-slim AS backend

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ .

CMD ["python", "app.py"]

# Frontend Dockerfile
FROM node:16 AS frontend

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build

# Final Deployment Image
FROM nginx:alpine

COPY --from=frontend /app/build /usr/share/nginx/html
COPY --from=backend /app /app
