import TemplatePage from "@/components/pages/admin/templatePage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TemplatePage />
    </Suspense>
  );
};

export default page;
