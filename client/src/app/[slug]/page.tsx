import UserPreview from "@/components/editor-components/userPreview";
import React, { Suspense } from "react";

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserPreview />
        </Suspense>
    );
};

export default page;
