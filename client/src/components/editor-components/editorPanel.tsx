//eslint-disable
import { usePortfolioStore } from "@/store/portfolio.store";
// import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { EditProjectPopup } from "./popups/editProjectPopup";
// import { CldUploadButton } from "next-cloudinary";
import { LucideUploadCloud } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { publishTemplate } from "@/api/publish-template";
import PreviewButton from "./previewBtn";
// import { AddProjectPopup } from "./popups/addProjectPopup";
// import { EditServicesAccordion } from "./editServicesAccordion";
// import { ReorderSectionsPopup } from "./popups/SectionsPopup";
// import { ReqInput } from "./inputs/reqInput";
import { EditorTabs } from "./editorTabs";
import { ReorderSectionsPopup } from "./popups/SectionsPopup";

interface EditorPanelProps {
    isEditing?: boolean;
}
export const EditorPanel = ({ isEditing }: EditorPanelProps) => {
    const { data } = usePortfolioStore();

    const { user } = useUserStore();
    if (!data) return <div>No data found</div>;

    // const heroSection = data.sections.find((s) => s.type === "hero");
    // const aboutSection = data.sections.find((s) => s.type === "about");
    // const workSection = data.sections.find((s) => s.type === "projects");
    // const socialSection = data.sections.find((s) => s.type === "social");
    // const servicesSection = data.sections.find((s) => s.type === "services");

    const sections = data.sections.map((section) => ({
        id: section.type,
        name: section.type.replace("Section", ""),
    }));

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("new data", data);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        await publishTemplate(data.name, data);
    };
    return (
        <div className="p-4 md:p-10 space-y-10">
            <div className="space-x-2">
                <PreviewButton
                    previewUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/live-preview/${user?.name}?template=${data.name}`}
                />
                {isEditing ? (
                    <Button onClick={handleSave} className="cursor-pointer">
                        Save
                    </Button>
                ) : (
                    <Button onClick={handlePublish} className="cursor-pointer">
                        Publish{" "}
                        <span>
                            <LucideUploadCloud />
                        </span>
                    </Button>
                )}
            </div>
            <ReorderSectionsPopup sections={sections} onReorder={() => { }} />
            <EditorTabs sections={data.sections.map((s) => s.type)} />
        </div>
        // <div className="space-y-10 fixed  top-0 left-0 md:w-[30%] overflow-scroll lg:p-10 p-4 bg-neutral-100 h-full">
        //     {/* Hero Section */}
        //     <ReorderSectionsPopup sections={sections} onReorder={() => { }} />
        //     {heroSection && (
        //         <div className="space-y-3">
        //             <h2 className=" text-3xl md:text-5xl font-bold">Hero Section</h2>
        //             <hr />
        //             <ReqInput
        //                 type="text"
        //                 label="Title"
        //                 placeholder="Title"
        //                 value={heroSection.data.title || ""}
        //             />
        //             <ReqInput
        //                 label="Animated Texts"
        //                 type="text"
        //                 placeholder="Web developer, Freelancer, Tech enthusiast"
        //                 value={heroSection.data.professions || ""}
        //             />
        //             <ReqInput
        //                 label="Button Redirect link"
        //                 type="text"
        //                 placeholder="https://reachooout.com"
        //                 value={heroSection.data.btnLink || ""}
        //             />
        //             <ReqInput
        //                 label="Button Text"
        //                 type="text"
        //                 placeholder="Visit my website"
        //                 value={heroSection.data.btnText || ""}
        //             />
        //             <CldUploadButton
        //                 uploadPreset="you-view"
        //                 options={{ sources: ["local", "url", "unsplash"] }}
        //                 className="cursor-pointer p-2 bg-neutral-800 rounded-lg"

        //             // onSuccess={(result: any) => {
        //             //     setSectionField("hero", "heroImgUrl", result.info.secure_url);
        //             // }}
        //             >
        //                 <div className="text-white flex items-center gap-2">
        //                     <h1 className="font-semibold">Upload Image</h1> <LucideUpload />
        //                 </div>
        //             </CldUploadButton>
        //             <span className="ml-2">Dimensions - 500x500</span>
        //         </div>
        //     )}
        //     {/* About Section */}
        //     {aboutSection && (
        //         <div className="space-y-3">
        //             <h2 className=" text-3xl md:text-5xl font-bold">About Section</h2>
        //             <hr />
        //             <ReqInput
        //                 label="Title"
        //                 type="text"
        //                 placeholder="Title"
        //                 className="uppercase"
        //                 value={aboutSection.data.title}
        //             />
        //             <ReqInput
        //                 label="Colored Text"
        //                 type="text"
        //                 placeholder="Hero Image URL"
        //                 value={aboutSection.data.colorTitle || ""}
        //                 className="uppercase"
        //             />
        //             <label className="font-semibold">Description</label>
        //             <textarea
        //                 placeholder="Description"
        //                 className="border p-2 w-full rounded-md "
        //                 value={aboutSection.data.description || ""}
        //             />
        //             <label className="font-semibold">Counters</label>
        //             {aboutSection.data.stats?.map((stat, index) => (
        //                 <div key={index} className="flex justify-between">
        //                     <Input
        //                         type="text"
        //                         placeholder="Stat Title"
        //                         value={stat.title}
        //                         className="w-1/2"
        //                     />
        //                     <Input
        //                         type="number"
        //                         placeholder="Count"
        //                         value={stat.value}
        //                         className="w-[30%] md:w-[20%]"
        //                     />
        //                 </div>
        //             ))}
        //         </div>
        //     )}
        //     {/* Work section */}
        //     {workSection && (
        //         <div className="space-y-3">
        //             <h2 className=" text-3xl md:text-5xl font-bold">Work Section</h2>
        //             <hr />
        //             <div className="flex justify-between mb-4">
        //                 <h1 className="font-semibold">Carousel</h1>
        //                 <AddProjectPopup>
        //                     <Button>Add Project</Button>
        //                 </AddProjectPopup>
        //             </div>
        //             {workSection.data.projects?.map((project, index) => (
        //                 <div key={index} className="space-y-4 flex justify-between">
        //                     <h3>Project {index + 1}</h3>
        //                     <EditProjectPopup project={project} projectIdx={index}>
        //                         <Button>Edit</Button>
        //                     </EditProjectPopup>
        //                 </div>
        //             ))}
        //         </div>
        //     )}
        //     {/* Social section */}
        //     {socialSection && (
        //         <div className="space-y-3">
        //             <h2 className=" text-3xl md:text-5xl font-bold">Socials Section</h2>
        //             <hr />
        //             <h1 className="font-semibold">Social media handles</h1>
        //             {socialSection.data.socials?.map((social, idx) => (
        //                 <div key={idx} className="flex justify-between items-center">
        //                     <ReqInput
        //                         label={social.title}
        //                         type="text"
        //                         className="w-1/2"
        //                         placeholder="https://x.com"
        //                         value={social.socialLink}
        //                     />
        //                     <ReqInput
        //                         type="number"
        //                         placeholder="500"
        //                         value={social.followerCounts ?? 0}
        //                         className="w-[30%] md:w-[20%]"
        //                     />
        //                 </div>
        //             ))}
        //         </div>
        //     )}
        //     {/* Services section */}
        //     {servicesSection && (
        //         <div className="space-y-3">
        //             <h2 className="text-3xl md:text-5xl font-bold">Services Section</h2>
        //             <hr />
        //             <ReqInput
        //                 label="Subtitle"
        //                 type="text"
        //                 placeholder="Subtitle here"
        //                 value={servicesSection.data.subtitle || ""}
        //             />
        //             <EditServicesAccordion services={servicesSection.data.services} />
        //         </div>
        //     )}
        // </div>
    );
};
