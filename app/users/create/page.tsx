'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/app/services/axiosInstansce';

export default function CreateUserPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/users', {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      router.push('/users');
    } catch (err) {
      setError('Failed to create user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
