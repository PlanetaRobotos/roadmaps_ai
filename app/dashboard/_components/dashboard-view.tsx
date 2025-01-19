'use client';

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Library,
  Mail,
  MessageCircle,
  PlayCircle,
  PlusCircle,
  Users
} from 'lucide-react';
import CourseCarousel from '@/components/carousels/course-carousel';
import { WelcomePageModel } from '@/app/api/client';
import { debounce } from 'lodash';
import axios from '@/lib/axios';
import { ExploreViewSkeleton } from '@/app/dashboard/roadmaps/explore/_components/sceleton';
import { DISCORD_PATH, EMAIL_PATH, TUTORIAL_PATH } from '@/constants/data';
import DashboardFooter from '@/app/dashboard/_components/dashboard-footer';

export default function DashboardView() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [welcomeData, setWelcomeData] = useState<WelcomePageModel>();

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      try {
        const response = await axios.get<WelcomePageModel>('v1/welcome/page');
        setWelcomeData(response.data);
      } catch (error) {
        console.error('Error fetching explore data:', error);
      }
    }, 300);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, []);

  if (!welcomeData) {
    return <ExploreViewSkeleton />;
  }

  return (
    <>
      <div className="py-8">
        <div className="container w-full max-w-4xl">
          {/* Welcome Banner */}
          <div className="mb-8 rounded-lg bg-white p-8 shadow">
            <h1 className="mb-4 text-3xl font-bold">
              Welcome to Levenue, {user?.name}! 🚀
            </h1>
            {/* Welcome message and checklist */}
            <p className="text-muted-foreground">
              You&apos;re all set to start creating engaging courses.
              Here&apos;s what you can do:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Create your first course in seconds
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Explore community courses for inspiration
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Share your knowledge with our growing community
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              className="h-32 text-lg font-medium"
              onClick={() => router.push('/dashboard/roadmaps/create')}
            >
              <div className="flex flex-col items-center gap-2">
                <PlusCircle className="h-6 w-6" />
                Create New Course
              </div>
            </Button>

            <Button
              variant="secondary"
              className="h-32 text-lg font-medium"
              onClick={() => router.push('/dashboard/roadmaps/explore')}
            >
              <div className="flex flex-col items-center gap-2">
                <Users className="h-6 w-6" />
                Explore Community Courses
              </div>
            </Button>
          </div>

          {/* Quick Start Guide */}
          <div className="mb-4 rounded-lg bg-white p-4 shadow sm:mb-8 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              How Levenue Works
            </h3>
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Users className="mt-1 h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
                  <div>
                    <h4 className="mb-1 text-sm font-medium sm:text-base">
                      Explore Community Courses
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Discover courses created by our community. Save
                      interesting courses to your library or get inspired for
                      your own content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <Library className="mt-1 h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
                  <div>
                    <h4 className="mb-1 text-sm font-medium sm:text-base">
                      Your Library
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Access all your created courses and saved community
                      content in one place. Organize and manage your learning
                      journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Courses */}
              <section>
                <div className="min-w-0 rounded-lg border p-3 sm:p-4">
                  <div className="overflow-hidden">
                    <CourseCarousel
                      roadmaps={welcomeData.welcomeCourses}
                      title="Get inspired"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Example and Stats */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow">
              <h3 className="mb-4 text-lg font-semibold">Getting Started</h3>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Create a Course</h4>
                  <p className="text-sm text-muted-foreground">
                    Write your topic, select duration (15-60 mins), and let our
                    AI help you create an engaging course in minutes.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Save & Share</h4>
                  <p className="text-sm text-muted-foreground">
                    Your courses are automatically saved to your library. Share
                    them with the community or keep them private.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow">
              <h3 className="mb-4 text-lg font-semibold">
                Community Highlights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1 min</div>
                  <div className="text-sm text-muted-foreground">
                    Average Creation Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">
                    Community Courses
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3000+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Learners
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Resources */}
          <div className="mb-8 mt-8 rounded-lg bg-white p-8 shadow">
            <h3 className="mb-4 text-lg font-semibold">Need Help?</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Button
                onClick={() => window.open(TUTORIAL_PATH)}
                variant="outline"
                className="h-auto p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <PlayCircle className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Watch Tutorial</span>
                  <span className="text-xs text-muted-foreground">
                    2 min video
                  </span>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(DISCORD_PATH)}
                className="h-auto p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Join Discord</span>
                  <span className="text-xs text-muted-foreground">
                    Get community help
                  </span>
                </div>
              </Button>
              <Button
                onClick={() => window.open(EMAIL_PATH)}
                variant="outline"
                className="h-auto p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Contact Support</span>
                  <span className="text-xs text-muted-foreground">
                    I&apos;ll help you
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </>
  );
}
