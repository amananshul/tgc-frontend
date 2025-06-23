import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types (you can generate these from Supabase CLI)
export interface Profile {
  id: string;
  name?: string;
  age?: number;
  location?: string;
  bio?: string;
  avatar_url?: string;
  karma_points: number;
  level: string;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  type: 'event' | 'gig' | 'class';
  organizer_id: string;
  date_time: string;
  location?: string;
  is_online: boolean;
  fee?: number;
  payout?: number;
  karma_reward: number;
  max_participants?: number;
  current_participants: number;
  status: 'active' | 'cancelled' | 'completed';
  image_url?: string;
  created_at: string;
  organizer?: Profile;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  instructor_id: string;
  duration: string;
  category: string;
  is_live: boolean;
  image_url?: string;
  created_at: string;
  instructor?: Profile;
}