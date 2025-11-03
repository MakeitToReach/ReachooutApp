"use client";
import React, { useEffect } from "react";
import { Navbar } from "@/components/editor-components/navbar";
import { Button } from "@/components/ui/button";
import { motion as m } from "framer-motion";
import Image from "next/image";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/isAuthenticated"; 

function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/user");
    }
  }, [router]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white font-Inter overflow-x-hidden">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4">
        <m.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/10"
        >
          <h1 className="text-3xl font-semibold mb-2 font-Montserrat text-left">
            Login/Signup to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              Reachoout
            </span>
          </h1>
          <p className="text-gray-400 mb-6">
            Sign in quickly using your Google account.
          </p>
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-6 bg-white text-black hover:bg-gray-200 transition"
          >
            <IconBrandGoogleFilled size={18} className="text-black/70" />
            Continue with Google
          </Button>
        </m.div>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1"
          >
            <Image
              src="/reachout-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer object-cover size-[50px] md:size-[50px]"
            />
            <span className="font-semibold text-xl">Reachoout</span>
          </m.div>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 text-gray-400"
          >
            <a
              target="_blank"
              href="https://reachoout.com/help"
              className="hover:text-white transition"
            >
              Helpbook
            </a>
            <a
              target="_blank"
              href="https://reachoout.com/support"
              className="hover:text-white transition"
            >
              Support
            </a>
            <a
              target="_blank"
              href="https://reachoout.com/resources"
              className="hover:text-white transition"
            >
              Blog
            </a>
          </m.div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
