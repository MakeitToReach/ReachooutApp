import { usePortfolioStore } from "@/store/portfolio.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EditProjectPopup } from "./editProjectPopup";
import { CldUploadButton } from "next-cloudinary";
import { LucideUpload, LucideUploadCloud } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { publishTemplate } from "@/api/publish-template";
import PreviewButton from "./previewBtn";
import { AddProjectPopup } from "./addProjectPopup";
import { EditServicesAccordion } from "./editServicesAccordion";

interface EditorPanelProps {
    isEditing?: boolean;
}
export const EditorPanel = ({ isEditing }: EditorPanelProps) => {
    const { data, setSectionField, updateArrayItemField } = usePortfolioStore();
    const { user } = useUserStore();
    if (!data) return <div>No data found</div>;

    const heroSection = data.sections.find((s) => s.type === "hero");
    const aboutSection = data.sections.find((s) => s.type === "about");
    const workSection = data.sections.find((s) => s.type === "projects");
    const socialSection = data.sections.find((s) => s.type === "social");
    const servicesSection = data.sections.find((s) => s.type === "services");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("new data", data);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        await publishTemplate(data.name, data);
    };

    return (
        <form className="space-y-10 fixed top-0 left-0 md:w-[30%]  overflow-scroll lg:p-10 p-4 bg-neutral-100 h-full">
            {/* Hero Section */}
            {heroSection && (
                <div className="space-y-3">
                    <h2 className=" text-3xl md:text-5xl font-bold">Hero Section</h2>
                    <hr />
                    <label className="font-semibold">Title</label>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={heroSection.data.title || ""}
                        onChange={(e) => setSectionField("hero", "title", e.target.value)}
                    />
                    <label className="font-semibold">
                        Animated Texts (comma separated)
                    </label>
                    <Input
                        type="text"
                        placeholder="Web developer, Freelancer, Tech enthusiast"
                        value={heroSection.data.professions || ""}
                        onChange={(e) =>
                            setSectionField("hero", "professions", e.target.value)
                        }
                    />
                    <label className="font-semibold">Button Redirect Link</label>
                    <Input
                        type="text"
                        placeholder="https://reachooout.com"
                        value={heroSection.data.btnLink || ""}
                        onChange={(e) => setSectionField("hero", "btnLink", e.target.value)}
                    />
                    <label className="font-semibold">Button Text</label>
                    <Input
                        type="text"
                        placeholder="Visit my website"
                        value={heroSection.data.btnText || ""}
                        onChange={(e) => setSectionField("hero", "btnText", e.target.value)}
                    />
                    <CldUploadButton
                        uploadPreset="you-view"
                        options={{ sources: ["local", "url", "unsplash"] }}
                        className="cursor-pointer p-2 bg-neutral-800 rounded-lg"
                        //eslint-disable-next-line
                        onSuccess={(result: any) => {
                            setSectionField("hero", "heroImgUrl", result.info.secure_url);
                        }}
                    >
                        <div className="text-white flex items-center gap-2">
                            <h1 className="font-semibold">Upload Image</h1> <LucideUpload />
                        </div>
                    </CldUploadButton>
                    <span className="ml-2">Dimensions - 500x500</span>
                </div>
            )}

            {/* About Section */}
            {aboutSection && (
                <div className="space-y-3">
                    <h2 className=" text-3xl md:text-5xl font-bold">About Section</h2>
                    <hr />
                    <label className="font-semibold">Title</label>
                    <Input
                        type="text"
                        placeholder="Title"
                        className="uppercase"
                        value={aboutSection.data.title}
                        onChange={(e) => setSectionField("about", "title", e.target.value)}
                    />
                    <label className="font-semibold">Colored Text</label>
                    <Input
                        type="text"
                        placeholder="Hero Image URL"
                        value={aboutSection.data.colorTitle || ""}
                        className="uppercase"
                        onChange={(e) =>
                            setSectionField("about", "colorTitle", e.target.value)
                        }
                    />
                    <label className="font-semibold">Description</label>
                    <textarea
                        placeholder="Description"
                        className="border p-2 w-full rounded-md "
                        value={aboutSection.data.description || ""}
                        onChange={(e) =>
                            setSectionField("about", "description", e.target.value)
                        }
                    />
                    <label className="font-semibold">Counters</label>
                    {aboutSection.data.stats?.map((stat, index) => (
                        <div key={index} className="flex justify-between">
                            <Input
                                type="text"
                                placeholder="Stat Title"
                                value={stat.title}
                                className="w-1/2"
                                onChange={(e) =>
                                    updateArrayItemField(
                                        "about",
                                        "stats",
                                        index,
                                        "title",
                                        e.target.value,
                                    )
                                }
                            />
                            <Input
                                type="number"
                                placeholder="Count"
                                value={stat.value}
                                className="w-[30%] md:w-[20%]"
                                onChange={(e) =>
                                    updateArrayItemField(
                                        "about",
                                        "stats",
                                        index,
                                        "value",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Work section */}
            {workSection && (
                <div className="space-y-3">
                    <h2 className=" text-3xl md:text-5xl font-bold">Work Section</h2>
                    <hr />
                    <div className="flex justify-between mb-4">
                        <h1 className="font-semibold">Carousel</h1>
                        <AddProjectPopup>
                            <Button>Add Project</Button>
                        </AddProjectPopup>
                    </div>
                    {workSection.data.projects?.map((project, index) => (
                        <div key={index} className="space-y-4 flex justify-between">
                            <h3>Project {index + 1}</h3>
                            <EditProjectPopup project={project} projectIdx={index}>
                                <Button>Edit</Button>
                            </EditProjectPopup>
                        </div>
                    ))}
                </div>
            )}

            {/* Social section */}
            {socialSection && (
                <div className="space-y-3">
                    <h2 className=" text-3xl md:text-5xl font-bold">Socials Section</h2>
                    <hr />
                    <h1 className="font-semibold">Social media handles</h1>
                    {socialSection.data.socials?.map((social, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <div className="w-1/2 space-y-1">
                                <label className="font-semibold">{social.title}</label>
                                <Input
                                    type="text"
                                    placeholder="https://x.com"
                                    value={social.socialLink}
                                    onChange={(e) =>
                                        updateArrayItemField(
                                            "social",
                                            "socials",
                                            idx,
                                            "socialLink",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <Input
                                type="number"
                                placeholder="500"
                                value={social.followerCounts ?? 0}
                                className="w-[30%] md:w-[20%]"
                                onChange={(e) =>
                                    updateArrayItemField(
                                        "social",
                                        "socials",
                                        idx,
                                        "followerCounts",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Services section */}
            {servicesSection && (
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-bold">Services Section</h2>
                    <hr />
                    <div>
                        <label className="font-semibold">Subtitle</label>
                        <Input
                            type="text"
                            placeholder="Subtitle here"
                            value={servicesSection.data.subtitle || ""}
                            onChange={(e) =>
                                setSectionField("services", "subtitle", e.target.value)
                            }
                        />
                    </div>
                    <EditServicesAccordion services={servicesSection.data.services} />
                </div>
            )}

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
        </form>
    );
};
