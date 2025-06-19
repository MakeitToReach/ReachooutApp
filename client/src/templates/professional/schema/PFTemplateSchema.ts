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
      sectionName: "Hero";
      data: PF_HERO_SECTION;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "about";
      sectionName: "About";
      data: PF_ABOUT_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "projects";
      sectionName: "Projects";
      data: PF_WORK_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "client";
      sectionName: "Client";
      data: PF_CLIENT_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "testimonials";
      sectionName: "Testimonials";
      data: PF_TESTIMONIAL_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "services";
      sectionName: "Services";
      data: PF_SERVICE_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "service-catalog";
      sectionName: "Sevice Catalog";
      data: PF_CATALOG_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "navbar";
      sectionName: "Navbar";
      data: PF_NAVBAR_SECTION;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: false;
      isHidden: false;
    }
  | {
      type: "team";
      sectionName: "Team";
      data: PF_TEAM_MEMBER_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "contact";
      sectionName: "Contact";
      data: null;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: false;
      isHidden: false;
    }
  | {
      type: "gallery";
      sectionName: "Gallery";
      data: PF_GALLERY_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "contact widgets";
      sectionName: "Contact Widgets";
      data: PF_WIDGETS_SECTION;
      menuItem: { text: string; link: string };
      isFixed: false;
      isEditable: true;
      isHidden: false;
    }
  | {
      type: "footer";
      sectionName: "Footer";
      data: PF_FOOTER_SECTION;
      menuItem: { text: string; link: string };
      isFixed: true;
      isEditable: false;
      isHidden: false;
    };

export type PF_TMP_SCHEMA = GenericTemplateSchema<PF_SECTION_BLOCK>;
