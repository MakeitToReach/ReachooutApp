export type PF_SOCIAL = {
    icon: string;
    title: string;
    followerCounts?: number;
    socialLink: string;
};
export type PF_SOCIAL_SECTION = {
    heading: string;
    subHeading: string;
    socials: PF_SOCIAL[];
};
