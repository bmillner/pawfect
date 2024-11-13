import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { auth } from '@/lib/api';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const user = await auth.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }, [navigate, setUser, setIsAuthenticated]);

  const logout = useCallback(() => {
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  }, [navigate, setUser, setIsAuthenticated]);

  return { login, logout };
}