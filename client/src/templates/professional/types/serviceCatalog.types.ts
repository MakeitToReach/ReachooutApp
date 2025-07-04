export type PF_CATALOG = {
    title: string;
    imgUrls: string[];
    vidUrl?: string;
    description: string;
    btnText: string;
    btnLink: string;
    category: string;
};

export type PF_CATALOG_SECTION = {
    heading: string;
    catalogServices: PF_CATALOG[];
};
