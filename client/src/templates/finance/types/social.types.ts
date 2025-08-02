export interface F_SOCIAL {
    title: string;
    btnLink: string;
    followerCounts?: number;
}

export interface F_SOCIAL_SECTION {
    heading: string;
    subHeading: string;
    socials: F_SOCIAL[];
} 