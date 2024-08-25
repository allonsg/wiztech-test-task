'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/hooks';

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/users');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return null;
};

export default HomePage;
