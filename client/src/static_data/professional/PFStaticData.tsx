import { GenericTemplateSchema } from "@/schemas/templates.schema";
// import { LucideCode } from "lucide-react";

export const PF_STATIC_DATA: GenericTemplateSchema = {
    id: "pf-tmp",
    name: "professional",
    thumbnailUrl: "/professional_template.png",
    sections: [
        {
            type: "navbar",
            data: null,
            isFixed: true,
            isEditable: false,
        },
        {
            type: "hero",
            data: {
                title: "Hello, I'm John Doe",
                professions: ["Web Developer", "UI/UX Designer"],
                btnText: "Download CV",
                btnLink: "#",
                heroImgUrl:
                    "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                // heroVidUrl: "https://www.youtube.com/watch?v=X_Dpv4CVlpo",
            },
            isFixed: true,
            isEditable: true,
        },
        {
            type: "about",
            data: {
                title: "Founder of ",
                colorTitle: "Reachoout",
                description:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit vel laborum vero cum, magni in alias, laboriosam officia vitae possimus rerum aut repellat blanditiis officiis accusantium...",
                stats: [
                    { title: "Projects", value: "3" },
                    { title: "Clients", value: "2" },
                    { title: "Experience", value: "2" },
                    { title: "Experience", value: "2" },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "projects",
            data: {
                projects: [
                    {
                        heading: "01.First",
                        subtitle: "subtitle",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description: "description",
                        btnText: "button text",
                        btnLink: "#",
                        category: "Frontend",
                    },
                    {
                        heading: "02.Second",
                        subtitle: "subtitle",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description: "description",
                        btnText: "button text",
                        btnLink: "#",
                        category: "Frontend",
                    },
                    {
                        heading: "03.Third",
                        subtitle: "subtitle",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description: "description",
                        btnText: "button text",
                        btnLink: "#",
                        category: "Full Stack",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        // {
        //     type: "services",
        //     data: {
        //         subtitle: "subtitle here",
        //         services: [
        //             {
        //                 icon: <LucideCode size={25} />,
        //                 heading: "Web Development",
        //                 description:
        //                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
        //             },
        //             {
        //                 icon: <LucideCode size={25} />,
        //                 heading: "Web Development",
        //                 description:
        //                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
        //             },
        //             {
        //                 icon: <LucideCode size={25} />,
        //                 heading: "Web Development",
        //                 description:
        //                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
        //             },
        //             {
        //                 icon: <LucideCode size={25} />,
        //                 heading: "Web Development",
        //                 description:
        //                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
        //             },
        //         ],
        //     },
        //     isFixed: false,
        // isEditable:true
        // },
        {
            type: "contact",
            data: null,
            isFixed: true,
            isEditable: false,
        },
        {
            type: "footer",
            data: null,
            isFixed: true,
            isEditable: false,
        },
    ],
};
