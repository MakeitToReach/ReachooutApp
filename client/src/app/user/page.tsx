"use client";
import React, { useEffect, useState } from "react";
import {
    LayoutTemplate,
    Globe,
    BarChart3,
    PanelLeftDashedIcon,
    LucideX,
} from "lucide-react";
import { TemplateCard } from "@/components/editor-components/templateCard";
import { getUserTemplates } from "@/api/user-template";
import { TEMPLATES_SCHEMA } from "@/types/templates.types";
import { Button } from "@/components/ui/button";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { motion as m } from "motion/react";
import { useUserStore } from "@/store/user.store";

type Tab = "templates" | "domains" | "analytics";

function App() {
    const [activeTab, setActiveTab] = useState<Tab>("templates");
    const [templates, setTemplates] = useState<TEMPLATES_SCHEMA[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useUserStore();

    useEffect(() => {
        const fetchUserTemplates = async () => {
            const response = await getUserTemplates();
            if (response) {
                setTemplates(response.userTemplates);
            }
        };
        fetchUserTemplates();
    }, []);

    const tabs = [
        { id: "templates", name: "Your Templates", icon: LayoutTemplate },
        { id: "domains", name: "Manage Domains", icon: Globe },
        { id: "analytics", name: "View Analytics", icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex relative">
            <m.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }} // Exit animation now works
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-64 bg-zinc-950 shadow-lg hidden md:block"
            >
                <div className="p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Dashboard</h2>
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
                                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
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
                {activeTab === "templates" && (
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-6">
                            Your Templates
                        </h1>
                        <div className="grid md:grid-cols-4 gap-4 px-4">
                            {templates.length > 0 && user ? (
                                templates.map((template, idx) => (
                                    <TemplateCard
                                        isPublished
                                        templateName={template.name.toLowerCase()}
                                        key={idx}
                                        imageUrl={template.thumbnailUrl}
                                        previewUrl={`/${user.name}?template=${template.name.toLowerCase()}`}
                                        editorUrl={`/editor/${template.name.toLowerCase()}`}
                                        className="shadow-2xl shadow-black"
                                    />
                                ))
                            ) : (
                                <p className="text-center col-span-4 text-white">
                                    No templates found.
                                </p>
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
