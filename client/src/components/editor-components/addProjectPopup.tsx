import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePortfolioStore } from "@/store/portfolio.store";
import { PF_PROJECT } from "@/templates/professional/types/project";
import { DialogClose } from "@radix-ui/react-dialog";
import { LucideUpload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";

interface AddProjectPopupProps {
    children: React.ReactNode;
}
export function AddProjectPopup({ children }: AddProjectPopupProps) {
    const { addProject } = usePortfolioStore();
    const [project, setProject] = useState<PF_PROJECT>({
        heading: "",
        subtitle: "",
        description: "",
        btnText: "",
        btnLink: "",
        imgUrl: "https://github.com/shadcn.png",
    });
    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[600px]"
                style={{ overflow: "visible" }}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Heading</label>
                        <Input
                            type="text"
                            placeholder="Enter your project heading"
                            value={project.heading}
                            onChange={(e) =>
                                setProject({ ...project, heading: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Subtitle</label>
                        <Input
                            type="text"
                            placeholder="Enter subtitle"
                            value={project.subtitle}
                            onChange={(e) =>
                                setProject({ ...project, subtitle: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Description</label>
                        <Input
                            type="text"
                            placeholder="Enter your project description"
                            value={project.description}
                            onChange={(e) =>
                                setProject({ ...project, description: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Button Text</label>
                        <Input
                            type="text"
                            placeholder="View my project"
                            value={project.btnText}
                            onChange={(e) =>
                                setProject({ ...project, btnText: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Button Redirect Link</label>
                        <Input
                            type="text"
                            placeholder="https://reachoout.com"
                            value={project.btnLink}
                            onChange={(e) =>
                                setProject({ ...project, btnLink: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-x-2">
                        <label htmlFor="" className="font-semibold">
                            Project Image -
                        </label>
                        <CldUploadButton
                            uploadPreset="you-view"
                            options={{ sources: ["local", "url", "unsplash"] }}
                            className="cursor-pointer p-1 bg-neutral-800 rounded-lg z-[100]"
                            //eslint-disable-next-line
                            onSuccess={(result: any) => {
                                setProject({ ...project, imgUrl: result.info.url });
                            }}
                        >
                            <div className="text-white flex items-center gap-2">
                                <h1 className="font-semibold">Upload Image</h1> <LucideUpload />
                            </div>
                        </CldUploadButton>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => addProject(project)}>Add</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
