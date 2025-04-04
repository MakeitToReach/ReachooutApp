import { TEMPLATES_SCHEMA } from "@/types/templates.types";
import { create } from "zustand";
// import { persist } from "zustand/middleware";

interface TemplateStore {
  templates: TEMPLATES_SCHEMA[];
  setTemplates: (templates: TEMPLATES_SCHEMA[]) => void;
}
export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  setTemplates: (templates: TEMPLATES_SCHEMA[]) =>
    set({ templates: templates }),
}));
