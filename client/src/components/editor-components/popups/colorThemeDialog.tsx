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

export function ThemePickerDialog({ children }: { children: React.ReactNode }) {
    const getInitialTheme = () => {
        if (typeof window === "undefined")
            return {
                primary: "#4f46e5",
                secondary: "#22c55e",
                textPrimary: "#111827",
                textSecondary: "#6b7280",
            };

        const root = document.documentElement;
        const style = getComputedStyle(root);

        return {
            primary: style.getPropertyValue("--template-primary").trim(),
            secondary: style.getPropertyValue("--color-secondary").trim(),
            textPrimary: style.getPropertyValue("--color-text-primary").trim(),
            textSecondary: style.getPropertyValue("--color-text-secondary").trim(),
        };
    };
    const [theme, setTheme] = React.useState(getInitialTheme);

    const handleChange = (key: keyof typeof theme, value: string) => {
        setTheme((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        // For demonstration, we apply to document root CSS vars
        const root = document.documentElement;
        root.style.setProperty("--template-primary", theme.primary);
        root.style.setProperty("--color-secondary", theme.secondary);
        root.style.setProperty("--color-text-primary", theme.textPrimary);
        root.style.setProperty("--color-text-secondary", theme.textSecondary);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customize Theme Colors !!WIP!!</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {(
                        [
                            ["primary", "Primary"],
                            ["secondary", "Secondary"],
                            ["textPrimary", "Text Primary"],
                            ["textSecondary", "Text Secondary"],
                        ] as const
                    ).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between gap-4">
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                                id={key}
                                type="color"
                                // value={theme[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="w-20 h-10 p-0 border-none"
                            />
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
