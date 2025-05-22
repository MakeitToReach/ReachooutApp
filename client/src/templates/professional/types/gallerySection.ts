export type PF_GALLERY_IMG = {
    img: string;
    title: string;
}
export type PF_GALLERY_ITEM = {
    items: PF_GALLERY_IMG[]
};

export type PF_GALLERY_SECTION = {
    gallery: PF_GALLERY_ITEM[];
};
