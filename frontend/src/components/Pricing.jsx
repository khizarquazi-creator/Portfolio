import { ArrowUpRight, Check } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

const INCLUDES = [
  "Long-form video editing",
  "Motion design & graphics",
  "Sound treatment & mix",
  "Color grading",
  "Revision rounds",
  "Multi-format delivery",
];

export const Pricing = ({ onContact }) => {
  return (
    <section
      id="pricing"
      className="relative py-24 md:py-40"
      data-testid="pricing-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <Reveal className="md:col-span-5">
            <p className="overline mb-5">04 — Pricing</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.05] font-medium">
              One plan. Shaped to your project.
            </h2>
            <p className="muted mt-6 max-w-[40ch] leading-relaxed">
              Every project is different — scope, runtime, motion complexity,
              turnaround. Pricing reflects that, with full transparency upfront.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <div
              className="p-8 md:p-12 relative overflow-hidden"
              style={{
                border: "1px solid var(--border-strong)",
                borderRadius: 20,
                background: "var(--surface)",
              }}
              data-testid="pricing-card"
            >
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                  opacity: 0.08,
                }}
              />
              <div className="flex items-center justify-between">
                <span className="overline">Custom Plan</span>
                <span
                  className="px-3 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-on)",
                  }}
                >
                  Available
                </span>
              </div>

              <h3 className="mt-8 text-4xl md:text-5xl tracking-tight font-medium">
                Custom Pricing
              </h3>
              <p className="muted mt-3">Tailored to every project.</p>

              <div className="divider my-10" />

              <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px]">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <MagneticButton onClick={onContact} testId="pricing-cta-button">
                  Request a Quote <ArrowUpRight size={16} />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
