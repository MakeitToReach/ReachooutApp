import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { DEV_HERO_SECTION } from "../types/heroSection.types";
import { DEV_PROJECT_SECTION } from "../types/projectSection.types";

export type DEV_SECTION_BLOCK =
  | {
      type: "hero";
      data: DEV_HERO_SECTION;
      isFixed: true;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "projects";
      data: DEV_PROJECT_SECTION;
      isFixed: false;
      isEditable: true;
      isHidden: false;
    };

export type DEV_TMP_SCHEMA = GenericTemplateSchema<DEV_SECTION_BLOCK>;
