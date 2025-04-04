"use client";

import { fetchAllTemplates } from "@/api/explore";
import ExploreTabs from "@/components/editor-components/exploreTabs";
import { getToken } from "@/lib/isAuthenticated";
import { TEMPLATES_SCHEMA } from "@/types/templates.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExplorePage = () => {
    const [templates, setTemplates] = useState<TEMPLATES_SCHEMA[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/");
            return;
        }

        const fetchTemplates = async () => {
            const response = await fetchAllTemplates();
            setTemplates(response.templates || []);
        };

        fetchTemplates();
    }, [router]);

    return (
        <div className="font-Poppins w-full  flex text-white dark">
            <ExploreTabs templates={templates} />
        </div>
    );
};

export default ExplorePage;
