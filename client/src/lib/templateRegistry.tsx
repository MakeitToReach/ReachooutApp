import { DEV_STATIC_DATA } from "@/static_data/dev/DEVStaticData";
import { PF_STATIC_DATA } from "@/static_data/professional/PFStaticData";
import { TEST_STATIC_DATA } from "@/static_data/test/TestStaticData";
import { DevPortfolio } from "@/templates/dev";
import { DEV_EDITOR_SCHEMA } from "@/templates/dev/schema/DVEditorSchema";
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
    dev: {
        data: DEV_STATIC_DATA,
        component: DevPortfolio,
        editorSchema: DEV_EDITOR_SCHEMA
    }
};
