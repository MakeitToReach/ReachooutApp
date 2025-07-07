import * as React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LucideX } from "lucide-react";

// Finance template types
import { F_BLOG } from "@/templates/finance/types/blogs.types";
import { F_PROJECT } from "@/templates/finance/types/projects.types";
import { F_SERVICE } from "@/templates/finance/types/services.types";
import { F_CATLOG_SERVICES } from "@/templates/finance/types/service-catalog.types";
import { F_TEAM_MEMBER } from "@/templates/finance/types/team.types";

interface FViewMoreDrawerProps {
    children: React.ReactNode;
    content: F_BLOG | F_PROJECT | F_SERVICE | F_CATLOG_SERVICES | F_TEAM_MEMBER;
    type: "Blog" | "Project" | "Services" | "Catalog" | "Team";
}

export const FViewMoreDrawer = ({
    content,
    children,
    type,
}: FViewMoreDrawerProps) => {
    const blog = type === "Blog" ? (content as F_BLOG) : null;
    const project = type === "Project" ? (content as F_PROJECT) : null;
    const service = type === "Services" ? (content as F_SERVICE) : null;
    const catalogService = type === "Catalog" ? (content as F_CATLOG_SERVICES) : null;
    const teamMember = type === "Team" ? (content as F_TEAM_MEMBER) : null;

    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>

            <DrawerContent className="p-0 max-w-full theme-wrapper bg-template-primary sm:max-w-4xl mx-auto min-h-[90vh] flex flex-col">
                {/* Header */}
                <DrawerHeader className="p-4 border-b">
                    <DrawerTitle className="text-left text-xl flex flex-col gap-2">
                        <span>
                            {blog?.title ||
                                project?.title ||
                                service?.title ||
                                catalogService?.title ||
                                teamMember?.name}
                        </span>
                        {blog && (
                            <span className="text-left text-sm font-light">
                                By {blog.author}
                            </span>
                        )}
                        {teamMember && (
                            <span className="text-left text-sm font-light">
                                {teamMember.designation}
                            </span>
                        )}
                        {(project || service || catalogService) && (
                            <span className="text-left text-sm font-light">
                                {project?.category || service?.category || catalogService?.category}
                            </span>
                        )}
                    </DrawerTitle>

                    <DrawerClose className="absolute top-4 right-4 cursor-pointer">
                        <LucideX className="size-8" />
                    </DrawerClose>
                </DrawerHeader>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Media Section */}
                    <div className="flex justify-center">
                        {blog && (
                            <Image
                                src={blog.imgUrl || "/placeholder.png"}
                                alt={`${blog.title}-img`}
                                width={500}
                                height={400}
                                className="rounded w-full md:h-[400px] object-cover object-center"
                            />
                        )}

                        {project && (
                            <Image
                                src={project.imgUrl || "/placeholder.png"}
                                alt={`${project.title}-img`}
                                width={500}
                                height={400}
                                className="rounded w-full md:h-[400px] object-cover object-center"
                            />
                        )}

                        {service && (
                            <Image
                                src={service.imgUrl || "/placeholder.png"}
                                alt={`${service.title}-img`}
                                width={500}
                                height={400}
                                className="rounded w-full md:h-[400px] object-cover object-center"
                            />
                        )}

                        {catalogService && catalogService.imgUrls.length > 0 && (
                            <div className="w-full">
                                <Image
                                    src={catalogService.imgUrls[0] || "/placeholder.png"}
                                    alt={`${catalogService.title}-img`}
                                    width={500}
                                    height={400}
                                    className="rounded w-full md:h-[400px] object-cover object-center"
                                />
                            </div>
                        )}

                        {teamMember && (
                            <Image
                                src={teamMember.imgUrl || "/placeholder.png"}
                                alt={`${teamMember.name}-img`}
                                width={500}
                                height={400}
                                className="rounded w-full md:h-[400px] object-cover object-center"
                            />
                        )}
                    </div>

                    {/* Description Section */}
                    <div className="space-y-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {blog?.description ||
                                project?.description ||
                                service?.description ||
                                catalogService?.description ||
                                teamMember?.designation}
                        </p>

                        {/* Blog specific info */}
                        {blog && (
                            <div className="flex items-center gap-3 pt-4 border-t">
                                <Image
                                    src={blog.authorImgUrl || "/placeholder.png"}
                                    alt={`${blog.author}-avatar`}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium text-sm">{blog.author}</p>
                                    <p className="text-xs text-gray-500">{blog.category}</p>
                                </div>
                            </div>
                        )}

                        {/* Team member socials */}
                        {teamMember && teamMember.socials.length > 0 && (
                            <div className="pt-4 border-t">
                                <h4 className="font-medium text-sm mb-2">Connect with {teamMember.name}</h4>
                                <div className="flex gap-2">
                                    {teamMember.socials
                                        .filter((social) => social.url)
                                        .map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                                            >
                                                {social.name}
                                            </a>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Footer Button */}
                {project && project.projectUrl && (
                    <div className="p-4 border-t flex justify-start">
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button>View Project</Button>
                        </a>
                    </div>
                )}
            </DrawerContent>
        </Drawer>
    );
}; 