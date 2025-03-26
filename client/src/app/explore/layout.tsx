import { Navbar } from "@/components/editor-components/navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="md:px-40 min-h-screen overflow-x-hidden overflow-y-scroll bg-neutral-950">{children}</div>
        </>
    );
};

export default layout;
