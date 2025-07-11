"use client";
import { MultipleImageInput } from "@/components/multiImgInput";
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";
import React, { useState } from "react";

const TipTapEditorDemo = () => {
  const [content, setContent] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
      {/* Editor Section */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">TipTap Editor</h3>
        <TipTapEditor
          value={content}
          onChange={setContent}
          placeholder="Start typing your content..."
          height="h-[500px]"
          showToolbar={true}
        />
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">Live Preview</h3>
        <div className="bg-white rounded-lg p-4 h-[500px] overflow-y-auto shadow-lg">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="min-h-screen bg-neutral-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
          Component Testing Page
        </h1>

        {/* TipTap Editor */}
        <div className="mb-12 prose prose-sm max-w-none">
          <TipTapEditorDemo />
        </div>

        {/* Original Components */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">Image Input</h3>
          <ImageInput initialImgUrl="https://github.com/shadcn.png" />
        </div>

        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">
            Multiple Image Input
          </h3>
          <MultipleImageInput
            initialImages={[
              "/placeholder.png",
              "/placeholder.png",
              "/placeholder.png",
              "/placeholder.png",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default page;