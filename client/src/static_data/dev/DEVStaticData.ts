import { GenericTemplateSchema } from "@/schemas/templates.schema";

export const DEV_STATIC_DATA: GenericTemplateSchema = {
    id: "dev-tmp",
    name: "dev",
    thumbnailUrl: "/Dev_template.png",
    sections: [
        {
            type: "hero",
            data: {
                title: "Hi, Im John Doe",
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
