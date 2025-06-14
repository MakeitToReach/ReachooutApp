import { DEV_STATIC_DATA } from "@/static_data/dev/DEVStaticData";
import { PF_STATIC_DATA } from "@/static_data/professional";
import { DevPortfolio } from "@/templates/dev";
import { DEV_EDITOR_SCHEMA } from "@/templates/dev/schema/DVEditorSchema";
import { ProfessionalPortfolio } from "@/templates/professional";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";

// TODO: instead of the data in the registry, fetch the data from the backend for isNew preview
export const TEMPLATE_REGISTRY = {
    professional: {
        data: PF_STATIC_DATA,
        component: ProfessionalPortfolio,
        editorSchema: PF_EDITOR_SCHEMA,
    },
    dev: {
        data: DEV_STATIC_DATA,
        component: DevPortfolio,
        editorSchema: DEV_EDITOR_SCHEMA,
    },
};
