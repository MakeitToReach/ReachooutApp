export type F_BLOG = {
    title: string;
    description: string;
    imgUrl: string;
    vidUrl?: string;
    btnLink?: string;
    btnText?: string;
};
export interface F_BLOGS_SECTION {
    heading: string;
    blogs: F_BLOG[];
}
