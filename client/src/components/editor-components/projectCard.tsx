import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
import { Folder, MoreVertical, Share, Trash2 } from "lucide-react";
// import Link from "next/link";
import PreviewButton from "./previewBtn";
import { Project } from "@/schemas/projects.schema";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
    onDelete: (projectId: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
    const { isMobile } = useSidebar();
    return (
        <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>

                {/* Settings Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div role="button" className="cursor-pointer">
                            <MoreVertical />
                            <span className="sr-only">More</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-48"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                    >
                        <Link href={`/user/project/${project.id}`}>
                            <DropdownMenuItem>
                                <Folder className="text-muted-foreground" />
                                <span>View Project</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                            <Share className="text-muted-foreground" />
                            <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(project.id)}>
                            <Trash2 className="text-muted-foreground" />
                            <span>Delete Project</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
                {project.customDomain ? (
                    <PreviewButton previewUrl={`https://${project.customDomain}`} />
                ) : (
                    <PreviewButton previewUrl={`https://${project.subDomain}`} />
                )}
            </CardContent>
        </Card>
    );
}
