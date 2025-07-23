import { FooterEditorField } from "@/components/editor-components/inputs/footerEditorField";
import { NavbarEditorField } from "@/components/editor-components/inputs/navbarEditorField";
import { ProjectEditorField } from "@/components/editor-components/inputs/projectEditorField";
import { ServicesEditorField } from "@/components/editor-components/inputs/servicesEditorField";
import { StatsField } from "@/components/editor-components/inputs/statField";
import { TeamMemberEditorField } from "@/components/editor-components/inputs/teamEditorField";
import { TestimonialEditorField } from "@/components/editor-components/inputs/testimonialEditorField";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import { PFBlogEditorField } from "../editorFields/PFBlogEditorField";
import { PFFaqEditorField } from "../editorFields/PFFaqEditorField";
import { PFExperienceEditorField } from "../editorFields/PFExperienceEditorField";
import { PFCatalogEditorField } from "../editorFields/PFCatalogEditorField";
import { PFSocialEditorField } from "../editorFields/PFSocialEditorField";
import { PFCalThemeSelect } from "../components/PFCalThemeSelect";

export const PF_EDITOR_SCHEMA: GenericEditorFieldSchema = {
    navbar: [
        {
            label: "Text",
            type: "image-video",
            fieldPath: "navbar-img",
            fieldPathVid: "textLogo",
            fieldPathImg: "logoUrl",
            imgSubtitle: "Dimensions 64x64",
        },
        {
            label: "QR Code URL",
            type: "text",
            fieldPath: "qrCodeUrl",
        },
        {
            label: "Navbar Options",
            type: "customComponent",
            fieldPath: "sections",
            customComponent: () => <NavbarEditorField />,
        },
    ],
    hero: [
        {
            label: "Title",
            type: "text",
            fieldPath: "title",
        },
        {
            label: "Description",
            type: "RTEditor",
            fieldPath: "description",
        },

        {
            label: "Animated Texts",
            type: "text",
            fieldPath: "professions",
            subtitle: "Comma separated values",
        },
        {
            type: "group",
            label: "Button Group",
            fieldPath: "btnGroup",
            fields: [
                {
                    label: "Button Text",
                    fieldPath: "btnText",
                },
                {
                    label: "Button Link",
                    fieldPath: "btnLink",
                },
            ],
        },
        {
            label: "Video Link",
            type: "image-video",
            fieldPath: "img&vid",
            fieldPathImg: "heroImgUrl",
            fieldPathVid: "heroVidUrl",
            subtitle: "Only youtube links are allowed",
            imgSubtitle: "Dimensions 500x500",
        },
    ],
    about: [
        {
            label: "Title",
            type: "text",
            fieldPath: "title",
        },
        {
            label: "Colored Text",
            type: "text",
            fieldPath: "colorTitle",
        },
        {
            label: "Description",
            type: "RTEditor",
            fieldPath: "description",
            // subtitle: "Max 300 characters, over 300 will be truncated to a popup",
        },
        {
            label: "Stats",
            type: "component",
            fieldPath: "stats",
            component: ({ value, onChange }) => (
                <StatsField value={value || []} onChange={onChange} />
            ),
        },
    ],
    projects: [
        {
            label: "Projects",
            type: "component",
            fieldPath: "projects",
            component: ({ value, onChange }) => (
                <ProjectEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],
    services: [
        {
            label: "Section Title",
            type: "text",
            fieldPath: "title",
        },

        {
            label: "Subtitle",
            type: "text",
            fieldPath: "subtitle",
            subtitle: "Optional",
        },
        {
            label: "Services",
            type: "component",
            fieldPath: "services",
            component: ({ value, onChange }) => (
                <ServicesEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],

    client: [
        {
            label: "Starter Text",
            type: "text",
            fieldPath: "startText",
        },
        {
            label: "Color Text",
            type: "text",
            fieldPath: "colorTxt",
        },
        {
            label: "Title",
            type: "text",
            fieldPath: "title",
        },
        {
            label: "Subtitle",
            type: "text",
            fieldPath: "subtitle",
            subtitle: "Optional",
        },
        {
            label: "Avatar Image",
            type: "image",
            fieldPath: "avatarImg",
            fieldPathImg: "avatarImg",
        },
        {
            label: "Client Images",
            type: "multiple-images",
            fieldPath: "clientImgs",
        },
    ],

    testimonials: [
        {
            label: "Section title",
            type: "text",
            fieldPath: "title",
        },
        {
            label: "testimonials",
            type: "component",
            fieldPath: "testimonials",
            component: ({ value, onChange }) => (
                <TestimonialEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],

    blogs: [
        {
            label: "Section heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Blogs",
            type: "component",
            fieldPath: "blogs",
            component: ({ value, onChange }) => (
                <PFBlogEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],
    newsletter: [
        {
            label: "Section heading",
            type: "text",
            fieldPath: "heading",
        },
    ],
    faqs: [
        {
            label: "Section heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Subheading",
            type: "text",
            fieldPath: "subHeading",
        },
        {
            label: "Faqs",
            type: "component",
            fieldPath: "faqs",
            component: ({ value, onChange }) => (
                <PFFaqEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],
    gallery: [
        {
            label: "Section heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Images",
            type: "multiple-images",
            fieldPath: "imgs",
        },
    ],

    team: [
        {
            label: "Section Title",
            type: "text",
            fieldPath: "title",
        },
        {
            label: "Subtitle",
            type: "text",
            fieldPath: "subtitle",
        },
        {
            label: "Team Members",
            type: "component",
            fieldPath: "teamMembers",
            component: ({ value, onChange }) => (
                <TeamMemberEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],

    "contact widgets": [
        {
            label: "Whatsapp Number",
            type: "phone",
            fieldPath: "whatsapp_number",
        },
        {
            label: "Telephone Number",
            type: "phone",
            fieldPath: "telephone_number",
        },
    ],

    socials: [
        {
            label: "Section Heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Subheading",
            type: "text",
            fieldPath: "subHeading",
        },
        {
            label: "Socials",
            type: "component",
            fieldPath: "socials",
            component: ({ value, onChange }) => (
                <PFSocialEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],

    "service-catalog": [
        {
            label: "Section Heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Services",
            type: "component",
            fieldPath: "catalogServices",
            component: ({ value, onChange }) => (
                <PFCatalogEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],

    experience: [
        {
            label: "Image",
            type: "image",
            fieldPath: "imgUrl",
        },
        {
            label: "Heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Experiences",
            type: "component",
            fieldPath: "experiences",
            component: ({ value, onChange }) => (
                <PFExperienceEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],

    footer: [
        {
            label: "Text",
            type: "image-video",
            fieldPath: "footer-img",
            fieldPathVid: "logoText",
            fieldPathImg: "logoUrl",
            imgSubtitle: "Dimensions 64x64",
        },
        {
            label: "Description",
            type: "RTEditor",
            fieldPath: "description",
        },

        {
            label: "Address",
            type: "textarea",
            fieldPath: "address",
        },
        {
            label: "Email",
            type: "text",
            fieldPath: "email",
        },
        {
            label: "Phone Number",
            type: "phone",
            fieldPath: "phone",
        },
        {
            label: "Socials",
            type: "component",
            fieldPath: "socials",
            component: ({ value, onChange }) => (
                <FooterEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],
    contact: [
        {
            label: "Section Heading",
            type: "text",
            fieldPath: "heading",
        },
        {
            label: "Receiver Email",
            type: "text",
            fieldPath: "receiverEmail",
            subtitle: "Email to which the contact form submissions will be sent",
        },
        {
            label: "Cal Link",
            type: "text",
            fieldPath: "calUrl",
            subtitle: "ex: rick/get-rick-rolled",
        },
        {
            label: "Cal Theme",
            type: "component",
            fieldPath: "calTheme",
            component: ({ value, onChange }) => (
                <PFCalThemeSelect value={value} onChange={onChange} />
            ),
        },
    ],
};
