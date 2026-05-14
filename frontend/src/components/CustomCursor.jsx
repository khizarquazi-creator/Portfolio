import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags slightly behind dot
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.45 });
  const dotX = useSpring(x, { stiffness: 700, damping: 35, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 700, damping: 35, mass: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, [data-cursor='hover'], input, textarea, [role='button']")) {
        setHover(true);
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, [data-cursor='hover'], input, textarea, [role='button']")) {
        setHover(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="yh-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          scale: hover ? 1.6 : 1,
          opacity: hover ? 0.9 : 0.7,
        }}
        transition={{ scale: { duration: 0.25 }, opacity: { duration: 0.25 } }}
      />
      <motion.div
        className="yh-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          scale: hover ? 0.6 : 1,
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
    </>
  );
};
