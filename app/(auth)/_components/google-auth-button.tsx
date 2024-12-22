'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import { API_BASE_URL, CLIENT_URL } from '@/config/apiConfig';

export default function GoogleSignInButton() {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${API_BASE_URL}/v1/auth/external-login/google?returnUrl=${CLIENT_URL}`;
    } catch (error: any) {
      toast.error('Failed to initiate Google login.');
      console.error('Google login error:', error);
    }
  };
  return (
    <Button
      className="w-full"
      variant="default"
      type="button"
      onClick={handleGoogleLogin}
    >
      <Icons.link className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}
