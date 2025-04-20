import { ProjectEditorField } from "@/components/editor-components/inputs/projectEditorField";
import { StatsField } from "@/components/editor-components/inputs/statField";
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
      type: "image",
      fieldPath: "img&vid",
      fieldPathImg: "heroImgUrl",
      fieldPathVid: "heroVidUrl",
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
      component: ({ value, onChange }) => (
        <ProjectEditorField value={value || []} onChange={onChange} />
      ),
    },
  ],
};
