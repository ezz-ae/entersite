import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqBlockProps {
  headline: string;
  subtext: string;
  faqItems: FaqItem[];
}

export function FaqBlock({ headline, subtext, faqItems = [] }: FaqBlockProps) {
  return (
    <div className="py-12 bg-muted/50 rounded-lg">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{headline}</h2>
          <p className="mt-2 text-lg text-muted-foreground">{subtext}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
             <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
