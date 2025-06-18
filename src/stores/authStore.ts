import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  two_factor_enabled: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  account_locked: boolean;
  failed_login_attempts: number;
  last_login_attempt: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  deleteAccount: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,

      initializeAuth: async () => {
        set({ isLoading: true });
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {    
            console.log('Auth state changed:', event, session);
            
            if (session?.user) {
              set({ 
                user: session.user, 
                session, 
                isAuthenticated: true 
              });
              
              // Fetch profile after state update
              setTimeout(() => {
                get().fetchProfile();
              }, 0);
            } else {
              set({ 
                user: null, 
                session: null, 
                profile: null, 
                isAuthenticated: false 
              });
            }
            
            set({ isLoading: false });
          }
        );

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          set({ 
            user: session.user, 
            session, 
            isAuthenticated: true 
          });
          await get().fetchProfile();
        }
        
        set({ isLoading: false });
        
        // Store the cleanup function but don't return it
        // The subscription will be cleaned up when the component unmounts
        if (typeof window !== 'undefined') {
          window.addEventListener('beforeunload', () => {
            subscription.unsubscribe();
          });
        }
      },

      fetchProfile: async () => {
        const { user } = get();
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data && !error) {
          set({ profile: data });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          set({ isLoading: false });
          throw error;
        }

        // Log security event
        if (data.user) {
          await supabase.rpc('log_security_event', {
            p_user_id: data.user.id,
            p_event_type: 'login_success',
            p_event_details: { email, timestamp: new Date().toISOString() }
          });
        }
      },

      signup: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true });
        
        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) {
          set({ isLoading: false });
          throw error;
        }

        set({ isLoading: false });
      },

      loginWithGoogle: async () => {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl
          }
        });

        if (error) throw error;
      },

      logout: async () => {
        const { user } = get();
        
        if (user) {
          await supabase.rpc('log_security_event', {
            p_user_id: user.id,
            p_event_type: 'logout',
            p_event_details: { timestamp: new Date().toISOString() }
          });
        }

        await supabase.auth.signOut();
        set({ 
          user: null, 
          session: null, 
          profile: null, 
          isAuthenticated: false 
        });
      },

      resetPassword: async (email: string) => {
        const redirectUrl = `${window.location.origin}/reset-password`;
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: redirectUrl
        });

        if (error) throw error;
      },

      updateProfile: async (updates: Partial<Profile>) => {
        const { user } = get();
        if (!user) return;

        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);

        if (error) throw error;

        await get().fetchProfile();
      },

      uploadAvatar: async (file: File) => {
        const { user } = get();
        if (!user) throw new Error('Not authenticated');

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        await get().updateProfile({ avatar_url: publicUrl });
        return publicUrl;
      },

      deleteAccount: async () => {
        const { user } = get();
        if (!user) return;

        // Log account deletion
        await supabase.rpc('log_security_event', {
          p_user_id: user.id,
          p_event_type: 'account_deleted',
          p_event_details: { timestamp: new Date().toISOString() }
        });

        // Delete user data would typically be handled by a server function
        // For now, we'll just sign out
        await get().logout();
      },

      sendEmailVerification: async () => {
        const { user } = get();
        if (!user?.email) return;

        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.email
        });

        if (error) throw error;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
