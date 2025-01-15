import React from 'react';
import Link from 'next/link';

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="mb-2 min-h-[120px] w-full bg-neutral-100 px-4 py-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-neutral-400">
            Copyright © {currentYear} CourseAI. All rights reserved.
          </div>

          <div className="flex flex-col gap-4 text-sm text-neutral-400 md:flex-row md:gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-neutral-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-neutral-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/support"
              className="transition-colors hover:text-neutral-200"
            >
              Support
            </Link>
            <Link
              href="/feedback"
              className="transition-colors hover:text-neutral-200"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardFooter;
