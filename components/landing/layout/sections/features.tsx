import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/landing/ui/icon';
import { icons } from 'lucide-react';

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: 'MousePointerClick',
    title: 'Instant Course Generation',
    description:
      'Generate short, visually appealing courses using GPT in just a few clicks.'
  },
  {
    icon: 'PictureInPicture',
    title: 'Modify & Personalize',
    description: 'Tweak generated content to add your personal touch.'
  },
  {
    icon: 'Goal',
    title: 'Share & Explore',
    description:
      'Publish your micro courses to the community library. Browse thousands of topics shared by others.'
  },
  {
    icon: 'Newspaper',
    title: 'Progress Tracking',
    description:
      'Save courses you love, mark completed lessons, and pick up where you left off.'
  },
  {
    icon: 'TabletSmartphone',
    title: 'Mobile Friendly',
    description:
      'Learn anywhere with a responsive interface that looks great on any device.'
  },
  {
    icon: 'BadgeCheck',
    title: 'Social Proof',
    description: 'Earn badges as you complete courses and share your knowledge.'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      {/*<h2 className="text-lg text-primary text-center mb-2 tracking-wider">*/}
      {/*  Features*/}
      {/*</h2>*/}

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        What Makes Us Different
      </h2>

      <h3 className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        Ready for a faster, smarter way to learn and teach?
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full border-0 bg-background shadow-none">
              <CardHeader className="flex items-center justify-center">
                <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center text-muted-foreground ">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
