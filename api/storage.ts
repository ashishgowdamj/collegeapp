import { sql } from '@vercel/postgres';

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  courses: string[];
  imageUrl: string;
  cutoffScore?: number;
  fees?: {
    min: number;
    max: number;
  };
}

export interface Review {
  id: string;
  collegeId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export const storage = {
  // Get all colleges with optional filters
  async getColleges(filters: {
    search?: string;
    location?: string;
    state?: string;
    courseType?: string;
    minFees?: number;
    maxFees?: number;
    limit: number;
    offset: number;
  }) {
    try {
      // Build the query dynamically based on filters
      let query = 'SELECT * FROM colleges WHERE 1=1';
      const params: any[] = [];
      let paramIndex = 1;

      if (filters.search) {
        query += ` AND name ILIKE $${paramIndex++}`;
        params.push(`%${filters.search}%`);
      }

      if (filters.location) {
        query += ` AND location ILIKE $${paramIndex++}`;
        params.push(`%${filters.location}%`);
      }

      if (filters.state) {
        query += ` AND state = $${paramIndex++}`;
        params.push(filters.state);
      }

      if (filters.courseType) {
        query += ` AND $${paramIndex++} = ANY(courses)`;
        params.push(filters.courseType);
      }

      // Add pagination
      query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
      params.push(filters.limit, filters.offset);

      const result = await sql.query<College>(query, params);
      const totalResult = await sql.query('SELECT COUNT(*) FROM colleges');
      
      return {
        colleges: result.rows,
        total: parseInt(totalResult.rows[0].count, 10)
      };
    } catch (error) {
      console.error('Error in getColleges:', error);
      throw error;
    }
  },

  // Get a single college by ID
  async getCollegeById(id: string): Promise<College | null> {
    try {
      const result = await sql`SELECT * FROM colleges WHERE id = ${id}`;
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error in getCollegeById:', error);
      throw error;
    }
  },

  // Get similar colleges
  async getSimilarColleges(collegeId: string): Promise<College[]> {
    try {
      const college = await this.getCollegeById(collegeId);
      if (!college) return [];

      // Find colleges with similar courses in the same state
      const result = await sql`
        SELECT * FROM colleges 
        WHERE id != ${collegeId} 
        AND state = ${college.state}
        AND courses && ${college.courses}
        ORDER BY rating DESC
        LIMIT 5
      `;
      
      return result.rows;
    } catch (error) {
      console.error('Error in getSimilarColleges:', error);
      throw error;
    }
  },

  // Get reviews for a college
  async getCollegeReviews(collegeId: string): Promise<Review[]> {
    try {
      const result = await sql`
        SELECT * FROM reviews 
        WHERE "collegeId" = ${collegeId}
        ORDER BY "createdAt" DESC
      `;
      
      return result.rows;
    } catch (error) {
      console.error('Error in getCollegeReviews:', error);
      throw error;
    }
  }
};
