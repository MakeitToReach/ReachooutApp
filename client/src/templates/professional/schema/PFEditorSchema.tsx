import { ProjectEditorField } from "@/components/editor-components/inputs/projectEditorField";
import { ServicesEditorField } from "@/components/editor-components/inputs/servicesEditorField";
import { StatsField } from "@/components/editor-components/inputs/statField";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

export const PF_EDITOR_SCHEMA: GenericEditorFieldSchema = {
    navbar: [
        {
            label: "Text Logo",
            type: "image-video",
            fieldPath: "img&vid",
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
};
