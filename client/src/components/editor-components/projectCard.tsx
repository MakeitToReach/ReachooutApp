import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Folder,
  MoreVertical,
  Trash2,
  Copy,
  ExternalLink,
  Settings2,
} from "lucide-react";
import { Project } from "@/schemas/projects.schema";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProjectCardProps {
  project: Project;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const { isMobile } = useSidebar();

  const getPortfolioUrl = () => {
    if (project.customDomain) {
      return `https://${project.customDomain}`;
    }
    // For development, use localhost, for production use your domain
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "localhost:3000"
        : "reachoout.com";
    return `http://${project.subDomain}.${baseUrl}`;
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Portfolio URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const portfolioUrl = getPortfolioUrl();

  return (
    <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 px-0">
      <CardHeader className="flex flex-row justify-between px-2 w-full">
        <div className="flex flex-row items-center gap-2 min-w-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src={project.faviconUrl || "/favicon.ico"} />
            <AvatarFallback>{project.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="text-sm">{project.name}</CardTitle>
            <a href={portfolioUrl} target="_blank" className="block max-w-[280px]">
              <p className="text-xs text-muted-foreground hover:underline truncate max-w-full">
                {portfolioUrl}
              </p>
            </a>
          </div>
        </div>

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
            <DropdownMenuItem onClick={() => copyToClipboard(portfolioUrl)}>
              <Copy className="text-muted-foreground" />
              <span>Copy URL</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(portfolioUrl, "_blank")}
            >
              <ExternalLink className="text-muted-foreground" />
              <span>Open Portfolio</span>
            </DropdownMenuItem>
            <Link href={`/user/project/settings/${project.id}`}>
              <DropdownMenuItem>
                <Settings2 className="text-muted-foreground" />
                <span>Project Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(project.id)}>
              <Trash2 className="text-destructive" />
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* <CardContent className="flex flex-col space-y-4">
        <PreviewButton previewUrl={portfolioUrl} />
      </CardContent> */}
    </Card>
  );
}
