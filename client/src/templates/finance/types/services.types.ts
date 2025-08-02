export type F_SERVICE = {
    title: string;
    description: string;
    imgUrl: string;
    category: string;
    btnText?: string;
    btnLink?: string;
};

export interface F_SERVICE_SECTION {
    badgeText: string;
    title: string;
    subtitle: string;
    services: F_SERVICE[];
}
