import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import { FServiceEditorField } from "../editorFields/FServiceEditorField";
import { FProjectEditorField } from "../editorFields/FProjectEditorField";
import { FFeaturedServiceEditorField } from "../editorFields/FFeaturedServiceEditorField";
import { FTeamEditorField } from "../editorFields/FTeamEditorField";
import { FWhyChooseUsEditorField } from "../editorFields/FWhyChooseUsEditorField";
import { FTestimonialEditorField } from "../editorFields/FTestimonialEditorField";
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
  "featured-services": [
    {
      label: "Featured Services",
      type: "component",
      fieldPath: "featuredServices",
      component: ({ value, onChange }) => (
        <FFeaturedServiceEditorField value={value || []} onChange={onChange} />
      ),
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
    {
      label: "Services",
      type: "component",
      fieldPath: "services",
      component: ({ value, onChange }) => (
        <FServiceEditorField value={value || []} onChange={onChange} />
      ),
    },
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
    {
      type: "component",
      label: "Team",
      fieldPath: "team",
      component: ({ value, onChange }) => (
        <FTeamEditorField value={value || []} onChange={onChange} />
      ),
    },
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
    {
      type: "component",
      label: "Why Choose Us",
      fieldPath: "features",
      component: ({ value, onChange }) => (
        <FWhyChooseUsEditorField value={value || []} onChange={onChange} />
      ),
    },
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
    {
      label: "Projects",
      type: "component",
      fieldPath: "projects",
      component: ({ value, onChange }) => (
        <FProjectEditorField value={value || []} onChange={onChange} />
      ),
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
    {
      type: "component",
      label: "Testimonials",
      fieldPath: "testimonials",
      component: ({ value, onChange }) => (
        <FTestimonialEditorField value={value || []} onChange={onChange} />
      ),
    },
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
  ],
  contact: [
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
      type: "textarea",
      fieldPath: "subtitle",
    },
    {
      type: "group",
      label: "Button Group",
      fieldPath: "btnGroup",
      fields: [
        {
          label: "Phone Number",
          fieldPath: "phoneNumber",
        },
        {
          label: "Email Address",
          fieldPath: "emailAddress",
        },
      ],
    },
  ],
};
