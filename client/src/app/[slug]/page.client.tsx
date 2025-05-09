// export const dynamic = "force-dynamic";
// import { UserPreview } from "@/components/editor-components/userPreview";
import dynamic from "next/dynamic";
import React from "react";

// somewhere like pages/preview.tsx or a parent component
const UserPreview = dynamic(
    () => import("@/components/editor-components/userPreview"),
    {
        ssr: false,
    },
);

const page = () => {
    return <UserPreview />;
};

export default page;
