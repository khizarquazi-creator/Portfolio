import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../lib/content";
import { useXVideo } from "../lib/useXVideo";

const YouTubeEmbed = ({ id }) => (
  <div className="w-full" style={{ aspectRatio: "16 / 9", background: "#000" }}>
    <iframe
      title="YouTube video"
      src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ width: "100%", height: "100%", border: 0 }}
    />
  </div>
);

const XVideoPlayer = ({ user, id, poster }) => {
  const { data, error } = useXVideo(user, id);
  if (error) {
    return (
      <div
        className="w-full flex items-center justify-center text-white/80 text-sm"
        style={{ aspectRatio: "16 / 9", background: "#000" }}
      >
        Could not load video. <a
          href={`https://x.com/${user}/status/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 underline"
        >Open on X ↗</a>
      </div>
    );
  }
  if (!data) {
    return (
      <div
        className="w-full flex items-center justify-center text-white/60"
        style={{ aspectRatio: "16 / 9", background: "#000" }}
      >
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }
  return (
    <video
      controls
      autoPlay
      playsInline
      preload="metadata"
      src={data.mp4}
      poster={poster || data.thumbnail}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "78vh",
        display: "block",
        background: "#000",
      }}
    />
  );
};

// Resolves the best poster for each project (X thumbnail or fallback to provided poster)
const useProjectPoster = (project) => {
  const isX = project.type === "twitter";
  const { data } = useXVideo(isX ? project.user : null, isX ? project.id : null);
  if (isX && data?.thumbnail) return data.thumbnail;
  return project.poster;
};

const Card = ({ p, index, onOpen }) => {
  const [hover, setHover] = useState(false);
  const poster = useProjectPoster(p);
  return (
    <Reveal delay={index * 0.06}>
      <motion.button
        type="button"
        onClick={() => onOpen(p)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="portfolio-card group block w-full text-left no-hover-color"
        data-testid={`portfolio-card-${index}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 0.85, 0.3, 1] }}
      >
        <img src={poster} alt={p.title} loading="lazy" />
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
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "var(--accent)", color: "var(--accent-on)" }}
            animate={{ scale: hover ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Play size={15} fill="currentColor" />
          </motion.div>
        </motion.div>
      </motion.button>
    </Reveal>
  );
};

const VideoModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)" }}
          onClick={onClose}
          data-testid="video-modal"
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.85, 0.3, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="eyebrow" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
                  {project.tag}
                </p>
                <h3
                  className="text-white text-2xl md:text-3xl tracking-tight mt-1"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 }}
                >
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                data-testid="video-modal-close"
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#000", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {project.type === "youtube" ? (
                <YouTubeEmbed id={project.id} />
              ) : (
                <XVideoPlayer user={project.user} id={project.id} poster={project.poster} />
              )}
            </div>

            <div className="mt-4 flex items-center justify-end">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex items-center gap-2"
                style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}
              >
                Open original <ArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Portfolio = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.documentElement.style.overflow = active ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [active]);

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
              Selected work. Click to play.
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
            <Card key={p.title} p={p} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <VideoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
};
