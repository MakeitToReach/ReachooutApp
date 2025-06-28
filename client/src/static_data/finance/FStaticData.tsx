import { GenericTemplateSchema } from "@/schemas/templates.schema";

export const F_STATIC_DATA: GenericTemplateSchema = {
    id: "cmcavetnq0000c7aqmtz9vb3v",
    name: "finance",
    thumbnailUrl: "/finance_template.png",
    theme: {
        "--template-font": "'Poppins', sans-serif",
        "--template-primary": "#f4f4f4",
        "--template-secondary": "#1F2F28",
        "--template-accent-primary": "#3b82f6",
        "--template-accent-secondary": "#60a5fa",
        "--template-btn": "#2563eb",
        "--template-text-primary": "#00000",
        "--template-text-secondary": "#cbd5e1",
        "--template-text-accent-primary": "#93c5fd",
        "--template-text-accent-secondary": "#bae6fd",
        "--template-text-accent-tertiary": "#11111",
        "--template-text-btn": "#ffffff",
    },
    sections: [
        {
            type: "navbar",
            sectionName: "Navbar",
            data: {},
            isFixed: true,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "hero",
            sectionName: "Hero",
            data: {
                imgUrls: [
                    "https://www.okler.net/previews/porto/12.1.0/img/demos/accounting-1/slides/slide-2.jpg",
                ],
                title: "We Transform financial strategies into tangible success",
                btnText: "Get Started",
                btnLink: "#",
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "featured-services",
            sectionName: "About",
            data: {
                featuredServices: [
                    {
                        title: "Global Accounting",
                        subtitle: "Expert accounting services for global businesses",
                        icon: "Global",
                    },
                    {
                        title: "Tax Consulting",
                        subtitle: "Optimize your taxes with expert consulting planning",
                        icon: "Automation",
                    },
                    {
                        title: "Admin Services",
                        subtitle:
                            "Streamline your operations with our administrative services",
                        icon: "Integration",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "about",
            sectionName: "About",
            data: {
                badgeText: "About Us",
                title: "Who we are",
                description:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque velit blanditiis quas libero veniam, eum voluptates ab provident accusamus ipsum hic beatae perspiciatis, sed repellat doloribus inventore illo voluptate, eaque est impedit aperiam tempore fugiat? Nisi voluptatibus veritatis eligendi iste?",
                imgUrls: ["/placeholder.png", "/placeholder.png"],
                btnText: "Learn More",
                btnLink: "#",
                experience: "30+",
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "services",
            sectionName: "About",
            data: {
                badgeText: "Our services",
                title: "Accounting Services",
                subtitle:
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident totam qui possimus cum incidunt voluptatem?",
                services: [
                    {
                        title: "Service 1",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
                        category: "Business",
                        imgUrl: "/placeholder.png",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "blogs",
            sectionName: "Blogs",
            data: {
                heading: "Latest Blogs",
                blogs: [
                    {
                        imgUrl: "/placeholder.png",
                        category: "Business",
                        title: "Common Tax Mistakes",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
                        authorImgUrl: "https:/github.com/shadcn.png",
                        author: "John Doe",
                    },
                    {
                        imgUrl: "/placeholder.png",
                        category: "Business",
                        title: "Common Tax Mistakes",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
                        authorImgUrl: "https:/github.com/shadcn.png",
                        author: "John Doe",
                    },
                    {
                        imgUrl: "/placeholder.png",
                        category: "Business",
                        title: "Common Tax Mistakes",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
                        authorImgUrl: "https:/github.com/shadcn.png",
                        author: "John Doe",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "team",
            sectionName: "Team",
            data: {
                heading: "Meet the professionals full of expertise and dedication",
                team: [
                    {
                        imgUrl:
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        name: "Laura Mitchell",
                        designation: "CEO & Founder",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "why-choose-us",
            sectionName: "Team",
            data: {
                badgeText: "Let's Work Together",
                title: "Why choose us",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. A unde voluptatibus fugiat alias earum itaque. Minus rem officia aliquam eos.",
                btnText: "Get Started",
                btnLink: "#",
                features: [
                    {
                        icon: "Global",
                        title: "We are here to help",
                        description:
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid omnis quod ad fugit esse suscipit natus porro dicta nesciunt dolorem.",
                    },
                    {
                        icon: "Global",
                        title: "We are here to help",
                        description:
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid omnis quod ad fugit esse suscipit natus porro dicta nesciunt dolorem.",
                    },
                    {
                        // icon: <HandCoins size={80} className="size-14 sm:size-20" />,
                        icon: "Global",
                        title: "We are here to help",
                        description:
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid omnis quod ad fugit esse suscipit natus porro dicta nesciunt dolorem.",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "logos",
            sectionName: "Team",
            data: {
                heading: "Our commitment to you",
                subHeading:
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati ex doloribus dolore quae illum sint doloremque earum dolorum, voluptates laboriosam?",
                imgs: [
                    { src: "/next.svg", alt: "logo1" },
                    { src: "/reachout-logo.png", alt: "logo2" },
                    { src: "/apple.svg", alt: "logo3" },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        // {
        //     type: "newsletter",
        //     sectionName: "Team",
        //     data: {},
        //     isFixed: false,
        //     isEditable: true,
        //     isHidden: true,
        // },
        {
            type: "projects",
            sectionName: "Projects",
            data: {
                title: "Proudly Showcase the diverse range of projects",
                subtitle:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure repudiandae esse facere recusandae laudantium iste quam hic, similique placeat excepturi?",
                projects: [
                    {
                        title: "Project 1",
                        description:
                            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore laborum minima porro natus fugiat a animi. Aperiam adipisci porro consequatur?",
                        imgUrl: "/placeholder.png",
                        projectUrl: "#",
                        category: "Business",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },

        // {
        //     type: "client",
        //     sectionName: "Client",
        //     data: {},
        //     isFixed: false,
        //     isEditable: true,
        //     isHidden: false,
        // },
        {
            type: "gallery",
            sectionName: "Gallery",
            data: {
                title: "Our commitment to you",
                subtitle:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ducimus temporibus fugit beatae. Amet harum sint exercitationem, nemo sequi repellendus?",
                imgs: [
                    "/placeholder.png",
                    "/placeholder.png",
                    "/placeholder.png",
                    "/placeholder.png",
                    "/placeholder.png",
                    "/placeholder.png",
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "testimonials",
            sectionName: "Testimonials",
            data: {
                badgeText: "Loved by our clients",
                title: "What our clients say",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aperiam magnam ab illum? Omnis dolorum obcaecati hic quod architecto. Dolor.",
                btnText: "Become a client",
                btnLink: "#",
                testimonials: [
                    {
                        avatarUrl:
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
                        name: "John Doe",
                        designation: "CEO of XYZ",
                        message:
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem ad exercitationem consectetur impedit harum nostrum, omnis ratione beatae libero esse.",
                        rating: 5,
                    },
                    {
                        avatarUrl:
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
                        name: "John Doe",
                        designation: "CEO of XYZ",
                        message:
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem ad exercitationem consectetur impedit harum nostrum, omnis ratione beatae libero esse.",
                        rating: 5,
                    },
                    {
                        avatarUrl:
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
                        name: "John Doe",
                        designation: "CEO of XYZ",
                        message:
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem ad exercitationem consectetur impedit harum nostrum, omnis ratione beatae libero esse.",
                        rating: 5,
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "service-catalog",
            sectionName: "Service Catalog",
            data: {
                badgeText: "Services",
                title: "Service Catalog",
                subtitle:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam excepturi temporibus laborum fuga ipsa modi!",
                catalogServices: [
                    {
                        title: "Service 1",
                        description:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laborum minima porro natus fugiat a animi. Aperiam adipisci porro consequatur?",
                        imgUrls: ["/placeholder.png", "https://github.com/shadcn.png"],
                        category: "Business",
                    },
                ],
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },

        {
            type: "contact",
            sectionName: "Contact",
            data: {
                badgeText: "Contact Us",
                title: "Get In Touch",
                subtitle:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptates explicabo ex repellendus dolores corrupti, molestiae possimus molestias! Dolor, ducimus!",
                phoneNumber: 1234567890,
                emailAddress: "XG2V6@example.com",
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "contact widgets",
            sectionName: "Contact Widgets",
            data: {},
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "footer",
            sectionName: "Footer",
            data: {},
            isFixed: true,
            isEditable: true,
            isHidden: false,
        },
    ],
};
