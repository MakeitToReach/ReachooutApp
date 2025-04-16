import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PF_PROJECT } from "@/templates/professional/types/project";
import { DialogClose } from "@radix-ui/react-dialog";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { ReqInput } from "../inputs/reqInput";
import ImageSelectButton from "../inputs/imageInputBtn";

interface AddProjectPopupProps {
    children: React.ReactNode;
    onAdd: (project: PF_PROJECT) => void;
}
export function AddProjectPopup({ children, onAdd }: AddProjectPopupProps) {
    // const { addProject } = usePortfolioStore();
    const [project, setProject] = useState<PF_PROJECT>({
        heading: "",
        subtitle: "",
        description: "",
        btnText: "",
        btnLink: "",
        imgUrl: "https://placehold.co/500",
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
                    <ReqInput
                        type="text"
                        label="Heading"
                        placeholder="Enter your project heading"
                        value={project.heading}
                        onChange={(e) =>
                            setProject({ ...project, heading: e.target.value })
                        }
                    />

                    <ReqInput
                        label="Subtitle"
                        type="text"
                        placeholder="Enter subtitle"
                        value={project.subtitle}
                        onChange={(e) =>
                            setProject({ ...project, subtitle: e.target.value })
                        }
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={project.description}
                            onChange={(e) =>
                                setProject({ ...project, description: e.target.value })
                            }
                        />
                    </div>

                    <ReqInput
                        label="Button Text"
                        type="text"
                        placeholder="View my project"
                        value={project.btnText}
                        onChange={(e) =>
                            setProject({ ...project, btnText: e.target.value })
                        }
                    />

                    <ReqInput
                        label="Button Redirect Link"
                        type="text"
                        placeholder="https://reachoout.com"
                        value={project.btnLink}
                        onChange={(e) =>
                            setProject({ ...project, btnLink: e.target.value })
                        }
                    />

                    <div className="space-x-2">
                        <CldUploadButton
                            uploadPreset="you-view"
                            options={{ sources: ["local", "url", "unsplash"] }}
                            className="cursor-pointer p-1 bg-neutral-800 rounded-lg z-[100]"
                            //eslint-disable-next-line
                            onSuccess={(result: any) => {
                                setProject({ ...project, imgUrl: result.info.url });
                            }}
                        >
                            <ImageSelectButton selectedImgUrl={project.imgUrl} />
                        </CldUploadButton>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(project);
                                setProject({
                                    heading: "",
                                    subtitle: "",
                                    description: "",
                                    btnText: "",
                                    btnLink: "",
                                    imgUrl: "https://placehold.co/500",
                                });
                            }}
                        >
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
