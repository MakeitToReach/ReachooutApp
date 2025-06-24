import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideArrowRight } from "lucide-react";

interface FButtonProps {
    btnText: string;
    className?: string;
}
export const FButton = ({ btnText, className }: FButtonProps) => {
    return (
        <Button
            variant={"default"}
            className={cn(
                "py-4 rounded-full bg-black text-white font-semibold flex items-center",
                className,
            )}
        >
            {btnText}
            <span>
                <LucideArrowRight size={20} className="font-semibold" />
            </span>
        </Button>
    );
};
