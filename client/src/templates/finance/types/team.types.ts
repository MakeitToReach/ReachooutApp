export type F_TEAM_MEMBER = {
    imgUrl: string;
    name: string;
    designation: string;
    description: string;
    socials: {
        name: string;
        url?: string;
    }[];
};

export interface F_TEAM_SECTION {
    heading: string;
    subheading?: string;
    team: F_TEAM_MEMBER[];
}
