"use client";
import { UserSidebar } from "@/components/editor-components/userDashboard/userSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PUBLIC_USER, useUserStore } from "@/store/user.store";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();

  return (
    <SidebarProvider className="dark">
      <UserSidebar user={user as PUBLIC_USER} />
      <SidebarInset>
        <main className="p-2 md:p-4 text-white">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
