'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getRoadmapById, getUserQuizzes } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { ClientRoadmap } from '@/types/roadmap-types';
import { usePostStore } from '@/store/postStore';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import axios from '@/lib/axios';
import { AuthContext } from '@/context/auth-context';
import ShareButton from '@/app/dashboard/roadmaps/_components/share-button';

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

  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);

  const handleLike = async () => {
    await toggleLike(roadmapId, user?.id!);
  };

  const handleSave = async () => {
    await toggleSave(roadmapId, user?.id!);
  };

  console.log('url', window.location.href);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let isLiked, isSaved;
        const roadmapResp = await getRoadmapById(roadmapId);
        const cards = transformRoadmapToItems(roadmapResp);

        const userQuizzes = await getUserQuizzes(user?.id!);
        console.log('User quizzes:', userQuizzes);

        const userLikeResp = await axios.get(
          `v1/roadmaps/${roadmapId}/userlikes/${user?.id!}`
        );
        isLiked = userLikeResp?.data;

        const userSaveResp = await axios.get(
          `/v1/users/${user?.id}/roadmaps/${roadmapId}`
        );
        isSaved = userSaveResp?.data;
        console.log('User saved:', isSaved);

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

  if (loading) return <div>Loading...</div>;
  if (!roadmap) return <div>Course not found. {roadmapId}</div>;

  return (
    // <div className="">
    <Card className="mx-auto flex h-full max-h-[900px] w-full max-w-2xl flex-col">
      <CardHeader className="relative w-full flex-1">
        <RoadmapView roadmapItems={roadmap} />

        {/*<Button*/}
        {/*  onClick={handleFullscreen}*/}
        {/*  variant="ghost"*/}
        {/*  className="absolute bottom-12 right-12 flex items-center space-x-2 rounded-full bg-white bg-opacity-80 p-2 shadow-md hover:bg-opacity-100"*/}
        {/*>*/}
        {/*  <Icons.maximize className="h-5 w-5" />*/}
        {/*</Button>*/}
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
              shareText={`A course to learn ${roadmap?.title} in ${roadmap?.duration} using MyMicroCourses!`}
              shareUrl={window.location.href}
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
  );
}
