import { Loading } from "@/components/editor-components/loading";
import EditorPage from "@/components/pages/editorPage";
import { Suspense } from "react";

export default function Editor() {
  return (
    <Suspense fallback={<Loading />}>
      <EditorPage />
    </Suspense>
  );
}
