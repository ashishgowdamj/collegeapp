import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCollegeSchema, insertReviewSchema, insertComparisonSchema } from "@shared/schema";

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
        entranceExam: req.query.entranceExam as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };

      const colleges = await storage.getColleges(filters);
      res.json(colleges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch colleges" });
    }
  });

  app.get("/api/colleges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const college = await storage.getCollege(id);
      
      if (!college) {
        return res.status(404).json({ message: "College not found" });
      }
      
      res.json(college);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch college" });
    }
  });

  app.post("/api/colleges", async (req, res) => {
    try {
      const validatedData = insertCollegeSchema.parse(req.body);
      const college = await storage.createCollege(validatedData);
      res.status(201).json(college);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create college" });
    }
  });

  // Exam routes
  app.get("/api/exams", async (req, res) => {
    try {
      const exams = await storage.getExams();
      res.json(exams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exams" });
    }
  });

  app.get("/api/exams/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const exam = await storage.getExam(id);
      
      if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
      }
      
      res.json(exam);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exam" });
    }
  });

  // Review routes
  app.get("/api/colleges/:id/reviews", async (req, res) => {
    try {
      const collegeId = parseInt(req.params.id);
      const reviews = await storage.getReviewsByCollege(collegeId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/colleges/:id/reviews", async (req, res) => {
    try {
      const collegeId = parseInt(req.params.id);
      const validatedData = insertReviewSchema.parse({
        ...req.body,
        collegeId
      });
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Comparison routes
  app.post("/api/comparisons", async (req, res) => {
    try {
      const validatedData = insertComparisonSchema.parse(req.body);
      const comparison = await storage.createComparison(validatedData);
      res.status(201).json(comparison);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comparison" });
    }
  });

  app.get("/api/comparisons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const comparison = await storage.getComparison(id);
      
      if (!comparison) {
        return res.status(404).json({ message: "Comparison not found" });
      }
      
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comparison" });
    }
  });

  // College predictor route
  app.post("/api/predict-colleges", async (req, res) => {
    try {
      const { score, exam, preferences } = req.body;
      
      // Simple prediction logic based on cutoff scores
      const colleges = await storage.getColleges();
      const predictedColleges = colleges.filter(college => {
        const cutoff = college.cutoffScore || 0;
        return score >= cutoff * 0.9; // Allow 10% flexibility
      }).slice(0, 10);
      
      res.json(predictedColleges);
    } catch (error) {
      res.status(500).json({ message: "Failed to predict colleges" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
