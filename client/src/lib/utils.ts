import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICONS_REGISTRY } from "./iconsRegistry";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
  maxLength: number = 100
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

export function getIconFromRegistry(icon: string) {
  return ICONS_REGISTRY.find((item) => item.label === icon)?.icon;
}
