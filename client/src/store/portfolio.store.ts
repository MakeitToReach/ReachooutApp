import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { create } from "zustand";


type TemplateSchema = GenericTemplateSchema;

interface PortfolioState {
    data: TemplateSchema | null;
    resetData: (newData: TemplateSchema) => void;

}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null,
    resetData: (newData) => set({ data: newData }),
}));
