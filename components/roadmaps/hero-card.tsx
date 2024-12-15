import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { HeroCard } from '@/types/roadmap-types';

interface HeroCardProps {
  hero: HeroCard;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero }) => {
  return (
    <Card className="h-full w-full max-w-md rounded-lg text-white shadow-lg">
      <CardHeader className="p-6">
        {hero.contentTop && (
          <p className="mb-4 text-center">{hero.contentTop}</p>
        )}
        <CardTitle className="text-center text-2xl">{hero.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {hero.contentBottom && (
          <p className="text-center">{hero.contentBottom}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default HeroCard;
