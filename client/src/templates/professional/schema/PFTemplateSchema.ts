import { PF_ABOUT_SECTION } from "../types/aboutSection";
import { PF_CLIENT_SECTION } from "../types/clientSection";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PF_HERO_SECTION } from "../types/heroSection";
import { PF_SERVICE_SECTION } from "../types/serviceSection";
import { PF_SOCIAL_SECTION } from "../types/socialSection";
import { PF_WORK_SECTION } from "../types/workSection";

export type PF_SECTION_BLOCK =
    | { type: "hero"; data: PF_HERO_SECTION }
    | { type: "about"; data: PF_ABOUT_SECTION }
    | { type: "projects"; data: PF_WORK_SECTION }
    | { type: "client"; data: PF_CLIENT_SECTION }
    | { type: "social"; data: PF_SOCIAL_SECTION }
    | { type: "gallery"; data: PF_GALLERY_SECTION }
    | { type: "services"; data: PF_SERVICE_SECTION }
    | { type: "navbar"; data: null }
    | { type: "contact"; data: null }
    | { type: "footer"; data: null };

export interface PF_TMP_SCHEMA {
    id: string;
    name: string;
    sections: PF_SECTION_BLOCK[];
}
