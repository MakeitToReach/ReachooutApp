"use client";
import { getUserFromToken } from "@/api/auth";
import { UserSidebar } from "@/components/editor-components/userDashboard/userSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getToken } from "@/lib/isAuthenticated";
import { USER, useUserStore } from "@/store/user.store";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    if (!user) {
      async function getUser() {
        const token = getToken();
        if (token) {
          const user = await getUserFromToken(token);
          if (user) {
            setUser(user);
          }
        }
      }
      getUser();
    }
  }, [user]);
  return (
    <SidebarProvider className="dark">
      <UserSidebar user={user as USER} />
      <SidebarInset>
        <main className="p-2 md:p-4 text-white">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
