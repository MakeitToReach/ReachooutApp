import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICONS_REGISTRY, SOCIAL_ICONS_REGISTRY } from "./iconsRegistry";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function extractNumericValue(val: string | number): number {
    if (typeof val === "number") return val;
    const match = val.match(/^(\d+(\.\d+)?)/); // Matches leading number with optional decimal
    return match ? parseFloat(match[0]) : 0;
}

export function splitNumericValue(val: string | number): {
    number: number;
    suffix: string;
} {
    if (typeof val === "number") return { number: val, suffix: "" };

    const match = val.trim().match(/^(\d+(\.\d+)?)(.*)$/);
    if (match) {
        return {
            number: parseFloat(match[1]),
            suffix: match[3].trim(), // "Cr", "+", "%", etc.
        };
    }
    return { number: 0, suffix: "" };
}
export function formatCompactNumber(number: number, locale: string = "en") {
    return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);
}

export function getTrimmedTextWithToggle(
    text: string,
    maxLength: number = 100,
): {
    isLong: boolean;
    shortText: string;
    fullText: string;
} {
    const trimmed = text.trim();
    const isLong = trimmed.length > maxLength;
    const shortText = isLong ? trimmed.slice(0, maxLength) + "..." : trimmed;

    return {
        isLong,
        shortText,
        fullText: trimmed,
    };
}

export function getIconFromRegistry(
    icon: string,
    //eslint-disable-next-line
    props?: React.ComponentProps<any>,
) {
    return ICONS_REGISTRY.find((item) => item.label === icon)?.icon(props);
}

export function getSocialIconFromRegistry(icon: string) {
    return SOCIAL_ICONS_REGISTRY.find((item) => item.label === icon)?.icon;
}

export const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

export const getYouTubeVideoId = (url: string | undefined) => {
    if (!url) return null;
    const regExp =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};
