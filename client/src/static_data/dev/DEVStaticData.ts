import { GenericTemplateSchema } from "@/schemas/templates.schema";

export const DEV_STATIC_DATA: GenericTemplateSchema = {
    id: "dev-tmp",
    name: "dev",
    thumbnailUrl: "/Dev_template.png",
    theme: {
        "--template-primary": "#fffffc",
        "--template-secondary": "#1e3a8a",
        "--template-accent-primary": "#d6eef8",
        "--template-accent-secondary": "#fbe8d3",
        "--template-btn": "#111111",
        "--template-text-primary": "#111111",
        "--template-text-secondary": "#fffffc",
        "--template-text-accent-primary": "#4ade80",
        "--template-text-accent-secondary": "#fbe8d3",
        "--template-text-btn": "#fffffc",
    },
    sections: [
        {
            type: "hero",
            data: {
                title: "Hi, Im Omkar",
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "projects",
            data: {
                projects: [
                    {
                        title: "GearUp",
                        desc: "An ecommerce platform selling gaming peripherals",
                        tech: "React, ExpressJS, MongoDB, NodeJS, GSAP, Redux",
                        projectImg: "https://placehold.co/400",
                    },
                    {
                        title: "DevDiary",
                        desc: "An aesthetic text-only blog posting platform",
                        tech: "React, ExpressJS, MongoDB, NodeJS, GSAP, Redux",
                        projectImg: "https://placehold.co/400",
                    },
                    {
                        title: "DocxGen",
                        desc: "An AI powered API documentation writer for GitHub repos",
                        tech: "NextJS, Go, TailwindCSS, Google Gemini",
                        projectImg: "https://placehold.co/400",
                    },
                    {
                        title: "Projectalyze",
                        desc: "An AI powered project analysis tool",
                        tech: "NextJS, Go, TailwindCSS, Google Gemini",
                        projectImg: "https://placehold.co/400",
                    },
                ],
            },
            isEditable: true,
            isFixed: false,
        },
    ],
};
