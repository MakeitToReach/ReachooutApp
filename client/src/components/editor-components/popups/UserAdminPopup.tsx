"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { updateTemplateExpiry } from "@/api/templates";
import { cn } from "@/lib/utils";

type TemplateItem = {
  projectId: string;
  templateId: string;
  order: number;
  slug?: string | null;
  expiresAt?: string | null;
  template: {
    id: string;
    name: string;
    displayName?: string;
    thumbnailUrl: string;
  };
};

type ProjectItem = {
  id: string;
  name: string;
  subDomain: string;
  customDomain?: string;
  createdAt: string;
  templates?: TemplateItem[];
};

type UserItem = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  projects: ProjectItem[];
  projectCount: number;
  isTrialUser: boolean;
};

export default function UserAdminPopup({
  open,
  onOpenChange,
  user,
  onOpenProject,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserItem | null;
  onOpenProject: (subdomain: string) => void;
}) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(),
  );

  const toggleProject = (projectId: string) => {
    const next = new Set(expandedProjects);
    if (next.has(projectId)) {
      next.delete(projectId);
    } else {
      next.add(projectId);
    }
    setExpandedProjects(next);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const setExpiry = async (tpl: TemplateItem, days: number) => {
    await updateTemplateExpiry(tpl.projectId, tpl.templateId, tpl.order, days);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-Poppins min-w-[70vw] max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl">User Admin</DialogTitle>
        </DialogHeader>

        {!user ? (
          <div className="text-muted-foreground">No user selected</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
              </div>
              <Badge variant="secondary">{user.projectCount} projects</Badge>
            </div>

            <div className="space-y-3">
              {user.projects.length === 0 && (
                <div className="text-sm text-muted-foreground">No projects</div>
              )}

              {user.projects.map((project) => (
                <Card key={project.id} className="border">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6"
                          onClick={() => toggleProject(project.id)}
                        >
                          {expandedProjects.has(project.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {project.customDomain ||
                              `${project.subDomain}.reachout.com`}{" "}
                            • Created {formatDate(project.createdAt)}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenProject(project.subDomain)}
                      >
                        Open
                      </Button>
                    </div>

                    {expandedProjects.has(project.id) && (
                      <div className="mt-3 space-y-2">
                        {project.templates && project.templates.length > 0 ? (
                          project.templates.map((tpl) => (
                            <div
                              key={`${tpl.templateId}-${tpl.order}`}
                              className={cn(
                                "flex items-center justify-between gap-3 border rounded-md p-2",
                                {
                                  "bg-muted border-red-300":
                                    tpl.expiresAt &&
                                    new Date(tpl.expiresAt) < new Date(),
                                },
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="font-medium">
                                    {tpl.template.displayName ||
                                      tpl.template.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Slug: {tpl.slug || "—"}{" "}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Expiry:{" "}
                                    {tpl.expiresAt
                                      ? formatDate(tpl.expiresAt)
                                      : "Not set"}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setExpiry(tpl, 7)}
                                >
                                  +7d
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setExpiry(tpl, 31)}
                                >
                                  +31d
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setExpiry(tpl, 365)}
                                >
                                  +365d
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            No templates
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
