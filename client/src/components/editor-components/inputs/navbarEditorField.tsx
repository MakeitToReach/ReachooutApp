import React from "react";
import { ReqInput } from "./reqInput";
import { usePortfolioStore } from "@/store/portfolio.store";

export const NavbarEditorField = () => {
  const { data, setSectionName } = usePortfolioStore();

  const visibleSections = data?.sections.slice(2, data.sections.length - 2 ).filter((section) => section.isHidden === false);

  const handleChange = (type: string, newName: string) => {
    setSectionName(type, newName);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-xl ">Navbar Options</h1>
      </div>
      {visibleSections &&
        visibleSections.map((section, index) => (
          <ReqInput
            key={index}
            // label={section.sectionName}
            value={section.sectionName}
            onChange={(e) => handleChange(section.type, e.target.value)}
          />
        ))}
    </div>
  );
};
