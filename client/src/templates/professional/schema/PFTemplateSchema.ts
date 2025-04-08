import { PF_ABOUT_SECTION } from "../types/aboutSection";
import { PF_CLIENT_SECTION } from "../types/clientSection";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PF_HERO_SECTION } from "../types/heroSection";
import { PF_SERVICE_SECTION } from "../types/serviceSection";
import { PF_SOCIAL_SECTION } from "../types/socialSection";
import { PF_WORK_SECTION } from "../types/workSection";

export interface PF_TMP_SCHEMA {
    id: string;
    name: string;

    sections: {
        heroSection: PF_HERO_SECTION;
        aboutSection: PF_ABOUT_SECTION;
        workSection: PF_WORK_SECTION;
        clientSection: PF_CLIENT_SECTION;
        socialSection: PF_SOCIAL_SECTION;
        gallerySection?: PF_GALLERY_SECTION;
        servicesSection?: PF_SERVICE_SECTION;
    };
}
