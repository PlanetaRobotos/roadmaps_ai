'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getRoadmapById } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { ClientRoadmap } from '@/types/roadmap-types';
import { usePostStore } from '@/store/postStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import axios from '@/lib/axios';
import { AuthContext } from '@/context/auth-context';
import ShareButton from '@/app/dashboard/roadmaps/_components/share-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';
import AuthCallback from '@/app/(auth)/_components/callback';
import { Metadata } from 'next';
import { CLIENT_URL } from '@/config/apiConfig';
import Loading from '@/app/dashboard/_components/loading';

interface RoadmapViewPageProps {
  roadmapId: string;
}

export default function RoadmapViewPage({ roadmapId }: RoadmapViewPageProps) {
  const { user } = useContext(AuthContext);

  const {
    isLiked,
    likeCount,
    isSaved,
    initializePost,
    toggleLike,
    toggleSave
  } = usePostStore();
  const pathname = usePathname();
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control Dialog visibility

  const router = useRouter(); // Initialize router for navigation

  const signin = () => {
    console.log('Redirecting to signin page', pathname);
    router.push(`/signin?redirect=${pathname}`);
  };

  // Handler for Like button
  const handleLike = async () => {
    if (!user) {
      setIsDialogOpen(true); // Open Dialog if not authenticated
      return;
    }
    await toggleLike(roadmapId, user.id!);
  };

  // Handler for Save button
  const handleSave = async () => {
    if (!user) {
      setIsDialogOpen(true); // Open Dialog if not authenticated
      return;
    }
    await toggleSave(roadmapId, user.id!);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let isLiked, isSaved;

        const roadmapResp = await getRoadmapById(roadmapId);

        console.log('course', roadmapResp);
        const cards = transformRoadmapToItems(roadmapResp);

        if (user) {
          const userLikeResp = await axios.get(
            `v1/roadmaps/${roadmapId}/userlikes/${user?.id}`
          );
          isLiked = userLikeResp?.data;

          const userSaveResp = await axios.get(
            `/v1/users/${user?.id}/roadmaps/${roadmapId}`
          );
          isSaved = userSaveResp?.data;
          console.log('User saved:', isSaved);
        }

        initializePost(isLiked, roadmapResp.likes!, isSaved);
        setRoadmap(cards);
      } catch (error) {
        console.error('Failed to fetch lesson or additional data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadmapId, user, initializePost]);

  if (loading) return <Loading />;
  if (!roadmap) return <div>Course not found. {roadmapId}</div>;

  return (
    <>
      <AuthCallback />

      {/* Main Roadmap Card */}
      <Card className="mx-auto flex h-[85vh] max-h-[800px] w-full max-w-2xl flex-col">
        <CardHeader className="relative w-full flex-1">
          <RoadmapView
            roadmapItems={roadmap}
            onAuthorizeClick={() => setIsDialogOpen(true)}
          />
        </CardHeader>
        <CardContent className="bottom-0 flex w-full flex-col space-y-4 px-4 py-4">
          <CardTitle className="text-lg font-semibold">
            {roadmap?.description}
          </CardTitle>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            {/* Like Button */}
            <Button
              onClick={handleLike}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Icons.like
                className={`h-5 w-5 ${
                  isLiked
                    ? 'fill-red-500 stroke-0'
                    : 'fill-none stroke-gray-500 stroke-2'
                }`}
              />
              <span>{likeCount}</span>
            </Button>

            {/* Share Button */}
            <div className="flex items-center space-x-2">
              <ShareButton
                shareTitle={`Check out a course for ${roadmap?.title}!`}
                shareText={`A course to learn ${roadmap?.title} in ${roadmap?.duration} using CourseAI!`}
                shareUrl={
                  typeof window !== 'undefined' ? window.location.href : ''
                }
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              variant="ghost"
              className="flex items-center"
            >
              <Icons.save
                className={`h-5 w-5 ${
                  isSaved
                    ? 'fill-blue-500 stroke-0'
                    : 'fill-none stroke-gray-500 stroke-2'
                }`}
              />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Banner for Unauthenticated Users */}
      {!user && (
        <div className="fixed bottom-0 left-0 flex w-full justify-center space-x-4 bg-secondary p-4 shadow-md">
          {/* Login Button triggers Dialog */}
          <Button onClick={() => signin()}>Login</Button>
          {/* Sign Up Button triggers Dialog */}
          <Button onClick={() => signin()}>Sign Up</Button>
        </div>
      )}

      {/* Dialog Popup for Authentication */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              Please log in or sign up to perform this action.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-2">
            {/* Login Button navigates to Login Page */}
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                signin();
              }}
            >
              Login
            </Button>
            {/* Sign Up Button navigates to Sign Up Page */}
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                signin();
              }}
            >
              Sign Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
