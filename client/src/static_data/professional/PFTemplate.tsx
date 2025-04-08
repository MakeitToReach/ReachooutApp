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
    sections: {
        heroSection: {
            title: "Hello, I'm John Doe",
            professions: ["Web Developer", "UI/UX Designer"],
            btnText: "Download CV",
            btnLink: "#",
            heroImgUrl:
                "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
        },
        aboutSection: {
            title: "Founder of ",
            colorTitle: "Reachoout",
            description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit vel laborum vero cum, magni in alias, laboriosam officia vitae possimus rerum aut repellat blanditiis officiis accusantium. Eius itaque eveniet debitis quos, ut, sint aut saepe facere repellendus quas quae nihil asperiores laudantium esse veniam fugit ullam modi. Incidunt, tempora rerum! Iure necessitatibus voluptas cumque. Quisquam laborum quas, odio totam esse quam. Consequuntur nulla minima quidem alias quos corrupti assumenda impedit temporibus explicabo expedita ea laboriosam quaerat totam architecto voluptates, consequatur doloremque obcaecati dolores eius voluptatum fuga nemo autem? Officia asperiores provident illo. Aut corporis eligendi quasi. Vitae rem beatae dolores.",
            stats: [
                {
                    title: "Projects",
                    value: "3",
                },
                {
                    title: "Clients",
                    value: "2",
                },
                {
                    title: "Experience",
                    value: "2",
                },
                {
                    title: "Experience",
                    value: "2",
                },
            ],
        },
        workSection: {
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
        clientSection: {
            title: "leading companies & associations",
            clientImgs: [
                "https://github.com/shadcn.png",
                "https://picsum.photos/400",
                "https://picsum.photos/400/500",
                "https://picsum.photos/200/200",
            ],
            colorTxt: "50+",
        },
        socialSection: {
            socials: [
                {
                    title: "Linkedin",
                    socialLink: "https://linkedin.com",
                    // followerCounts: 500,
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
                    // followerCounts: 500,
                    icon: <IconBrandInstagramFilled size={45} />,
                },
            ],
        },
        gallerySection: {
            images: [
                "https://github.com/shadcn.png",
                "https://github.com/shadcn.png",
                "https://github.com/shadcn.png",
            ],
        },

        servicesSection: {
            subtitle: "subtitle here",
            services: [
                {
                    icon: <LucideCode size={25} />,
                    heading: "Web Development",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore, earum quia minus similique tempore veniam?",
                },
                {
                    icon: <LucideCode size={25} />,
                    heading: "Web Development",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore, earum quia minus similique tempore veniam?",
                },
                {
                    icon: <LucideCode size={25} />,
                    heading: "Web Development",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore, earum quia minus similique tempore veniam?",
                },
                {
                    icon: <LucideCode size={25} />,
                    heading: "Web Development",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum molestias consequuntur numquam dolore, earum quia minus similique tempore veniam?",
                },
            ],
        },
    },
};
