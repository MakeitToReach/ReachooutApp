import React from "react";
import { PF_SOCIAL } from "@/templates/professional/types/social.types";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";

interface PFSocialEditorFieldProps {
  value: PF_SOCIAL[];
  onChange: (val: PF_SOCIAL[]) => void;
}
export const PFSocialEditorField = ({
  value,
  onChange,
}: PFSocialEditorFieldProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-xl ">Socials</h1>
      </div>
      {value.map((social, index) => (
        <div className="flex gap-2" key={index}>
          <ReqInput
            key={index}
            label={social.title}
            value={social.btnLink}
            onChange={(e) => {
              const updated = [...value];
              updated[index].btnLink = e.target.value;
              onChange(updated);
            }}
          />
          <ReqInput
            key={`${index}-followers`}
            label="Followers"
            value={social.followerCounts}
            placeholder="0"
            onChange={(e) => {
              const updated = [...value];
              updated[index].followerCounts = Number(e.target.value) || 0;
              onChange(updated);
            }}
          />
        </div>
      ))}
    </div>
  );
};
