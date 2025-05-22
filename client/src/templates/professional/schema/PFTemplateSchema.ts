import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { PF_ABOUT_SECTION } from "../types/aboutSection";
import { PF_CLIENT_SECTION } from "../types/clientSection";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PF_HERO_SECTION } from "../types/heroSection";
import { PF_SERVICE_SECTION } from "../types/serviceSection";
import { PF_WORK_SECTION } from "../types/workSection";
import { PF_NAVBAR_SECTION } from "../types/navbarSection";
import { PF_TESTIMONIAL_SECTION } from "../types/testimonials.types";
import { PF_FOOTER_SECTION } from "../types/footer.types";
import { PF_TEAM_MEMBER_SECTION } from "../types/teamMember.types";

export type PF_SECTION_BLOCK =
  | { type: "hero"; data: PF_HERO_SECTION; isFixed: true; isEditable: true }
  | { type: "about"; data: PF_ABOUT_SECTION; isFixed: false; isEditable: true }
  | {
      type: "projects";
      data: PF_WORK_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | {
      type: "client";
      data: PF_CLIENT_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | {
      type: "gallery";
      data: PF_GALLERY_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | {
      type: "testimonials";
      data: PF_TESTIMONIAL_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | {
      type: "services";
      data: PF_SERVICE_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | {
      type: "navbar";
      data: PF_NAVBAR_SECTION;
      isFixed: true;
      isEditable: false;
    }
  | {
      type: "team";
      data: PF_TEAM_MEMBER_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | { type: "contact"; data: null; isFixed: true; isEditable: false }
  | {
      type: "gallery";
      data: PF_GALLERY_SECTION;
      isFixed: false;
      isEditable: true;
    }
  | {
      type: "footer";
      data: PF_FOOTER_SECTION;
      isFixed: true;
      isEditable: false;
    };

export type PF_TMP_SCHEMA = GenericTemplateSchema<PF_SECTION_BLOCK>;
