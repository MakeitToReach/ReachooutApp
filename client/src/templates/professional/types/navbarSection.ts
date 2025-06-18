type PF_NAVBAR_SECTION_ITEM = {
    name: string;
    href: string;
}
export type PF_NAVBAR_SECTION = {
    logoUrl?: string;
    textLogo?: string;
    sections: PF_NAVBAR_SECTION_ITEM[];
};
