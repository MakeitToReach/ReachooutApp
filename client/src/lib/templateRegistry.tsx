import { PF_STATIC_DATA } from "@/static_data/professional/PFStaticData";
import { TEST_STATIC_DATA } from "@/static_data/test/TestStaticData";
import { ProfessionalPortfolio } from "@/templates/professional";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";
import LanderPortfolio from "@/templates/test";

export const TEMPLATE_REGISTRY = {
    professional: {
        data: PF_STATIC_DATA,
        component: ProfessionalPortfolio,
        editorSchema: PF_EDITOR_SCHEMA
    },
    test: {
        data: TEST_STATIC_DATA,
        component: LanderPortfolio,
        editorSchema: PF_EDITOR_SCHEMA
    },
};
