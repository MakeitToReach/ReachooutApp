import ExplorePage from "@/components/pages/explorePage";
import { Suspense } from "react";

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ExplorePage />
        </Suspense>
    );
}
