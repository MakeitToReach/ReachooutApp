import { DevProjectEditorField } from "@/components/template-components/dev/editor/projectEditor";
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
            component: ({ value, onChange }) => (
                <DevProjectEditorField value={value || []} onChange={onChange} />
            ),
        },
    ],
};
