import Image from "next/image";
import { F_TEAM_MEMBER } from "../types/team.types";
import { getSocialIconFromRegistry } from "@/lib/utils";

export const FTeamCard = ({
    imgUrl,
    name,
    designation,
    socials,
}: F_TEAM_MEMBER) => {
    return (
        <div className="h-fit sm:w-[20vw] w-full bg-white rounded-lg overflow-hidden space-y-6 pb-6">
            <Image
                quality={100}
                src={imgUrl || "/placeholder.png"}
                alt="blog-img"
                width={400}
                height={250}
                className="w-full h-[300px] object-cover"
            />
            <div className="px-6 space-y-1">
                <h2 className="font-semibold text-lg tracking-tight text-black">
                    {name}
                </h2>
                <p className="text-xs line-clamp-1 text-gray-600">{designation}</p>

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
                                    className="text-black transition-colors"
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
