import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";
import Image from "next/image";
import { PF_TEAM_MEMBER } from "../types/teamMember.types";
import { getSocialIconFromRegistry } from "@/lib/utils";

export const PFTeamCard = ({
    imgUrl,
    name,
    designation,
    description,
    socials,
}: PF_TEAM_MEMBER) => {
    const teamMemberContent = { imgUrl, name, designation, description };
    return (
        <div className="h-fit border border-template-accent-primary w-full bg-template-primary rounded-sm overflow-hidden space-y-6 pb-6 text-template-text-primary">
            <Image
                src={imgUrl || "/placeholder.png"}
                alt="team-member-img"
                width={400}
                height={240}
                className="w-full h-[20rem] sm:h-[15rem] object-cover"
            />
            <div className="px-6 space-y-1">
                <div className="w-full flex justify-between items-center">
                    <h2 className="font-semibold text-2xl sm:text-xl tracking-tight">{name}</h2>

                    <ViewMoreDrawer
                        type="TeamMember"
                        content={teamMemberContent as PF_TEAM_MEMBER}
                    >
                        <Button className="static translate-y-0 bg-template-secondary border-template-accent-primary text-template-text-secondary cursor-pointer rounded-full hover:bg-template-secondary">
                            <LucidePlus className="h-4 w-4" />
                        </Button>
                    </ViewMoreDrawer>
                </div>
                <p className="text-base line-clamp-1 text-template-text-primary/70">
                    {designation}
                </p>

                <div className="flex gap-2 py-2">
                    {socials
                        .filter((social) => social.url)
                        .map((social, index) => {
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-template-text-primary/50 hover:text-template-text-primary transition-colors"
                                >
                                    {getSocialIconFromRegistry(social.name)}
                                </a>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
