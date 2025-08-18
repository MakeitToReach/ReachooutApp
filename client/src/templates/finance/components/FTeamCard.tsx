import Image from "next/image";
import { F_TEAM_MEMBER } from "../types/team.types";
import { getSocialIconFromRegistry } from "@/lib/utils";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";

export const FTeamCard = ({
  imgUrl,
  name,
  designation,
  description,
  socials,
}: F_TEAM_MEMBER) => {
  return (
    <div className="h-fit w-full bg-template-primary rounded-lg overflow-hidden space-y-6 pb-6">
      <Image
        quality={100}
        src={imgUrl || "/placeholder.png"}
        alt="blog-img"
        width={400}
        height={250}
        className="w-full h-[300px] object-cover"
      />
      <div className="px-6 space-y-1 text-template-text-primary">
        <h2 className="font-semibold text-2xl sm:text-xl tracking-tight">{name}</h2>
        <p className="text-sm line-clamp-1 text-template-text-primary/80">
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
                  className="text-template-text-primary/80 transition-colors"
                >
                  {getSocialIconFromRegistry(social.name)}
                </a>
              );
            })}
        </div>

        <FViewMoreDrawer
          type="Team"
          content={{ imgUrl, name, designation, socials, description }}
        >
          <button className="text-template-text-primary font-semibold text-lg sm:text-base hover:underline">
            View Details
          </button>
        </FViewMoreDrawer>
      </div>
    </div>
  );
};
