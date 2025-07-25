// Example: CreateProjectDialog.tsx
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  // DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReqInput } from "../inputs/reqInput";
import { createUserProject } from "@/api/project";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const CreateUserProjectDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [projectName, setProjectName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      const response = await createUserProject(projectName, description);
      if (response.status == 201) {
        toast.success("Project created successfully");
        router.push(`/explore?pid=${response.data.project.id}`);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">Create Project</DialogTitle>
          <DialogDescription className="text-base">
            These details will be used for the metadata for your website
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <ReqInput
            type="text"
            label="Project Name"
            placeholder="Reachoout's Portfolio"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A portfolio website for Reachoout"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="default"
            className="mt-2"
            disabled={!projectName || loading}
            onClick={handleCreateProject}
          >
            {/* {loading ? "Creating..." : "Explore Templates"} */}
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Explore Templates
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
