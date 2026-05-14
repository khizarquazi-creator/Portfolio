import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "./MagneticButton";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.85, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled ? "color-mix(in srgb, var(--bg) 70%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}
      data-testid="site-navbar"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="nav-logo-link">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span className="font-medium tracking-tight text-[15px]">Yousuf Hakim</span>
        </Link>

        {onHome && (
          <ul className="hidden md:flex items-center gap-8 text-[14px]">
            {[
              ["Work", "#portfolio"],
              ["Process", "#process"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="muted hover:opacity-100 transition-opacity"
                  style={{ opacity: 0.75 }}
                  data-testid={`nav-link-${label.toLowerCase()}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MagneticButton
            as="a"
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/contact");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            testId="nav-lets-talk-button"
            className="!py-3 !px-5 text-[14px]"
          >
            Let's Talk
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
};
