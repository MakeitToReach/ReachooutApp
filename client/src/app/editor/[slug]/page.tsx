import EditorPage from "@/components/pages/editorPage";
import { Suspense } from "react";

export default function Editor() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditorPage />
        </Suspense>
    );
}
