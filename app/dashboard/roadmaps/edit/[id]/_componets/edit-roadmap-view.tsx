'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ClientRoadmap } from '@/types/roadmap-types';
import { getRoadmapById, getUserQuizzes } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';
import RoadmapView from '@/components/roadmaps/roadmap-view';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import ShareButton from '@/app/dashboard/roadmaps/_components/share-button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { AuthContext } from '@/context/auth-context';
import { usePathname } from 'next/navigation';
import { CLIENT_URL } from '@/config/apiConfig';

interface EditRoadmapViewProps {
  roadmapId: string;
}

export default function EditRoadmapView({ roadmapId }: EditRoadmapViewProps) {
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control Dialog visibility
  const pathname = usePathname();

  const shareText = `Check out my new roadmap for ${roadmap?.title}! Url: ${CLIENT_URL}${pathname}`;

  const shareRoadmap = () => {
    const shareText = `Check out my new roadmap for ${roadmap?.title}!`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      // Native Web Share API (mobile/compatible browsers)
      navigator.share({
        title: shareText,
        text: `I just created a roadmap to learn  ${roadmap?.title} in ${roadmap?.duration} using CourseAI`,
        url: shareUrl
      });
    } else {
      // Fallback: open a custom modal or social share links
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${shareText} ${shareUrl}`
        )}`,
        '_blank'
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoadmapById(roadmapId);
        const cards = transformRoadmapToItems(data);

        setRoadmap(cards);
      } catch (error) {
        console.error('Failed to fetch lesson or additional data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadmapId, user]);

  if (loading) return <div>Loading...</div>;
  if (!roadmap) return <div>Course not found. {roadmapId}</div>;

  return (
    <>
      <h1 className="w-full pb-1 text-center text-2xl">Edit Roadmap</h1>
      <Card className="mx-auto flex h-[80vh] max-h-[700px] w-full max-w-2xl flex-col">
        <CardHeader className="relative w-full flex-1">
          <RoadmapView roadmapItems={roadmap} />
        </CardHeader>
        <CardContent className="bottom-0 flex w-full flex-col space-y-4 px-4 py-4">
          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(true)}
              className="w-1/3 px-6 py-3"
            >
              Copy Link
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={shareRoadmap}
              className="w-1/3 px-6 py-3"
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label
                htmlFor="link"
                className="sr-only"
                onClick={() => setIsDialogOpen(false)}
              >
                Link
              </Label>
              <Input id="link" defaultValue={shareText} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() =>
                navigator.clipboard
                  .writeText(shareText)
                  .then(() => toast.success('Link copied to clipboard'))
              }
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
