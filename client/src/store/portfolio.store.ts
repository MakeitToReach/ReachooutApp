import { getSectionByType } from "@/lib/utils";
import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";
import { create } from "zustand";

type SectionType = PF_TMP_SCHEMA["sections"][number]["type"];

interface PortfolioState {
    data: PF_TMP_SCHEMA["sections"][number]["data"] | null;

    setSectionField: (
        type: string,
        key: string,
        value: any, // eslint-disable-line
    ) => void;

    updateArrayItemField: (
        type: SectionType,
        arrayKey: string,
        index: number,
        key: string,
        value: any, //eslint-disable-line
    ) => void;

    //usage
    // updateArrayItemField("about", "stats", 0, "value", 100);
    // updateArrayItemField("work", "projects", 2, "title", "Updated Project");
    // updateArrayItemField("services", "services", 1, "icon", "rocket");

    resetData: (newData: PF_TMP_SCHEMA) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null,

    updateArrayItemField: (
        type: SectionType,
        arrayKey: string,
        index: number,
        key: string,
        value: any, //eslint-disable-line
    ) =>
        set((state) => {
            const section = getSectionByType(state.data, type);

            if (!section || !Array.isArray((section as any)[arrayKey])) return state; //eslint-disable-line

            return {
                data: {
                    ...state.data!,
                    sections: state.data!.sections.map((s) =>
                        s.type === type
                            ? {
                                ...s,
                                [arrayKey]: (s as any)[arrayKey].map(//eslint-disable-line
                                    (item: any, i: number) => //eslint-disable-line
                                        i === index ? { ...item, [key]: value } : item,
                                ),
                            }
                            : s,
                    ),
                },
            };
        }),
    setSectionField: (type, key, value) =>
        set((state) => ({
            data: {
                ...state.data!,
                sections: state.data!.sections.map((section) =>
                    section.type === type ? { ...section, [key]: value } : section,
                ),
            },
        })),

    resetData: (newData) => set({ data: newData }),
}));
