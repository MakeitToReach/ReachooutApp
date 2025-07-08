export type PF_SOCIAL = {
    title: string;
    followerCounts?: number; 
    btnLink: string;
    // btnText: string;
};
export type PF_SOCIAL_SECTION = {
    heading: string;
    subHeading: string;
    socials: PF_SOCIAL[];
};
