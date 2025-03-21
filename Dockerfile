
# Use Node.js LTS
FROM node:20-alpine AS base


# Set working directory
WORKDIR /app

# Install global dependencies
RUN npm install -g mastra

# Copy package files for root and frontend
COPY package.json package-lock.json* ./
COPY frontend/package.json frontend/package-lock.json* ./frontend/

# Install dependencies
RUN npm run install:all

# Copy the rest of the application code
COPY . .

# Remove any .env files that might have been copied
RUN find . -name ".env*" -type f -delete

# Create tmp directory for file uploads
RUN mkdir -p /tmp && chmod 777 /tmp

# Set default environment variables for the container
ENV AWS_REGION=us-west-2
ENV NEXT_PUBLIC_MASTRA_API_URL=http://localhost:4111
ENV LOG_LEVEL=info

# Build the frontend
RUN npm run build

# Expose ports (Next.js and Mastra)
EXPOSE 3000
EXPOSE 4111

# Start both servers
CMD ["npm", "run", "start"]