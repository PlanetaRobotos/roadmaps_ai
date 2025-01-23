'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  Code,
  Heading1,
  Heading2,
  Quote,
  ListOrdered,
  Undo,
  Redo
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const lowlight = createLowlight(common);

const MenuBar = ({ editor }: { editor: any }) => {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [url, setUrl] = useState('');

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    editor.chain().focus().setLink({ href: urlWithProtocol }).run();

    setUrl('');
    setIsLinkOpen(false);
  };

  // Get existing link when dialog opens
  const handleLinkButtonClick = () => {
    if (editor.isActive('link')) {
      // Get the attributes of the current link
      const attrs = editor.getAttributes('link');
      setUrl(attrs.href || '');
    } else {
      setUrl('');
    }
    setIsLinkOpen(true);
  };

  return (
    <div className="flex flex-wrap justify-center gap-1 border-b border-border bg-background py-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-accent' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-accent' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-accent' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-accent' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-accent' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>

      <Dialog open={isLinkOpen} onOpenChange={setIsLinkOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleLinkButtonClick}
            className={editor.isActive('link') ? 'bg-accent' : ''}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editor.isActive('link') ? 'Edit Link' : 'Add Link'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLink();
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              {editor.isActive('link') && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setUrl('');
                    setIsLinkOpen(false);
                  }}
                >
                  Remove Link
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  setUrl('');
                  setIsLinkOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={addLink}>
                {editor.isActive('link') ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 hover:underline'
        }
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="sticky top-0 z-10">
        <MenuBar editor={editor} />
      </div>
      <EditorContent
        editor={editor}
        className="sm:prose-base lg:prose-lg prose prose-sm w-full max-w-none flex-1 overflow-y-auto p-4 focus:outline-none"
      />
    </div>
  );
};

export { RichTextEditor };
