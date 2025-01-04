'use client';

import React from 'react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // If you have a utility for merging classes, otherwise omit

interface TipButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export function TipButton({
  disabled = false,
  className,
  ...rest
}: TipButtonProps) {
  if (disabled) {
    return null;
  }

  return (
    <Button
      variant={'secondary'}
      className={cn(
        'absolute right-2 top-2 text-gray-400 hover:text-gray-600',
        className
      )}
      {...rest}
    >
      <Icons.edit size={16} />
    </Button>
  );
}
