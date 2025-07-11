import { F_STATIC_DATA } from "@/static_data/finance/FStaticData";
import { PF_STATIC_DATA } from "@/static_data/professional";
import { FinancePortfolio } from "@/templates/finance";
import { F_EDITOR_SCHEMA } from "@/templates/finance/schema/FEditorSchema";
import { ProfessionalPortfolio } from "@/templates/professional";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";

// TODO: instead of the data in the registry, fetch the data from the backend for isNew preview
export const TEMPLATE_REGISTRY = {
    professional: {
        data: PF_STATIC_DATA,
        component: ProfessionalPortfolio,
        editorSchema: PF_EDITOR_SCHEMA,
    },
    finance: {
        data: F_STATIC_DATA,
        component: FinancePortfolio,
        editorSchema: F_EDITOR_SCHEMA,
    },
};
