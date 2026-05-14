import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    q: "What kind of projects do you take on?",
    a: "Long-form video editing — documentaries, brand films, podcast episodes, YouTube long-form, course content, and similar. If the runtime is meaningful and the story needs care, it fits.",
  },
  {
    q: "What software do you work in?",
    a: "Primarily Adobe Premiere Pro for the edit and After Effects for motion design. Files are delivered in whatever format your distribution needs.",
  },
  {
    q: "How does collaboration work?",
    a: "Async by default. We agree on direction upfront, you upload footage and notes, I send drafts with clear timestamps for review. Most projects need one to two revision rounds.",
  },
  {
    q: "What about turnaround time?",
    a: "It depends on runtime, motion complexity and your review pace. I'll give a realistic schedule before we start — and stick to it.",
  },
  {
    q: "Do you offer rush delivery?",
    a: "Occasionally, depending on capacity. Rush work carries a small premium so it doesn't compromise the rest of the schedule.",
  },
  {
    q: "What about ownership and source files?",
    a: "You own the final work and the project files. Source assets and a project archive are handed over on delivery.",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="relative py-24 md:py-40"
      data-testid="faq-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-4">
          <p className="overline mb-5">05 — FAQ</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.05] font-medium">
            Questions, answered plainly.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible className="w-full">
            {ITEMS.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-b"
                style={{ borderColor: "var(--border)" }}
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-left text-[17px] md:text-[19px] py-6 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="muted leading-relaxed text-[15px] md:text-[16px] pb-6 pr-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};
