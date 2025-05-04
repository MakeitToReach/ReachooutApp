"use client";

import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ThemeObject } from "@/schemas/templates.schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FONT_REGISTRY } from "@/lib/fontRegistry";

type ThemePickerDialogProps = {
    children: React.ReactNode;
    initialTheme: ThemeObject;
    onThemeChange: (newTheme: ThemeObject) => void;
};

const themeFields: {
    label: string;
    backgroundKey?: keyof ThemeObject;
    textKey?: keyof ThemeObject;
}[] = [
        {
            label: "Background",
            backgroundKey: "--template-primary",
            textKey: "--template-text-primary",
        },
        {
            label: "Secondary Background",
            backgroundKey: "--template-secondary",
            textKey: "--template-text-secondary",
        },
        {
            label: "Accent Primary",
            backgroundKey: "--template-accent-primary",
            textKey: "--template-text-accent-primary",
        },
        {
            label: "Accent Secondary",
            backgroundKey: "--template-accent-secondary",
            textKey: "--template-text-accent-secondary",
        },
        {
            label: "Buttons",
            backgroundKey: "--template-btn",
            textKey: "--template-text-btn",
        },
    ];

export function ThemePickerDialog({
    children,
    initialTheme,
    onThemeChange,
}: ThemePickerDialogProps) {
    const [theme, setTheme] = React.useState<ThemeObject>(initialTheme);

    const handleChange = (key: keyof ThemeObject, value: string) => {
        setTheme((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onThemeChange(theme);
        toast.success("Theme applied successfully!");
    };

    // const fontOptions = [
    //     { label: "Inter", value: "'Inter', sans-serif" },
    //     { label: "Roboto", value: "'Roboto', sans-serif" },
    //     { label: "Poppins", value: "'Poppins', sans-serif" },
    //     { label: "Lato", value: "'Lato', sans-serif" },
    // ];

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="z-[100] font-Poppins">
                <DialogHeader>
                    <DialogTitle>Customize Theme Colors and Font</DialogTitle>
                </DialogHeader>

                <div className="py-2">
                    <Label className="block mb-1">Font</Label>
                    <Select
                        value={theme["--template-font"]}
                        onValueChange={(value) => handleChange("--template-font", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent className="z-[150]">
                            {FONT_REGISTRY.map((font) => (
                                <SelectItem
                                    key={font.value}
                                    value={font.value}
                                    style={{ fontFamily: font.value }}
                                    className="md:text-lg"
                                >
                                    {font.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2 py-4">
                    {/* Column Headings */}
                    <div className="flex justify-between items-center font-semibold text-sm px-1">
                        <div className="w-1/3">Color</div>
                        <div className="w-1/5 text-center">Background</div>
                        <div className="w-1/5 text-center">Text</div>
                    </div>

                    {/* Dynamic Field Rows */}
                    {themeFields.map(({ label, backgroundKey, textKey }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between gap-4"
                        >
                            <Label className="w-1/3">{label}</Label>

                            {/* Background Color Input */}
                            <div className="w-1/5">
                                {backgroundKey && (
                                    <Input
                                        type="color"
                                        value={theme[backgroundKey]}
                                        onChange={(e) =>
                                            handleChange(backgroundKey, e.target.value)
                                        }
                                        className="w-full h-10 p-0 border-none"
                                    />
                                )}
                            </div>

                            {/* Text Color Input */}
                            <div className="w-1/5">
                                {textKey && (
                                    <Input
                                        type="color"
                                        value={theme[textKey]}
                                        onChange={(e) => handleChange(textKey, e.target.value)}
                                        className="w-full h-10 p-0 border-none"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <Button onClick={handleApply}>Apply Theme</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
