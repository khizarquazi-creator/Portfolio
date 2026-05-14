import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const MagneticButton = ({
  children,
  className = "",
  as = "button",
  href,
  onClick,
  testId,
  variant = "primary",
  strength = 0.25,
  ...rest
}) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 200, damping: 18, mass: 0.6 });
  const tx = useTransform(x, (v) => v * strength);
  const ty = useTransform(y, (v) => v * strength);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base = variant === "primary" ? "btn-magnetic" : "btn-ghost";
  const Comp = motion[as] || motion.button;

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: tx, y: ty }}
      className={`${base} ${className}`}
      data-testid={testId}
      {...rest}
    >
      <motion.span style={{ x: tx, y: ty, display: "inline-flex", alignItems: "center", gap: 8 }}>
        {children}
      </motion.span>
    </Comp>
  );
};
