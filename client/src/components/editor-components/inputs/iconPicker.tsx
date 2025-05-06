import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { ICONS_REGISTRY } from "@/lib/iconsRegistry";

type IconPickerProps = {
    value?: React.ReactNode;
    onChange: (icon: string) => void;
};

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    {value ?? "Select an icon"}
                    <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 z-[120]">
                <ScrollArea className="h-48">
                    <div className="grid grid-cols-4 gap-2">
                        {ICONS_REGISTRY.map((item, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    onChange(item.label);
                                    setOpen(false);
                                }}
                                className={cn(
                                    "flex flex-col items-center justify-center p-2 rounded-md border border-transparent hover:border-muted transition",
                                    value?.valueOf === item.icon?.valueOf
                                        ? "bg-muted border-primary"
                                        : "",
                                )}
                            >
                                {item.icon}
                                <span className="text-xs mt-1">{item.label}</span>
                                {value?.valueOf === item.icon?.valueOf && (
                                    <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};
