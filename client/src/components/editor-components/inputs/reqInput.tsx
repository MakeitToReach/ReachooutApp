import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// TODO: Add a video input component
interface ReqInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isRequired?: boolean;
    isOptional?: boolean;
    subtitle?: string;
    className?: string;
}
export const ReqInput: React.FC<ReqInputProps> = ({
    isRequired,
    label,
    isOptional,
    subtitle,
    className,
    ...props
}) => {
    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <Label
                    htmlFor="input-02"
                    className="text-md md:text-lg font-Montserrat"
                >
                    {label}
                    {isRequired && <span className="text-red-400">*</span>}
                    {isOptional && <span className="text-gray-400"> (optional)</span>}
                </Label>
            )}
            <Input
                id="input-02"
                type="text"
                required
                className="font-Montserrat"
                {...props}
            />
            {subtitle && <p className="text-xs text-gray-700">{subtitle}</p>}
        </div>
    );
};
