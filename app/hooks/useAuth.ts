'use client';

import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import api from '@/app/services/axiosInstansce';

interface User {
  token: string;
  email: string;
}

export const useAuth = () => {
  const router = useRouter();

  const fetchUser = async (): Promise<User | null> => {
    const token = Cookies.get('token');
    const email = Cookies.get('email');
    if (!token || !email) return null;
    return { token, email };
  };

  const {
    data: user,
    mutate,
    error,
    isValidating,
  } = useSWR<User | null>('auth/user', fetchUser);

  const handleAuthResponse = (token: string, email: string) => {
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('email', email, { expires: 7 });
    void mutate({ token, email }, false);
    router.push('/users');
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/login', { email, password });
      handleAuthResponse(data.token, email);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/register', { email, password });
      handleAuthResponse(data.token, email);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      Cookies.remove('token');
      Cookies.remove('email');
      void mutate(null, false);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
    router.push('/login');
  };

  return {
    user,
    loading: !user && isValidating,
    isFetching: isValidating,
    error,
    login,
    register,
    logout,
  };
};
