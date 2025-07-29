import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import { FServiceEditorField } from "../editorFields/FServiceEditorField";
import { FProjectEditorField } from "../editorFields/FProjectEditorField";
import { FFeaturedServiceEditorField } from "../editorFields/FFeaturedServiceEditorField";
import { FTeamEditorField } from "../editorFields/FTeamEditorField";
import { FWhyChooseUsEditorField } from "../editorFields/FWhyChooseUsEditorField";
import { FTestimonialEditorField } from "../editorFields/FTestimonialEditorField";
import { FFaqEditorField } from "../editorFields/FFaqEditorField";
import { FBlogEditorField } from "../editorFields/FBlogEditorField";
import { FCatalogEditorField } from "../editorFields/FCatalogEditorField";
import { FTimelineEditorField } from "../editorFields/FTimelineEditorField";
import { FStatsEditorField } from "../editorFields/FStatsEditorField";
import { FNavbarEditorField } from "../editorFields/FNavbarEditorField";

export const F_EDITOR_SCHEMA: GenericEditorFieldSchema = {
  navbar: [
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
      customComponent: () => <FNavbarEditorField />,
    },
  ],
  hero: [
    {
      label: "Image",
      type: "multiple-images",
      fieldPath: "imgUrls",
    },
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
      type: "RTEditor",
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
    {
      label: "Image",
      type: "image",
      fieldPath: "imgUrl",
    },
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
    {
      type: "component",
      label: "Blogs",
      fieldPath: "blogs",
      component: ({ value, onChange }) => (
        <FBlogEditorField value={value || []} onChange={onChange} />
      ),
    },
  ],

  newsletter: [
    {
      type: "text",
      label: "Heading",
      fieldPath: "heading",
    },
    {
      type: "text",
      label: "Receiver Email",
      fieldPath: "receiverEmail",
      subtitle:
        "This is the email address that will receive the newsletter form submissions.",
    },
    {
      type: "group",
      label: "Button Group",
      fieldPath: "btnGroup",
      fields: [
        {
          label: "Button 1 Text",
          fieldPath: "btn1Text",
        },
        {
          label: "Button 1 Link",
          fieldPath: "btn1Link",
        },
      ],
    },
    {
      type: "group",
      label: "Button Group",
      fieldPath: "btnGroup",
      fields: [
        {
          label: "Button 2 Text",
          fieldPath: "btn2Text",
        },
        {
          label: "Button 2 Link",
          fieldPath: "btn2Link",
        },
      ],
    },
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
      type: "RTEditor",
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
    {
      label: "Logos",
      type: "multiple-images",
      fieldPath: "imgs",
    },
  ],
  faqs: [
    {
      type: "text",
      label: "Heading",
      fieldPath: "heading",
    },
    {
      type: "component",
      label: "FAQs",
      fieldPath: "faqs",
      component: ({ value, onChange }) => (
        <FFaqEditorField value={value || []} onChange={onChange} />
      ),
    },
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
    {
      label: "Gallery",
      type: "multiple-images",
      fieldPath: "imgs",
    },
  ],
  timeline: [
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
      type: "component",
      label: "Timeline",
      fieldPath: "steps",
      component: ({ value, onChange }) => (
        <FTimelineEditorField value={value || []} onChange={onChange} />
      ),
    },
  ],
  stats: [
    {
      type: "image",
      label: "Images",
      fieldPath: "imgUrl",
    },

    {
      type: "text",
      label: "Title",
      fieldPath: "heading",
    },
    {
      type: "component",
      label: "Stats",
      fieldPath: "stats",
      component: ({ value, onChange }) => (
        <FStatsEditorField value={value || []} onChange={onChange} />
      ),
    },
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
      type: "RTEditor",
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
    {
      type: "component",
      label: "Service Catalog",
      fieldPath: "catalogServices",
      component: ({ value, onChange }) => (
        <FCatalogEditorField value={value || []} onChange={onChange} />
      ),
    },
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
      type: "RTEditor",
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
