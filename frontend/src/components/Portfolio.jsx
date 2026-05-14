import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Reveal } from "./Reveal";

const PROJECTS = [
  {
    title: "Quiet Process",
    tag: "Documentary · 24 min",
    poster:
      "https://images.pexels.com/photos/13812458/pexels-photo-13812458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    video:
      "https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-0245/1080p.mp4",
  },
  {
    title: "After Hours",
    tag: "Brand Film · 8 min",
    poster:
      "https://images.pexels.com/photos/36444147/pexels-photo-36444147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    video:
      "https://cdn.coverr.co/videos/coverr-a-man-drinking-coffee-5247/1080p.mp4",
  },
  {
    title: "Studio Notes",
    tag: "Long-form · 18 min",
    poster:
      "https://images.pexels.com/photos/11063289/pexels-photo-11063289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    video:
      "https://cdn.coverr.co/videos/coverr-editing-video-on-a-laptop-7559/1080p.mp4",
  },
  {
    title: "Field Recordings",
    tag: "Series · 12 min",
    poster:
      "https://images.pexels.com/photos/8770513/pexels-photo-8770513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    video:
      "https://cdn.coverr.co/videos/coverr-a-camera-shutter-0244/1080p.mp4",
  },
];

const Card = ({ p, index }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  const onEnter = () => {
    setHover(true);
    if (ref.current) {
      ref.current.currentTime = 0;
      const playPromise = ref.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }
  };
  const onLeave = () => {
    setHover(false);
    if (ref.current) {
      ref.current.pause();
    }
  };

  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="portfolio-card group"
        data-testid={`portfolio-card-${index}`}
      >
        <img src={p.poster} alt={p.title} loading="lazy" />
        <video
          ref={ref}
          src={p.video}
          muted
          loop
          playsInline
          preload="none"
          style={{
            position: "absolute",
            inset: 0,
            opacity: hover ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between">
          <div>
            <p className="eyebrow text-white/70" style={{ color: "rgba(255,255,255,0.7)" }}>
              {p.tag}
            </p>
            <h3 className="text-white text-xl md:text-2xl mt-1 tracking-tight">
              {p.title}
            </h3>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "var(--accent)", color: "var(--accent-on)" }}
          >
            <Play size={14} fill="currentColor" />
          </div>
        </div>
      </motion.div>
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
              Selected work. Hover to preview.
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
