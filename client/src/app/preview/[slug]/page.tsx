"use client";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { PF_STATIC_DATA } from "@/static_data/professional/PFTemplate";
import { useParams } from "next/navigation";
import React from "react";

const Preview = () => {
    const { slug } = useParams();

    if (!slug || typeof slug != "string") {
        return <div>Loading</div>;
    }

    const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
    const SelectedTemplate = TEMPLATE_REGISTRY[templateKey];

    if (!SelectedTemplate) {
        return <div>Template not found</div>;
    }

    //make request to BE to get demo data
    return (
        <>
            <SelectedTemplate.component data={PF_STATIC_DATA} />
        </>
    );
};

export default Preview;
