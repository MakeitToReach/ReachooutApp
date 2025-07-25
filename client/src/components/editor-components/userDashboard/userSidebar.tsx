"use client";

import * as React from "react";
import {
  Frame,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavProjects } from "@/components/editor-components/userDashboard/navProjects";
import { NavUser } from "./navUser";
import { USER, useUserStore } from "@/store/user.store";
import { logoutUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const data = {
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  projects: [
    {
      name: "Your Projects",
      url: "/user",
      icon: Frame,
    },
    // {
    //   name: "Analytics",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Settings",
    //   url: "#",
    //   icon: Map,
    // },
  ],
};

interface UserSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: USER;
}
export const UserSidebar = ({ user }: UserSidebarProps) => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const logoutAndRedirect = () => {
    logoutUser();
    setUser(null);
    router.push("/");
  };

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      router.push("/admin");
    }
  };
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" onClick={handleLogoClick}>
                <Image
                  src="/reachout-logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="size-12"
                />
                <div className="grid flex-1 text-left text-2xl leading-tight">
                  <span className="truncate font-semibold">Reachoout</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser user={user} handleLogout={logoutAndRedirect} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
