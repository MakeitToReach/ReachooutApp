import React from "react";

export type GenericEditorFieldSchema = Record<
    string,
    {
        label: string;
        type: string;
        fieldPath: string;
        fieldPathImg?: string;
        fieldPathVid?: string;
        fields?: { label: string; fieldPath: string }[];
        component?: (props: {
            value: any; //eslint-disable-line
            onChange: (val: any) => void; //eslint-disable-line
        }) => React.JSX.Element;

        subtitle?: string;
    }[]
>;
