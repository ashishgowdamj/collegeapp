import { pgTable, text, serial, integer, boolean, decimal, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const colleges = pgTable("colleges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name"),
  location: text("location").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  establishedYear: integer("established_year"),
  type: text("type").notNull(), // Government, Private, Deemed
  affiliation: text("affiliation"),
  imageUrl: text("image_url"),
  description: text("description"),
  website: text("website"),
  overallRank: integer("overall_rank"),
  nirf_rank: integer("nirf_rank"),
  fees: decimal("fees", { precision: 10, scale: 2 }),
  feesPeriod: text("fees_period").default("yearly"), // yearly, total, semester
  rating: decimal("rating", { precision: 2, scale: 1 }),
  reviewCount: integer("review_count").default(0),
  admissionProcess: text("admission_process"),
  cutoffScore: integer("cutoff_score"),
  placementRate: decimal("placement_rate", { precision: 5, scale: 2 }),
  averagePackage: decimal("average_package", { precision: 10, scale: 2 }),
  highestPackage: decimal("highest_package", { precision: 10, scale: 2 }),
  hostelFees: decimal("hostel_fees", { precision: 10, scale: 2 }),
  hasHostel: boolean("has_hostel").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  collegeId: integer("college_id").references(() => colleges.id),
  name: text("name").notNull(),
  degree: text("degree").notNull(), // B.Tech, M.Tech, MBA, MBBS, etc.
  duration: text("duration").notNull(), // 4 years, 2 years, etc.
  specialization: text("specialization"),
  fees: decimal("fees", { precision: 10, scale: 2 }),
  seats: integer("seats"),
  eligibility: text("eligibility"),
  entranceExam: text("entrance_exam"),
  cutoffScore: integer("cutoff_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name"),
  type: text("type").notNull(), // Engineering, Medical, MBA, etc.
  conductingBody: text("conducting_body"),
  frequency: text("frequency"), // Annual, Bi-annual
  applicationStartDate: timestamp("application_start_date"),
  applicationEndDate: timestamp("application_end_date"),
  examDate: timestamp("exam_date"),
  resultDate: timestamp("result_date"),
  eligibility: text("eligibility"),
  syllabus: text("syllabus"),
  examPattern: text("exam_pattern"),
  totalMarks: integer("total_marks"),
  duration: text("duration"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  collegeId: integer("college_id").references(() => colleges.id),
  studentName: text("student_name"),
  course: text("course"),
  graduationYear: integer("graduation_year"),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  title: text("title"),
  content: text("content"),
  likes: integer("likes").default(0),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  name: text("name"),
  collegeIds: json("college_ids").$type<number[]>(),
  userId: text("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  preferences: json("preferences").$type<{
    interestedCourses?: string[];
    preferredLocations?: string[];
    budgetRange?: { min: number; max: number };
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertCollegeSchema = createInsertSchema(colleges).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertExamSchema = createInsertSchema(exams).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertComparisonSchema = createInsertSchema(comparisons).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Types
export type College = typeof colleges.$inferSelect;
export type InsertCollege = z.infer<typeof insertCollegeSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Exam = typeof exams.$inferSelect;
export type InsertExam = z.infer<typeof insertExamSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Comparison = typeof comparisons.$inferSelect;
export type InsertComparison = z.infer<typeof insertComparisonSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
