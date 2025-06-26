export type F_TESTIMONIAL={
    avatarUrl: string;
    name: string;
    designation: string;
    message: string;
    rating: number;
}

export interface F_TESTIMONIAL_SECTION {
    badgeText: string;
    title: string;
    description: string;
    btnText: string;
    btnLink: string;
    testimonials: F_TESTIMONIAL[]
}
