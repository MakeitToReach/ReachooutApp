"use client";

import { deleteProjectById, getUserProjects } from "@/api/project";
import { CreateUserProjectDialog } from "@/components/editor-components/popups/createUserProject";
import { ProjectCard } from "@/components/editor-components/projectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/schemas/projects.schema";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProjectsTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProjectById(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

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

  return (
    <div>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex justify-between w-full">
          <h1 className="text-2xl text-black dark:text-white">Your Projects</h1>
        </div>
      </header>

      {/* Project Grid */}
      <div className="grid md:grid-cols-3 gap-4 px-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-[400px] w-full animate-pulse shadow-2xl shadow-black bg-neutral-950"
            />
          ))
        ) : (
          <>
            {projects.length > 0
              ? projects.map((project, idx) => (
                  <ProjectCard
                    key={idx}
                    project={project}
                    onDelete={(id) => handleDeleteProject(id)}
                  />
                ))
              : null}

            {/* Create Project Card */}
            <CreateUserProjectDialog>
              <Card className="border bg-transparent border-dashed border-gray-400 bg-none rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-card transition-colors">
                <CardContent>
                  <Button variant="outline">+ Create New Project</Button>
                </CardContent>
              </Card>
            </CreateUserProjectDialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsTab;
