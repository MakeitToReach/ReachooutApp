import { ProjectEditorField } from "@/components/editor-components/inputs/projectEditorField";
import { StatsField } from "@/components/editor-components/inputs/statField";
// import { Input } from "@/components/ui/input";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

export const PF_EDITOR_SCHEMA: GenericEditorFieldSchema = {
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
    },
    {
      label: "Button Redirect Link",
      type: "text",
      fieldPath: "btnLink",
    },
    {
      label: "Button Text",
      type: "text",
      fieldPath: "btnText",
    },
    {
      label: "Image",
      type: "image",
      fieldPath: "heroImgUrl",
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
      component: ({ value }) => <ProjectEditorField value={value} />,
    },
  ],
};
