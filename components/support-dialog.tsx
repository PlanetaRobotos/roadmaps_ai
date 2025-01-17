'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useContactDialog } from '@/hooks/useContactDialog';

const SupportDialog = () => {
  const { isOpen, close, email } = useContactDialog();

  const handleMailto = () => {
    console.log('Email:', email);
    window.location.href = `mailto:${email}`;
  };

  const handleCopy = () => {
    try {
      navigator.clipboard
        .writeText(email)
        .then(() => toast.success('Email copied!'));
    } catch (err) {
      toast.error('Could not copy email. Please try manually copying it.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <p className="text-sm text-muted-foreground">
            Choose how you&apos;d like to contact us:
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={handleMailto} variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Open in Email Client
            </Button>
            <Button onClick={handleCopy} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" />
              Copy Email Address
            </Button>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;
