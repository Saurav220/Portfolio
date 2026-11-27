import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "../data/portfolio";
import { GraduationCap } from "lucide-react";
import TiltCard from "./TiltCard";

function EducationCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <TiltCard
      ref={ref}
      as="article"
      className="bento-card"
      maxTilt={3.5}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <span
            className="badge-3d inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ color: "var(--accent-text)" }}
            aria-hidden="true"
          >
            <GraduationCap size={19} />
          </span>

          <div className="min-w-0">
            <h3
              className="text-base sm:text-lg font-semibold tracking-tight leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {item.institution}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {item.degree}
            </p>
          </div>
        </div>

        <span
          className="pill-3d self-start sm:self-center shrink-0 rounded-full px-3 py-1 text-xs font-mono tabular-nums"
          style={{ color: "var(--text-muted)" }}
        >
          {item.period}
        </span>
      </div>

      {item.highlights && item.highlights.length > 0 && (
        <>
          <div className="my-4 h-px w-full" style={{ background: "var(--border-subtle)" }} />
          <ul className="space-y-2.5">
            {item.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--text-muted)" }}
                  aria-hidden="true"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </TiltCard>
  );
}

export default function Education() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="education" className="content-section">
      <div className="section-container">
        <motion.h2
          ref={headingRef}
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>

        <div className="flex flex-col gap-5">
          {education.map((item, i) => (
            <EducationCard key={item.institution} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
