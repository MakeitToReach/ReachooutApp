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
                    <AccordionContent className="text-template-text-secondary">{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
