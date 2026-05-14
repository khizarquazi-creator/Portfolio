import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Premium ambient glow that drifts with scroll + mouse.
 * Fixed in the viewport, sits behind content, subtle and calm.
 */
export const AmbientGlow = () => {
  const { scrollYProgress } = useScroll();
  const yProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 });

  // All hooks declared unconditionally (rules of hooks)
  const topA = useTransform(yProgress, [0, 0.5, 1], ["-10%", "30%", "70%"]);
  const leftA = useTransform(yProgress, [0, 0.5, 1], ["35%", "55%", "30%"]);
  const scaleA = useTransform(yProgress, [0, 0.5, 1], [1, 1.15, 0.95]);
  const hue = useTransform(yProgress, [0, 1], [0, 18]);
  const hueFilter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  const topB = useTransform(yProgress, [0, 1], ["80%", "10%"]);
  const leftB = useTransform(yProgress, [0, 1], ["75%", "20%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const offsetX = useTransform(sx, (v) => `${v * 40}px`);
  const offsetY = useTransform(sy, (v) => `${v * 40}px`);

  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(159, 232, 112, 0.12), transparent 60%)",
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        filter: hueFilter,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: topA,
          left: leftA,
          width: "70vmax",
          height: "70vmax",
          marginTop: "-35vmax",
          marginLeft: "-35vmax",
          x: offsetX,
          y: offsetY,
          scale: scaleA,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(159, 232, 112, 0.22) 0%, rgba(159, 232, 112, 0.10) 30%, transparent 65%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: topB,
          left: leftB,
          width: "45vmax",
          height: "45vmax",
          marginTop: "-22vmax",
          marginLeft: "-22vmax",
          x: offsetX,
          y: offsetY,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22, 51, 0, 0.55) 0%, rgba(22, 51, 0, 0.18) 35%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
};
