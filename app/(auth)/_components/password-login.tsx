'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { API_BASE_URL } from '@/config/apiConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

const passwordSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Password must contain uppercase, lowercase and numbers'
    })
});

type PasswordFormValue = z.infer<typeof passwordSchema>;

interface LoginProps {
  appSumoKey: string | null;
}

const PasswordLogin: React.FC<LoginProps> = ({ appSumoKey }) => {
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'magic-link' | 'password'>(
    'magic-link'
  );
  const router = useRouter();

  const passwordForm = useForm<PasswordFormValue>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handlePasswordSubmit = async (data: PasswordFormValue) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/auth/password-login`,
        {
          email: data.email,
          password: data.password
        }
      );

      const { token } = response.data;
      localStorage.setItem('token', token);
      router.push(`/dashboard`);
      toast.success('Login successful!');
    } catch (error) {
      console.error('error:', error);
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...passwordForm}>
      <form
        onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
        className="space-y-4"
      >
        <FormField
          control={passwordForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="w-full"
          type="submit"
          variant="secondary"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default PasswordLogin;
