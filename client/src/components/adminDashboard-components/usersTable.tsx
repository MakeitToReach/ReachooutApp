"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  subDomain: string;
  customDomain?: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  projects: Project[];
  projectCount: number;
  isTrialUser: boolean;
}

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  const toggleUserExpansion = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openProject = (subdomain: string) => {
    window.open(`https://${subdomain}.reachoout.com`, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Users ({users.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={cn(
                "border rounded-lg p-4",
                user.isTrialUser ? "border border" : "border-black"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleUserExpansion(user.id)}
                    className="p-1 h-6 w-6"
                  >
                    {expandedUsers.has(user.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Created</div>
                    <div className="text-sm font-medium">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {user.projectCount} projects
                  </Badge>
                </div>
              </div>

              {expandedUsers.has(user.id) && user.projects.length > 0 && (
                <div className="mt-4 ml-8 space-y-2">
                  {user.projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                    >
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.customDomain ||
                            `${project.subDomain}.reachout.com`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {formatDate(project.createdAt)}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openProject(project.subDomain)}
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {expandedUsers.has(user.id) && user.projects.length === 0 && (
                <div className="mt-4 ml-8 text-sm text-muted-foreground">
                  No projects created yet.
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
