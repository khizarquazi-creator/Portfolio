import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../lib/content";

const Card = ({ p, index }) => {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={index * 0.06}>
      <motion.a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="portfolio-card group block no-hover-color"
        data-testid={`portfolio-card-${index}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 0.85, 0.3, 1] }}
      >
        <img src={p.poster} alt={p.title} loading="lazy" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <motion.div
          className="absolute left-5 bottom-5 right-5 flex items-end justify-between"
          animate={{ y: hover ? -4 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.85, 0.3, 1] }}
        >
          <div>
            <p
              className="eyebrow"
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}
            >
              {p.tag}
            </p>
            <h3
              className="text-white text-xl md:text-2xl mt-1 tracking-tight"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}
            >
              {p.title}
            </h3>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "var(--accent)", color: "var(--accent-on)" }}
          >
            {hover ? <ArrowUpRight size={16} /> : <Play size={14} fill="currentColor" />}
          </div>
        </motion.div>
      </motion.a>
    </Reveal>
  );
};

export const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative py-20 md:py-40"
      data-testid="portfolio-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-20">
          <Reveal>
            <p className="eyebrow mb-5">02 — Hall of Fame</p>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] max-w-[16ch]">
              Selected work. Click to watch.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="muted hidden md:block max-w-[28ch] text-right">
              A small, curated set — quality over quantity.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
