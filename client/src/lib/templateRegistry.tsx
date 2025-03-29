import { PF_STATIC_DATA } from "@/static_data/professional/PFTemplate";
import { ProfessionalPortfolio } from "@/templates/professional";
// import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";

export const TEMPLATE_REGISTRY = {
  professional: {
    schema: PF_STATIC_DATA,
    component: ProfessionalPortfolio,
  },
};
