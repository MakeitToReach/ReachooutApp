import { IconHomeStats, IconPlus, IconTemplate } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
                                <IconTemplate/>
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

                    <Link
                        href="/"
                        className="hover:bg-gray-700 px-3 py-2 rounded transition"
                    >
                        Logout
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-200 p-6 md:p-10">{children}</main>
        </div>
    );
};

export default Layout;
