export type SECTIONS = {
    type: string;
    data: object | null;
};

export type TEMPLATES_SCHEMA = {
    id: string;
    name: string;
    sections: SECTIONS[];
    thumbnailUrl: string;
    previewRoute?: string;
    editorRoute?: string;
};
