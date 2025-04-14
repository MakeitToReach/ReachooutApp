import {
  GenericTemplateSchema,
  SectionBlock,
} from "@/schemas/templates.schema";
import { create } from "zustand";
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";

type TemplateSchema = GenericTemplateSchema;

interface PortfolioState {
  data: TemplateSchema | null;
  resetData: (newData: TemplateSchema) => void;
  setSectionField: (
    sectionType: string,
    fieldPath: string,
    value: any, //eslint-disable-line
  ) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  data: null,
  resetData: (newData) => set({ data: newData }),

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
}));
