import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PF_SERVICES } from "@/templates/professional/types/services";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { usePortfolioStore } from "@/store/portfolio.store";

interface EditServicesAccordionProps {
  services?: PF_SERVICES[];
}
export function EditServicesAccordion({
  services,
}: EditServicesAccordionProps) {
  const { setServicesField } = usePortfolioStore();
  return (
    <Accordion type="single" collapsible className="w-full">
      {services &&
        services.map((service, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>
              <h1 className="text-shadow-black text-xl font-semibold">{`Service ${idx + 1}`}</h1>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input
                  type="text"
                  value={service.heading}
                  onChange={(e) =>
                    setServicesField(idx, "heading", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  placeholder="Description"
                  className="border p-2 w-full rounded-md h-20"
                  value={service.description}
                  onChange={(e) =>
                    setServicesField(idx, "description", e.target.value)
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
