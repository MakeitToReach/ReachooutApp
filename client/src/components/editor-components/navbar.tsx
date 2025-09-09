"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { logoutUser } from "@/api/auth";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import AvatarDropdown from "./userAvatarDropdown";

export const Navbar = () => {
  const { user, updateUserFromServer } = useUserStore();
  const router = useRouter();

  const logoutAndRedirect = () => {
    logoutUser();
    updateUserFromServer(null);
    router.push("/");
  };

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      router.push("/admin");
    }
  };

  // User fetching is now handled by AuthProvider

  return (
    <div className="w-full h-[10vh] bg-neutral-950 backdrop-blur p-4 flex justify-between items-center md:px-40">
      <Link href={"/"} onClick={handleLogoClick}>
        <Image
          src="/reachout-logo.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer object-cover size-[50px] md:size-[80px]"
        />
      </Link>
      <div className="flex gap-2 items-center md:hidden">
        {user && (
          <AvatarDropdown
            name={user.name}
            email={user.email}
            avatarUrl={user.avatarUrl}
            handleLogout={logoutAndRedirect}
          />
        )}
      </div>
      <div className="md:flex gap-4 items-center text-white text-lg hidden ">
        {user && (
          <AvatarDropdown
            name={user.name}
            email={user.email}
            avatarUrl={user.avatarUrl}
            handleLogout={logoutAndRedirect}
          />
        )}
        <a href="https://reachoout.com">Home</a>
        <a href="https://reachoout.com/support">Support</a>
        <a href="https://reachoout.com/resources">Blog</a>
        <a href="https://reachoout.com/help">Help Book</a>
      </div>
    </div>
  );
};
