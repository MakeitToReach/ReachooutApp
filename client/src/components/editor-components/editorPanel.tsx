import { usePortfolioStore } from "@/store/portfolio.store";
import { Input } from "../ui/input";

export const EditorPanel = () => {
    const { data, setSectionField } = usePortfolioStore();
    if (!data) return null;

    return (
        <form className="space-y-4 p-10">
            {/* Hero Section */}
            <h2 className="text-5xl font-bold">Hero Section</h2>
            <label htmlFor="title">Title</label>
            <Input
                type="text"
                placeholder="Title"
                value={data.sections.heroSection.title}
                onChange={(e) =>
                    setSectionField("heroSection", "title", e.target.value)
                }
            />
            <label htmlFor="heroImg">Hero Image</label>
            <Input
                type="text"
                placeholder="Hero Image URL"
                value={data.sections.heroSection.heroImgUrl}
                onChange={(e) =>
                    setSectionField("heroSection", "heroImgUrl", e.target.value)
                }
            />
            <label htmlFor="heroImg">Button Redirect link</label>
            <Input
                type="text"
                placeholder="https://reachooout.com"
                value={data.sections.heroSection.btnLink}
                onChange={(e) =>
                    setSectionField("heroSection", "btnLink", e.target.value)
                }
            />
            <label htmlFor="heroImg">Button Text</label>
            <Input
                type="text"
                placeholder="Visit my website"
                value={data.sections.heroSection.btnText}
                onChange={(e) =>
                    setSectionField("heroSection", "btnText", e.target.value)
                }
            />

            {/* About Section */}
            <h2 className="text-5xl font-bold">About Section</h2>
            <label htmlFor="title">Title</label>
            <Input
                type="text"
                placeholder="Hero Image URL"
                className="uppercase"
                value={data.sections.aboutSection.title}
                onChange={(e) =>
                    setSectionField("aboutSection", "title", e.target.value)
                }
            />
            <label htmlFor="">Colored Text</label>
            <Input
                type="text"
                placeholder="Hero Image URL"
                value={data.sections.aboutSection.colorTitle}
                className="uppercase"
                onChange={(e) =>
                    setSectionField("aboutSection", "colorTitle", e.target.value)
                }
            />
            <label htmlFor="description">Description</label>
            <textarea
                placeholder="Description"
                className="border p-2 w-full "
                value={data.sections.aboutSection.description}
                onChange={(e) =>
                    setSectionField("aboutSection", "description", e.target.value)
                }
            />
        </form>
    );
};
