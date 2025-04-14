import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PF_SECTION_BLOCK, PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";
import { usePortfolioStore } from "@/store/portfolio.store";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSectionByType<
    T extends PF_TMP_SCHEMA["sections"][number]["type"],
>(
    data: PF_TMP_SCHEMA | null,
    type: T,
): Extract<PF_TMP_SCHEMA["sections"][number], { type: T }> | undefined {
    return data?.sections.find((s) => s.type === type) as
        | Extract<PF_TMP_SCHEMA["sections"][number], { type: T }>
        | undefined;
}


export const useSection = (type: PF_SECTION_BLOCK["type"]) =>
  usePortfolioStore((state) => state.data?.sections.find((s) => s.type === type));
