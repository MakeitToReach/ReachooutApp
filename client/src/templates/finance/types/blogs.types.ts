export type F_BLOG = {
    category: string;
    title: string;
    description: string;
    imgUrl: string;
    author: string;
    authorImgUrl: string;
};
export interface F_BLOGS_SECTION {
    heading: string;
    blogs: F_BLOG[];
}
