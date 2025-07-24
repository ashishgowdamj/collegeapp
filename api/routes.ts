import { Express } from 'express';
import { createServer, Server } from 'http';
import { storage } from './storage';

export async function registerRoutes(app: Express): Promise<Server> {
  // College routes
  app.get("/api/colleges", async (req, res) => {
    try {
      const filters = {
        search: req.query.search as string,
        location: req.query.location as string,
        state: req.query.state as string,
        courseType: req.query.courseType as string,
        minFees: req.query.minFees ? parseInt(req.query.minFees as string) : undefined,
        maxFees: req.query.maxFees ? parseInt(req.query.maxFees as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0
      };
      
      const { colleges, total } = await storage.getColleges(filters);
      
      res.json({
        data: colleges,
        total,
        limit: filters.limit,
        offset: filters.offset
      });
    } catch (error) {
      console.error('Error fetching colleges:', error);
      res.status(500).json({ message: "Failed to fetch colleges" });
    }
  });

  // Get single college
  app.get("/api/colleges/:id", async (req, res) => {
    try {
      const college = await storage.getCollegeById(req.params.id);
      if (!college) {
        return res.status(404).json({ message: "College not found" });
      }
      res.json(college);
    } catch (error) {
      console.error('Error fetching college:', error);
      res.status(500).json({ message: "Failed to fetch college" });
    }
  });

  // Get similar colleges
  app.get("/api/colleges/:id/similar", async (req, res) => {
    try {
      const similarColleges = await storage.getSimilarColleges(req.params.id);
      res.json(similarColleges);
    } catch (error) {
      console.error('Error fetching similar colleges:', error);
      res.status(500).json({ message: "Failed to fetch similar colleges" });
    }
  });

  // Get college reviews
  app.get("/api/colleges/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getCollegeReviews(req.params.id);
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Predict colleges based on score
  app.get("/api/colleges/predict", async (req, res) => {
    try {
      const score = parseInt(req.query.score as string);
      if (isNaN(score)) {
        return res.status(400).json({ message: "Invalid score provided" });
      }
      
      const colleges = await storage.getColleges();
      const predictedColleges = colleges.filter(college => {
        const cutoff = college.cutoffScore || 0;
        return score >= cutoff * 0.9; // Allow 10% flexibility
      }).slice(0, 10);
      
      res.json(predictedColleges);
    } catch (error) {
      console.error('Error predicting colleges:', error);
      res.status(500).json({ message: "Failed to predict colleges" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
