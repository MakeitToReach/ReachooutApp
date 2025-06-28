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
  about: [
    {
      label: "Badge Text",
      type: "text",
      fieldPath: "badgeText",
    },
    {
      label: "Title",
      type: "text",
      fieldPath: "title",
    },
    {
      label: "Description",
      type: "text",
      fieldPath: "description",
    },
    {
      label: "Experience",
      type: "text",
      fieldPath: "experience",
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
    // TODO:add images input here
  ],

  services: [
    {
      label: "Badge Text",
      type: "text",
      fieldPath: "badgeText",
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
    },
    // TODO:add services editorField here
  ],

  blogs: [
    {
      type: "text",
      label: "Heading",
      fieldPath: "heading",
    },
    // TODO:add blogs editorField here
  ],

  team: [
    {
      type: "text",
      label: "Heading",
      fieldPath: "heading",
    },
    // TODO:add team editorField here
  ],

  "why-choose-us": [
    {
      type: "text",
      label: "Badge Text",
      fieldPath: "badgeText",
    },
    {
      type: "text",
      label: "Title",
      fieldPath: "title",
    },
    {
      type: "textarea",
      label: "Description",
      fieldPath: "description",
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
    // TODO:add whyChooseUs editorField here
  ],
  logos: [
    {
      type: "text",
      label: "Heading",
      fieldPath: "heading",
    },
    {
      type: "text",
      label: "Sub Heading",
      fieldPath: "subHeading",
    },
    // TODO:add logos editorField here
  ],
  projects: [
    {
      type: "text",
      label: "Title",
      fieldPath: "title",
    },
    {
      type: "text",
      label: "Subtitle",
      fieldPath: "subtitle",
    },
    // TODO:add projects editorField here
  ],
  gallery: [
    {
      type: "text",
      label: "Title",
      fieldPath: "title",
    },
    {
      type: "text",
      label: "Subtitle",
      fieldPath: "subtitle",
    },
    // TODO:add gallery editorField here
  ],

  testimonials: [
    {
      type: "text",
      label: "Badge Text",
      fieldPath: "badgeText",
    },
    {
      type: "text",
      label: "Title",
      fieldPath: "title",
    },
    {
      type: "textarea",
      label: "Description",
      fieldPath: "description",
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
    // TODO:add testimonials editorField here
  ],
    "service-catalog": [
        {
            label: "Badge Text",
            type: "text",
            fieldPath: "badgeText",
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
        },
        // TODO:add service-catalog editorField here
    ]
};
