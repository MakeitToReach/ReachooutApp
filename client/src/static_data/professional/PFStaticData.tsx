import { GenericTemplateSchema } from "@/schemas/templates.schema";
// import { LucideCode } from "lucide-react";

export const PF_STATIC_DATA: GenericTemplateSchema = {
  id: "pf-tmp",
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
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, quo? Cumque iusto necessitatibus quidem ex amet molestias laborum soluta. Soluta alias vitae nesciunt doloremque porro aut perspiciatis eligendi reiciendis provident, exercitationem officia iure quis. Voluptates tempora culpa ut libero repellendus quibusdam exercitationem aut nobis vitae molestias possimus obcaecati nostrum, alias modi earum impedit! Sequi, eveniet temporibus vel eaque, aperiam iure autem facere adipisci natus recusandae animi quae quis porro facilis obcaecati quia aliquid culpa officiis provident perferendis enim eligendi alias fugit? Inventore commodi quos reprehenderit deleniti animi nemo labore ipsum eos maiores itaque, doloremque ratione quae hic officiis! Recusandae asperiores inventore reprehenderit veritatis labore eveniet maiores, ratione, repellat quis fugit tempore obcaecati unde laudantium itaque eaque odit voluptas consequuntur dolorum ipsam aut perferendis? Porro voluptates exercitationem dolore. Totam, alias itaque ut harum inventore, eos est asperiores eaque excepturi iste officia voluptatum voluptates saepe, quaerat fugiat explicabo possimus fuga cum delectus nisi dolore assumenda vitae eius repellendus. Officiis ad nemo ipsum alias. Dolorum itaque illum maiores illo nemo deserunt unde laudantium debitis mollitia. Architecto similique nobis iure vero inventore ipsam deleniti veniam possimus dolorum minima? Dolorum sequi tempora rem voluptatibus, neque, rerum assumenda incidunt animi impedit deleniti illo! Sint iste perspiciatis, maiores officiis vero aliquid, commodi illum inventore reprehenderit pariatur dolores fugit eos eveniet ullam ipsam laudantium? Unde sapiente doloribus laborum temporibus, tempora recusandae corporis harum, omnis eos illum tempore mollitia laboriosam nostrum sequi quibusdam quasi deserunt sint inventore placeat dolor iusto nisi autem? Nihil quis maiores, nulla veritatis ab earum vero, asperiores eum ea quod odit consequuntur voluptatem ipsa ex. Nesciunt debitis, ab neque corrupti perspiciatis molestias! Repellat fugit aperiam dolorem et molestiae itaque praesentium quia laboriosam, excepturi dicta facilis, recusandae mollitia sed quam error. Temporibus quam illo, cupiditate vel, ea soluta eum laudantium facere cum quibusdam id recusandae quisquam doloribus, delectus nesciunt iure blanditiis possimus ipsam eos veniam? Error quod, quaerat nobis consequuntur sed eaque voluptatem a officiis beatae obcaecati iste itaque dolores numquam provident optio dicta rem atque amet mollitia, deleniti ipsam in eligendi saepe. Impedit corporis tenetur aliquam ratione aperiam aliquid enim reiciendis sit necessitatibus dolores officia, suscipit, dicta dignissimos at ea mollitia nemo? Aliquam quas illo dolore error nobis aperiam fugiat necessitatibus dignissimos dolorum consequatur quos porro, excepturi earum ipsa iure impedit voluptate iste in! Laudantium, blanditiis. Voluptatem suscipit fugit quam amet, alias dolorum dicta aliquid. Recusandae nobis iste illum commodi, corporis molestiae sint? Quam, recusandae quos praesentium fuga harum sapiente vitae illum nemo magnam? Cumque sunt voluptates eum repellendus aut dignissimos odio laboriosam beatae harum officia debitis est saepe quod sit fugit velit magni reiciendis, possimus excepturi fugiat tempore facilis nulla. Qui molestiae unde, dolorum impedit veniam debitis, quo accusantium nulla repellat possimus laboriosam quos! Facilis consequuntur atque minus quia ipsum possimus, ducimus vitae laborum, pariatur aperiam iusto alias temporibus dolor odio expedita. Minus corrupti ipsam eligendi! Accusantium voluptate facilis officiis non sit, cupiditate cumque culpa maxime blanditiis? Enim facilis, ducimus suscipit quibusdam laudantium, nobis temporibus minima perferendis quasi odit, inventore consectetur reiciendis quos sapiente!",
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
