import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
import PreviewButton from "./previewBtn";
import { Project } from "@/schemas/projects.schema";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { toast } from "sonner";

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
    <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <a href={portfolioUrl} target="_blank">
            <p className="text-sm text-muted-foreground hover:underline text-xs">
              {portfolioUrl}
            </p>
          </a>
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
