import PreviewPage from "@/pages/previewPage";
import { Suspense } from "react";

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PreviewPage />
        </Suspense>
    );
}
