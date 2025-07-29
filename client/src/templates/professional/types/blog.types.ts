export type PF_BLOG = {
    title: string;
    imgUrl: string;
    description: string;
    btnText?: string;
    btnLink?: string;
}

export interface PF_BLOG_SECTION {
    heading: string;
    blogs: PF_BLOG[];
}
