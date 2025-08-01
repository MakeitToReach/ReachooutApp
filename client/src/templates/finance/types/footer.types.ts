export type F_SOCIAL = {
    name: string;
    url?: string
}
export type F_FOOTER_SECTION = {
    logoText: string;
    logoUrl?: string;
    description: string;
    address: string;
    email: string;
    phone: string;
    qrCodeUrl?: string;
    socials: F_SOCIAL[]
    privacyPolicyContent?: string;
    termsAndConditionsContent?: string;
};