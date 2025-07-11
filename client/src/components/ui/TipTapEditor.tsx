"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
  Undo,
  Redo,
} from "lucide-react";

interface TipTapEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  showToolbar?: boolean;
  height?: string;
}

//eslint-disable-next-line
const TipTapToolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
      {/* Text Formatting */}
      <Button
        variant={editor.isActive("bold") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant={editor.isActive("italic") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant={editor.isActive("strike") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Button
        variant={editor.isActive("code") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Headings */}
      <Button
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1 (Ctrl+Shift+1)"
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2 (Ctrl+Shift+2)"
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <Button
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3 (Ctrl+Shift+3)"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Lists */}
      <Button
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List (Ctrl+Shift+8)"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered List (Ctrl+Shift+7)"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Block Elements */}
      <Button
        variant={editor.isActive("blockquote") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote (Ctrl+Shift+9)"
      >
        <Quote className="h-4 w-4" />
      </Button>

      <Button
        variant={editor.isActive("codeBlock") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Code Block (Ctrl+Shift+C)"
      >
        <Code2 className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </Button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* History */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const TipTapEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className = "",
  showToolbar = true,
  height = "h-36",
}: TipTapEditorProps) => {
  const [content, setContent] = useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-full",
        placeholder: placeholder,
      },
    },
    immediatelyRender: false,
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== content) {
      editor.commands.setContent(value);
      setContent(value);
    }
  }, [value, editor]);

  return (
    <div className={`bg-white rounded-lg overflow-hidden border ${className}`}>
      {showToolbar && <TipTapToolbar editor={editor} />}
      <div className={`p-3 ${height} overflow-y-auto`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
