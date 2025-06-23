import { supabase } from '@/lib/supabase';
import { Course } from '@/lib/supabase';

export interface CreateCourseData {
  title: string;
  description?: string;
  duration: string;
  category: string;
  is_live: boolean;
  image_url?: string;
}

class CoursesService {
  async getCourses(filters?: {
    category?: string;
    is_live?: boolean;
    limit?: number;
  }) {
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles(id, name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.is_live !== undefined) {
        query = query.eq('is_live', filters.is_live);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Course[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch courses');
    }
  }

  async getCourse(id: number) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles(id, name, avatar_url, karma_points, level)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch course');
    }
  }

  async createCourse(courseData: CreateCourseData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('courses')
        .insert({
          ...courseData,
          instructor_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create course');
    }
  }

  async enrollInCourse(courseId: number) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if already enrolled
      const { data: existing } = await supabase
        .from('course_progress')
        .select('*')
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        throw new Error('Already enrolled in this course');
      }

      // Enroll user
      const { error } = await supabase
        .from('course_progress')
        .insert({
          course_id: courseId,
          user_id: user.id,
          progress_percentage: 0,
        });

      if (error) throw error;
      return true;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to enroll in course');
    }
  }

  async updateProgress(courseId: number, progressPercentage: number) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const updateData: any = {
        progress_percentage: progressPercentage,
      };

      // Mark as completed if 100%
      if (progressPercentage >= 100) {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('course_progress')
        .update(updateData)
        .eq('course_id', courseId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update progress');
    }
  }

  async getUserCourses(userId?: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const targetUserId = userId || user?.id;
      
      if (!targetUserId) throw new Error('User not found');

      const { data, error } = await supabase
        .from('course_progress')
        .select(`
          *,
          course:courses(
            *,
            instructor:profiles(id, name, avatar_url)
          )
        `)
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch user courses');
    }
  }

  async searchCourses(query: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles(id, name, avatar_url)
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Course[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to search courses');
    }
  }
}

export const coursesService = new CoursesService();