import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export const Footer = ({ onContact }) => {
  return (
    <footer
      className="relative py-20 md:py-28"
      style={{ borderTop: "1px solid var(--border)" }}
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="overline mb-6">Have a project?</p>
            <h3 className="display text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.92] max-w-[14ch]">
              Let's make something quiet and confident.
            </h3>
            <div className="mt-10">
              <MagneticButton onClick={onContact} testId="footer-cta-button">
                Let's Talk <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 grid grid-cols-2 gap-6 self-end text-[14px]">
            <div>
              <p className="overline mb-3" style={{ fontSize: 10 }}>Contact</p>
              <a href="mailto:hello@yousufhakim.com" className="block transition-colors">
                hello@yousufhakim.com
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="block transition-colors mt-2">
                WhatsApp
              </a>
            </div>
            <div>
              <p className="overline mb-3" style={{ fontSize: 10 }}>Social</p>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="block transition-colors">
                Instagram
              </a>
              <a href="#" className="block transition-colors mt-2">
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="divider mt-16 mb-8" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 muted text-[13px]">
          <span>© {new Date().getFullYear()} Yousuf Hakim. All rights reserved.</span>
          <span className="overline" style={{ fontSize: 10 }}>
            Premiere Pro · After Effects
          </span>
        </div>
      </div>
    </footer>
  );
};
