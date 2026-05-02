import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";
import avatarImg from "../assets/me.png";

export default function Hero() {
  const [time, setTime] = useState("");

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
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden"
    >


      {/* Content */}
      <motion.div
        className="relative z-10 section-container text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div
          variants={itemVariants}
          className="mb-10 sm:mb-12"
        >
          <div
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl mx-auto flex items-center justify-center overflow-hidden relative"
          >
            <img src={avatarImg} alt={personalInfo.name} className="absolute inset-0 w-full h-full object-contain grayscale" />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
              style={{
                background: "linear-gradient(to top, var(--bg-primary), transparent)",
                backdropFilter: "blur(1px)",
              }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mt-4 sm:mt-6 mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Phonetic + Meta */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="italic">{personalInfo.phonetic}</span>
          <span>•</span>
          <span>{personalInfo.title}</span>
          <span>•</span>
          <span className="tabular-nums font-mono text-xs">{time}</span>
        </motion.div>

        {/* Taglines */}
        <motion.div
          variants={itemVariants}
          className="max-w-3xl space-y-6 text-lg sm:text-xl leading-relaxed"
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

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 hidden sm:block"
          variants={itemVariants}
        >
          <motion.div
            className="w-5 h-9 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: "var(--border-color)" }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
