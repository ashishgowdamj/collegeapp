import express, { type Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  
  // Capture JSON response
  const originalJson = res.json;
  const capturedJsonResponse: any = {};
  
  res.json = function(body) {
    Object.assign(capturedJsonResponse, body);
    return originalJson.call(this, body);
  };
  
  // Log after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    if (Object.keys(capturedJsonResponse).length > 0) {
      console.log('Response:', JSON.stringify(capturedJsonResponse).substring(0, 200) + '...');
    }
  });
  
  next();
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Register API routes
registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Export the Express app for Vercel
module.exports = app;
