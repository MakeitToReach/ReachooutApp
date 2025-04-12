"use client";
// import { ReorderSectionsPopup } from "@/components/editor-components/SectionsPopup";
import { PF_STATIC_DATA } from "@/static_data/professional/PFTemplate";
import { ProfessionalPortfolio } from "@/templates/professional";
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
    return <ProfessionalPortfolio data={PF_STATIC_DATA} />;
};

export default page;
