import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export const Hero = ({ onContact }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 grid-bg opacity-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full flex-1 flex flex-col justify-center pt-28 sm:pt-32 pb-10 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-8 md:mb-12"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span className="eyebrow">Freelance video editor and motion designer</span>
        </motion.div>

        <h1
          className="display uppercase text-[38px] sm:text-[64px] md:text-[88px] lg:text-[104px] xl:text-[112px] leading-[0.86] tracking-[-0.05em] max-w-[12ch]"
          data-testid="hero-headline"
        >
          {"Creating high-retention edits for".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.06, ease: [0.22, 0.85, 0.3, 1] }}
              className="inline-block mr-[0.18em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 0.85, 0.3, 1] }}
            className="inline-block"
            style={{ color: "var(--accent)" }}
          >
            brands, creators & trading businesses.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="muted mt-8 md:mt-12 max-w-[52ch] text-[15px] md:text-[17px] leading-relaxed"
        >
          Long-form video editing for creators, businesses and personal brands.
          Quiet, considered cuts. Clean motion. Stories that hold attention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-8 md:mt-12 flex flex-wrap items-center gap-3 sm:gap-4"
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full pb-6 sm:pb-8 md:pb-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 muted" data-testid="scroll-indicator">
          <span className="eyebrow" style={{ fontSize: 10 }}>
            Scroll
          </span>
          <ArrowDown size={14} className="scroll-nudge" />
        </div>
        <div className="hidden md:flex items-center gap-6 eyebrow">
          <span>Adobe Premiere Pro</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>After Effects</span>
        </div>
      </motion.div>
    </section>
  );
};
