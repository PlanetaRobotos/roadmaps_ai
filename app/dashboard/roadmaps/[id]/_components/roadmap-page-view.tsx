'use client';

import React, { useEffect, useState } from 'react';
import { getRoadmapById, getUserQuizzes } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { ClientRoadmap } from '@/types/roadmap-types';
import { usePostStore } from '@/store/postStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';

interface RoadmapViewPageProps {
  roadmapId: string;
  userId?: number;
}

export default function RoadmapViewPage({
  roadmapId,
  userId
}: RoadmapViewPageProps) {
  const { toast } = useToast();

  const { isLiked, likeCount, isSaved, toggleLike, toggleSave } =
    usePostStore();
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);

  const handleLike = () => {
    toggleLike();
    toast({
      title: isLiked ? 'Removed Like' : 'Liked',
      description: isLiked ? 'You unliked this post.' : 'You liked this post.'
    });
  };

  const handleSave = () => {
    toggleSave();
    toast({
      title: isSaved ? 'Removed from Saved' : 'Saved',
      description: isSaved
        ? 'You removed this post from saved items.'
        : 'You saved this post.'
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: 'Check out this post!',
      text: 'A cat silhouette sitting on the moon.'
    });
    toast({ title: 'Shared', description: 'Post has been shared!' });
  };

  const handleFullscreen = () => {
    toast({
      title: 'Open Fullscreen',
      description: 'Opening fullscreen mode.'
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getRoadmapById(roadmapId);
  //       const cards = transformRoadmapToItems(data);
  //
  //       console.log('userId:', userId);
  //       if (userId) {
  //         const userQuizzes = await getUserQuizzes(userId);
  //         console.log('User quizzes:', userQuizzes);
  //
  //       }
  //
  //       setRoadmap(cards);
  //     } catch (error) {
  //       console.error('Failed to fetch lesson or additional data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchData();
  // }, [roadmapId, userId]);

  // if (loading) return <div>Loading...</div>;
  // if (!roadmap) return <div>Course not found. {roadmapId}</div>;

  return (
    <div className="mx-auto flex items-center justify-center">
      {/* Card Layout for Laptop */}
      <Card className="h-auto w-full max-w-lg md:h-[600px] md:max-w-xl">
        <CardHeader className="relative">
          <img
            src="/path/to/image.jpg"
            alt="A cat silhouette sitting on the moon"
            className="h-[400px] w-full rounded-lg object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 px-4 py-4">
          <CardTitle className="text-lg font-semibold">
            A cat silhouette sitting on the moon.
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
                  isLiked ? 'text-red-500' : 'text-gray-500'
                }`}
              />
              <span>{likeCount}</span>
            </Button>

            {/* Share Button */}
            <Button
              onClick={handleShare}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Icons.share className="h-5 w-5 text-gray-500" />
              <span>Share</span>
            </Button>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Icons.save
                className={`h-5 w-5 ${
                  isSaved ? 'text-blue-500' : 'text-gray-500'
                }`}
              />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>

            {/* Fullscreen Button */}
            <Button
              onClick={handleFullscreen}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Icons.maximize className="h-5 w-5 text-gray-500" />
              <span>Fullscreen</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
