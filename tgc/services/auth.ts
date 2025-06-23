import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
}

export interface SignUpData {
  email?: string;
  phone?: string;
  password: string;
  name: string;
  age?: number;
  location?: string;
}

export interface SignInData {
  email?: string;
  phone?: string;
  password: string;
}

class AuthService {
  async signUp(data: SignUpData) {
    try {
      const authData = data.email 
        ? { email: data.email, password: data.password }
        : { phone: data.phone!, password: data.password };

      const { data: authResult, error: authError } = await supabase.auth.signUp(authData);

      if (authError) throw authError;

      // Create profile
      if (authResult.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authResult.user.id,
            name: data.name,
            age: data.age,
            location: data.location,
          });

        if (profileError) throw profileError;
      }

      return { user: authResult.user, session: authResult.session };
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed');
    }
  }

  async signIn(data: SignInData) {
    try {
      const authData = data.email 
        ? { email: data.email, password: data.password }
        : { phone: data.phone!, password: data.password };

      const { data: result, error } = await supabase.auth.signInWithPassword(authData);

      if (error) throw error;

      return { user: result.user, session: result.session };
    } catch (error: any) {
      throw new Error(error.message || 'Sign in failed');
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Sign out failed');
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error: any) {
      return null;
    }
  }

  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error: any) {
      return null;
    }
  }

  async updateProfile(updates: Partial<{
    name: string;
    age: number;
    location: string;
    bio: string;
    avatar_url: string;
  }>) {
    try {
      const user = await this.getCurrentUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
  }

  async getProfile(userId?: string) {
    try {
      const user = userId || (await this.getCurrentUser())?.id;
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get profile');
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();