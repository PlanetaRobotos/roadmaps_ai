'use client';

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';
import Loading from '@/app/dashboard/_components/loading';
import AuthCallback from '@/app/(auth)/_components/callback';
import { DEFAULT_EMAIL_PATH } from '@/constants/data';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mb-4 text-center text-muted-foreground">
        Effective Date: <span className="font-semibold">November 28, 2025</span>
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            1. Information We Collect
          </h2>
          <p>
            <strong>Personal Information:</strong> We collect your name, email
            address, payment details, and other information you provide when
            signing up or purchasing a plan.
          </p>
          <p>
            <strong>Non-Personal Information:</strong> We use cookies, analytics
            data, and similar technologies to improve user experience and site
            performance.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            2. Purpose of Data Collection
          </h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Account Setup & Service Delivery:</strong> We use your
              information to provide access to AI-powered course generation,
              community features, and any paid offerings.
            </li>
            <li>
              <strong>Communication:</strong> We may send emails regarding
              updates, new features, or promotional offers.
            </li>
            <li>
              <strong>Analytics & Improvements:</strong> Non-personal data helps
              us understand user behavior and improve our platform.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">3. Data Sharing</h2>
          <p>
            <strong>Third-Party Service Providers:</strong> We may share certain
            data with trusted providers for analytics, payment processing, and
            email communications. These providers must safeguard your data
            according to our agreements with them.
          </p>
          <p>
            <strong>Legal Compliance:</strong> We may disclose information if
            required by law or to protect our rights.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">4. Children’s Privacy</h2>
          <p>
            Our platform is not directed to children under the age of 13. We do
            not knowingly collect personal data from children. If you believe a
            child has provided personal information, please contact us at{' '}
            <a href={DEFAULT_EMAIL_PATH} className="text-primary underline">
              myrskyi.work@gmail.com
            </a>{' '}
            so we can remove it.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">5. Security Measures</h2>
          <p>
            We take reasonable steps to protect your data with security measures
            like encryption and secure payment gateways. However, no method of
            electronic transmission or storage is completely secure.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            6. Updates to this Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be communicated via email or posted on our website.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            7. Your Choices & Rights
          </h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Opt-Out:</strong> You can opt out of marketing emails
              anytime by clicking “unsubscribe” or contacting us.
            </li>
            <li>
              <strong>Data Access & Deletion:</strong> If you want to see or
              delete your personal information, email us at{' '}
              <a href={DEFAULT_EMAIL_PATH} className="text-primary underline">
                myrskyi.work@gmail.com
              </a>{' '}
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please reach out at{' '}
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
