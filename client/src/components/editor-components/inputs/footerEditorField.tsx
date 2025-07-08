import React from "react";
import { PF_SOCIAL } from "@/templates/professional/types/footer.types";
import { ReqInput } from "./reqInput";

interface FooterEditorFieldProps {
    value: PF_SOCIAL[];
    onChange: (val: PF_SOCIAL[]) => void;
}
export const FooterEditorField = ({
    value,
    onChange,
}: FooterEditorFieldProps) => {
    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold text-xl ">Social Links</h1>
            </div>
            {value.map((social, index) => (
                <ReqInput
                    key={index}
                    label={social.name}
                    value={social.url}
                    onChange={(e) => {
                        const updated = [...value];
                        updated[index].url = e.target.value;
                        onChange(updated);
                    }}
                />
            ))}
        </div>
    );
};
