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

type ThemePickerDialogProps = {
    children: React.ReactNode;
    initialTheme: ThemeObject;
    onThemeChange: (newTheme: ThemeObject) => void;
};

// Define a config array to drive the UI
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
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="z-[100]">
                <DialogHeader>
                    <DialogTitle>Customize Theme Colors</DialogTitle>
                </DialogHeader>

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
