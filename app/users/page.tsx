'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from '@/app/services/axiosInstansce';

import { User } from '@/app/types';

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/users');
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading)
    return <div className="mt-6 text-center text-white">Loading...</div>;
  if (error)
    return <div className="mt-6 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-8 text-center text-3xl font-bold">User List</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map(user => (
          <Link
            href={`/users/${user.id}`}
            key={user.id}
            className="block rounded-lg bg-gray-800 p-4 transition hover:bg-gray-700"
          >
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="mb-4 h-24 w-24 rounded-full border-2 border-gray-600"
              />
              <h2 className="text-lg font-semibold">
                {user.first_name} {user.last_name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
