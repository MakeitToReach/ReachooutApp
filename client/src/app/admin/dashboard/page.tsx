import { AdminStats } from "@/components/adminDashboard-components/statsCard";
import React from "react";

const page = () => {
    return (
        <div className="text-3xl flex flex-col gap-10 max-w-7xl mx-auto ">
            <h1>Dashboard</h1>
            <AdminStats />
        </div>
    );
};

export default page;
