import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

export const F_EDITOR_SCHEMA: GenericEditorFieldSchema = {
  hero: [
    {
      label: "Title",
      type: "text",
      fieldPath: "title",
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
  ],
};
