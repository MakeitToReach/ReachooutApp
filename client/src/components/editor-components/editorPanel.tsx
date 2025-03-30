import { usePortfolioStore } from "@/store/portfolio.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EditProjectPopup } from "./editProjectPopup";

export const EditorPanel = () => {
    const { data, setSectionField, setStatField } = usePortfolioStore();
    if (!data) return null;

    return (
        <form className="space-y-10 lg:p-10 p-4 bg-neutral-100 h-full">
            {/* Hero Section */}
            <div className="space-y-3">
                <h2 className=" text-3xl md:text-5xl font-bold">Hero Section</h2>
                <hr />
                <label className="font-semibold">Title</label>
                <Input
                    type="text"
                    placeholder="Title"
                    value={data.sections.heroSection.title}
                    onChange={(e) =>
                        setSectionField("heroSection", "title", e.target.value)
                    }
                />
                <label className="font-semibold">Hero Image</label>
                <Input
                    type="text"
                    placeholder="Hero Image URL"
                    value={data.sections.heroSection.heroImgUrl}
                    onChange={(e) =>
                        setSectionField("heroSection", "heroImgUrl", e.target.value)
                    }
                />
                <label className="font-semibold">Button Redirect Link</label>
                <Input
                    type="text"
                    placeholder="https://reachooout.com"
                    value={data.sections.heroSection.btnLink}
                    onChange={(e) =>
                        setSectionField("heroSection", "btnLink", e.target.value)
                    }
                />
                <label className="font-semibold">Button Text</label>
                <Input
                    type="text"
                    placeholder="Visit my website"
                    value={data.sections.heroSection.btnText}
                    onChange={(e) =>
                        setSectionField("heroSection", "btnText", e.target.value)
                    }
                />
            </div>

            {/* About Section */}
            <div className="space-y-3">
                <h2 className=" text-3xl md:text-5xl font-bold">About Section</h2>
                <hr />
                <label className="font-semibold">Title</label>
                <Input
                    type="text"
                    placeholder="Hero Image URL"
                    className="uppercase"
                    value={data.sections.aboutSection.title}
                    onChange={(e) =>
                        setSectionField("aboutSection", "title", e.target.value)
                    }
                />
                <label className="font-semibold">Colored Text</label>
                <Input
                    type="text"
                    placeholder="Hero Image URL"
                    value={data.sections.aboutSection.colorTitle}
                    className="uppercase"
                    onChange={(e) =>
                        setSectionField("aboutSection", "colorTitle", e.target.value)
                    }
                />
                <label className="font-semibold">Description</label>
                <textarea
                    placeholder="Description"
                    className="border p-2 w-full rounded-md "
                    value={data.sections.aboutSection.description}
                    onChange={(e) =>
                        setSectionField("aboutSection", "description", e.target.value)
                    }
                />
                <label className="font-semibold">Counters</label>
                {data.sections.aboutSection.stats.map((stat, index) => (
                    <div key={index} className="flex justify-between">
                        <Input
                            type="text"
                            placeholder="Hero Image URL"
                            value={stat.title}
                            className="w-1/2"
                            onChange={(e) =>
                                setStatField("aboutSection", index, "title", e.target.value)
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Count"
                            value={stat.value}
                            className="w-[30%] md:w-[10%]"
                            onChange={(e) =>
                                setStatField("aboutSection", index, "value", e.target.value)
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Work section */}
            <div className="space-y-3">
                <h2 className=" text-3xl md:text-5xl font-bold">Work Section</h2>
                <hr />
                <h1 className="font-semibold">Carousel</h1>
                {data.sections.workSection.projects.map((project, index) => (
                    <div key={index} className="space-y-4 flex justify-between">
                        <h3>Project {index + 1}</h3>
                        <EditProjectPopup project={project} projectIdx={index}>
                            <Button>Edit</Button>
                        </EditProjectPopup>
                    </div>
                ))}
            </div>
        </form>
    );
};
