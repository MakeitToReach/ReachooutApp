export type PF_PROJECT = {
    heading: string;
    // subtitle: string;
    imgUrl?: string;
    vidUrl?: string;
    description: string;
    btnText: string;
    btnLink: string;
    category: string;
};

export type PF_WORK_SECTION = {
    projects: PF_PROJECT[];
    heading: string;
    subheading?: string;
};
