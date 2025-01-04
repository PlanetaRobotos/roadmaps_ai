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
import { API_BASE_URL, CLIENT_URL } from '@/config/apiConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

const MagicLinkLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: 'demo@gmail.com'
  };
  const router = useRouter();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const userResp = await axios.post(`${API_BASE_URL}/v1/users`, {
        email: data.email
      });

      if (!userResp.data.emailConfirmed) {
        const redirectLinkResp = await axios.post(
          `${API_BASE_URL}/v1/auth/send-magic-link`,
          {
            userId: userResp.data.id
          }
        );

        const email = redirectLinkResp.data;
        router.push(
          `/verify-request?email=${userResp.data.email}&search=${email}`
        );
      } else {
        window.location.href = `${API_BASE_URL}/v1/auth/redirect?email=${data.email}`;
      }
    } catch (error) {
      console.error('error:', error);
      toast.error('An error occurred while creating the user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
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

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          Continue With Email
        </Button>
      </form>
    </Form>
  );
};

export default MagicLinkLogin;
