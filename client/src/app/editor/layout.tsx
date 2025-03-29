// import { Navbar } from "@/components/editor-components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col">
            {/* <Navbar /> */}
            {children}
        </div>
    );
};

export default layout;
