import { Loading } from "@/components/editor-components/loading";
import ExplorePage from "@/components/pages/explorePage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <ExplorePage />
    </Suspense>
  );
}
