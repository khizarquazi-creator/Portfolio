import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, Instagram, Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Reveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const channels = [
  { icon: Mail, label: "Email", value: "hello@yousufhakim.com", href: "mailto:hello@yousufhakim.com", testId: "contact-channel-email" },
  { icon: Send, label: "WhatsApp", value: "Message on WhatsApp", href: "https://wa.me/", testId: "contact-channel-whatsapp" },
  { icon: MessageCircle, label: "Discord", value: "@yousufhakim", href: "#", testId: "contact-channel-discord" },
  { icon: Instagram, label: "Instagram", value: "@yousufhakim", href: "https://instagram.com/", testId: "contact-channel-instagram" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project_type: "Long-form video editing",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      toast.success("Message received. I'll reply within 48 hours.");
      setForm({ name: "", email: "", project_type: "Long-form video editing", budget: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Try again.";
      toast.error(typeof msg === "string" ? msg : "Failed to send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative pt-32 md:pt-44 pb-24 min-h-screen" data-testid="contact-page">
      <div className="hero-glow" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="overline mb-6">Get in touch</p>
          <h1 className="display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[-0.045em] leading-[0.9]">
            Let's make something{" "}
            <span style={{ color: "var(--accent)" }}>worth watching.</span>
          </h1>
          <p className="muted mt-8 max-w-[52ch] text-[16px] md:text-[17px] leading-relaxed">
            Share a few details about your project. I read every message and
            reply within 48 hours — usually sooner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mt-16 md:mt-24">
          <div className="md:col-span-7">
            <form onSubmit={submit} className="space-y-7" data-testid="contact-form">
              <Field label="Your name">
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  data-testid="contact-input-name"
                  placeholder="Jane Smith"
                  className="form-input"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  data-testid="contact-input-email"
                  placeholder="you@email.com"
                  className="form-input"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-7">
                <Field label="Project type">
                  <input
                    value={form.project_type}
                    onChange={update("project_type")}
                    data-testid="contact-input-project-type"
                    placeholder="Long-form video editing"
                    className="form-input"
                  />
                </Field>
                <Field label="Budget (optional)">
                  <input
                    value={form.budget}
                    onChange={update("budget")}
                    data-testid="contact-input-budget"
                    placeholder="e.g. $2k–$5k"
                    className="form-input"
                  />
                </Field>
              </div>
              <Field label="Tell me about the project">
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  data-testid="contact-input-message"
                  placeholder="Runtime, goals, footage status, deadline…"
                  className="form-input resize-none"
                />
              </Field>

              <div className="pt-2">
                <MagneticButton
                  as="button"
                  type="submit"
                  testId="contact-submit-button"
                  disabled={loading}
                >
                  {sent ? "Sent — Send another" : loading ? "Sending…" : "Send Message"}{" "}
                  <ArrowUpRight size={16} />
                </MagneticButton>
              </div>
            </form>

            <style>{`
              .form-input {
                width: 100%;
                background: transparent;
                color: var(--text-primary);
                border: 0;
                border-bottom: 1px solid var(--border-strong);
                padding: 12px 0;
                font-size: 16px;
                outline: none;
                transition: border-color 0.3s ease;
              }
              .form-input::placeholder { color: var(--text-secondary); opacity: 0.6; }
              .form-input:focus { border-bottom-color: var(--accent); }
            `}</style>
          </div>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="overline mb-6">Or reach out directly</p>
            <ul className="space-y-4">
              {channels.map(({ icon: Icon, label, value, href, testId }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 transition-colors"
                    style={{ border: "1px solid var(--border)", borderRadius: 12 }}
                    data-testid={testId}
                  >
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block overline" style={{ fontSize: 10 }}>{label}</span>
                      <span className="block text-[14px] mt-0.5">{value}</span>
                    </span>
                    <ArrowUpRight size={16} className="muted" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

const Field = ({ label, children }) => (
  <label className="block">
    <span className="overline block mb-2" style={{ fontSize: 10 }}>{label}</span>
    {children}
  </label>
);
