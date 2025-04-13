//eslint-disable-next-line
export type SectionBlock<T = any> = {
    type: string;
    data: T | null;
};

export interface GenericTemplateSchema<T extends SectionBlock = SectionBlock> {
    id: string;
    name: string;
    sections: T[];
    thumbnailUrl?: string;
    previewRoute?: string;
    editorRoute?: string;
}
