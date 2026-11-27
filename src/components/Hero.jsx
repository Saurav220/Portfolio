import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Copy, Check } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import avatarImg from "../assets/me.webp";
import TiltCard from "./TiltCard";

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}

export default function Hero() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    let copiedOk = false;
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      copiedOk = true;
    } catch {
      copiedOk = fallbackCopy(personalInfo.email);
    }

    if (copiedOk) {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full pt-2 sm:pt-4 pb-8 sm:pb-10 flex flex-col items-center"
    >
      <motion.div
        className="relative z-10 section-container text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 3D Portrait with subtle Noir ambient glow */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-5 relative">
          <div
            className="absolute -inset-6 rounded-full blur-2xl pointer-events-none hero-ambient-glow"
            aria-hidden="true"
          />
          <TiltCard maxTilt={6} glare={false} className="rounded-2xl">
            <div
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl mx-auto flex items-center justify-center overflow-hidden relative drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 88% 88% at 50% 45%, #000 66%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 88% 88% at 50% 45%, #000 66%, transparent 100%)",
              }}
            >
              <img
                src={avatarImg}
                alt={personalInfo.name}
                className="absolute inset-0 w-full h-full object-contain grayscale"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, var(--bg-primary), transparent)",
                }}
              />
            </div>
          </TiltCard>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2.5"
          style={{ color: "var(--text-primary)" }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Phonetic + Meta */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="italic">{personalInfo.phonetic}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{personalInfo.title}</span>
          <span aria-hidden="true">&bull;</span>
          <span className="tabular-nums font-mono text-xs">{time}</span>
        </motion.div>

        {/* Audience line */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base sm:text-lg font-medium mb-4"
          style={{ color: "var(--accent-text)" }}
        >
          {personalInfo.audience}
        </motion.p>

        {/* Taglines */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl space-y-3 text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {personalInfo.taglines.map((line, i) => (
            <p key={i}>
              {line.text}
              <span className="link-underline font-medium" style={{ color: "var(--text-primary)" }}>
                {line.highlight}
              </span>
              {line.rest}
            </p>
          ))}
        </motion.div>

        {/* 3D Action Row */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="btn-3d-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            View Work
            <ArrowDown size={15} />
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="btn-3d-secondary inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-mono cursor-pointer"
            style={{
              color: copied ? "var(--accent-text)" : "var(--text-secondary)",
            }}
            aria-label="Copy email address"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy email"}
          </button>
        </motion.div>

        {/* Subtle Scroll Indicator */}
        <motion.div className="mt-6 hidden md:block" variants={itemVariants} aria-hidden="true">
          <motion.div
            className="w-5 h-7 rounded-full border-2 flex justify-center pt-1.5 pill-3d"
            style={{ borderColor: "var(--border-color)" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full"
              style={{ background: "var(--accent-text)" }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
