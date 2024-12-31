'use client';

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';
import Loading from '@/app/dashboard/_components/loading';
import AuthCallback from '@/app/(auth)/_components/callback';
import { DEFAULT_EMAIL_PATH } from '@/constants/data';

export default function TermsOfServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
        Terms and Conditions
      </h1>
      <p className="mb-4 text-center text-muted-foreground">
        Effective Date: <span className="font-semibold">November 28, 2025</span>
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">1. Overview</h2>
          <p>
            Levenue MicroCourses provides a platform for creating and exploring
            short, AI-generated courses. Upon purchase (or free enrollment),
            users receive access to:
          </p>
          <ul className="list-disc pl-6">
            <li>AI-powered course generation tools.</li>
            <li>A community library of shared courses (if applicable).</li>
            <li>
              A Telegram community for group learning, sharing, and support.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">2. Usage Rights</h2>
          <ul className="list-disc pl-6">
            <li>
              Users are granted personal, non-transferable, and non-exclusive
              access to the platform and course materials.
            </li>
            <li>
              Sharing or distributing course files or proprietary content
              outside the platform is strictly prohibited without explicit
              permission.
            </li>
            <li>
              Community access (e.g., Telegram) is provided on a best-effort
              basis. While we strive to offer helpful responses, one-on-one
              support is not guaranteed.
            </li>
            <li>
              Any modifications or derivative works you create based on
              AI-generated content should adhere to our content guidelines (if
              any).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            3. Payment & Refund Policy
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Certain features and benefits require a paid plan or one-time
              purchase. Pricing details and payment terms are outlined in our
              Pricing section.
            </li>
            <li>
              Refunds may be offered under specific conditions (e.g., if less
              than a certain portion of the product or service has been used).
              Please refer to your account dashboard or contact us at{' '}
              <a href={DEFAULT_EMAIL_PATH} className="text-primary underline">
                myrskyi.work@gmail.com
              </a>{' '}
              to request a refund.
            </li>
            <li>
              If you have questions regarding billing, contact{' '}
              <a href={DEFAULT_EMAIL_PATH} className="text-primary underline">
                myrskyi.work@gmail.com
              </a>{' '}
              for assistance.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">4. User Data</h2>
          <p>
            We collect your name, email, payment information, and any other
            details necessary to provide our services.
          </p>
          <p>
            Non-personal data (e.g., cookies) may also be collected. For
            details, please refer to our{' '}
            <a href="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            5. Content Ownership & Liability
          </h2>
          <ul className="list-disc pl-6">
            <li>
              While AI-generated content is powered by integrated technologies
              (like GPT), the final content is the responsibility of the user
              who generated it.
            </li>
            <li>
              Levenue MicroCourses is not liable for any inaccuracies or misuse
              of the AI-generated materials.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">6. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Czechia. Any disputes
            arising from these Terms shall be resolved in accordance with the
            local jurisdiction of Czechia.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">7. Modifications</h2>
          <p>
            We may update these Terms from time to time. Any updates will be
            communicated via email or posted on our website.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            8. Contact Information
          </h2>
          <p>
            If you have questions or concerns, please reach out to us at{' '}
            <a href={DEFAULT_EMAIL_PATH} className="text-primary underline">
              myrskyi.work@gmail.com
            </a>{' '}
            .
          </p>
        </section>
      </div>
    </div>
  );
}
