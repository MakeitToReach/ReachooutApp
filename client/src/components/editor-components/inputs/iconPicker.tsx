import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ICONS_REGISTRY } from "@/lib/iconsRegistry";

type IconPickerProps = {
    value?: string;
    onChange: (icon: string) => void;
};

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
    const [open, setOpen] = React.useState(false);

    const selectedIcon = ICONS_REGISTRY.find((icon) => icon.label === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm w-12 h-12"
                    title={value ?? "Select an icon"}
                >
                    {selectedIcon?.icon ?? <ChevronDown className="w-4 h-4 opacity-50" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4 z-[120] rounded-md shadow-md border bg-background">
                <ScrollArea className="h-64">
                    <div className="grid grid-cols-5 gap-3">
                        {ICONS_REGISTRY.map((item, idx) => {
                            const isSelected = value === item.label;

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        onChange(item.label);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "relative flex items-center justify-center w-12 h-12 rounded-md border hover:bg-muted transition-colors group",
                                        isSelected && "border-blue-500",
                                    )}
                                    title={item.label}
                                >
                                    <div className="w-5 h-5 text-foreground">{item.icon}</div>
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};
