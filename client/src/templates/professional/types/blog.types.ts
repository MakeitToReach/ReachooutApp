export type PF_BLOG = {
    title: string;
    imgUrl: string;
    description: string;
}

export interface PF_BLOG_SECTION {
    heading: string;
    blogs: PF_BLOG[];
}
