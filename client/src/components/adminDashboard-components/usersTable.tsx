"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import UserAdminPopup from "../editor-components/popups/UserAdminPopup";

interface Project {
  id: string;
  name: string;
  subDomain: string;
  customDomain?: string;
  createdAt: string;
  templates?: Array<{
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
  }>;
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openUserPopup = (user: User) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };
  const closeUserPopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
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
                user.isTrialUser ? "border" : "border-black"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={() => openUserPopup(user)}>
                    Manage
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
            </div>
          ))}
        </div>
      </CardContent>
      <UserAdminPopup open={isPopupOpen} onOpenChange={(v: boolean) => (v ? setIsPopupOpen(true) : closeUserPopup())} user={selectedUser} onOpenProject={openProject} />
    </Card>
  );
};
