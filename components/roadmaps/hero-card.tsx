import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { HeroCard } from '@/types/roadmap-types';

interface HeroCardProps {
  hero: HeroCard;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero }) => {
  return (
    <Card className="animate-fadeIn flex h-full w-full flex-col items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <CardHeader className="">
        <CardTitle className="text-center text-4xl font-extrabold">
          {hero.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg leading-relaxed opacity-90">
        {hero.contentTop && <p>{hero.contentTop}</p>}
        {hero.contentBottom && <p className="mt-2">{hero.contentBottom}</p>}
      </CardContent>
    </Card>
  );
};

export default HeroCard;
