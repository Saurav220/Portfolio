import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Code2, Compass, MapPin } from "lucide-react";
import TiltCard from "./TiltCard";

const metaCards = [
  {
    icon: MapPin,
    label: "Based In",
    value: "Noida, IN",
    subtitle: "Open to remote & hybrid",
    liveDot: true,
  },
  {
    icon: Briefcase,
    label: "Currently",
    value: "Software Engineer @ TCS",
    subtitle: "Building AI-native messaging platforms",
    liveDot: false,
  },
];

const narrativeCards = [
  {
    icon: Code2,
    label: "What I Do",
    accentClass: "text-[var(--accent-text)]",
    content:
      "I build AI-native platforms and automation systems at scale. From architecting real-time messaging ecosystems to designing ACL permission management across distributed Linux file systems, I turn complex engineering challenges into maintainable solutions.",
  },
  {
    icon: Compass,
    label: "Beyond Code",
    accentClass: "company-badge-ca",
    content:
      "Beyond engineering and build systems, I find balance in the tactile and the thoughtful. My approach to life is driven by curiosity and a desire to understand how things work at their core. I believe the best products are built by people who have a diverse range of interests.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.h2>

        <div ref={ref} className="space-y-6">
          {/* Top Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metaCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={item.label}
                  className="bento-card !p-5"
                  maxTilt={9}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="badge-3d inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ color: "var(--accent-text)" }}
                      aria-hidden="true"
                    >
                      <Icon size={18} />
                    </span>

                    <div className="min-w-0">
                      <p
                        className="text-[0.68rem] font-mono font-medium uppercase tracking-[0.14em] mb-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.label}
                      </p>
                      <h3
                        className="text-base font-semibold tracking-tight leading-snug truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.value}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        {item.liveDot && (
                          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                        )}
                        <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {/* Editorial Narrative Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {narrativeCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <TiltCard
                  key={card.label}
                  className="bento-card h-full"
                  maxTilt={8}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.14 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`mb-3.5 flex items-center gap-2 text-[0.7rem] font-mono font-semibold uppercase tracking-[0.14em] ${card.accentClass}`}
                  >
                    <Icon size={15} aria-hidden="true" />
                    <h3>{card.label}</h3>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {card.content}
                  </p>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
