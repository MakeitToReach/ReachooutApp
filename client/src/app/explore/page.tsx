"use client";

import { fetchAllTemplates } from "@/api/explore";
import ExploreTabs from "@/components/editor-components/exploreTabs";
// import { getToken } from "@/lib/isAuthenticated";
import { useTemplateStore } from "@/store/template.store";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ExplorePage = () => {
  const { templates, setTemplates } = useTemplateStore();
  // const router = useRouter();

  useEffect(() => {
    // const token = getToken();
    // if (!token) {
    //   router.push("/");
    //   return;
    // }

    if (templates.length === 0) {
      const fetchTemplates = async () => {
        const response = await fetchAllTemplates();
        setTemplates(response.templates);
      };
      fetchTemplates();
    }
  });

  return (
    <div className="font-Poppins w-full  flex text-white dark">
      <ExploreTabs templates={templates} />
    </div>
  );
};

export default ExplorePage;
