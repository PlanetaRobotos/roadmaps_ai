import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { toast } from 'sonner';

const MagicLinkCallback: React.FC = () => {
  const router = useRouter();
  const { userId, token } = router.query;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>('Logging you in...');

  useEffect(() => {
    const login = async () => {
      if (typeof userId !== 'string' || typeof token !== 'string') {
        setMessage('Invalid magic link.');
        setLoading(false);
        return;
      }

      try {
        await axios.get('v1/auth/magic-link-login', {
          params: { userId, token }
        });
        setMessage('Logged in successfully!');
        toast.success('Logged in successfully!');
        // Redirect to dashboard or intended page
        router.push('/dashboard');
      } catch (error: any) {
        setMessage('Failed to log in. Please try again.');
        toast.error('Failed to log in. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      login();
    }
  }, [userId, token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 text-center shadow">
        <h2 className="mb-6 text-2xl font-bold">Magic Link Login</h2>
        <p className="mb-4">{message}</p>
        {loading && <Button disabled>Loading...</Button>}
        {!loading && (
          <Button onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
};

export default MagicLinkCallback;
