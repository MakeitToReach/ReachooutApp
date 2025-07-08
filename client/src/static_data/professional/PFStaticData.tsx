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
      sectionName: "Navbar",
      data: {
        textLogo: "Omkar",
      },
      isFixed: true,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "hero",
      sectionName: "Hero",
      data: {
        title: "Hi, I'm Omkar B",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, sunt veritatis. Itaque ullam maiores ut quod alias sint excepturi molestiae.",
        professions: ["Web Developer", "UI/UX Designer", "CRM Consultant"],
        btnText: "Visit My Website",
        btnLink: "#",
        heroImgUrl:
          "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "about",
      sectionName: "About",
      data: {
        title: "Founder of ",
        colorTitle: "Reachoout",
        description:
          "I’m a passionate developer with a strong focus on building intuitive, scalable web applications. With experience in both frontend and backend technologies, I love bringing ideas to life through clean design and efficient code.",
        stats: [
          { title: "Projects", value: "15k" },
          { title: "Clients", value: "10+" },
          { title: "Years of Experience", value: "5+" },
          { title: "Awards", value: "2" },
        ],
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "projects",
      sectionName: "Projects",
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
      isHidden: false,
    },

    {
      type: "team",
      sectionName: "Team",
      data: {
        title: "Our Team",
        subtitle: "Meet the professionals behind our success",
        teamMembers: [
          {
            imgUrl: "https://avatar.vercel.sh/jack",
            name: "John Doe",
            designation: "Senior Software Engineer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, natus cumque! Nemo ratione ullam magni sit suscipit impedit doloremque quae? Reprehenderit magni maxime voluptas iusto assumenda, dolore quaerat quidem quae officiis eveniet nostrum neque provident distinctio debitis ipsum harum rem.",
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
          {
            imgUrl: "https://avatar.vercel.sh/jill",
            name: "Jane Smith",
            designation: "UX/UI Designer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, natus cumque! Nemo ratione ullam magni sit suscipit impedit doloremque quae? Reprehenderit magni maxime voluptas iusto assumenda, dolore quaerat quidem quae officiis eveniet nostrum neque provident distinctio debitis ipsum harum rem.",
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
          {
            imgUrl: "https://avatar.vercel.sh/jill",
            name: "Jane Smith",
            designation: "UX/UI Designer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, natus cumque! Nemo ratione ullam magni sit suscipit impedit doloremque quae? Reprehenderit magni maxime voluptas iusto assumenda, dolore quaerat quidem quae officiis eveniet nostrum neque provident distinctio debitis ipsum harum rem.",
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
          {
            imgUrl: "https://avatar.vercel.sh/jill",
            name: "Jane Smith",
            designation: "UX/UI Designer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, natus cumque! Nemo ratione ullam magni sit suscipit impedit doloremque quae? Reprehenderit magni maxime voluptas iusto assumenda, dolore quaerat quidem quae officiis eveniet nostrum neque provident distinctio debitis ipsum harum rem.",
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
          {
            imgUrl: "https://avatar.vercel.sh/jill",
            name: "Jane Smith",
            designation: "UX/UI Designer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, natus cumque! Nemo ratione ullam magni sit suscipit impedit doloremque quae? Reprehenderit magni maxime voluptas iusto assumenda, dolore quaerat quidem quae officiis eveniet nostrum neque provident distinctio debitis ipsum harum rem.",
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
        ],
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "client",
      sectionName: "Client",
      data: {
        title: "Leading Organizations and Companies",
        colorTxt: "50+",
        subtitle: "Clients I've worked with",
        avatarImg:
          "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg",
        clientImgs: [
          "/apple.svg",
          "/next.svg",
          "/tailwind.svg",
          "/reachout-logo.png",
        ],
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "services",
      sectionName: "Services",
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
      isHidden: false,
    },
    {
      type: "gallery",
      sectionName: "Gallery",
      data: {
        heading: "Gallery",
        imgs: [
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
      isHidden: false,
    },
    {
      type: "blogs",
      sectionName: "Blogs",
      data: {
        heading: "Latest Blogs and Articles",
        blogs: [
          {
            title:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            imgUrl: "/placeholder.png",
          },
          {
            title:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            imgUrl: "/placeholder.png",
          },
          {
            title:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            imgUrl: "/placeholder.png",
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
        heading: "My Service Catalog",
        catalogServices: [
          {
            title: "01. Reachoout",
            subtitle: "B2B Networking Platform",
            imgUrls: [
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
            title: "02. Devfolio Clone",
            subtitle: "Portfolio Generator for Developers",
            imgUrls: [
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
      isHidden: false,
    },

    {
      type: "newsletter",
      sectionName: "newsletter",
      data: {
        heading: "Subscribe to our newsletter",
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "faqs",
      sectionName: "FAQs",
      data: {
        heading: "Frequently Asked Questions",
        subHeading:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
        faqs: [
          {
            question:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            answer:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
          },
          {
            question:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            answer:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
          },
          {
            question:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            answer:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
          },
        ],
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "socials",
      sectionName: "My Socials",
      data: {
        heading: "My Socials",
        subHeading: "Get latest Updates",
        socials: [
          {
            title: "Linkedin",
            socialLink: "https://linkedin.com",
            followerCounts: "4.2k",
            icon: "Linkedin",
          },
          {
            title: "X",
            socialLink: "https://x.com",
            followerCounts: "4.2k",
            icon: "X",
          },
          {
            title: "Instagram",
            socialLink: "https://instagram.com",
            followerCounts: "4.2k",
            icon: "Instagram",
          },
          {
            title: "Youtube",
            socialLink: "https://youtube.com",
            followerCounts: "4.2k",
            icon: "Youtube",
          },
          {
            title: "Facebook",
            socialLink: "https://facebook.com",
            followerCounts: "4.2k",
            icon: "Facebook",
          },
        ],
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "experience",
      sectionName: "Experience",
      data: {
        heading: "My Journey",
        imgUrl: "/placeholder.png",
        experiences: [
          {
            title: "Frontend Developer",
            subtitle: "Reachoout",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            timePeriod: "2021 - Present",
          },
          {
            title: "Frontend Developer",
            subtitle: "Reachoout",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            timePeriod: "2021 - Present",
          },
          {
            title: "Frontend Developer",
            subtitle: "Reachoout",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
            timePeriod: "2021 - Present",
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
        heading: "Contact us",
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "contact widgets",
      sectionName: "Contact Widgets",
      data: {
        whatsapp_number: 8888888888,
        telephone_number: "1234567890",
      },
      isFixed: false,
      isEditable: true,
      isHidden: false,
    },
    {
      type: "footer",
      sectionName: "Footer",
      data: {
        logoText: "Omkar",
        // logoUrl: "/next.svg",
        description:
          "Showcasing my work and passion for creating innovative solutions. Connect with me to collaborate or learn more about my projects.",
        address: "1234 Creative Street, Innovation City, CA 90210",
        email: "omkar@reachoout.com",
        phone: "+1 (555) 123-4567",
        socials: [
          { title: "X", btnLink: "https://x.com", followerCounts: 1000 },
          {
            title: "Linkedin",
            btnLink: "https://linkedin.com",
            followerCounts: 1000,
          },
          {
            title: "Github",
            btnLink: "https://github.com",
            followerCounts: 1000,
          },
          {
            title: "Instagram",
            btnLink: "https://instagram.com",
            followerCounts: 1000,
          },
          {
            title: "Youtube",
            btnLink: "https://youtube.com",
            followerCounts: 1000,
          },
          {
            name: "Facebook",
            btnLink: "https://facebook.com",
            followerCounts: 1000,
          },
        ],
      },
      isFixed: true,
      isEditable: true,
      isHidden: false,
    },
  ],
};
