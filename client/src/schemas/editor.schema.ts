import React from "react";

export type GenericEditorFieldSchema = Record<
  string,
  {
    label: string;
    type: string;
    fieldPath: string;

    //for image-video input
    fieldPathImg?: string;
    fieldPathVid?: string;

    //for grouped inputs
    fields?: { label: string; fieldPath: string }[];

    //for custom component inputs
    component?: (props: {
      value: any; //eslint-disable-line
      onChange: (val: any) => void; //eslint-disable-line
    }) => React.JSX.Element;

    customComponent?: () => React.ReactNode;

    //for text input subtitle
    subtitle?: string;

    //for image input subtitle
    imgSubtitle?: string;
  }[]
>;
