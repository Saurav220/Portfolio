import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Sparkles, Code2, WorkflowIcon } from "lucide-react";

const cards = [
  {
    icon: WorkflowIcon,
    title: "What I Do",
    content:
      "I build AI-native platforms and automation systems at scale. From architecting real-time messaging ecosystems to designing ACL permission management across distributed Linux file systems — I turn complex engineering challenges into maintainable solutions.",
    span: "md:col-span-2",
  },
  {
    icon: MapPin,
    title: "Based In",
    content: "Noida, IN",
    subtitle: "Open to remote & hybrid",
    span: "md:col-span-1",
  },
  {
    icon: Briefcase,
    title: "Currently",
    content: "Software Engineer @ TCS",
    subtitle: "Building AI-native messaging platforms",
    span: "md:col-span-1",
  },
  {
    icon: Sparkles,
    title: "Beyond Code",
    content:
      "Beyond engineering and build systems, I find balance in the tactile and the thoughtful. My approach to life is driven by curiosity and a desire to understand how things work at their core. I believe the best products are built by people who have a diverse range of interests.",
    span: "md:col-span-2",
  },
];

function AboutCard({ card, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      className={`bento-card ${card.span}`}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon size={18} style={{ color: "var(--color-accent)" }} />
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {card.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {card.content}
      </p>
      {card.subtitle && (
        <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
          {card.subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default function About() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <motion.h2
          ref={headingRef}
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
        
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <AboutCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
