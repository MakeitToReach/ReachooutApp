"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { getUserFromToken, logoutUser } from "@/api/auth";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import AvatarDropdown from "./userAvatarDropdown";
import { getToken } from "@/lib/isAuthenticated";

export const Navbar = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();

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
  }, [user, logoutAndRedirect]);

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
        <p>About</p>
        <p>Pricing</p>
        <p>FAQs</p>
        <p>Templates</p>
      </div>
    </div>
  );
};
