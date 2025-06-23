import { useState, useEffect } from 'react';
import { authService, AuthUser } from '@/services/auth';
import { Profile } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const session = await authService.getCurrentSession();
        if (session?.user) {
          setUser(session.user);
          const userProfile = await authService.getProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          try {
            const userProfile = await authService.getProfile(session.user.id);
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await authService.signIn({ email, password });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: {
    email: string;
    password: string;
    name: string;
    age?: number;
    location?: string;
  }) => {
    try {
      setLoading(true);
      await authService.signUp(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      await authService.updateProfile(updates);
      if (profile) {
        setProfile({ ...profile, ...updates });
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };
}