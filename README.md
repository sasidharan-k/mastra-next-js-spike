# Tyler GenAI Workflows 

This repository contains:
- A Next.js frontend (in the `/frontend` directory)
- A Mastra server for AI-powered document processing (in the `/src/mastra` directory)

## Running with Docker

The simplest way to run both services is with Docker Compose:

1. Clone the repository
2. Create a `.env` file from the template:
   ```
   cp .env.template .env
   ```
3. Edit the `.env` file to add your AWS credentials and other environment variables
4. Start the services with Docker Compose:
   ```
   docker-compose up -d --build
   ```
5. Access the frontend at http://localhost:3000

## Running Locally (Development)

To run both services locally:

1. Install dependencies:
   ```
   npm run install:all
   ```

2. Start the development servers:
   ```
   npm run dev
   ```

This will start both the frontend Next.js server and the Mastra server in development mode.

## Project Structure

- `/frontend` - Next.js application with UI and API routes
- `/src/mastra` - Mastra server for processing documents
  - `/src/mastra/helpers` - Utility functions
  - `/src/mastra/schema` - Data schemas
  - `/src/mastra/steps` - Processing steps
  - `/src/mastra/workflows` - Document processing workflows

## Building for Production

To build for production:

```
npm run build
```

Then to start in production mode:

```
npm run start
```

## API Endpoints

- `/api/upload` - Upload files for processing
- `/api/workflows` - Used to kick off workflows. See swagger documentation for more details
- `/api/health` - Health check endpoint

## Authentication

Credentials can be changed by setting the AUTH_USERNAME and AUTH_PASSWORD environment variables.

## S3 Storage Configuration

The application supports storing files in S3 by setting the following environment variables:

```
S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

When S3 storage is configured, files will be stored in the S3 bucket instead of local storage.

## Deployment

See the [AWS.md](AWS.md) file for AWS deployment instructions.