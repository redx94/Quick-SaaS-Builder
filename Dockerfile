# Use multi-stage builds to reduce image size
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the application
RUN npm run build

# Use a lightweight base image for the final stage
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 5000
CMD ["npm", "start"]
