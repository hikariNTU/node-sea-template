# Use an official Node.js runtime as a parent image
FROM node:22-slim AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build:sea

# Create a new stage for the final image from a minimal base
FROM busybox:latest AS final

# Copy only the dist folder from the base stage
COPY --from=base /app/dist /app/dist

CMD ["tail", "-f", "/dev/null"]
