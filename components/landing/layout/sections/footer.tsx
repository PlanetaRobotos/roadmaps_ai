import { Separator } from '@/components/ui/separator';
import { ChevronsDownIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DEFAULT_EMAIL_PATH,
  DEFAULT_INSTAGRAM_PATH,
  DEFAULT_TELEGRAM_PATH,
  DEFAULT_TWITTER_PATH
} from '@/constants/data';
import { CLIENT_URL } from '@/config/apiConfig';

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="rounded-2xl border border-secondary bg-card p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex items-center font-bold">
              <Image
                className="mr-2 h-9 w-9 rounded-lg border border-secondary"
                src="/images/logo.png"
                alt="Logo"
                width={28}
                height={28}
              />

              <h3 className="text-2xl">Levenue MiniCourses</h3>
            </Link>
            <span className="mt-3 text-muted-foreground">
              Share your expertise in minutes <br /> Create, Learn, and Inspire!
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Links</h3>
            <div>
              <Link
                href={DEFAULT_EMAIL_PATH}
                className="opacity-60 hover:opacity-100"
              >
                Support
              </Link>
            </div>

            <div>
              <Link
                href={DEFAULT_EMAIL_PATH}
                className="opacity-60 hover:opacity-100"
              >
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link
                href={DEFAULT_EMAIL_PATH}
                className="opacity-60 hover:opacity-100"
              >
                Feedback
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Socials</h3>
            <div>
              <Link
                href={DEFAULT_TWITTER_PATH}
                className="opacity-60 hover:opacity-100"
              >
                Twitter
              </Link>
            </div>

            <div>
              <Link
                href={DEFAULT_TELEGRAM_PATH}
                className="opacity-60 hover:opacity-100"
              >
                Telegram
              </Link>
            </div>

            <div>
              <Link
                href={DEFAULT_INSTAGRAM_PATH}
                className="opacity-60 hover:opacity-100"
              >
                Instagram
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Legal</h3>
            <div>
              <Link href="/tos" className="opacity-60 hover:opacity-100">
                Terms of Services
              </Link>
            </div>

            <div>
              <Link
                href="/privacy-policy"
                className="opacity-60 hover:opacity-100"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; {new Date().getFullYear()} Levenue MiniCourses. All rights
            reserved.
          </h3>
        </section>
      </div>
    </footer>
  );
};
