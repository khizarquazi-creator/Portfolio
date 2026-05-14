import { Reveal } from "./Reveal";

export const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 md:py-40"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-6">01 — About</p>
            <h2 className="display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.0]">
              A quiet craft, sharpened over thousands of timeline hours.
            </h2>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6 space-y-8 text-[17px] md:text-[18px] leading-[1.7]">
            <Reveal delay={0.1}>
              <p>
                I'm Khizar Quazi — a freelance video editor and motion designer working
                primarily in long-form. My focus is the unglamorous part of the
                craft: pacing, breathing room, sound design, the cut you don't
                notice because it just feels right.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="muted">
                I work in Adobe Premiere Pro and After Effects. Every frame is
                intentional. Every transition earns its place. The goal isn't to
                impress — it's to hold the viewer until the last second feels
                inevitable.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-x-10 gap-y-4 pt-4 eyebrow">
                <span>Long-form editing</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>Motion design</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>Sound treatment</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>Color</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
