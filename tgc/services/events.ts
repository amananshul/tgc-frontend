import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/supabase';

export interface CreateEventData {
  title: string;
  description?: string;
  type: 'event' | 'gig' | 'class';
  date_time: string;
  location?: string;
  is_online: boolean;
  fee?: number;
  payout?: number;
  karma_reward: number;
  max_participants?: number;
  image_url?: string;
}

class EventsService {
  async getEvents(filters?: {
    type?: string;
    location?: string;
    is_online?: boolean;
    limit?: number;
  }) {
    try {
      let query = supabase
        .from('events')
        .select(`
          *,
          organizer:profiles(id, name, avatar_url),
          participants:event_participants(user_id)
        `)
        .eq('status', 'active')
        .order('date_time', { ascending: true });

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      if (filters?.is_online !== undefined) {
        query = query.eq('is_online', filters.is_online);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Event[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch events');
    }
  }

  async getEvent(id: number) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          organizer:profiles(id, name, avatar_url, karma_points, level),
          participants:event_participants(
            user_id,
            status,
            joined_at,
            user:profiles(id, name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch event');
    }
  }

  async createEvent(eventData: CreateEventData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('events')
        .insert({
          ...eventData,
          organizer_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create event');
    }
  }

  async joinEvent(eventId: number) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if already joined
      const { data: existing } = await supabase
        .from('event_participants')
        .select('*')
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        throw new Error('Already joined this event');
      }

      // Add participant
      const { error: participantError } = await supabase
        .from('event_participants')
        .insert({
          event_id: eventId,
          user_id: user.id,
        });

      if (participantError) throw participantError;

      // Update participant count
      const { error: updateError } = await supabase.rpc('increment_participants', {
        event_id: eventId
      });

      if (updateError) throw updateError;

      return true;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to join event');
    }
  }

  async leaveEvent(eventId: number) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Remove participant
      const { error: participantError } = await supabase
        .from('event_participants')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (participantError) throw participantError;

      // Update participant count
      const { error: updateError } = await supabase.rpc('decrement_participants', {
        event_id: eventId
      });

      if (updateError) throw updateError;

      return true;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to leave event');
    }
  }

  async getUserEvents(userId?: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const targetUserId = userId || user?.id;
      
      if (!targetUserId) throw new Error('User not found');

      const { data, error } = await supabase
        .from('event_participants')
        .select(`
          *,
          event:events(
            *,
            organizer:profiles(id, name, avatar_url)
          )
        `)
        .eq('user_id', targetUserId)
        .order('joined_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch user events');
    }
  }

  async searchEvents(query: string) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          organizer:profiles(id, name, avatar_url)
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
        .eq('status', 'active')
        .order('date_time', { ascending: true });

      if (error) throw error;
      return data as Event[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to search events');
    }
  }
}

export const eventsService = new EventsService();