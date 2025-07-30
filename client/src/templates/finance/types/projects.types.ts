export type F_PROJECT = {
    title: string;
    description: string;
    imgUrl: string;
    projectUrl: string;
    category: string;
    vidUrl?: string;
}
export interface F_PROJECTS_SECTION {
    title: string;
    subtitle: string;
    projects: F_PROJECT[]
}
