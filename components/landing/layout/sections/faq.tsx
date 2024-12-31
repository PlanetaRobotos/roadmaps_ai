import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HighlightedComment } from '@/lib/utils';
import { DEFAULT_EMAIL_PATH, DEFAULT_TWITTER_PATH } from '@/constants/data';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'What do I get exactly?',
    answer:
      'You’ll receive <color>lifetime access</color> to Levenue MiniCourses, including all current features for creating, exploring, and sharing short, visually appealing courses. <br/><br/>You’ll also gain entry to our <color>Telegram community</color>, where you can ask questions, swap ideas, and share your courses with other enthusiasts <br/><br/>All without any ongoing subscription fees.',
    value: 'item-1'
  },
  {
    question: 'Do I need any coding or design skills to create a course?',
    answer:
      'Nope! Our platform handles the technical stuff, so you can focus on your content. <br/><br/>Just enter your prompt, and GPT will cook a polished, mobile-friendly course for you.',
    value: 'item-2'
  },
  {
    question: 'Can I share my courses outside the platform?',
    answer:
      'Absolutely. Once created, you can share your course link on social media, via email, or however you like. Sharing knowledge is at the heart of our community!',
    value: 'item-3'
  },
  {
    question: 'How does AI-generated course creation work?',
    answer:
      'Our GPT integration takes your prompt, then automatically structures lessons and quizzes into a neat, mobile-friendly format.',
    value: 'item-4'
  },
  {
    question: 'What’s the difference between Free and Paid plans?',
    answer:
      'Free users can create a limited number of courses and see GPT-generated content. <br/><br/>Paid users can modify content, generate unlimited courses, and access premium GPT models.',
    value: 'item-5'
  },
  {
    question: 'Is there a subscription?',
    answer:
      'For now, it’s a one-time purchase with lifetime access to current features. This may change in the future, so lock in now!',
    value: 'item-6'
  },
  {
    question: 'Will new features be included in my lifetime access?',
    answer:
      'Yes. Any major updates or improvements we make will be added to your account automatically. If we ever introduce entirely new premium features, we’ll let you know how you can upgrade.',
    value: 'item-7'
  },
  {
    question: 'Are there discounts for students or educators?',
    answer:
      'We occasionally run promotions—join our mailing list or keep an eye on our website for special offers.',
    value: 'item-8'
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32 md:w-[700px]">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          FAQS
        </h2>

        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <Accordion type="single" collapsible className="AccordionRoot">
          {FAQList.map(({ question, answer, value }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>

              <AccordionContent>
                <HighlightedComment comment={answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
        <div className="text-center md:text-left">
          <span className="text-muted-foreground">
            Have another question? Contact me on{' '}
            <Link
              href={DEFAULT_TWITTER_PATH}
              className="text-primary underline"
            >
              Twitter
            </Link>{' '}
            or by{' '}
            <Link
              href={DEFAULT_EMAIL_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              email
            </Link>
            .
          </span>
        </div>
      </div>
    </section>
  );
};
