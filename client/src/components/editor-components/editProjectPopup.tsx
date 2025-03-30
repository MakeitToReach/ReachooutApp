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

interface EdtiProjectPopupProps {
    children: React.ReactNode;
    project: PF_PROJECT;
    projectIdx: number;
}
export function EditProjectPopup({
    children,
    project,
    projectIdx,
}: EdtiProjectPopupProps) {
    const { setProjectField } = usePortfolioStore();
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Project {projectIdx + 1}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Heading</label>
                        <Input
                            type="text"
                            placeholder="Enter your project heading"
                            value={project.heading}
                            onChange={(e) =>
                                setProjectField(
                                    "workSection",
                                    projectIdx,
                                    "heading",
                                    e.target.value,
                                )
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
                                setProjectField(
                                    "workSection",
                                    projectIdx,
                                    "subtitle",
                                    e.target.value,
                                )
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
                                setProjectField(
                                    "workSection",
                                    projectIdx,
                                    "description",
                                    e.target.value,
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Image URL</label>
                        <Input
                            type="text"
                            placeholder="https://picsum.photos/300"
                            value={project.imgUrl}
                            onChange={(e) =>
                                setProjectField(
                                    "workSection",
                                    projectIdx,
                                    "imgUrl",
                                    e.target.value,
                                )
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
                                setProjectField(
                                    "workSection",
                                    projectIdx,
                                    "btnText",
                                    e.target.value,
                                )
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
                                setProjectField(
                                    "workSection",
                                    projectIdx,
                                    "btnLink",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Back to Preview</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
