import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export const Hero = ({ onContact }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-32 pb-36 md:pb-40 overflow-hidden"
      data-testid="hero-section"
    >
      <div className="hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-[0.35]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span className="overline">Freelance Video Editor / Motion Designer</span>
        </motion.div>

        <h1
          className="text-[44px] sm:text-[68px] md:text-[92px] lg:text-[108px] leading-[0.95] tracking-[-0.035em] font-medium max-w-[18ch]"
          data-testid="hero-headline"
        >
          {"Turning raw clips into".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.06, ease: [0.22, 0.85, 0.3, 1] }}
              className="inline-block mr-[0.22em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 0.85, 0.3, 1] }}
            className="inline-block"
            style={{ color: "var(--accent)" }}
          >
            mini masterpieces.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="muted mt-10 max-w-[52ch] text-[16px] md:text-[17px] leading-relaxed"
        >
          Long-form video editing for creators, businesses and personal brands.
          Quiet, considered cuts. Clean motion. Stories that hold attention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton onClick={onContact} testId="hero-cta-button">
            Let's Talk <ArrowUpRight size={16} />
          </MagneticButton>
          <a
            href="#portfolio"
            className="btn-ghost"
            data-testid="hero-view-work-link"
          >
            View Work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 muted"
          data-testid="scroll-indicator"
        >
          <span className="overline" style={{ fontSize: 10 }}>
            Scroll
          </span>
          <ArrowDown size={14} className="scroll-nudge" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-10 right-6 md:right-12 hidden md:flex items-center gap-6 overline"
        >
          <span>Adobe Premiere Pro</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>After Effects</span>
        </motion.div>
      </div>
    </section>
  );
};
