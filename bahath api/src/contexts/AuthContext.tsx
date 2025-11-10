import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import toast from 'react-hot-toast';

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  'admin@bahathjobz.com': {
    password: 'admin123',
    user: {
      id: 'admin1',
      email: 'admin@bahathjobz.com',
      firstName: 'Super',
      lastName: 'Admin',
      role: 'super_admin' as const,
      phone: '+1234567890',
      avatar: null,
      createdAt: '2025-01-01T00:00:00Z',
      isActive: true,
    }
  },
  'employer@techcorp.com': {
    password: 'employer123',
    user: {
      id: 'emp1',
      email: 'employer@techcorp.com',
      firstName: 'John',
      lastName: 'Smith',
      role: 'employer' as const,
      phone: '+1234567891',
      avatar: null,
      createdAt: '2025-01-01T00:00:00Z',
      isActive: true,
    }
  },
  'jobseeker@example.com': {
    password: 'jobseeker123',
    user: {
      id: 'seeker1',
      email: 'jobseeker@example.com',
      firstName: 'Alice',
      lastName: 'Williams',
      role: 'job_seeker' as const,
      phone: '+1234567892',
      avatar: null,
      createdAt: '2025-01-01T00:00:00Z',
      isActive: true,
    }
  }
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Check demo credentials first
      const credential = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS];
      
      if (credential && credential.password === password) {
        // Use demo credentials
        const token = `demo-token-${credential.user.id}`;
        const user = credential.user;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return;
      }
      
      // Try API login as fallback
      try {
        const api = (await import('../utils/api')).default;
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } catch (apiError) {
        // If API fails, show error for invalid credentials
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      // For demo purposes, create a mock user
      const newUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        phone: userData.phone,
        avatar: null,
        createdAt: new Date().toISOString(),
        isActive: true,
      };
      
      const token = `demo-token-${newUser.id}`;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}