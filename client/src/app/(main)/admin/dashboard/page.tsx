"use client";

import { getTotalProjectCount, getTotalUserCount } from "@/api/admin/analytics";
import { getAllUsers } from "@/api/admin";
import { AdminStats } from "@/components/adminDashboard-components/statsCard";
import { UsersTable } from "@/components/adminDashboard-components/usersTable";
import React, { useEffect, useState } from "react";

export type AnalyticsData = {
  name: string;
  stat: string | number;
};

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  projects: {
    id: string;
    name: string;
    subDomain: string;
    customDomain?: string;
    createdAt: string;
  }[];
  projectCount: number;
}

const DashboardAnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectCounts, userCounts, usersData] = await Promise.all([
          getTotalProjectCount(),
          getTotalUserCount(),
          getAllUsers(),
        ]);

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

        if (usersData?.users) {
          setUsers(usersData.users);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-10 max-w-7xl mx-auto">
        <h1 className="text-3xl">Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto">
      <h1 className="text-3xl">Dashboard</h1>
      <AdminStats data={data} />
      <UsersTable users={users} />
    </div>
  );
};

export default DashboardAnalyticsPage;
