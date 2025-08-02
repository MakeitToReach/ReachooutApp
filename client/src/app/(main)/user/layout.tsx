"use client";
import { UserSidebar } from "@/components/editor-components/userDashboard/userSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { USER, useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useUserStore();

  if (!user) {
    router.push("/");
    return null;
  }

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
