import { FooterEditorField } from "@/components/editor-components/inputs/footerEditorField";
import { ProjectEditorField } from "@/components/editor-components/inputs/projectEditorField";
import { ServicesEditorField } from "@/components/editor-components/inputs/servicesEditorField";
import { StatsField } from "@/components/editor-components/inputs/statField";
import { TeamMemberEditorField } from "@/components/editor-components/inputs/teamEditorField";
import { TestimonialEditorField } from "@/components/editor-components/inputs/testimonialEditorField";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

export const PF_EDITOR_SCHEMA: GenericEditorFieldSchema = {
    navbar: [
        {
            label: "Text Logo",
            type: "image-video",
            fieldPath: "navbar-img",
            fieldPathVid: "textLogo",
            fieldPathImg: "logoUrl",
            imgSubtitle: "Dimensions 64x64",
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
            type: "textarea",
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
            type: "textarea",
            fieldPath: "description",
            subtitle: "Max 300 characters, over 300 will be truncated to a popup",
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
            fieldPath: "img",
            fieldPathImg: "avatarImg",
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

    footer: [
        {
            label: "Text Logo",
            type: "image-video",
            fieldPath: "footer-img",
            fieldPathVid: "logoText",
            fieldPathImg: "logoUrl",
            imgSubtitle: "Dimensions 64x64",
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
};
