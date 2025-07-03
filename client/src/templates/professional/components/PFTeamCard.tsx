import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";
import Image from "next/image";
import { PF_TEAM_MEMBER } from "../types/teamMember.types";

interface PFTeamCardProps {
    imgUrl: string;
    name: string;
    designation: string;
    description: string;
}
export const PFTeamCard = ({
    imgUrl,
    name,
    designation,
    description,
}: PFTeamCardProps) => {
    const teamMemberContent = { imgUrl, name, designation, description };
    return (
        <div className="h-fit sm:w-[20vw] border border-template-accent-primary w-full bg-template-primary rounded-lg overflow-hidden space-y-6 pb-6 text-template-text-primary">
            <Image
                quality={100}
                src={imgUrl}
                alt="blog-img"
                width={100}
                height={100}
                className="w-full h-[15rem] object-cover"
            />
            <div className="px-6 space-y-1">
                <div className="w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg tracking-tight">{name}</h2>

                    <ViewMoreDrawer
                        type="TeamMember"
                        content={teamMemberContent as PF_TEAM_MEMBER}
                    >
                        <Button className="static translate-y-0 bg-template-secondary border-template-accent-primary text-template-text-secondary cursor-pointer rounded-full hover:bg-template-secondary">
                            <LucidePlus className="h-4 w-4" />
                        </Button>
                    </ViewMoreDrawer>
                </div>
                <p className="text-xs line-clamp-1 text-template-text-primary/70">
                    {designation}
                </p>
            </div>
        </div>
    );
};
