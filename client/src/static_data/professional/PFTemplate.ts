import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";

export const PF_STATIC_DATA: PF_TMP_SCHEMA = {
    id: "pf-tmp",
    name: "professional",
    sections: {
        heroSection: {
            title: "Hello, I'm John Doe",
            professions: ["Web Developer", "UI/UX Designer"],
            btnText: "Download CV",
            btnLink: "#",
            heroImgUrl: "https://github.com/shadcn.png",
        },
        aboutSection: {
            title: "Founder of ",
            colorTitle: "Reachoout",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
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
                    imgUrl: "https://github.com/shadcn.png",
                    description: "description",
                    btnText: "button text",
                    btnLink: "#",
                },
                {
                    heading: "02.Second",
                    subtitle: "subtitle",
                    imgUrl: "https://picsum.photos/200",
                    description: "description",
                    btnText: "button text",
                    btnLink: "#",
                },
                {
                    heading: "03.Third",
                    subtitle: "subtitle",
                    imgUrl: "https://picsum.photos/300",
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
                "https://github.com/shadcn.png",
                "https://github.com/shadcn.png",
                "https://github.com/shadcn.png",
            ],
            colorTxt: "50+",
        },
    },
};
