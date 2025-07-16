'use client'
import { getAdminToken } from "@/lib/isAuthenticated";
import { IconHomeStats, IconPlus, IconTemplate } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/api/admin";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const adminToken = getAdminToken();

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin");
  };

  useEffect(() => {
    if (!adminToken) {
      router.push("/admin");
    }
  }, [adminToken, router]);

  return (
    <div className="md:flex min-h-screen hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Reachoout</h1>
        <nav className="flex flex-col h-[90%] justify-between items-start">
          <div>
            <Link
              href="/admin/dashboard"
              className="hover:bg-gray-700 px-3 flex gap-2 py-2 rounded transition"
            >
              <span>
                <IconHomeStats />
              </span>
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard/templates"
              className="hover:bg-gray-700 px-3 flex gap-2 py-2 rounded transition"
            >
              <span>
                <IconTemplate />
              </span>
              Templates
            </Link>
            <Link
              href="/admin/dashboard/create-template"
              className="hover:bg-gray-700 px-3 flex gap-2 py-2 rounded transition"
            >
              <span>
                <IconPlus />
              </span>
              Create Template
            </Link>
          </div>

          <Button
            className="hover:bg-gray-700 px-3 py-2 rounded transition"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 p-6 md:p-10">{children}</main>
    </div>
  );
};

export default Layout;
