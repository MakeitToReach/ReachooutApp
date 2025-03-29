import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";
import { create } from "zustand";

interface PortfolioState {
    data: PF_TMP_SCHEMA | null; // Stores the portfolio data
    setSectionField: (
        section: keyof PF_TMP_SCHEMA["sections"],
        key: string,
        // eslint-disable-next-line
        value: any,
    ) => void;
    resetData: (newData: PF_TMP_SCHEMA) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null, // Initially empty
    setSectionField: (section, key, value) =>
        set((state) => ({
            data: {
                ...state.data!,
                sections: {
                    ...state.data!.sections,
                    [section]: {
                        ...state.data!.sections[section],
                        [key]: value,
                    },
                },
            },
        })),
    resetData: (newData) => set({ data: newData }),
}));
