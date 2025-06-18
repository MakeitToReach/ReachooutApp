import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { PF_CLIENT_SECTION } from "../types/clientSection";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PF_HERO_SECTION } from "../types/heroSection";
import { PF_SERVICE_SECTION } from "../types/serviceSection";
import { PF_WORK_SECTION } from "../types/workSection";
import { PF_NAVBAR_SECTION } from "../types/navbarSection";
import { PF_TESTIMONIAL_SECTION } from "../types/testimonials.types";
import { PF_FOOTER_SECTION } from "../types/footer.types";
import { PF_ABOUT_SECTION } from "../types/about.types";
import { PF_TEAM_MEMBER_SECTION } from "../types/teamMember.types";
import { PF_CATALOG_SECTION } from "../types/serviceCatalog.types";
import { PF_WIDGETS_SECTION } from "../types/widgets.types";

export type PF_SECTION_BLOCK =
  | {
      type: "hero";
      data: PF_HERO_SECTION;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "about";
      data: PF_ABOUT_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "projects";
      data: PF_WORK_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "client";
      data: PF_CLIENT_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "gallery";
      data: PF_GALLERY_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "testimonials";
      data: PF_TESTIMONIAL_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "services";
      data: PF_SERVICE_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "service-catalog";
      data: PF_CATALOG_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "navbar";
      data: PF_NAVBAR_SECTION;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: false;
      isHidden: false;
    }
  | {
      type: "team";
      data: PF_TEAM_MEMBER_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "contact";
      data: null;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: false;
      isHidden: false;
    }
  | {
      type: "gallery";
      data: PF_GALLERY_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "contact widgets";
      data: PF_WIDGETS_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "footer";
      data: PF_FOOTER_SECTION;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: false;
      isHidden: false;
    };

export type PF_TMP_SCHEMA = GenericTemplateSchema<PF_SECTION_BLOCK>;
