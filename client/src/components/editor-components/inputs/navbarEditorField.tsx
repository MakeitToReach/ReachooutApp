import React from "react";
import { ReqInput } from "./reqInput";
import { usePortfolioStore } from "@/store/portfolio.store";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const NavbarEditorField = () => {
  const { data, setSectionName } = usePortfolioStore();

  const visibleSections = data?.sections.slice(2, data.sections.length - 2 ).filter((section) => section.isHidden === false);

  const handleChange = (type: string, newName: string) => {
    setSectionName(type, newName);
  };

  return (
    <div className="space-y-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="navbar-options">
          <AccordionTrigger>
            <h1 className="font-semibold text-xl">Menu Options</h1>
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            {visibleSections &&
              visibleSections.map((section, index) => (
                <ReqInput
                  key={index}
                  value={section.sectionName}
                  onChange={(e) => handleChange(section.type, e.target.value)}
                />
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
