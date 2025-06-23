import { create } from "zustand";
// import { persist } from "zustand/middleware";

interface EditorTabIndex {
    editorTabIndex: number;
    setEditorTabIndex: (id: number) => void;
}

export const useEditorTabIdxStore = create<EditorTabIndex>((set) => ({
    editorTabIndex: 0,
    setEditorTabIndex: (id) => set({ editorTabIndex: id }),
}));
