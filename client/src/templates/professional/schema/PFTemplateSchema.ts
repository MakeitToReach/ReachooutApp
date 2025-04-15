import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { PF_ABOUT_SECTION } from "../types/aboutSection";
import { PF_CLIENT_SECTION } from "../types/clientSection";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PF_HERO_SECTION } from "../types/heroSection";
import { PF_SERVICE_SECTION } from "../types/serviceSection";
import { PF_SOCIAL_SECTION } from "../types/socialSection";
import { PF_WORK_SECTION } from "../types/workSection";

export type PF_SECTION_BLOCK =
  | { type: "hero"; data: PF_HERO_SECTION; isFixed: true, isEditable: true }
  | { type: "about"; data: PF_ABOUT_SECTION; isFixed: false, isEditable: true }
  | { type: "projects"; data: PF_WORK_SECTION; isFixed: false, isEditable: true }
  | { type: "client"; data: PF_CLIENT_SECTION; isFixed: false, isEditable: true }
  | { type: "social"; data: PF_SOCIAL_SECTION; isFixed: false, isEditable: true }
  | { type: "gallery"; data: PF_GALLERY_SECTION; isFixed: false, isEditable: true }
  | { type: "services"; data: PF_SERVICE_SECTION; isFixed: false, isEditable: true }
  | { type: "navbar"; data: null; isFixed: true, isEditable: false }
  | { type: "contact"; data: null; isFixed: true, isEditable: false }
  | { type: "footer"; data: null; isFixed: true , isEditable: false};

export type PF_TMP_SCHEMA = GenericTemplateSchema<PF_SECTION_BLOCK>;
