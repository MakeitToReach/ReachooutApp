import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import PreviewButton from "./previewBtn";
import { Project } from "@/schemas/projects.schema";

interface ProjectCardProps {
    project: Project;
    onDelete: () => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
    return (
        <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>

                {/* Settings Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link
                                href={`https://${project.customDomain || project.subDomain}`}
                                target="_blank"
                            >
                                View Project
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-red-600">
                            Delete Project
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
