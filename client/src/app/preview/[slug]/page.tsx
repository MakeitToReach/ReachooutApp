"use client";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { useParams } from "next/navigation";
import React from "react";

const Preview = () => {
    const { slug } = useParams();

    if (!slug || typeof slug != "string") {
        return <div>Loading</div>;
    }

    const SelectedTemplate = TEMPLATE_REGISTRY[slug];

    if (!SelectedTemplate) {
        return <div>Template not found</div>;
    }
    return <SelectedTemplate />;
};

export default Preview;
