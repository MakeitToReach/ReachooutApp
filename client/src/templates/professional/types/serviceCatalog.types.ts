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
    catalogServices: PF_CATALOG[];
};
