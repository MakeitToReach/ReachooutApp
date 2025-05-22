import { DEV_STATIC_DATA } from "@/static_data/dev/DEVStaticData";
import {
  PF_STATIC_DATA,
  PF_STATIC_INDIE_DATA,
  PF_STATIC_ORG_DATA,
} from "@/static_data/professional";
import { DevPortfolio } from "@/templates/dev";
import { DEV_EDITOR_SCHEMA } from "@/templates/dev/schema/DVEditorSchema";
import { ProfessionalPortfolio } from "@/templates/professional";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";

export const TEMPLATE_REGISTRY = {
  professional: {
    data: PF_STATIC_DATA,
    individualData: PF_STATIC_INDIE_DATA,
    organizationData: PF_STATIC_ORG_DATA,
    component: ProfessionalPortfolio,
    editorSchema: PF_EDITOR_SCHEMA,
    theme: {
      "--template-primary": "#0d6efd", // blue
      "--template-secondary": "#6c757d", // gray
    },
  },
  dev: {
    data: DEV_STATIC_DATA,
    individualData: PF_STATIC_DATA,
    organizationData: PF_STATIC_DATA,
    component: DevPortfolio,
    editorSchema: DEV_EDITOR_SCHEMA,
    theme: {
      "--template-primary": "#6c757d", // blue
      "--template-secondary": "#6c757d", // gray
    },
  },
};
