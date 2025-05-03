import { GenericTemplateSchema } from "@/schemas/templates.schema";
// import { LucideCode } from "lucide-react";

export const PF_STATIC_DATA: GenericTemplateSchema = {
  id: "pf-tmp",
  name: "professional",
  thumbnailUrl: "/professional_template.png",
  theme: {
    "--template-font": "Poppins, sans-serif",
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
      type: "navbar",
      data: null,
      isFixed: false,
      isEditable: true,
    },
    {
      type: "hero",
      data: {
        title: "Hi, I'm Omkar B",
        professions: ["Full Stack Developer", "UI/UX Designer"],
        btnText: "Visit My Website",
        btnLink: "https://reachoout.com",
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
          { title: "Projects", value: "15+" },
          { title: "Clients", value: "7+" },
          { title: "Years of Experience", value: "3" },
          { title: "Awards", value: "2" },
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
              "Reachoout is a platform that helps businesses connect, collaborate, and grow through verified partnerships and networking tools.",
            btnText: "View Project",
            btnLink: "https://reachoout.in",
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
            btnLink: "https://github.com/omkar-dev/devfolio-clone",
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
            btnLink: "https://taskmaster-app.netlify.app",
            category: "Full Stack",
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
        copyright:
          "© 2025 Omkar B. All rights reserved. | Designed & Built by Omkar B",
      },
      isFixed: false,
      isEditable: true,
    },
  ],
};
