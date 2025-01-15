import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const TimerDial = ({ duration }: { duration: number }) => {
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1.5 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
    >
      <Clock className="h-3 w-3" />
      {duration}m
    </Badge>
  );
};

export default TimerDial;
