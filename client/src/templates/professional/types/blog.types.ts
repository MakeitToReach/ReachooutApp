export type PF_BLOG = {
    title: string;
    imgUrl: string;
    description: string;
    vidUrl?: string;
    btnText?: string;
    btnLink?: string;
}

export interface PF_BLOG_SECTION {
    heading: string;
    subheading?: string;
    blogs: PF_BLOG[];
}
