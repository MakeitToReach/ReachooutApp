export type PF_CATALOG = {
    heading: string;
    // subtitle: string;
    imgUrl?: string[];
    vidUrl?: string;
    description: string;
    btnText: string;
    btnLink: string;
    category: string;
};

export type PF_CATALOG_SECTION = {
    projects: PF_CATALOG[];
};
