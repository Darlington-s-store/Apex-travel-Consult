import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // In a real app, this would make an API call
        if (email === 'admin@apex.com' && password === 'admin123') {
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              email,
              name: 'Admin User',
              role: 'admin',
            },
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);