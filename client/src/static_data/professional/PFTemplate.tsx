import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";
import {
    IconBrandInstagramFilled,
    IconBrandLinkedinFilled,
    IconBrandX,
    IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import { LucideCode } from "lucide-react";

export const PF_STATIC_DATA: PF_TMP_SCHEMA = {
    id: "pf-tmp",
    name: "professional",
    sections: [
        {
            type: "navbar",
            data: null,
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
            },
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
                    },
                    {
                        heading: "02.Second",
                        subtitle: "subtitle",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description: "description",
                        btnText: "button text",
                        btnLink: "#",
                    },
                    {
                        heading: "03.Third",
                        subtitle: "subtitle",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description: "description",
                        btnText: "button text",
                        btnLink: "#",
                    },
                ],
            },
        },
        {
            type: "social",
            data: {
                socials: [
                    {
                        title: "Linkedin",
                        socialLink: "https://linkedin.com",
                        icon: <IconBrandLinkedinFilled size={45} color="blue" />,
                    },
                    {
                        title: "Twitter / X",
                        socialLink: "https://x.com",
                        followerCounts: 500,
                        icon: <IconBrandX size={45} />,
                    },
                    {
                        title: "Youtube",
                        socialLink: "https://youtube.com",
                        followerCounts: 500,
                        icon: <IconBrandYoutubeFilled color="red" size={45} />,
                    },
                    {
                        title: "Instagram",
                        socialLink: "https://instagram.com",
                        icon: <IconBrandInstagramFilled size={45} />,
                    },
                ],
            },
        },
        {
            type: "gallery",
            data: {
                images: [
                    "https://github.com/shadcn.png",
                    "https://github.com/shadcn.png",
                    "https://github.com/shadcn.png",
                ],
            },
        },
        {
            type: "services",
            data: {
                subtitle: "subtitle here",
                services: [
                    {
                        icon: <LucideCode size={25} />,
                        heading: "Web Development",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
                    },
                    {
                        icon: <LucideCode size={25} />,
                        heading: "Web Development",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
                    },
                    {
                        icon: <LucideCode size={25} />,
                        heading: "Web Development",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
                    },
                    {
                        icon: <LucideCode size={25} />,
                        heading: "Web Development",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore...",
                    },
                ],
            },
        },
        {
            type: "contact",
            data: null,
        },
        {
            type: "footer",
            data: null,
        },
    ],
};
