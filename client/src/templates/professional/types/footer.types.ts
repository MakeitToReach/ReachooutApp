export type PF_SOCIAL = {
    name: string;
    url?: string
}
export type PF_FOOTER_SECTION = {
    logoText: string;
    logoUrl?: string;
    description: string;
    address: string;
    email: string;
    phone: string;
    qrCodeUrl?: string;
    socials: PF_SOCIAL[]
};
