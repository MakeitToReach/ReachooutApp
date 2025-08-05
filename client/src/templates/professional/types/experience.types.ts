export type PF_EXPERIENCE_ITEM = {
    title: string;
    subtitle: string;
    description: string;
    timePeriod: string;
};

export interface PF_EXPERIENCE_SECTION {
    heading: string;
    subheading?: string;
    imgUrl: string;
    experiences: PF_EXPERIENCE_ITEM[];
}
