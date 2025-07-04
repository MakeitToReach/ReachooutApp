import { Button } from "@/components/ui/button";
import { getSocialIconFromRegistry } from "@/lib/utils";
import { PF_SOCIAL } from "@/templates/professional/types/social.types";
import { LucideArrowRight } from "lucide-react";
import React from "react";

export const PFSocialCard = ({
  icon,
  title,
  followerCounts,
  btnLink,
  btnText,
}: PF_SOCIAL) => {
  return (
    <div className="w-full p-6 bg-template-primary rounded-md flex items-center gap-6">
      <span>
        {getSocialIconFromRegistry(icon, {
          className: "size-16 text-template-text-primary",
        })}
      </span>
      <div className="flex flex-col gap-3 text-template-text-primary">
        <div className="space-y-1">
          <h1 className="font-semibold md:text-xl">{title}</h1>
          {followerCounts && (
            <h4 className="text-template-text-primary/60 text-sm">
              {followerCounts}+ followers
            </h4>
          )}
        </div>
        <a href={btnLink}>
          <Button>
            {btnText}
            <span>
              <LucideArrowRight className="size-[20px]" />
            </span>
          </Button>
        </a>
      </div>
    </div>
  );
};
