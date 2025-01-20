import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Pencil, Share2 } from 'lucide-react';

export const InstructionsSection = () => {
  const steps = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'Enter Your Idea',
      description: 'Input your course topic and choose the perfect time format'
    },
    {
      icon: <Pencil className="h-8 w-8 text-primary" />,
      title: 'Review & Customize',
      description:
        'Perfect your auto-generated content with our intuitive editor'
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: 'Share & Grow',
      description: 'Publish to the community or keep it in your private library'
    }
  ];

  return (
    <section className="container bg-background py-16">
      <div className="mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Create Your Course in Minutes
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Transform your expertise into engaging micro-courses with three
            simple steps
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
