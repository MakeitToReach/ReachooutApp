import { Loading } from "@/components/editor-components/loading";
import PreviewPage from "@/components/pages/previewPage";
import { Suspense } from "react";

export default function page() {
    return (
        <Suspense fallback={<Loading />}>
            <PreviewPage />
        </Suspense>
    );
}
