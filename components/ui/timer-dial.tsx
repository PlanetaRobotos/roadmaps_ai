import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const getDurationText = (duration: number): string => {
  switch (duration) {
    case 15:
      return 'Express';
    case 30:
      return 'Voyage';
    case 60:
      return 'Excellence';
    default:
      return `${duration}m`;
  }
};

const TimerDial = ({ duration }: { duration: number }) => {
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1.5 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
    >
      <Clock className="h-3 w-3" />
      {getDurationText(duration)}
    </Badge>
  );
};

export default TimerDial;
