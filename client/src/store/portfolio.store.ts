// import { getSectionByType } from "@/lib/utils";
import { SectionItem } from "@/components/editor-components/SectionsPopup";
import {
    PF_SECTION_BLOCK,
    PF_TMP_SCHEMA,
} from "@/templates/professional/schema/PFTemplateSchema";
import { create } from "zustand";

export type SectionType = PF_TMP_SCHEMA["sections"][number]["type"];

interface PortfolioState {
    data: PF_TMP_SCHEMA | null;

    setSectionField: (
        type: SectionType,
        key: string,
        value: any, // eslint-disable-line
    ) => void;

    updateArrayItemField: (
        type: SectionType,
        arrayKey: string,
        index: number,
        key: string,
        value: any, // eslint-disable-line
    ) => void;

    resetData: (newData: PF_TMP_SCHEMA) => void;

    reorderSections: (newSections: SectionItem[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null,

    reorderSections: (newSections: SectionItem[]) =>
        set((state) => ({
            data: {
                ...state.data,
                sections: newSections,
            },
        })),

    setSectionField: (type, key, value) =>
        set((state) => {
            if (!state.data) return state;

            const updatedSections: PF_SECTION_BLOCK[] = state.data.sections.map(
                (section) => {
                    if (section.type !== type || section.data === null) return section;

                    return {
                        ...section,
                        data: {
                            ...section.data,
                            [key]: value,
                        },
                    } as PF_SECTION_BLOCK;
                },
            );

            return {
                data: {
                    ...state.data,
                    sections: updatedSections,
                },
            };
        }),

    updateArrayItemField: (type, arrayKey, index, key, value) =>
        set((state) => {
            if (!state.data) return state;

            const updatedSections: PF_SECTION_BLOCK[] = state.data.sections.map(
                (section) => {
                    if (section.type !== type || section.data === null) return section;

                    const array = (section.data as Record<string, any>)[arrayKey]; //eslint-disable-line
                    if (!Array.isArray(array)) return section;

                    const updatedArray = array.map(
                        (
                            item: any, //eslint-disable-line
                            i: number,
                        ) => (i === index ? { ...item, [key]: value } : item),
                    );

                    return {
                        ...section,
                        data: {
                            ...section.data,
                            [arrayKey]: updatedArray,
                        },
                    } as PF_SECTION_BLOCK;
                },
            );

            return {
                data: {
                    ...state.data,
                    sections: updatedSections,
                },
            };
        }),

    resetData: (newData) => set({ data: newData }),
}));
