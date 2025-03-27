"use client";
import { Professional } from "@/templates/professional";
// import { useParams } from "next/navigation";
import React from "react";

const Preview = () => {
    // const { slug } = useParams();
    return (
        <div>
            <Professional />
            {/* <h1>{slug}</h1> */}
        </div>
    );
};

export default Preview;
