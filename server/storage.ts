import { 
  colleges, courses, exams, reviews, comparisons, users,
  type College, type InsertCollege,
  type Course, type InsertCourse,
  type Exam, type InsertExam,
  type Review, type InsertReview,
  type Comparison, type InsertComparison,
  type User, type InsertUser
} from "@shared/schema";

export interface IStorage {
  // College operations
  getColleges(filters?: {
    search?: string;
    location?: string;
    state?: string;
    courseType?: string;
    minFees?: number;
    maxFees?: number;
    entranceExam?: string;
    limit?: number;
    offset?: number;
  }): Promise<College[]>;
  getCollege(id: number): Promise<College | undefined>;
  createCollege(college: InsertCollege): Promise<College>;
  
  // Course operations
  getCoursesByCollege(collegeId: number): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  
  // Exam operations
  getExams(): Promise<Exam[]>;
  getExam(id: number): Promise<Exam | undefined>;
  
  // Review operations
  getReviewsByCollege(collegeId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Comparison operations
  getComparison(id: number): Promise<Comparison | undefined>;
  createComparison(comparison: InsertComparison): Promise<Comparison>;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private colleges: Map<number, College>;
  private courses: Map<number, Course>;
  private exams: Map<number, Exam>;
  private reviews: Map<number, Review>;
  private comparisons: Map<number, Comparison>;
  private users: Map<number, User>;
  private currentCollegeId: number;
  private currentCourseId: number;
  private currentExamId: number;
  private currentReviewId: number;
  private currentComparisonId: number;
  private currentUserId: number;

  constructor() {
    this.colleges = new Map();
    this.courses = new Map();
    this.exams = new Map();
    this.reviews = new Map();
    this.comparisons = new Map();
    this.users = new Map();
    this.currentCollegeId = 1;
    this.currentCourseId = 1;
    this.currentExamId = 1;
    this.currentReviewId = 1;
    this.currentComparisonId = 1;
    this.currentUserId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed colleges
    const collegesData: InsertCollege[] = [
      {
        name: "Indian Institute of Technology Delhi",
        shortName: "IIT Delhi",
        location: "New Delhi, Delhi",
        state: "Delhi",
        city: "New Delhi",
        establishedYear: 1961,
        type: "Government",
        affiliation: "IIT System",
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
        description: "Premier engineering and technology institute",
        website: "https://home.iitd.ac.in/",
        overallRank: 1,
        nirf_rank: 2,
        fees: "250000",
        feesPeriod: "yearly",
        rating: "4.5",
        reviewCount: 2100,
        admissionProcess: "JEE Advanced",
        cutoffScore: 99,
        placementRate: "95.5",
        averagePackage: "1800000",
        highestPackage: "5000000",
        hostelFees: "25000",
        hasHostel: true,
      },
      {
        name: "All India Institute of Medical Sciences",
        shortName: "AIIMS Delhi",
        location: "New Delhi, Delhi",
        state: "Delhi",
        city: "New Delhi",
        establishedYear: 1956,
        type: "Government",
        affiliation: "Ministry of Health and Family Welfare",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
        description: "Premier medical college and hospital",
        website: "https://www.aiims.edu/",
        overallRank: 1,
        nirf_rank: 1,
        fees: "130000",
        feesPeriod: "yearly",
        rating: "4.8",
        reviewCount: 1800,
        admissionProcess: "NEET",
        cutoffScore: 98,
        placementRate: "100",
        averagePackage: "1200000",
        highestPackage: "2500000",
        hostelFees: "15000",
        hasHostel: true,
      },
      {
        name: "Indian Institute of Management Ahmedabad",
        shortName: "IIM Ahmedabad",
        location: "Ahmedabad, Gujarat",
        state: "Gujarat",
        city: "Ahmedabad",
        establishedYear: 1961,
        type: "Government",
        affiliation: "IIM System",
        imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
        description: "Premier business school in India",
        website: "https://www.iima.ac.in/",
        overallRank: 1,
        nirf_rank: 1,
        fees: "2500000",
        feesPeriod: "total",
        rating: "4.7",
        reviewCount: 1200,
        admissionProcess: "CAT",
        cutoffScore: 95,
        placementRate: "100",
        averagePackage: "3200000",
        highestPackage: "8500000",
        hostelFees: "80000",
        hasHostel: true,
      },
      {
        name: "Indian Institute of Science Bangalore",
        shortName: "IISc Bangalore",
        location: "Bangalore, Karnataka",
        state: "Karnataka",
        city: "Bangalore",
        establishedYear: 1909,
        type: "Government",
        affiliation: "Autonomous",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
        description: "Premier research institute for science and engineering",
        website: "https://www.iisc.ac.in/",
        overallRank: 1,
        nirf_rank: 1,
        fees: "22000",
        feesPeriod: "yearly",
        rating: "4.6",
        reviewCount: 950,
        admissionProcess: "KVPY/JEE Advanced",
        cutoffScore: 97,
        placementRate: "85",
        averagePackage: "2500000",
        highestPackage: "6000000",
        hostelFees: "18000",
        hasHostel: true,
      },
      {
        name: "Jawaharlal Nehru University",
        shortName: "JNU",
        location: "New Delhi, Delhi",
        state: "Delhi",
        city: "New Delhi",
        establishedYear: 1969,
        type: "Government",
        affiliation: "Central University",
        imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
        description: "Premier university for social sciences and liberal arts",
        website: "https://www.jnu.ac.in/",
        overallRank: 2,
        nirf_rank: 2,
        fees: "25000",
        feesPeriod: "yearly",
        rating: "4.3",
        reviewCount: 1500,
        admissionProcess: "JNU Entrance Exam",
        cutoffScore: 85,
        placementRate: "75",
        averagePackage: "800000",
        highestPackage: "1500000",
        hostelFees: "12000",
        hasHostel: true,
      }
    ];

    collegesData.forEach(college => {
      this.createCollege(college);
    });

    // Seed exams
    const examsData: InsertExam[] = [
      {
        name: "JEE Main",
        fullName: "Joint Entrance Examination Main",
        type: "Engineering",
        conductingBody: "National Testing Agency",
        frequency: "Bi-annual",
        eligibility: "12th pass with Physics, Chemistry, Mathematics",
        totalMarks: 300,
        duration: "3 hours",
        website: "https://jeemain.nta.nic.in/",
      },
      {
        name: "JEE Advanced",
        fullName: "Joint Entrance Examination Advanced",
        type: "Engineering",
        conductingBody: "IIT",
        frequency: "Annual",
        eligibility: "JEE Main qualified",
        totalMarks: 372,
        duration: "6 hours (2 papers)",
        website: "https://jeeadv.ac.in/",
      },
      {
        name: "NEET",
        fullName: "National Eligibility cum Entrance Test",
        type: "Medical",
        conductingBody: "National Testing Agency",
        frequency: "Annual",
        eligibility: "12th pass with Physics, Chemistry, Biology",
        totalMarks: 720,
        duration: "3 hours",
        website: "https://neet.nta.nic.in/",
      },
      {
        name: "CAT",
        fullName: "Common Admission Test",
        type: "MBA",
        conductingBody: "IIMs",
        frequency: "Annual",
        eligibility: "Bachelor's degree with 50% marks",
        totalMarks: 300,
        duration: "3 hours",
        website: "https://iimcat.ac.in/",
      }
    ];

    examsData.forEach(exam => {
      this.createExam(exam);
    });
  }

  async getColleges(filters?: {
    search?: string;
    location?: string;
    state?: string;
    courseType?: string;
    minFees?: number;
    maxFees?: number;
    entranceExam?: string;
    limit?: number;
    offset?: number;
  }): Promise<College[]> {
    let results = Array.from(this.colleges.values());

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(college => 
        college.name.toLowerCase().includes(searchLower) ||
        college.shortName?.toLowerCase().includes(searchLower) ||
        college.location.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.state) {
      results = results.filter(college => college.state === filters.state);
    }

    if (filters?.location) {
      results = results.filter(college => 
        college.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters?.minFees !== undefined) {
      results = results.filter(college => 
        parseFloat(college.fees || "0") >= filters.minFees!
      );
    }

    if (filters?.maxFees !== undefined) {
      results = results.filter(college => 
        parseFloat(college.fees || "0") <= filters.maxFees!
      );
    }

    // Sort by rank
    results.sort((a, b) => (a.overallRank || 999) - (b.overallRank || 999));

    if (filters?.offset) {
      results = results.slice(filters.offset);
    }

    if (filters?.limit) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  async getCollege(id: number): Promise<College | undefined> {
    return this.colleges.get(id);
  }

  async createCollege(insertCollege: InsertCollege): Promise<College> {
    const id = this.currentCollegeId++;
    const college: College = { 
      ...insertCollege,
      shortName: insertCollege.shortName || null,
      establishedYear: insertCollege.establishedYear || null,
      affiliation: insertCollege.affiliation || null,
      imageUrl: insertCollege.imageUrl || null,
      description: insertCollege.description || null,
      website: insertCollege.website || null,
      overallRank: insertCollege.overallRank || null,
      nirf_rank: insertCollege.nirf_rank || null,
      fees: insertCollege.fees || null,
      feesPeriod: insertCollege.feesPeriod || "yearly",
      rating: insertCollege.rating || null,
      reviewCount: insertCollege.reviewCount || 0,
      admissionProcess: insertCollege.admissionProcess || null,
      cutoffScore: insertCollege.cutoffScore || null,
      placementRate: insertCollege.placementRate || null,
      averagePackage: insertCollege.averagePackage || null,
      highestPackage: insertCollege.highestPackage || null,
      hostelFees: insertCollege.hostelFees || null,
      hasHostel: insertCollege.hasHostel || false,
      id,
      createdAt: new Date()
    };
    this.colleges.set(id, college);
    return college;
  }

  async getCoursesByCollege(collegeId: number): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(
      course => course.collegeId === collegeId
    );
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getExams(): Promise<Exam[]> {
    return Array.from(this.exams.values());
  }

  async getExam(id: number): Promise<Exam | undefined> {
    return this.exams.get(id);
  }

  async createExam(insertExam: InsertExam): Promise<Exam> {
    const id = this.currentExamId++;
    const exam: Exam = {
      ...insertExam,
      fullName: insertExam.fullName || null,
      conductingBody: insertExam.conductingBody || null,
      frequency: insertExam.frequency || null,
      applicationStartDate: insertExam.applicationStartDate || null,
      applicationEndDate: insertExam.applicationEndDate || null,
      examDate: insertExam.examDate || null,
      resultDate: insertExam.resultDate || null,
      eligibility: insertExam.eligibility || null,
      syllabus: insertExam.syllabus || null,
      examPattern: insertExam.examPattern || null,
      totalMarks: insertExam.totalMarks || null,
      duration: insertExam.duration || null,
      website: insertExam.website || null,
      id,
      createdAt: new Date()
    };
    this.exams.set(id, exam);
    return exam;
  }

  async getReviewsByCollege(collegeId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.collegeId === collegeId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = {
      ...insertReview,
      collegeId: insertReview.collegeId || null,
      studentName: insertReview.studentName || null,
      course: insertReview.course || null,
      graduationYear: insertReview.graduationYear || null,
      rating: insertReview.rating || null,
      title: insertReview.title || null,
      content: insertReview.content || null,
      likes: insertReview.likes || 0,
      verified: insertReview.verified || false,
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  async getComparison(id: number): Promise<Comparison | undefined> {
    return this.comparisons.get(id);
  }

  async createComparison(insertComparison: InsertComparison): Promise<Comparison> {
    const id = this.currentComparisonId++;
    const comparison: Comparison = {
      ...insertComparison,
      name: insertComparison.name || null,
      collegeIds: insertComparison.collegeIds || null,
      userId: insertComparison.userId || null,
      id,
      createdAt: new Date()
    };
    this.comparisons.set(id, comparison);
    return comparison;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser,
      preferences: insertUser.preferences || null,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
