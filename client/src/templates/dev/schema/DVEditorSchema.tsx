import { AddDevProjectModal } from "@/components/template-components/dev/projectPopup";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

export const DEV_EDITOR_SCHEMA: GenericEditorFieldSchema = {
    hero: [
        {
            label: "Title",
            type: "text",
            fieldPath: "title",
        },
    ],

    projects: [
        {
            label: "Projects",
            type: "component",
            fieldPath: "projects",
            component: ({ value }) => <AddDevProjectModal value={value} />,
        },
    ],
};
