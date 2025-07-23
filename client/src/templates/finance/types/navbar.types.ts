export type F_NAVBAR_SECTION_ITEM = {
    name: string;
    href: string;
}

export type F_NAVBAR_SECTION = {
    logoUrl?: string;
    textLogo?: string;
    sections: F_NAVBAR_SECTION_ITEM[];
    btnText: string;
    btnLink: string;
    qrCodeUrl?: string; // Added for QR code popup support
}; 