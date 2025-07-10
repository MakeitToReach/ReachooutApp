"use client";
import { MultipleImageInput } from "@/components/multiImgInput";
import { ImageInput } from "@/components/imgInput";
import { LightboxExample } from "@/components/LightboxExample";
// import { FileUpload } from "@/components/comp-546";
// import { DEV_STATIC_DATA } from "@/static_data/dev/DEVStaticData";
// import { DevPortfolio } from "@/templates/dev";
// import { PF_STATIC_DATA } from "@/static_data/professional/PFStaticData";
// import { ReorderSectionsPopup } from "@/components/editor-components/SectionsPopup";
// import { ProfessionalPortfolio } from "@/templates/professional";
// import LanderPortfolio from "@/templates/test";
import React from "react";

const page = () => {
  // const sectionList = [
  //     { id: "hero", name: "Hero" },
  //     { id: "about", name: "About" },
  //     { id: "projects", name: "Projects" },
  //     { id: "social", name: "Social" },
  //     { id: "services", name: "Services" },
  // ];

  // return (
  //     <ReorderSectionsPopup
  //         sections={sectionList}
  //         onReorder={(newOrder) => {
  //             console.log("New order", newOrder);
  //             // update Zustand or state
  //         }}
  //     />
  // );
  //
  // return <ProfessionalPortfolio data={PF_STATIC_DATA} />;
  // return <LanderPortfolio />;
  // return <DevPortfolio data={DEV_STATIC_DATA} />;
  return (
    <div className="flex w-full h-screen items-center justify-center bg-neutral-900 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Lightbox Examples */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">Lightbox Examples</h3>
          <LightboxExample 
            imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=1500&fit=crop"
            alt="Mountain landscape"
          />
          <LightboxExample 
            imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000&h=1500&fit=crop"
            alt="Forest landscape"
          />
          <LightboxExample 
            imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=1500&fit=crop"
            thumbnailUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
            alt="Mountain with custom thumbnail"
          />
        </div>

        {/* Original Components */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">Image Input</h3>
          <ImageInput initialImgUrl="https://github.com/shadcn.png" />
        </div>

        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">Multiple Image Input</h3>
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
