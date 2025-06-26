import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { F_HERO_SECTION } from "../types/hero.types";
import { F_CONTACT_SECTION } from "../types/contact.types";

export type F_SECTION_BLOCK =
  | {
      type: "hero";
      sectionName: "hero";
      data: F_HERO_SECTION;
      isFixed: true;
      isEditable: true;
      isHidden: false;
    }
| {
    type: "contact";
    sectionName: "contact";
    data: F_CONTACT_SECTION;
    isFixed: false;
    isEditable: true;
    isHidden: false;
  };

export type F_TMP_SCHEMA = GenericTemplateSchema<F_SECTION_BLOCK>;
