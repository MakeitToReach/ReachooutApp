"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
// import type { ThemeObject, ThemeEntry } from "@/types";
import themesJson from "@/static_data/themes.json";
import { usePortfolioStore } from "@/store/portfolio.store";
import type { ThemeObject } from "@/schemas/templates.schema";

type ThemeEntry = {
    name: string;
    theme: ThemeObject;
};

interface ThemeSelectDropdownProps {
    value?: ThemeEntry;
}
export function ThemeSelectDropdown({ value }: ThemeSelectDropdownProps) {
    const [selectedThemeName, setSelectedThemeName] = useState<string | null>(
        null,
    );
    const { setThemeObject } = usePortfolioStore();
    const themes: ThemeEntry[] = themesJson;

    const handleThemeChange = (themeName: string) => {
        const selected = themes.find((theme) => theme.name === themeName);
        if (selected) {
            setSelectedThemeName(selected.name);
            setThemeObject(selected.theme);
        }
    };

    return (
        <Select
            onValueChange={handleThemeChange}
            value={value?.name || selectedThemeName || ""}
        >
            <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent className="z-[100]">
                {themes.map(({ name, theme }) => (
                    <SelectItem key={name} value={name}>
                        <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                                {[
                                    "--template-primary",
                                    "--template-secondary",
                                    "--template-accent-primary",
                                    "--template-accent-secondary",
                                    "--template-btn",
                                ].map((key) => (
                                    <span
                                        key={key}
                                        className="w-4 h-4 rounded-md border border-gray-200"
                                        style={{ backgroundColor: theme[key as keyof ThemeObject] }}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm">{name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
