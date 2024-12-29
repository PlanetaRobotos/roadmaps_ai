'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { emailProviders } from '@/utils/emailProviders';

export default function EmailRedirectPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const search = searchParams.get('search');

  console.log('email:', email);

  const openEmailInbox = () => {
    const domain = email?.split('@')[1].toLowerCase();

    const webmailUrl = emailProviders[domain!];

    if (webmailUrl) {
      const updatedWebmailUrl = `${webmailUrl}#search/${search}`;

      const newWindow = window.open(
        updatedWebmailUrl,
        '_blank',
        'noopener,noreferrer'
      );
      if (newWindow) {
        newWindow.focus();
        // toast.success('Opening your email inbox...');
      } else {
        // toast.error('Popup blocked. Please allow popups for this website.');
        console.error('Popup blocked. Please allow popups for this website.');
      }
    } else {
      // Fallback Strategy: Open a Google search for the domain's mail service
      const searchQuery = encodeURIComponent(`mail ${domain}`);
      const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
      const newWindow = window.open(searchUrl, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        newWindow.focus();
      } else {
        console.error('Popup blocked. Please allow popups for this website.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="text-2xl font-bold">Magic Link Sent ✨</h2>
        <p>
          Check your inbox for <strong>{email}</strong> and click the link to
          sign in!
        </p>
        <Button onClick={openEmailInbox} className="mt-4">
          Open Email Inbox
        </Button>
      </div>
    </div>
  );
}
