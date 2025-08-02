export interface F_CERTIFICATION {
    title: string;
    imgUrl: string;
}

export interface F_CERTIFICATION_SECTION {
    heading: string;
    subHeading?: string;
    certifications: F_CERTIFICATION[];
} 