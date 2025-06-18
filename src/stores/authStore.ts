
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // This will be replaced with actual Supabase authentication
          console.log('Login attempt:', { email, password });
          
          // Mock successful login for demo
          const mockUser: User = {
            id: '1',
            email,
            full_name: 'Demo User',
            phone: '+91 9876543210',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true });
        try {
          // This will be replaced with actual Supabase authentication
          console.log('Signup attempt:', { email, password, fullName });
          
          // Mock successful signup
          const mockUser: User = {
            id: '1',
            email,
            full_name: fullName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      updateProfile: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;
        
        const updatedUser = { 
          ...user, 
          ...updates, 
          updated_at: new Date().toISOString() 
        };
        
        set({ user: updatedUser });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
