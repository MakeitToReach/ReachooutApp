"use client";
import { MultipleImageInput } from "@/components/multiImgInput";
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";
import React, { useState } from "react";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { ColorPickerPopup } from "@/components/ui/ColorPicker";
// import { PFCalThemeSelect } from "@/templates/professional/components/PFCalThemeSelect";

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

const ColorPickerDemo = () => {
  const [color, setColor] = useState("#aabbcc");
  return (
    <div className="mb-12 prose prose-sm max-w-none">
      <h3 className="text-white text-lg font-semibold mb-2">
        Color Picker Demo
      </h3>
      <ColorPicker value={color} onChange={setColor} label="Pick a color" />
      <div className="mt-2 text-white text-sm">
        Selected color: <span className="font-mono">{color}</span>
      </div>
    </div>
  );
};

const ColorPickerPopupDemo = () => {
  const [color, setColor] = useState("#aabbcc");
  return (
    <div className="mb-12 prose prose-sm max-w-none">
      <h3 className="text-white text-lg font-semibold mb-2">
        Popup Color Picker Demo
      </h3>
      <ColorPickerPopup
        value={color}
        onChange={setColor}
        label="Pick a color"
      />
      <div className="mt-2 text-white text-sm">
        Selected color: <span className="font-mono">{color}</span>
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

        {/* Color Picker Demo */}
        <ColorPickerDemo />
        {/* Popup Color Picker Demo */}
        <ColorPickerPopupDemo />
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

      {/* <iframe
        src="https://02289d6dc04b407d8b49527a81878d95.elf.site"
        frameborder="0"
      ></iframe> */}
      <div className="w-[95vw] h-screen overflow-x-hidden">
        <iframe
          src="https://02289d6dc04b407d8b49527a81878d95.elf.site"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            display: "block",
          }}
          title="Embedded Demo"
          allow="clipboard-write; clipboard-read"
          loading="lazy"
        ></iframe>
      </div>
      {/* Elfsight Instagram Feed | Untitled Instagram Feed */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      {/* <script
        src="https://static.elfsight.com/platform/platform.js"
        async
      ></script>
      <div
        className="elfsight-app-02289d6d-c04b-407d-8b49-527a81878d95"
        data-elfsight-app-lazy={true}
      /> */}
    </div>
  );
};

export default page;
