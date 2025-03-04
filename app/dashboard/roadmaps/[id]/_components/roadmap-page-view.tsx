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
import Loading from '@/app/dashboard/_components/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserModel } from '@/app/api/client';
import { useRouter } from 'next/navigation';

interface RoadmapViewPageProps {
  roadmapId: string;
}

export default function RoadmapViewPage({ roadmapId }: RoadmapViewPageProps) {
  const { user, openAuthDialog } = useContext(AuthContext);
  const router = useRouter();

  const {
    isLiked,
    likeCount,
    isSaved,
    initializePost,
    toggleLike,
    toggleSave
  } = usePostStore();
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [author, setAuthor] = useState<UserModel>();
  const [loading, setLoading] = useState(true);

  const handleLike = async () => {
    if (!user) {
      openAuthDialog();
      return;
    }
    await toggleLike(roadmapId, user.id!);
  };

  const handleSave = async () => {
    if (!user) {
      openAuthDialog();
      return;
    }
    await toggleSave(roadmapId, user.id!);
  };

  const editCourse = () => {
    router.push(`/dashboard/roadmaps/edit/${roadmap?.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let isLiked, isSaved;

        const roadmapResp = await getRoadmapById(roadmapId);

        console.log('course', roadmapResp.modules?.[0]?.lessons?.[0]);
        const cards = transformRoadmapToItems(roadmapResp);
        console.log('cards', cards);
        setRoadmap(cards);

        if (roadmapResp.authorId !== undefined && roadmapResp.authorId > 0) {
          const authorResp = await axios.get(
            `/v1/users/${roadmapResp.authorId}`
          );
          console.log('author', authorResp);
          setAuthor(authorResp?.data);
        }

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
      {/* Main Roadmap Card */}
      <Card className="mx-auto flex h-full max-h-[800px] w-full max-w-2xl flex-col">
        <CardHeader className="relative w-full flex-1">
          <RoadmapView
            roadmapItems={roadmap}
            isEditable={false}
            onAuthorizeClick={() => openAuthDialog()}
          />
          {
            <Button
              variant="secondary"
              className="mx-auto w-48"
              onClick={editCourse}
            >
              Edit Course
            </Button>
          }
        </CardHeader>
        <CardContent className="bottom-0 flex w-full flex-col space-y-1 px-4 py-4">
          <div className="flex items-center gap-2 px-1 text-left text-sm">
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarFallback className="rounded-lg">
                {author?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {author?.name || ''}
              </span>
            </div>
          </div>
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
    </>
  );
}
