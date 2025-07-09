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
import { useState } from "react";
import { ReqInput } from "../inputs/reqInput";
import { ImageInput } from "@/components/imgInput";
import { Textarea } from "@/components/ui/textarea";

interface AddProjectPopupProps {
  children: React.ReactNode;
  onAdd: (project: PF_PROJECT) => void;
}
export function AddProjectPopup({ children, onAdd }: AddProjectPopupProps) {
  // const { addProject } = usePortfolioStore();
  const [project, setProject] = useState<PF_PROJECT>({
    heading: "",
    description: "",
    btnText: "",
    btnLink: "",
    imgUrl: "https://placehold.co/500",
    category: "",
    vidUrl: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-scroll"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Project</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Heading"
            placeholder="Enter your project heading"
            onChange={(e) =>
              setProject({ ...project, heading: e.target.value })
            }
          />

          <ReqInput
            label="Category Tag"
            type="text"
            placeholder="Enter your project category"
            onChange={(e) =>
              setProject({ ...project, category: e.target.value })
            }
          />

          <div>
            <label className="font-semibold">Description</label>
            <Textarea
              placeholder="Description"
              className="border p-2 w-full rounded-md h-20"
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <ReqInput
              label="Button Text"
              type="text"
              placeholder="View my project"
              onChange={(e) =>
                setProject({ ...project, btnText: e.target.value })
              }
            />

            <ReqInput
              label="Button Link"
              type="text"
              placeholder="https://reachoout.com"
              value={project.btnLink}
              onChange={(e) =>
                setProject({ ...project, btnLink: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col items-center md:gap-10 gap-6">
            <ImageInput
              className="w-full"
              onImageUpload={(imgUrl) => {
                setProject({ ...project, imgUrl: imgUrl });
              }}
              onImageRemove={() => setProject({ ...project, imgUrl: "" })}
            />

            <h1 className="text-xs md:text-lg">OR</h1>

            <ReqInput
              className="w-full"
              label="Video URL"
              type="text"
              placeholder="https://youtub.com/watch?v=******"
              onChange={(e) => setProject({ ...project, vidUrl: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(project);
                setProject({
                  heading: "",
                  description: "",
                  btnText: "",
                  btnLink: "",
                  imgUrl: "https://placehold.co/500",
                  category: "",
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
