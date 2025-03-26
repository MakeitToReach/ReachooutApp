import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
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
        <p>About</p>
        <p>Pricing</p>
        <p>FAQs</p>
        <p>Templates</p>
      </div>
    </div>
  );
};
