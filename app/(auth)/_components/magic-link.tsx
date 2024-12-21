'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Input } from '@/components/ui/input';
import { toast } from 'sonner'; // Assuming you have an Input component

interface MagicLinkForm {
  email: string;
}

const MagicLinkLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MagicLinkForm>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: MagicLinkForm) => {
    setLoading(true);
    try {
      await axios.post('v1/auth/magic-link', { email: data.email });
      // Notify user to check their email
      toast.success('Magic link sent! Check your email.');
    } catch (error) {
      // Handle error (e.g., show error message)
      toast.error('Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold">Login with Magic Link</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <Input
            type="email"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            className="mt-1"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Send Magic Link'}
        </Button>
      </form>
    </div>
  );
};

export default MagicLinkLogin;
