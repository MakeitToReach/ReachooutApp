"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { logoutUser } from "@/api/auth";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const { user } = useUserStore();
    const router = useRouter();

    const logoutAndRedirect = () => {
        logoutUser();
        router.push("/");
    };
    return (
        <div className="w-full h-[10vh] bg-neutral-950 backdrop-blur p-4 flex md:justify-between items-center md:px-40">
            <Link href={"/"}>
                <Image
                    src="/reachout-logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="cursor-pointer object-cover size-[50px] md:size-[80px]"
                />
            </Link>
            <div className="md:flex gap-4 items-center text-white text-lg hidden ">
                {user && <p>{user.name}</p>}
                <p>About</p>
                <p>Pricing</p>
                <p>FAQs</p>
                <p>Templates</p>
                <Button onClick={logoutAndRedirect}>Logout</Button>
            </div>
        </div>
    );
};
