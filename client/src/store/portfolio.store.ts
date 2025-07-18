import {
    GenericTemplateSchema,
    SectionBlock,
    ThemeObject,
} from "@/schemas/templates.schema";
import { create } from "zustand";
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";

type TemplateSchema = GenericTemplateSchema;

interface PortfolioState {
    data: TemplateSchema | null;
    currentEditingSection: string | null;
    setCurrentEditingSection: (id: string | null) => void;
    resetData: (newData: TemplateSchema | null) => void;
    setSectionField: (
        sectionType: string,
        fieldPath: string,
        value: any, //eslint-disable-line
    ) => void;

    toggleHideSection: (sectionType: string) => void;

    reorderSections: (newOrder: string[]) => void;

    setThemeObject: (themeObject: ThemeObject) => void;

    setSectionName: (sectionType: string, newName: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null,
    currentEditingSection: null,
    setCurrentEditingSection: (id) => set({ currentEditingSection: id }),
    resetData: (newData) => set({ data: newData }),
    toggleHideSection: (sectionType) => {
        set((state) => {
            if (!state.data) return {};

            const newData = _cloneDeep(state.data);
            const section = newData.sections.find(
                (s: SectionBlock) => s.type === sectionType,
            );

            if (!section) return {};

            section.isHidden = !section.isHidden;

            return { data: newData };
        });
    },

    setSectionName: (sectionType: string, newName: string) => {
        set((state) => {
            if (!state.data) return {};

            const newData = _cloneDeep(state.data);
            const section = newData.sections.find(
                (s: SectionBlock) => s.type === sectionType,
            );

            if (!section) return {};

            section.sectionName = newName;

            return { data: newData };
        });
    },

    setSectionField: (sectionType, fieldPath, value) => {
        set((state) => {
            if (!state.data) return {};

            const newData = _cloneDeep(state.data);
            const section = newData.sections.find(
                (s: SectionBlock) => s.type === sectionType,
            );

            if (!section || !section.data) return {};

            _set(section.data, fieldPath, value);

            return { data: newData };
        });
    },

    reorderSections: (newOrder) => {
        set((state) => {
            if (!state.data) return {};

            const newData = _cloneDeep(state.data);

            const sectionsByType = Object.fromEntries(
                newData.sections.map((section) => [section.type, section]),
            );

            const reorderedSections = newOrder
                .map((type) => sectionsByType[type])
                .filter(Boolean); // removes any undefined sections

            newData.sections = reorderedSections;

            return { data: newData };
        });
    },

    setThemeObject: (newTheme: ThemeObject) => {
        set((state) => {
            if (!state.data) return {};

            const newData = _cloneDeep(state.data);
            newData.theme = newTheme;
            return { data: newData };
        });
    },
}));
