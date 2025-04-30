//eslint-disable-next-line
export type SectionBlock<T = any> = {
  type: string;
  data: T | null;
  isFixed: boolean;
  isEditable: boolean;
};

export type ThemeObject = {
  "--template-primary": string;
  "--template-secondary": string;
  "--template-tertiary": string;
  "--template-text-primary": string;
  "--template-text-secondary": string;
  "--template-text-tertiary": string;
};
export interface GenericTemplateSchema<T extends SectionBlock = SectionBlock> {
  id: string;
  name: string;
  sections: T[];
  theme: ThemeObject;
  thumbnailUrl?: string;
  previewRoute?: string;
  editorRoute?: string;
}
