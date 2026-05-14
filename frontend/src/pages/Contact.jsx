import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Instagram, Send, Twitter } from "lucide-react";
import { toast } from "sonner";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Reveal";
import { SOCIALS } from "../lib/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;

const channels = [
  { icon: Mail, label: "Email", value: SOCIALS.email, href: SOCIALS.emailHref, testId: "contact-channel-email" },
  { icon: Send, label: "WhatsApp", value: SOCIALS.whatsapp, href: SOCIALS.whatsappHref, testId: "contact-channel-whatsapp" },
  { icon: Twitter, label: "X / Twitter", value: SOCIALS.x, href: SOCIALS.xHref, testId: "contact-channel-x" },
  { icon: Instagram, label: "Instagram", value: SOCIALS.instagram, href: SOCIALS.instagramHref, testId: "contact-channel-instagram" },
];

const PROJECT_TYPES = [
  "Long-form video editing",
  "YouTube long-form",
  "Podcast edit",
  "Documentary",
  "Brand film",
  "Course content",
  "Other",
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
      if (WEB3FORMS_KEY) {
        const payload = {
          access_key: WEB3FORMS_KEY,
          subject: `New project enquiry — ${form.name}`,
          from_name: form.name,
          reply_to: form.email,
          email: form.email,
          name: form.name,
          project_type: form.project_type,
          budget: form.budget || "—",
          message: form.message,
        };
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json?.message || "Web3Forms error");
        setSent(true);
        toast.success("Message received. I'll reply within 48 hours.");
        setForm({ name: "", email: "", project_type: "Long-form video editing", budget: "", message: "" });
      } else {
        // Fallback when no Web3Forms key is configured: open mailto
        const body =
          `Name: ${form.name}\n` +
          `Email: ${form.email}\n` +
          `Project type: ${form.project_type}\n` +
          `Budget: ${form.budget || "—"}\n\n` +
          `${form.message}`;
        const mail =
          `mailto:${SOCIALS.email}` +
          `?subject=${encodeURIComponent(`New project enquiry — ${form.name}`)}` +
          `&body=${encodeURIComponent(body)}`;
        window.location.href = mail;
        toast.success("Opening your mail app…");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative pt-32 md:pt-44 pb-24 min-h-screen" data-testid="contact-page">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6">Get in touch</p>
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
                  <Select
                    value={form.project_type}
                    onValueChange={(v) => setForm((f) => ({ ...f, project_type: v }))}
                  >
                    <SelectTrigger
                      data-testid="contact-input-project-type"
                      className="form-select"
                    >
                      <SelectValue placeholder="Choose a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((t) => (
                        <SelectItem key={t} value={t} data-testid={`project-type-${t.toLowerCase().replace(/\s+/g, "-")}`}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              .form-select {
                background: transparent !important;
                color: var(--text-primary) !important;
                border: 0 !important;
                border-bottom: 1px solid var(--border-strong) !important;
                border-radius: 0 !important;
                padding: 12px 0 !important;
                height: auto !important;
                font-size: 16px !important;
                box-shadow: none !important;
              }
              .form-select:focus,
              .form-select[data-state="open"] {
                border-bottom-color: var(--accent) !important;
                outline: none !important;
                box-shadow: none !important;
              }
            `}</style>
          </div>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="eyebrow mb-6">Or reach out directly</p>
            <ul className="space-y-4">
              {channels.map(({ icon: Icon, label, value, href, testId }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 transition-colors no-hover-color"
                    style={{ border: "1px solid var(--border)", borderRadius: 12 }}
                    data-testid={testId}
                  >
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block eyebrow" style={{ fontSize: 10 }}>{label}</span>
                      <span className="block text-[13px] mt-0.5 break-all">{value}</span>
                    </span>
                    <ArrowUpRight size={16} className="muted shrink-0" />
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
    <span className="eyebrow block mb-2" style={{ fontSize: 10 }}>{label}</span>
    {children}
  </label>
);
