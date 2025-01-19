import React from 'react';
import { BsTwitterX, BsTrello, BsDiscord } from 'react-icons/bs';
import { SiGoogleforms } from 'react-icons/si';
import {
  DEFAULT_DISCORD_PATH,
  DEFAULT_TWITTER_PATH,
  FEATURE_FORM_PATH,
  TRELLO_PATH
} from '@/constants/data';

const FeaturedSection = () => {
  const features = [
    {
      name: 'X',
      icon: <BsTwitterX className="h-5 w-5" />,
      href: DEFAULT_TWITTER_PATH
    },
    {
      name: 'Discord',
      icon: <BsDiscord className="h-5 w-5" />,
      href: DEFAULT_DISCORD_PATH
    },
    {
      name: 'Project Roadmap',
      icon: <BsTrello className="h-5 w-5" />,
      href: TRELLO_PATH
    },
    {
      name: 'Feature Request',
      icon: <SiGoogleforms className="h-5 w-5" />,
      href: FEATURE_FORM_PATH
    }
  ];

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <span className="text-sm font-medium text-muted-foreground">
          Featured on
        </span>
        <div className="flex items-center gap-4 md:gap-8">
          {features.map((feature) => (
            <a
              key={feature.name}
              href={feature.href}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {feature.icon}
              <span className="hidden text-sm font-medium md:inline">
                {feature.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
