'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { LessonCard } from '@/types/roadmap-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEditStore } from '@/store/editStore';
import { TipButton } from '@/app/dashboard/roadmaps/_components/roadmap-edit-button';
import { EditingState } from '@/types/editState';
import { toast } from 'sonner';
import { AuthContext } from '@/context/auth-context';

interface LessonCardProps {
  lesson: LessonCard;
  onUpdate: (id: string, newContent: string) => Promise<void>;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onUpdate }) => {
  const { isPaidRole } = useContext(AuthContext);
  const { editingState, setEditingState } = useEditStore();
  const [tempContent, setTempContent] = useState('');

  const handleEditClick = async () => {
    if (editingState === EditingState.Idle) {
      setEditingState(EditingState.Editing);
      setTempContent(lesson.content);
    }
  };

  const wasEditingRef = useRef<EditingState>(editingState);

  useEffect(() => {
    // Transition from Editing to Saving
    if (
      editingState === EditingState.Saving &&
      wasEditingRef.current === EditingState.Editing
    ) {
      console.log('Transition detected: Editing → Saving. Initiating save...');
      const finishEditing = async () => {
        try {
          await onUpdate(lesson.id, tempContent);
        } catch (err) {
          console.error('Update failed:', err);
          toast.error('Failed to update lesson.');
        } finally {
          console.log('Finished saving lesson content.');
          setTempContent('');
          setEditingState(EditingState.Idle);
        }
      };
      void finishEditing();
    }

    if (
      editingState === EditingState.Idle &&
      wasEditingRef.current === EditingState.Editing
    ) {
      console.log('Transition detected: Canceled → Idle. Reverting changes...');
      setTempContent('');
    }

    // Update the ref to the current state for the next render
    wasEditingRef.current = editingState;
  }, [editingState, lesson.id, onUpdate, setEditingState, tempContent]);

  return (
    <div className="h-full rounded-xl bg-blue-100 p-1">
      <Card className="flex h-full w-full flex-col bg-white">
        <CardHeader className="p-5">
          <CardTitle className="w-full text-center">{lesson.title}</CardTitle>
        </CardHeader>
        <Separator className="h-1 bg-blue-100" />

        {editingState === EditingState.Editing && (
          <CardContent className="flex flex-1 flex-col p-4">
            <textarea
              className="h-full w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-sm text-black"
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
            />
          </CardContent>
        )}

        {editingState === EditingState.Idle && (
          <ScrollArea className="w-full flex-1 overflow-auto">
            <CardContent className="flex h-full flex-grow flex-col justify-between p-4">
              <div className="prose h-full max-w-none p-2 leading-relaxed lg:prose-xl md:px-6">
                {isPaidRole && (
                  <TipButton
                    disabled={editingState !== EditingState.Idle}
                    onClick={handleEditClick}
                  />
                )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: lesson.content.replace(/\n/g, '<br />')
                  }}
                  className="mt-4"
                />
              </div>
            </CardContent>
          </ScrollArea>
        )}
      </Card>
    </div>
  );
};

export default LessonCard;
