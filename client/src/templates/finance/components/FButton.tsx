import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideArrowRight } from "lucide-react";

interface FButtonProps extends React.ComponentProps<"button"> {
    btnText: string;
    className?: string;
}
export const FButton = ({ btnText, className, ...props }: FButtonProps) => {
    return (
        <Button
            variant={"default"}
            className={cn(
                "py-4 rounded-full bg-black text-white font-semibold flex items-center",
                className,
            )}
            {...props}
        >
            {btnText}
            <span>
                <LucideArrowRight size={20} className="font-semibold" />
            </span>
        </Button>
    );
};
