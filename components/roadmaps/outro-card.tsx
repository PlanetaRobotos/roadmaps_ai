import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { OutroCard } from '@/types/roadmap-types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Reaction {
  emoji: string;
  label: string;
  value: string;
}

interface OutroCardProps {
  outro: OutroCard;
}

const OutroCard: React.FC<OutroCardProps> = ({ outro }) => {
  const reactions: Reaction[] = [
    { emoji: '😔', label: 'Not great', value: 'bad' },
    { emoji: '🙂', label: 'Good', value: 'okay' },
    { emoji: '😊', label: 'Excellent', value: 'good' }
  ];

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleReactionSelect = (value: string): void => {
    setSelectedReaction(value);
    // Additional handling here if needed
  };

  const router = useRouter();

  const handleCreate = () => {
    router.push('/dashboard/roadmaps/create');
  };

  const handleExplore = () => {
    router.push('/dashboard/roadmaps/explore');
  };

  return (
    <div className="h-full rounded-xl bg-[#151F6D] p-1">
      <Card className="relative flex h-full w-full flex-col overflow-hidden bg-[#151F6D] text-white">
        {/* Background SVG with gradient */}
        <svg
          viewBox="0 0 1200 760"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
        >
          <g clipPath="url(#feedbackClip)">
            <path
              d="M1089.47 950.817C1171.9 895.007 1229.69 809.566 1250.88 712.158C1272.08 614.749 1255.06 512.821 1203.35 427.445C1151.64 342.069 1069.19 279.772 973.046 253.433C876.901 227.095 774.413 238.728 686.767 285.927L-483 994.427L-80.2926 1659.32L1089.47 950.817Z"
              fill="url(#feedbackGradient)"
            />
          </g>
          <defs>
            <radialGradient
              id="feedbackGradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(504.908 -489.358) rotate(70.7667) scale(1341.92 1077.21)"
            >
              <stop stopColor="#3460FF" />
              <stop offset="0.954164" stopColor="#3460FF" stopOpacity="0" />
            </radialGradient>
            <clipPath id="feedbackClip">
              <rect width="1200" height="760" fill="white" />
            </clipPath>
          </defs>
        </svg>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-8">
          <h1 className="text-center text-5xl font-bold tracking-tight">
            You&apos;re all done!
          </h1>

          <p className="mt-8 text-center text-lg text-white/90">
            How was your course experience?
          </p>

          <div className="mt-6 flex gap-4">
            {reactions.map((reaction) => (
              <button
                key={reaction.value}
                onClick={() => handleReactionSelect(reaction.value)}
                className={`flex h-16 w-16 items-center justify-center rounded-xl text-2xl transition-all duration-200
        ${
          selectedReaction === reaction.value
            ? 'bg-[#3460FF] ring-2 ring-white/20'
            : 'bg-white/10 hover:bg-white/20'
        }`}
                aria-label={reaction.label}
                title={reaction.label}
              >
                {reaction.emoji}
              </button>
            ))}
          </div>

          <div className="mt-12 flex w-full max-w-[240px] flex-col gap-4 sm:max-w-[480px] sm:flex-row">
            <Button
              onClick={handleCreate}
              className="w-full text-base sm:flex-1"
            >
              Create your own course
            </Button>
            <Button
              onClick={handleExplore}
              variant={'secondary'}
              className="w-full text-base sm:flex-1"
            >
              Explore more courses
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OutroCard;
