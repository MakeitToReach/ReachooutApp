import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PFSocialCardProps {
    icon: React.ReactNode;
    title: string;
    followerCounts?: number;
    socialLink: string;
}
export const PFSocialCard = ({
    icon,
    title,
    followerCounts,
    socialLink,
}: PFSocialCardProps) => {
    return (
        <div className="w-full p-6 bg-white rounded-md flex items-center gap-6">
            {icon}
            <div className="flex flex-col gap-3">
                <div className="space-y-1">
                    <h1 className="font-semibold md:text-xl">{title}</h1>
                    {followerCounts && (
                        <h4 className="text-gray-600 text-sm">
                            {followerCounts}+ followers
                        </h4>
                    )}
                </div>
                <Link href={socialLink}>
                    <Button>
                        Check out{" "}
                        <span>
                            <LucideArrowRight className="size-[20px]" />
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
