'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEditStore } from '@/store/editStore';
import { TipButton } from '@/app/dashboard/roadmaps/_components/roadmap-edit-button';
import { EditingState } from '@/types/editState';
import { toast } from 'sonner';
import { AuthContext } from '@/context/auth-context';
import { ExternalLink } from 'lucide-react';
import { LessonCard } from '@/types/roadmap-types';
import { RichTextEditor } from '@/components/RichTextEditor';

interface LessonCardProps {
  lesson: LessonCard;
  isEditable: boolean;
  onUpdate: (id: string, newContent: string) => Promise<void>;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isEditable,
  onUpdate
}) => {
  const { isPaidRole, user } = useContext(AuthContext);
  const { editingState, setEditingState } = useEditStore();
  const [tempContent, setTempContent] = useState('');

  const handleEditClick = async () => {
    if (editingState === EditingState.Idle) {
      setEditingState(EditingState.Editing);
      setTempContent(lesson.content);
    }
  };

  console.log('isEditable lesson: ', isEditable);

  const wasEditingRef = useRef<EditingState>(editingState);

  useEffect(() => {
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

    wasEditingRef.current = editingState;
  }, [editingState, lesson.id, onUpdate, setEditingState, tempContent]);

  const ResourcesList = () => {
    if (!lesson.resources?.length) return null;

    const parseResource = (resource: string) => {
      try {
        // Handle different formats
        if (resource.includes(' | ')) {
          const [title, description, url] = resource.split(' | ');
          return { title, description, url };
        }

        if (resource.includes(' - ')) {
          // Handle "Title - Description - URL" format
          const parts = resource.split(' - ');
          if (parts.length === 3) {
            const [title, description, url] = parts;
            return { title, description, url };
          }
          // Handle "Title - URL" format
          const [title, url] = parts;
          return { title, description: title, url };
        }

        return null;
      } catch (error) {
        console.error('Failed to parse resource:', resource);
        return null;
      }
    };

    return (
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Additional Resources
            </span>
          </div>
        </div>
        <div className="mt-6">
          <ul className="space-y-2">
            {lesson.resources.map((resource, index) => {
              const parsed = parseResource(resource);
              if (!parsed?.url) return null;

              return (
                <li key={index} className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4 text-gray-500" />

                  <a
                    href={parsed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {parsed.title}
                    {parsed.description !== parsed.title && (
                      <span className="">- {parsed.description}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
  return (
    <div className="h-full rounded-xl bg-blue-100 p-1">
      <Card className="flex h-full w-full flex-col bg-white">
        <CardHeader className="p-5">
          <CardTitle className="w-full text-center">{lesson.title}</CardTitle>
        </CardHeader>
        <Separator className="h-1 bg-blue-100" />

        <ScrollArea className="w-full flex-1 overflow-auto">
          <CardContent className="flex h-full flex-grow flex-col justify-between px-0">
            <div className="prose prose-sm h-full max-w-none p-2 px-2 leading-relaxed sm:prose-base lg:prose-lg xs:px-6">
              {editingState === EditingState.Idle && (
                <>
                  {isPaidRole && isEditable && (
                    <TipButton
                      disabled={editingState !== EditingState.Idle}
                      onClick={handleEditClick}
                    />
                  )}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: lesson.content
                    }}
                    className="prose prose-sm mt-4 sm:prose-base lg:prose-lg"
                  />

                  <ResourcesList />
                </>
              )}

              {editingState === EditingState.Editing && (
                <RichTextEditor
                  content={tempContent}
                  onChange={setTempContent}
                />
              )}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default LessonCard;
