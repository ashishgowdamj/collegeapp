# Vercel Deployment Guide

## Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Git repository pushed to GitHub/GitLab/Bitbucket

## Deployment Steps

### 1. Build locally (optional - to test)
```bash
npm run build
```

### 2. Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Link to existing project? (N for new project)
- Project name: (enter your desired name)
- Directory: `./` (current directory)

### 3. Set Environment Variables
In Vercel dashboard, go to your project settings and add:
- Database connection strings
- API keys
- Any other environment variables your app needs

### 4. Production Deployment
```bash
vercel --prod
```

## Project Structure
- `client/` - React frontend (built with Vite)
- `server/` - Express.js backend
- `api/` - Vercel serverless functions entry point
- `dist/public/` - Built frontend files
- `vercel.json` - Vercel configuration

## Important Notes
- API routes are accessible at `/api/*`
- Frontend is served as static files
- Database connections should use connection pooling for serverless
- Environment variables must be set in Vercel dashboard

## Troubleshooting
- Check Vercel function logs in dashboard
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Verify environment variables are set correctly
