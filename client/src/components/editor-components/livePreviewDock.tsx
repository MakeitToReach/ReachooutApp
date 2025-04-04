// "use client";
import React from "react";
// import { Dock, DockIcon } from "../magicui/dock";
import { LucideEdit2, LucideUploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";

interface LPrevDockProps {
    publishSite: () => void;
}
export function LPrevDock({ publishSite }: LPrevDockProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.back();
    };

    return (
        <div className="p-4 flex justify-center items-center gap-10 backdrop-blur-sm border border-black rounded-xl">
            <LucideEdit2 onClick={handleEdit} size={24} className="cursor-pointer hover:scale-125 transition-transform" />
            <LucideUploadCloud onClick={publishSite} size={24} className="cursor-pointer hover:scale-125 transition-transform" />
        </div>
    );
}
