"use client";

import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPreview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<PF_TMP_SCHEMA | null>(null);

  const templateKey = searchParams.get(
    "template",
  ) as keyof typeof TEMPLATE_REGISTRY;
  const template = TEMPLATE_REGISTRY[templateKey];

  useEffect(() => {
    if (!template) return; // Prevents fetching if template is invalid

    const fetchData = async () => {
      const fetchedData = await getUserTemplateData(templateKey);
      setData(fetchedData.userTemplateData);
      if (!fetchedData) router.push(`/`);
    };

    fetchData();
  }, [templateKey]);

  if (!template) return <p>Template not found</p>;
  if (!data) return <p>Loading...</p>;

  return <template.component data={data} />;
};

export default UserPreview;
