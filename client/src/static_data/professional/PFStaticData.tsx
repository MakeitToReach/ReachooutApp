import { GenericTemplateSchema } from "@/schemas/templates.schema";
// import { LucideCode } from "lucide-react";

export const PF_STATIC_DATA: GenericTemplateSchema = {
    id: "cm91hhx2l0000js04ktn7xof8",
    name: "professional",
    thumbnailUrl: "/professional_template.png",
    theme: {
        "--template-font": "'Poppins', sans-serif",
        "--template-primary": "#fffffc",
        "--template-secondary": "#1e3a8a",
        "--template-accent-primary": "#d6eef8",
        "--template-accent-secondary": "#fbe8d3",
        "--template-btn": "#111111",
        "--template-text-primary": "#111111",
        "--template-text-secondary": "#fffffc",
        "--template-text-accent-primary": "#111111",
        "--template-text-accent-secondary": "#111111",
        "--template-text-accent-tertiary": "#4ade80",
        "--template-text-btn": "#fffffc",
    },
    sections: [
        {
            type: "navbar",
            data: {
                textLogo: "Omkar",
            },
            isFixed: true,
            isEditable: true,
        },
        {
            type: "hero",
            data: {
                title: "Hi, I'm Omkar B",
                professions: ["Web Developer", "UI/UX Designer", "CRM Consultant"],
                btnText: "Visit My Website",
                btnLink: "#",
                heroImgUrl:
                    "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "about",
            data: {
                title: "Founder of ",
                colorTitle: "Reachoout",
                description:
                    "I’m a passionate developer with a strong focus on building intuitive, scalable web applications. With experience in both frontend and backend technologies, I love bringing ideas to life through clean design and efficient code.",
                stats: [
                    { title: "Projects", value: 15 },
                    { title: "Clients", value: 7 },
                    { title: "Years of Experience", value: 3 },
                    { title: "Awards", value: 2 },
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
                        heading: "01. Reachoout",
                        subtitle: "B2B Networking Platform",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",

                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque debitis modi molestias officiis? Magnam explicabo sunt quaerat reprehenderit distinctio fugit hic velit, debitis unde adipisci et aspernatur non ratione facere? Blanditiis obcaecati, sapiente quas harum ad recusandae facilis natus aperiam expedita, dignissimos, vitae doloribus voluptatem saepe maxime delectus mollitia accusamus! Ex cum distinctio aut perferendis, id ratione natus amet optio. Voluptates magni, magnam facilis quae dolor adipisci dolorem vitae placeat ipsum est beatae eius ullam vero. Alias ut quod sint quo aspernatur, quia asperiores corporis voluptas eius saepe accusamus quaerat sed est eum nulla obcaecati possimus, amet voluptatibus cum blanditiis.",
                        btnText: "View Project",
                        btnLink: "#",
                        category: "Full Stack",
                    },
                    {
                        heading: "02. Devfolio Clone",
                        subtitle: "Portfolio Generator for Developers",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description:
                            "A customizable portfolio generator built with Next.js and Tailwind CSS, aimed at helping developers showcase their work online.",
                        btnText: "GitHub Repo",
                        btnLink: "#",
                        category: "Frontend",
                    },
                    {
                        heading: "03. TaskMaster",
                        subtitle: "Team Collaboration App",
                        imgUrl:
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                        description:
                            "TaskMaster is a real-time team task manager with WebSocket support, kanban-style UI, and role-based access control.",
                        btnText: "Live Demo",
                        btnLink: "#",
                        category: "Full Stack",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },

        {
            type: "team",
            data: {
                title: "Our Team",
                subtitle: "Meet the professionals behind our success",
                teamMembers: [
                    {
                        avatar: "https://avatar.vercel.sh/jack",
                        name: "John Doe",
                        designation: "Senior Software Engineer",
                    },
                    {
                        avatar: "https://avatar.vercel.sh/jill",
                        name: "Jane Smith",
                        designation: "UX/UI Designer",
                    },
                    {
                        avatar: "https://avatar.vercel.sh/jill",
                        name: "Jane Smith",
                        designation: "UX/UI Designer",
                    },
                    {
                        avatar: "https://avatar.vercel.sh/jill",
                        name: "Jane Smith",
                        designation: "UX/UI Designer",
                    },
                    {
                        avatar: "https://avatar.vercel.sh/jill",
                        name: "Jane Smith",
                        designation: "UX/UI Designer",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "client",
            data: {
                title: "Leading Organizations and Companies",
                colorTxt: "50+",
                subtitle: "Clients I've worked with",
                avatarImg:
                    "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                clientImgs: [
                    {
                        src: "/apple.svg",
                        alt: "Image 4",
                    },
                    {
                        src: "/next.svg",
                        alt: "Image 1",
                    },
                    {
                        src: "/tailwind.svg",
                        alt: "Image 5",
                    },
                    {
                        src: "/reachout-logo.png",
                        alt: "Image 2",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "services",
            data: {
                title: "Services I offer",
                subtitle: "View My services",
                services: [
                    {
                        icon: "Cloud",
                        heading: "Web Development",
                        description:
                            "I specialize in creating visually stunning and user-friendly web applications using the latest technologies.",
                    },
                    {
                        icon: "Cloud",
                        heading: "Web Development",
                        description:
                            "I specialize in creating visually stunning and user-friendly web applications using the latest technologies.",
                    },
                    {
                        icon: "Cloud",
                        heading: "Web Development",
                        description:
                            "I specialize in creating visually stunning and user-friendly web applications using the latest technologies.",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "gallery",
            data: {
                gallery: [
                    {
                        items: [
                            {
                                img: "https://avatar.vercel.sh/jack",
                                title: "Mountain Escape",
                            },
                            {
                                img: "https://avatar.vercel.sh/jill",
                                title: "Sunset Horizon",
                            },
                            {
                                img: "/placeholder.png",
                                title: "Urban Jungle",
                            },
                        ],
                    },
                    {
                        items: [
                            {
                                img: "/placeholder.png",
                                title: "Foggy Forest",
                            },
                            {
                                img: "https://avatar.vercel.sh/jack",
                                title: "Snowy Peaks",
                            },
                        ],
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "testimonials",
            data: {
                title: "Testimonials",
                testimonials: [
                    {
                        name: "Jack",
                        body: "I don't know what to say. I'm speechless. This is amazing.",
                        img: "https://avatar.vercel.sh/jack",
                    },
                    {
                        name: "Jill",
                        body: "I don't know what to say. I'm speechless. This is amazing.",
                        img: "https://avatar.vercel.sh/jill",
                    },
                    {
                        name: "John",
                        body: "I'm at a loss for words. This is amazing. I love it.",
                        img: "https://avatar.vercel.sh/john",
                    },
                    {
                        name: "Jane",
                        body: "I'm at a loss for words. This is amazing. I love it.",
                        img: "https://avatar.vercel.sh/jane",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "service-catalog",
            data: {
                projects: [
                    {
                        heading: "01. Reachoout",
                        subtitle: "B2B Networking Platform",
                        imgUrl: [
                            "https://avatar.vercel.sh/jane",
                            "https://avatar.vercel.sh/jack",
                        ],
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque debitis modi molestias officiis? Magnam explicabo sunt quaerat reprehenderit distinctio fugit hic velit, debitis unde adipisci et aspernatur non ratione facere? Blanditiis obcaecati, sapiente quas harum ad recusandae facilis natus aperiam expedita, dignissimos, vitae doloribus voluptatem saepe maxime delectus mollitia accusamus! Ex cum distinctio aut perferendis, id ratione natus amet optio. Voluptates magni, magnam facilis quae dolor adipisci dolorem vitae placeat ipsum est beatae eius ullam vero. Alias ut quod sint quo aspernatur, quia asperiores corporis voluptas eius saepe accusamus quaerat sed est eum nulla obcaecati possimus, amet voluptatibus cum blanditiis.",
                        btnText: "View Project",
                        btnLink: "#",
                        category: "Full Stack",
                    },
                    {
                        heading: "02. Devfolio Clone",
                        subtitle: "Portfolio Generator for Developers",
                        imgUrl: [
                            "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
                            "https://avatar.vercel.sh/jill",
                        ],
                        description:
                            "A customizable portfolio generator built with Next.js and Tailwind CSS, aimed at helping developers showcase their work online.",
                        btnText: "GitHub Repo",
                        btnLink: "#",
                        category: "Frontend",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
        },

        {
            type: "contact",
            data: {
                email: "omkarb@example.com",
                phone: "+91 98765 43210",
                address: "Pune, Maharashtra, India",
                socialLinks: {
                    github: "https://github.com/omkar-dev",
                    linkedin: "https://linkedin.com/in/omkar-b",
                    twitter: "https://twitter.com/omkarb_dev",
                },
            },
            isFixed: false,
            isEditable: true,
        },
        {
            type: "footer",
            data: {
                logoText: "Omkar",
                // logoUrl: "/next.svg",
                description:
                    "Showcasing my work and passion for creating innovative solutions. Connect with me to collaborate or learn more about my projects.",
                address: "1234 Creative Street, Innovation City, CA 90210",
                email: "omkar@reachoout.com",
                phone: "+1 (555) 123-4567",
                socials: [
                    { name: "X", url: "https://x.com" },
                    {
                        name: "Linkedin",
                        url: "https://linkedin.com",
                    },
                    { name: "Github", url: "https://github.com" },
                    {
                        name: "Instagram",
                        url: "https://instagram.com",
                    },
                    {
                        name: "Youtube",
                        url: "https://youtube.com",
                    },
                    {
                        name: "Facebook",
                        url: "https://facebook.com",
                    },
                ],
            },
            isFixed: true,
            isEditable: true,
        },
    ],
};
