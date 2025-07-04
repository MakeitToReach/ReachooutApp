export type PF_GALLERY_IMG = {
    src: string;
    alt: string;
}
export type PF_GALLERY_ITEM = {
    items: PF_GALLERY_IMG[]
};

export type PF_GALLERY_SECTION = {
    heading: string;
    imgs: PF_GALLERY_IMG[];
};
