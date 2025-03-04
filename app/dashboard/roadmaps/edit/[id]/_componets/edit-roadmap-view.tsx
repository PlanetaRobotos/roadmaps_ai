'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { EditingState } from '@/types/editState';

import { AuthContext } from '@/context/auth-context';
import { CLIENT_URL } from '@/config/apiConfig';
import { company } from '@/constants/data';
import { ClientRoadmap } from '@/types/roadmap-types';
import Loading from '@/app/dashboard/_components/loading';

import { getRoadmapById } from '@/services/roadmapsService';
import { transformRoadmapToItems } from '@/utils/transformRoadmap';

import RoadmapView from '@/components/roadmaps/roadmap-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { useEditStore } from '@/store/editStore';

interface EditRoadmapViewProps {
  roadmapId: string;
}

export default function EditRoadmapView({ roadmapId }: EditRoadmapViewProps) {
  const [roadmap, setRoadmap] = useState<ClientRoadmap>();
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const shareUrl = `${CLIENT_URL}/dashboard/roadmaps/${roadmapId}`;
  const shareText = `Check out my new course for ${roadmap?.title} at ${shareUrl}`;

  const { editingState, setEditingState } = useEditStore();

  const handleSave = () => {
    console.log('Save editing');
    setEditingState(EditingState.Saving);
  };

  const handleCancel = () => {
    console.log('Cancel editing');
    setEditingState(EditingState.Idle);
  };

  const handlePreview = () => {
    router.push(`/dashboard/roadmaps/${roadmapId}`);
  };

  // Fetch roadmap data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoadmapById(roadmapId);
        const cards = transformRoadmapToItems(data);
        setRoadmap(cards);

        setIsAuthor(user?.id === data.authorId);
      } catch (error) {
        console.error('Failed to fetch roadmap:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roadmapId, user]);

  const shareRoadmap = () => {
    const shareMsg = `Share course: ${roadmap?.title}!`;

    if (navigator.share) {
      navigator.share({
        title: shareMsg,
        text: `I just created a course to learn ${roadmap?.title} in ${roadmap?.duration} using ${company.name}`,
        url: shareUrl
      });
    } else {
      toast.error('Sharing is not supported on this device');
    }
  };

  if (loading) return <Loading />;
  if (!roadmap) return <div>Course not found. {roadmapId}</div>;
  if (!isAuthor) window.location.href = shareUrl;

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col p-2 md:px-4">
      {/*/!*Page Title *!/*/}
      {/*<div className=" flex w-full flex-none justify-center">*/}
      {/*  <h1 className="flex items-center border-b-4 border-transparent text-4xl font-extrabold text-gray-800">*/}
      {/*    /!*<Icons.edit className="mr-2 text-blue-500" />*!/*/}
      {/*    Edit Course*/}
      {/*  </h1>*/}
      {/*</div>*/}
      {/*<Separator className="mx-auto mb-2 flex h-1 w-5/6 flex-none" />*/}

      <div className="relative mx-auto w-full max-w-2xl flex-1">
        <Card className="flex h-full w-full flex-col">
          <CardHeader className="relative w-full grow pb-0 pt-4">
            <CardTitle className="sr-only">Roadmap</CardTitle>
            <RoadmapView isEditable={true} roadmapItems={roadmap} />
          </CardHeader>

          <CardContent className="bottom-0 flex w-full flex-none flex-col space-y-1 px-4 py-4 pb-0">
            {/* If editing, show Save/Cancel. Otherwise show normal action buttons. */}
            {editingState === EditingState.Idle && (
              <>
                {/* Copy + Share Buttons */}
                <div className="mb-2 flex justify-center space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handlePreview}
                    className="w-1/3 px-6 py-3"
                  >
                    Preview
                  </Button>
                  {/*<Button*/}
                  {/*  type="button"*/}
                  {/*  variant="secondary"*/}
                  {/*  onClick={() => setIsDialogOpen(true)}*/}
                  {/*  className="w-1/5 px-6 py-3"*/}
                  {/*>*/}
                  {/*  Copy Link*/}
                  {/*</Button>*/}
                  <Button
                    type="button"
                    variant="default"
                    onClick={shareRoadmap}
                    className="w-1/3 px-6 py-3"
                  >
                    Share
                  </Button>
                </div>

                {/* Create new course link */}
                <Button
                  type="button"
                  variant="link"
                  className="mx-auto w-1/2"
                  onClick={() => router.push('/dashboard/roadmaps/create')}
                >
                  Create a new course
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Explore Other Courses (only show if not editing) */}
      {editingState === EditingState.Idle && (
        <div className="flex w-full justify-center pt-3">
          <Button
            type="button"
            variant="secondary"
            className="w-1/2 max-w-lg"
            onClick={() => router.push('/dashboard/roadmaps/library')}
          >
            Explore Other Courses
          </Button>
        </div>
      )}

      {/* Editing Controls */}
      {editingState !== EditingState.Idle && (
        <div className="flex w-full justify-center space-x-4 px-8 pt-3">
          <Button
            className="w-1/2 max-w-64 px-6 py-3"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className="w-1/2 max-w-64 px-6 py-3" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}

      {/* Share Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link can view your course.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
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
    </div>
  );
}
