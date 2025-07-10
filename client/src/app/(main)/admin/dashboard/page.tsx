"use client";

import { getTotalProjectCount, getTotalUserCount } from "@/api/admin/analytics";
import { AdminStats } from "@/components/adminDashboard-components/statsCard";
import React, { useEffect, useState } from "react";

export type AnalyticsData = {
  name: string;
  stat: string | number;
};

const DashboardAnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  useEffect(() => {
    const fetchProjectsAndUsers = async () => {
      const projectCounts = await getTotalProjectCount();
      const userCounts = await getTotalUserCount();
      if (projectCounts && userCounts) {
        setData([
          {
            name: "Total Users",
            stat: userCounts.userCount,
          },
          {
            name: "Total Projects",
            stat: projectCounts.projectCount,
          },
        ]);
      }
    };

    fetchProjectsAndUsers();
  }, []);

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto ">
      <h1 className="text-3xl">Dashboard</h1>
      <AdminStats data={data} />
    </div>
  );
};

export default DashboardAnalyticsPage;
