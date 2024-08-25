'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import axios from '@/app/services/axiosInstansce';

import { User } from '@/app/types';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/users/${params.id}`);
        setUser(response.data.data);
        setValue('firstName', response.data.data.first_name);
        setValue('lastName', response.data.data.last_name);
        setValue('email', response.data.data.email);
      } catch (err) {
        setError('Failed to fetch user');
      }
    }
    fetchUser();
  }, [params.id, setValue]);

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      await axios.put(`/users/${params.id}`, {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      });
      router.push(`/users/${params.id}`);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (!user)
    return <div className="mt-6 text-center text-white">Loading...</div>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-8 text-3xl font-bold">Edit User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg rounded-lg bg-gray-800 p-6 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="mb-2 block font-medium text-gray-300"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className={`w-full rounded-md border bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.firstName ? 'border-red-500' : 'border-gray-600'}`}
          />
          {errors.firstName && (
            <p className="mt-1 text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="mb-2 block font-medium text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            className={`w-full rounded-md border bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.lastName ? 'border-red-500' : 'border-gray-600'}`}
          />
          {errors.lastName && (
            <p className="mt-1 text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full rounded-md border bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
          />
          {errors.email && (
            <p className="mt-1 text-red-500">{errors.email.message}</p>
          )}
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push(`/users/${params.id}`)}
            className="rounded bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
