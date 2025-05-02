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
    "--template-accent-primary": string;
    "--template-accent-secondary": string;
    "--template-btn": string;
    "--template-text-primary": string;
    "--template-text-secondary": string;
    "--template-text-accent-primary": string;
    "--template-text-accent-secondary": string;
    "--template-text-btn": string;
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
