import { LucideAtSign, LucidePhone } from "lucide-react";

interface FContactButtonProps {
    type: "tel" | "email";
    value: string | number;
}
export const FContactButton = ({ type, value }: FContactButtonProps) => {
    return (
        <div className="flex gap-2 items-center">
            <div className="rounded-full size-16 bg-template-accent-primary text-template-text-accent-primary flex items-center justify-center">
                {type === "tel" ? <LucidePhone /> : <LucideAtSign />}
            </div>
            <div>
                {type === "tel" ? (
                    <>
                        <h3 className="uppercase font-semibold">
                            Call us
                        </h3>
                        <a href={`tel:${value}`} className="hover:underline">
                            {value}
                        </a>
                    </>
                ) : (
                    <>
                        <h3 className="uppercase font-semibold">
                            Send us an email
                        </h3>
                        <a href={`mailto:${value}`} className="hover:underline">
                            {value}
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};
