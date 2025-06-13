// Example: CreateProjectDialog.tsx
import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    // DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReqInput } from "../inputs/reqInput";
import { createUserProject } from "@/api/project";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateUserProjectDialog = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();

    const [projectName, setProjectName] = React.useState("");

    const handleCreateProject = async () => {
        const response = await createUserProject(projectName);
        if (response.status == 201) {
            toast.success("Project created successfully");
            // console.log(response.data.project.id);
            router.push(`/explore?pid=${response.data.project.id}`);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="text-xl">Create Rechoout Project</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <ReqInput
                        type="text"
                        label="Project Name"
                        placeholder="Enter your project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <Button
                        variant="default"
                        className="self-end  mt-2"
                        disabled={!projectName}
                        onClick={handleCreateProject}
                    >
                        Explore Templates
                    </Button>
                </div>
                {/* <DialogFooter> */}
                {/*     <Button type="submit">Create</Button> */}
                {/* </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};
