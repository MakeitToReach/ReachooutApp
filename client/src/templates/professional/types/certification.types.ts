export type PF_CERTIFICATION = {
    imgUrl: string;
    subtitle: string;
};

export interface PF_CERTIFICATION_SECTION {
    heading: string;
    subheading?: string;
    certifications: PF_CERTIFICATION[];
} 