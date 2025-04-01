//eslint-disable
import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";
import { create } from "zustand";

interface PortfolioState {
    data: PF_TMP_SCHEMA | null; // Stores the portfolio data

    // Updates a specific section field (for primitives like title, colorTitle, description)
    setSectionField: (
        section: keyof PF_TMP_SCHEMA["sections"],
        key: string,
        value: any, // eslint-disable-line
    ) => void;

    // Updates a specific stat inside the stats array
    setStatField: (
        section: keyof PF_TMP_SCHEMA["sections"], // Section containing stats[]
        statIndex: number, // Index of the stat in the array
        key: keyof PF_TMP_SCHEMA["sections"]["aboutSection"]["stats"][number], // Key inside stat
        value: any, // eslint-disable-line
    ) => void;

    setProjectField: (
        section: keyof PF_TMP_SCHEMA["sections"],
        statIndex: number,
        key: keyof PF_TMP_SCHEMA["sections"]["workSection"]["projects"][number],
        value: any, // eslint-disable-line
    ) => void;

    addProject: (
        // section: keyof PF_TMP_SCHEMA["sections"],
        project: PF_TMP_SCHEMA["sections"]["workSection"]["projects"][number],
    ) => void;

    // Resets the entire portfolio data
    resetData: (newData: PF_TMP_SCHEMA) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null, // Initially empty

    // Update a primitive section field
    setSectionField: (section, key, value) =>
        set((state) => ({
            data: {
                ...state.data!,
                sections: {
                    ...state.data!.sections,
                    [section]: {
                        ...state.data!.sections[section],
                        [key]: value, // Works for primitive values
                    },
                },
            },
        })),

    // Update a specific stat inside the stats array
    setStatField: (
        section: keyof PF_TMP_SCHEMA["sections"],
        statIndex: number,
        key: string,
        value: any, //eslint-disable-line
    ) =>
        set((state) => {
            const sectionData = state.data!.sections[section];

            if (
                !sectionData ||
                !("stats" in sectionData) ||
                !Array.isArray(sectionData.stats)
            )
                return state;

            return {
                data: {
                    ...state.data!,
                    sections: {
                        ...state.data!.sections,
                        [section]: {
                            ...sectionData,
                            stats: sectionData.stats.map((stat, index: number) =>
                                index === statIndex ? { ...stat, [key]: value } : stat,
                            ),
                        },
                    },
                },
            };
        }),

    setProjectField: (
        section: keyof PF_TMP_SCHEMA["sections"],
        statIndex: number,
        key: string,
        value: any, //eslint-disable-line
    ) =>
        set((state) => {
            const sectionData = state.data!.sections[section];

            // Ensure the section exists and has a 'projects' array
            if (
                !sectionData ||
                !("projects" in sectionData) ||
                !Array.isArray(sectionData.projects)
            )
                return state;

            return {
                data: {
                    ...state.data!,
                    sections: {
                        ...state.data!.sections,
                        [section]: {
                            ...sectionData,
                            projects: sectionData.projects.map((stat, index) =>
                                index === statIndex ? { ...stat, [key]: value } : stat,
                            ),
                        },
                    },
                },
            };
        }),

    addProject(project) {
        set((state) => ({
            data: {
                ...state.data!,
                sections: {
                    ...state.data!.sections,
                    workSection: {
                        ...state.data!.sections.workSection,
                        projects: [...state.data!.sections.workSection.projects, project],
                    },
                },
            },
        }));
    },

    // Reset portfolio data
    resetData: (newData) => set({ data: newData }),
}));
