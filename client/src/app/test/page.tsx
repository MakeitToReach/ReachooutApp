"use client";
import { MultipleImageInput } from "@/components/multiImgInput";
import { ImageInput } from "@/components/imgInput";
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
    <div className="flex w-full h-screen items-center justify-center bg-neutral-900">
      {/* <FileUpload /> */}
      <div className="flex flex-col gap-4 w-full">
        <ImageInput initialImgUrl="https://github.com/shadcn.png" />
      </div>
      <div className="flex flex-col gap-4 w-full">
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
  );
};

export default page;
