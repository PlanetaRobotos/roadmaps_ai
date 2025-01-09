'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { WayForPayFormData } from '@/types/wayforpay';
import { submitWayForPayForm } from '@/utils/payment';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { ORDER_REF_STORAGE_TITLE } from '@/constants/data';

enum PopularPlan {
  NO = 0,
  YES = 1
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  oldPrice?: number;
}

const plans: PlanProps[] = [
  {
    title: 'Free',
    popular: 0,
    price: 0,
    description:
      'Experiment with basic course creation and explore the community library.',
    buttonText: 'Start for Free',
    benefitList: ['Limited generations', 'Explore courses', 'Basic GPT model']
  },
  {
    title: 'Standard',
    popular: 1,
    price: 45,
    description:
      'Upgrade to a robust toolkit with everything you need to share and grow your expertise.',
    buttonText: 'Get Started',
    benefitList: [
      'Unlimited generations',
      'Modify your course',
      'Access verified courses',
      'Priority support',
      'Community access'
    ],
    oldPrice: 55
  },
  {
    title: 'Premium',
    popular: 0,
    price: 99,
    description:
      'Experience peak performance and personalization—ideal for serious course builders.',
    buttonText: 'Contact US',
    benefitList: [
      'Unlimited generations',
      'Exclusive templates',
      'Advanced editing features',
      'Powerful GPT models',
      'Dedicated support',
      'Private community'
    ]
  }
];

export const PricingSection = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleSelectPlan = (plan: string) => async () => {
    console.log(`Selected plan: ${plan}`);

    if (plan === 'free') {
      router.push('/signin');
    }

    if (plan === 'standard') {
      try {
        console.log('Creating payment: ', user?.email ?? null);
        const response = await axios.post<WayForPayFormData>(
          '/v1/purchase/create',
          {
            planType: 'standard',
            email: user?.email ?? null
          }
        );

        localStorage.setItem(
          ORDER_REF_STORAGE_TITLE,
          response.data.orderReference
        );

        submitWayForPayForm(response.data);
      } catch (error) {
        console.error('Failed to create payment:', error);
        // Handle error (show toast, error message, etc.)
      }
    }

    if (plan === 'premium') {
      const subject = encodeURIComponent('Premium Plan Inquiry');
      const body = encodeURIComponent(
        'Hello,\n\nI am interested in the Premium plan. Please provide more details.\n\nThank you.'
      );
      window.open(
        `mailto:myrskyi.work@gmail.com?subject=${subject}&body=${body}`
      );
    }
  };

  return (
    <section id="pricing" className="container">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
        Pricing
      </h2>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Transform ideas into courses, <br /> select a plan
      </h2>

      <h3 className="mx-auto pb-14 text-center text-xl text-muted-foreground md:w-1/2">
        <Icons.gift className="mb-1 inline-block h-7 w-7 animate-pulse text-primary" />
        <span className="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-2 text-transparent">
          $10 off
        </span>
        for the first 1000 customers (14 left)
      </h3>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {plans.map(
          ({
            title,
            popular,
            price,
            description,
            buttonText,
            benefitList,
            oldPrice
          }) => (
            <Card
              key={title}
              className={`flex flex-col ${
                popular === PopularPlan?.YES
                  ? 'border-[1.5px] border-primary shadow-black/10 drop-shadow-xl lg:scale-[1.1] dark:shadow-white/10'
                  : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div className="flex items-baseline gap-2">
                  {oldPrice ? (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        ${oldPrice}
                      </span>
                      <span className="text-4xl font-bold">${price}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">${price}</span>
                  )}
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="mr-2 text-primary" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="mb-5 mt-auto">
                <Button
                  onClick={handleSelectPlan(title.toLowerCase())}
                  variant={
                    popular === PopularPlan?.YES ? 'default' : 'secondary'
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
