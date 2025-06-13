// TODO: instead of this tab shit, move to layout structure for this dashboard
"use client";
import React, { useEffect, useState } from "react";
import {
    LayoutTemplate,
    Globe,
    BarChart3,
    PanelLeftDashedIcon,
    LucideX,
} from "lucide-react";
import { getUserProjects } from "@/api/project";
import { Button } from "@/components/ui/button";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { motion as m } from "motion/react";
import { useUserStore } from "@/store/user.store";
import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
import { toast } from "sonner";
import { Project } from "@/schemas/projects.schema";
import { CreateUserProjectDialog } from "@/components/editor-components/popups/createUserProject";
import { getToken } from "@/lib/isAuthenticated";
import { getUserFromToken } from "@/api/auth";
import { IconPlus } from "@tabler/icons-react";
import { ProjectCard } from "@/components/editor-components/projectCard";

type Tab = "projects" | "domains" | "analytics";

function App() {
    const [activeTab, setActiveTab] = useState<Tab>("projects");
    const [projects, setProjects] = useState<Project[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const response = await getUserProjects();
                if (response) {
                    setProjects(response);
                } else {
                    toast.error("Failed to load projects");
                }
            } catch (error) {
                console.error("Error fetching user templates:", error);
                toast.error("Error fetching user templates");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProjects();
    }, []);

    useEffect(() => {
        const token = getToken();

        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await getUserFromToken(token);
                    if (response) {
                        setUser(response.user);
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchUserDetails();
        }
    }, []);

    const tabs = [
        { id: "projects", name: "Your Projects", icon: LayoutTemplate },
        { id: "domains", name: "Manage Domains", icon: Globe },
        { id: "analytics", name: "View Analytics", icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex relative font-Poppins">
            <m.div
                exit={{ x: "-100%" }} // Exit animation now works
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-64 bg-zinc-950 shadow-lg hidden md:block"
            >
                <div className="p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Hi, {user?.name}</h2>
                </div>
                <LayoutGroup>
                    <nav className="relative mt-2 space-y-2">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id as Tab);
                                        setSidebarOpen(false);
                                    }}
                                    className={`relative w-full flex items-center px-6 py-3 text-left transition-colors duration-200
            ${isActive ? "text-blue-600" : "text-gray-600 hover:bg-gray-50"}
          `}
                                >
                                    {/* Animated border */}
                                    {isActive && (
                                        <m.div
                                            layoutId="tab-border"
                                            className="absolute right-0 top-0 h-full w-1 bg-blue-500 rounded-r"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <tab.icon className="w-5 h-5 mr-3 z-10" />
                                    <span className="font-medium z-10">{tab.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </LayoutGroup>
            </m.div>

            {/* sidebar */}
            <div className="md:hidden">
                <AnimatePresence mode="wait">
                    {sidebarOpen && (
                        <m.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }} // Exit animation now works
                            transition={{
                                duration: 0.4,
                                ease: "anticipate",
                            }}
                            className="w-64 bg-zinc-950 shadow-lg fixed top-0 left-0 h-full z-[100]"
                        >
                            <div className="p-6 flex justify-between items-center">
                                <h2 className="text-xl md:text-2xl font-bold text-white">
                                    Hi, {user?.name}
                                </h2>
                                <Button
                                    variant={"ghost"}
                                    className="dark"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <LucideX className="text-white" />
                                </Button>
                            </div>
                            <nav className="mt-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id as Tab);
                                            setSidebarOpen(false); // Close sidebar when selecting a tab
                                        }}
                                        className={`w-full flex items-center px-6 py-3 text-left ${activeTab === tab.id
                                                ? "bg-zinc-800 border-r-4 border-blue-500 text-blue-600"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5 mr-3" />
                                        <span className="font-medium">{tab.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Sidebar Toggle Button */}
                <Button
                    onClick={() => setSidebarOpen(true)}
                    variant={"ghost"}
                    className="fixed bottom-4 left-4 text-gray-200 hover:text-gray-800 cursor-pointer"
                >
                    <PanelLeftDashedIcon />
                </Button>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8 bg-neutral-800">
                {activeTab === "projects" && (
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center">
                            <h1 className="md:text-2xl text-xl font-bold text-white mb-6">
                                Your Projects
                            </h1>

                            {projects.length > 0 && (
                                <CreateUserProjectDialog>
                                    <Button variant={"ghost"} className="p-0">
                                        Create Project{" "}
                                        <span>
                                            <IconPlus />
                                        </span>
                                    </Button>
                                </CreateUserProjectDialog>
                            )}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 px-4">
                            {isLoading ? (
                                <>
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <Skeleton
                                            key={idx}
                                            className="h-[400px] w-full animate-pulse shadow-2xl shadow-black bg-neutral-950"
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {projects.length > 0 ? (
                                        projects.map((project, idx) => (
                                            <ProjectCard
                                                key={idx}
                                                project={project}
                                                onDelete={() => { }}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center col-span-4 text-white">
                                            <p>No Projects found</p>
                                            <CreateUserProjectDialog>
                                                <Button variant={"outline"} className="text-black">
                                                    Create Project
                                                </Button>
                                            </CreateUserProjectDialog>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "domains" && (
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-6">
                            Manage Domains
                        </h1>
                        <p className="text-gray-400">Domain management content goes here</p>
                    </div>
                )}

                {activeTab === "analytics" && (
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>
                        <p className="text-gray-400">Analytics content goes here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
