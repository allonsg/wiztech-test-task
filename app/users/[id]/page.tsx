'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import axios from '@/app/services/axiosInstansce';

import { User } from '@/app/types';

const SingleUserPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/users/${params.id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user');
        setLoading(false);
      }
    }
    fetchUser();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${params.id}`);
      router.push('/users');
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const handleEdit = () => {
    router.push(`/users/${params.id}/edit`);
  };

  if (loading)
    return <div className="mt-6 text-center text-white">Loading...</div>;
  if (error)
    return <div className="mt-6 text-center text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">
        {user?.first_name} {user?.last_name}
      </h1>
      {user && (
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="mb-4 h-32 w-32 rounded-full border-2 border-gray-600"
          />
          <p className="mb-2 text-xl">Email: {user.email}</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEdit}
              className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Edit User
            </button>
            <button
              onClick={handleDelete}
              className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              Delete User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUserPage;
