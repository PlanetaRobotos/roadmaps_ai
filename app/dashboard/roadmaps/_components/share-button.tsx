import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

function ShareButton({
  shareTitle,
  shareText,
  shareUrl
}: {
  shareTitle: string;
  shareText: string;
  shareUrl: string;
}) {
  const handleShare = () => {
    if (navigator.share) {
      // Native Web Share API (mobile/compatible browsers)
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      });
    } else {
      // Fallback: open a custom modal or social share links
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${shareText} ${shareUrl}`
        )}`,
        '_blank'
      );
    }
  };

  return (
    <Button variant="ghost" onClick={handleShare}>
      <Icons.share className="h-5 w-5 text-gray-500" />
      <span>Share</span>
    </Button>
  );
}

export default ShareButton;
