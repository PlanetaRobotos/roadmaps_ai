'use client';

import React, { useState } from 'react';
import {
  Check,
  X,
  Gift,
  HelpCircle,
  Zap,
  Edit,
  Image,
  Users,
  BookOpen,
  ChevronDown,
  ChevronRight,
  LucideIcon
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface Feature {
  text: string;
  included: boolean;
  tooltip?: string;
  isKey?: boolean;
}

interface FeatureCategory {
  category: string;
  icon: LucideIcon;
  items: Feature[];
}

interface Plan {
  title: string;
  popular: boolean;
  price: number | string;
  description: string;
  features: FeatureCategory[];
  buttonText: string;
  oldPrice?: number;
}

interface PricingFeatureProps {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface FeatureDetailsProps {
  features: FeatureCategory[];
}

interface PricingCardProps {
  plan: Plan;
}

const plans = [
  {
    title: 'Starter',
    popular: false,
    price: 0,
    description: 'Perfect for trying out AI course creation',
    features: [
      {
        category: 'Course Generation',
        icon: Zap,
        items: [
          { text: '2 generations per month ⚡', included: true },
          { text: '15-min courses only ⏱️', included: true },
          {
            text: 'GPT-3.5 model 🤖',
            included: true,
            tooltip: 'Reliable AI model for basic course generation'
          }
        ]
      },
      {
        category: 'Course Access',
        icon: BookOpen,
        items: [
          {
            text: 'Full access to 15-min community courses 📚',
            included: true
          },
          {
            text: 'Preview first lesson of 30/60-min courses 👀',
            included: true
          }
        ]
      },
      {
        category: 'Storage & Editing',
        icon: Edit,
        items: [
          { text: 'Store 5 courses 💾', included: true },
          { text: 'Plain text editing ✏️', included: true },
          { text: '1000 symbol limit per lesson', included: true },
          { text: 'Single-choice quizzes 📝', included: true }
        ]
      },
      {
        category: 'Thumbnails',
        icon: Image,
        items: [
          { text: 'One generation (default style) 🎨', included: true },
          { text: 'Regeneration', included: false },
          { text: 'Custom upload', included: false }
        ]
      },
      {
        category: 'Community',
        icon: Users,
        items: [
          { text: 'Public Discord access 💬', included: true },
          { text: 'Basic community support 🤝', included: true }
        ]
      }
    ],
    buttonText: 'Start Free'
  },
  {
    title: 'Creator',
    popular: false,
    price: 15,
    oldPrice: 29,
    description: 'For dedicated course creators',
    features: [
      {
        category: 'Course Generation',
        icon: Zap,
        items: [
          { text: '10 generations per month ⚡', included: true },
          { text: '15 & 30-min courses ⏱️⏱️', included: true },
          {
            text: 'GPT-4 model 🤖⭐',
            included: true,
            tooltip: 'Advanced AI for higher quality content'
          }
        ]
      },
      {
        category: 'Course Access',
        icon: BookOpen,
        items: [
          { text: 'Full access to 15 & 30-min courses 📚', included: true },
          { text: 'Preview 60-min courses 👀', included: true }
        ]
      },
      {
        category: 'Storage & Editing',
        icon: Edit,
        items: [
          { text: 'Store 50 courses 💾', included: true },
          {
            text: 'Rich text formatting ✏️',
            included: true,
            tooltip: 'Including bold, italic, lists, code blocks'
          },
          { text: '3000 symbol limit per lesson', included: true },
          { text: 'Multiple choice & true/false quizzes 📝', included: true },
          { text: 'Add/delete/reorder cards', included: true },
          { text: 'AI suggestions & alternatives ✨', included: true }
        ]
      },
      {
        category: 'Thumbnails',
        icon: Image,
        items: [
          { text: 'Up to 3 regenerations 🎨', included: true },
          { text: 'Save previous versions 💾', included: true },
          { text: 'Custom upload option 📤', included: true }
        ]
      },
      {
        category: 'Analytics & Community',
        icon: Users,
        items: [
          { text: 'Basic analytics (views) 📊', included: true },
          { text: 'Private Discord channels 💬', included: true },
          { text: 'Weekly community events 🎉', included: true }
        ]
      }
    ],
    buttonText: 'Get Started'
  },
  {
    title: 'Studio',
    popular: true,
    price: 39,
    oldPrice: 49,
    description: 'For serious course creators and professionals',
    features: [
      {
        category: 'Course Generation',
        icon: Zap,
        items: [
          { text: '30 generations per month ⚡', included: true },
          { text: 'All course lengths ⏱️⏱️⏱️', included: true },
          {
            text: 'GPT-4 + Model Selection 🤖⭐⭐',
            included: true,
            tooltip: 'Choose between different AI models for optimal results'
          }
        ]
      },
      {
        category: 'Course Access & Storage',
        icon: BookOpen,
        items: [
          { text: 'Full access to ALL community courses 📚', included: true },
          { text: 'Unlimited storage 💾', included: true }
        ]
      },
      {
        category: 'Advanced Features',
        icon: Edit,
        items: [
          { text: 'All Creator tier editing features ✏️', included: true },
          { text: 'Remove platform branding 🎯', included: true },
          { text: 'Advanced analytics (views + shares) 📊', included: true }
        ]
      },
      {
        category: 'Thumbnails & Design',
        icon: Image,
        items: [
          { text: 'Unlimited regenerations 🎨', included: true },
          { text: 'All 7 style options 🎨', included: true },
          { text: 'Custom upload option 📤', included: true }
        ]
      },
      {
        category: 'Community & Support',
        icon: Users,
        items: [
          { text: 'All Creator tier features 💬', included: true },
          { text: 'Priority support 🎉', included: true }
        ]
      }
    ],
    buttonText: 'Get Started'
  },
  {
    title: 'Enterprise',
    popular: false,
    price: 'Custom',
    description: 'Custom solution for organizations',
    features: [
      {
        category: 'Advanced Generation',
        icon: Zap,
        items: [
          { text: 'Unlimited generations ⚡', included: true },
          { text: 'Custom course durations ⏱️', included: true },
          { text: 'Multiple AI model choices 🤖⭐⭐⭐', included: true }
        ]
      },
      {
        category: 'Team Features',
        icon: Users,
        items: [
          { text: 'Team management & roles 👥', included: true },
          { text: 'Custom domain & white-labeling 🔒', included: true },
          { text: 'SSO integration 🔑', included: true },
          { text: 'API access 🔧', included: true }
        ]
      },
      {
        category: 'Enterprise Support',
        icon: Users,
        items: [
          { text: 'Private support channel 💬', included: true },
          { text: 'Custom team onboarding 🎓', included: true },
          { text: 'SLA guarantees ✅', included: true }
        ]
      }
    ],
    buttonText: 'Contact Us'
  }
];

const FeatureDetails: React.FC<FeatureDetailsProps> = ({ features }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    features.map((category) => category.category)
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-4">
      {features.map((category, idx) => (
        <div key={idx} className="border-b border-gray-200 last:border-0">
          <button
            onClick={() => toggleCategory(category.category)}
            className="flex w-full items-center justify-between py-2 text-left"
          >
            <div className="flex items-center gap-2">
              <category.icon className="h-5 w-5 text-primary" />
              <h4 className="font-medium">{category.category}</h4>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                expandedCategories.includes(category.category)
                  ? 'rotate-180'
                  : ''
              }`}
            />
          </button>

          {expandedCategories.includes(category.category) && (
            <div className="mt-2 space-y-3 pb-4 pl-7">
              {category.items.map((feature, featureIdx) => (
                <PricingFeature key={featureIdx} {...feature} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const PricingFeature: React.FC<PricingFeatureProps> = ({
  text,
  included,
  tooltip
}) => (
  <TooltipProvider>
    <div className="flex items-center space-x-2">
      {included ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      )}
      <span
        className={
          included ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'
        }
      >
        {text}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger className="ml-1">
              <HelpCircle className="inline h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        )}
      </span>
    </div>
  </TooltipProvider>
);

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  // Get key features (first 4-5 most important features)
  const keyFeatures = plan.features.flatMap(
    (category) =>
      category.items
        .filter((_, idx) => idx === 0) // Take only first item from each category
        .slice(0, 4) // Limit to 4 features total
  );

  return (
    <Card
      className={`flex flex-col ${
        plan.popular ? 'scale-105 border-primary shadow-lg' : ''
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.title}</CardTitle>
          {plan.popular && <Badge variant="default">Most Popular</Badge>}
        </div>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4 flex items-baseline space-x-2">
          {typeof plan.price === 'number' ? (
            <>
              <span className="text-3xl font-bold">${plan.price}</span>
              {plan.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${plan.oldPrice}
                </span>
              )}
              <span className="text-sm text-muted-foreground">/month</span>
            </>
          ) : (
            <span className="text-3xl font-bold">{plan.price}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          {keyFeatures.map((feature, idx) => (
            <PricingFeature key={idx} {...feature} />
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="mt-4 w-full">
              <ChevronRight className="mr-2 h-4 w-4" />
              See all features
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{plan.title} Plan Features</DialogTitle>
            </DialogHeader>
            <FeatureDetails features={plan.features} />
          </DialogContent>
        </Dialog>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button
          variant={plan.popular ? 'default' : 'secondary'}
          className="w-full"
        >
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <section className="container space-y-8 py-12">
      <div className="space-y-4 text-center">
        <h2 className="text-lg tracking-wider text-primary">Pricing</h2>
        <h3 className="text-3xl font-bold md:text-4xl">
          Transform ideas into courses
        </h3>
        <div className="flex items-center justify-center space-x-2">
          <Gift className="h-6 w-6 animate-pulse text-primary" />
          <span className="bg-gradient-to-r from-primary to-[#D247BF] bg-clip-text text-transparent">
            Special launch pricing available
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard key={plan.title} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
