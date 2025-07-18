import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
    question: string;
    answer: string;
};

interface FFaqAccordionProps {
    faqs: FAQItem[];
}

export function FFaqAccordion({ faqs }: FFaqAccordionProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
        >
            {faqs.map((faq, idx) => (
                <AccordionItem value={`item-${idx}`} key={idx}>
                    <AccordionTrigger className="text-template-text-secondary">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-template-text-secondary">
                        <div
                            className="
    prose prose-sm max-w-none text-template-text-secondary
    prose-p:text-template-text-secondary
    prose-strong:text-template-text-secondary
    prose-h1:text-template-text-secondary
    prose-h2:text-template-text-secondary
    prose-h3:text-template-text-secondary
    prose-h4:text-template-text-secondary
    prose-h5:text-template-text-secondary
    prose-h6:text-template-text-secondary
  "
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
