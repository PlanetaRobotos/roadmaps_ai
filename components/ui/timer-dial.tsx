import React from 'react';

interface TimerDialProps {
  duration: number; // Duration in minutes
}

export default function TimerDial({ duration }: TimerDialProps) {
  // Map durations to text
  const durationToText = (minutes: number) => {
    if (minutes <= 15) return '15m';
    if (minutes <= 30) return '30m';
    return '1h';
  };

  const label = durationToText(duration);

  return (
    <div
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-primary shadow-md"
      style={{
        fontSize: '0.75rem', // Adjust text size
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Soft shadow
      }}
    >
      {/* Label inside the circle */}
      <span className="text-xs font-medium text-card-foreground">{label}</span>
    </div>
  );
}
