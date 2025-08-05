export type PF_TESTIMONIAL = {
    name: string;
    body: string;
    img: string
}
export type PF_TESTIMONIAL_SECTION = {
    title: string;
    subtitle?: string;
    testimonials: PF_TESTIMONIAL[];
}
