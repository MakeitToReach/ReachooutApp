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
import { TipTapEditor } from "@/components/ui/TipTapEditor";

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
        className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll"
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
            <TipTapEditor
              value={project.description}
              onChange={(value) => setProject({ ...project, description: value })}
              placeholder="Description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <div className="flex w-full gap-2">
            <ReqInput
              label="Button Text"
              type="text"
              className="w-full"
              placeholder="View my project"
              onChange={(e) =>
                setProject({ ...project, btnText: e.target.value })
              }
            />

            <ReqInput
              label="Button Link"
              type="text"
              className="w-full"
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
