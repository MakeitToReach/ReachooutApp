export type F_CATLOG_SERVICES = {
    title: string;
    description: string;
    imgUrls: string[];
    category: string;
};

export interface F_SERVICE_CATALOG_SECTION {
    badgeText: string;
    title: string;
    subtitle: string;
    catalogServices: F_CATLOG_SERVICES[];
}
