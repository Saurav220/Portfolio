import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import TiltCard from "./TiltCard";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  const email = personalInfo.email;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent("Hey Saurav - Let's Connect!")}`;

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    let copiedOk = false;
    try {
      await navigator.clipboard.writeText(email);
      copiedOk = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copiedOk = document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (copiedOk) {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="content-section">
      <div className="section-container">
        <TiltCard
          ref={ref}
          className="bento-card relative mx-auto max-w-2xl text-center"
          maxTilt={3}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full blur-3xl hero-ambient-glow"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.a
              href={mailtoUrl}
              className="badge-3d-accent mb-5 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              aria-label={`Email ${email}`}
              title={`Email ${email}`}
            >
              <Mail size={24} strokeWidth={2} />
            </motion.a>

            <h2
              className="text-xs font-mono font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Get in Touch
            </h2>

            <p
              className="text-xl sm:text-2xl font-semibold tracking-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s build something together.
            </p>

            <p
              className="mb-7 max-w-md text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Have a project in mind, a question, or just want to say hi? I&apos;d love to hear
              from you — let&apos;s start a conversation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <a
                href={mailtoUrl}
                className="btn-3d-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                <Mail size={15} />
                Send Email
              </a>
            </div>

            <div
              className="pill-3d inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{email}</span>
              <span
                className="h-3 w-px"
                style={{ background: "var(--border-color)" }}
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 cursor-pointer transition-colors hover:text-[var(--accent-text)]"
                style={{ color: copied ? "var(--accent-text)" : "var(--text-muted)" }}
                aria-label="Copy email address"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
