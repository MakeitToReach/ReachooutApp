import React from "react";

export type GenericEditorFieldSchema = Record<
  string,
  {
    label: string;
    name?: string;
    type: string;
    value?: string;
    fieldPath: string;
    component?: (props: {
      value: any; //eslint-disable-line
      onChange: (val: any) => void;//eslint-disable-line
    }) => React.JSX.Element;
  }[]
>;
