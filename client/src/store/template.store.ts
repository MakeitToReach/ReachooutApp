import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { create } from "zustand";
// import { persist } from "zustand/middleware";

interface TemplateStore {
  templates: GenericTemplateSchema[];
  setTemplates: (templates: GenericTemplateSchema[]) => void;
}
export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  setTemplates: (templates: GenericTemplateSchema[]) =>
    set({ templates: templates }),
}));
