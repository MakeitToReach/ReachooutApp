import { GenericTemplateSchema } from "@/schemas/templates.schema";

export const DEV_STATIC_DATA: GenericTemplateSchema = {
    id: "cm9jqg57n0000kv04ems9adky",
    name: "dev",
    thumbnailUrl: "/Dev_template.png",
    theme: {
      "--template-font": "'Montserrat', sans-serif",
      "--template-primary": "#0f172a", // dark navy
      "--template-secondary": "#1e293b", // slate
      "--template-accent-primary": "#3b82f6", // blue-500
      "--template-accent-secondary": "#60a5fa", // blue-400
      "--template-btn": "#2563eb", // blue-600
      "--template-text-primary": "#f8fafc", // light text
      "--template-text-secondary": "#cbd5e1", // gray-300
      "--template-text-accent-primary": "#93c5fd", // blue-300
      "--template-text-accent-secondary": "#bae6fd", // blue-200
      "--template-text-accent-tertiary": "#11111",
      "--template-text-btn": "#ffffff", // button text
    },
    sections: [
        {
            type: "hero",
            data: {
                title: "Hi, I'm Omkar — Full Stack Developer & UI Enthusiast",
            },
            isFixed: false,
            isEditable: true,
            isHidden: false,
        },
        {
            type: "projects",
            data: {
                projects: [
                    {
                        title: "GearUp",
                        desc: "A modern e-commerce platform for gaming enthusiasts offering curated gear, seamless checkout, and real-time inventory.",
                        tech: "Next.js, Express, MongoDB, TailwindCSS, Redux, Stripe API",
                        projectImg:
                            "https://placehold.co/400x250/0f172a/ffffff?text=GearUp",
                    },
                    {
                        title: "DevDiary",
                        desc: "A minimalist blogging platform for developers to share thoughts and tutorials with built-in markdown and code highlighting.",
                        tech: "React, Node.js, MongoDB, Prisma, Markdown, TailwindCSS",
                        projectImg:
                            "https://placehold.co/400x250/1e293b/ffffff?text=DevDiary",
                    },
                    {
                        title: "DocxGen",
                        desc: "AI-powered GitHub integration that scans codebases and auto-generates clean, structured documentation with search support.",
                        tech: "Next.js, Golang, TailwindCSS, OpenAI API, GitHub OAuth",
                        projectImg:
                            "https://placehold.co/400x250/111827/ffffff?text=DocxGen",
                    },
                    {
                        title: "Projectalyze",
                        desc: "A smart dashboard that analyzes GitHub projects to track issues, contributor activity, and roadmap health using AI.",
                        tech: "Next.js, Go, TypeScript, TailwindCSS, GPT API",
                        projectImg:
                            "https://placehold.co/400x250/0f172a/ffffff?text=Projectalyze",
                    },
                ],
            },
            isEditable: true,
            isHidden: false,
            isFixed: false,
        },
    ],
};
