import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { caseStudies } from "../data/portfolio";
import TiltCard from "./TiltCard";

function CaseStudyCard({ study, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isCurrent = study.period.toLowerCase().includes("present");

  return (
    <TiltCard
      ref={ref}
      as="article"
      className="bento-card flex flex-col"
      maxTilt={5}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Header matching Experience & Education */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <span
            className="badge-3d inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-mono font-bold tracking-wide"
            aria-hidden="true"
          >
            <span className={study.companyClassName}>{study.company}</span>
          </span>

          <div className="min-w-0">
            <h3
              className="text-base sm:text-lg font-semibold tracking-tight leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {study.title}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {study.companyFull}
            </p>
          </div>
        </div>

        <div
          className="pill-3d self-start sm:self-center inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono tabular-nums shrink-0"
          style={{
            color: isCurrent ? "var(--text-primary)" : "var(--text-muted)",
          }}
        >
          {isCurrent && (
            <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--accent-text)" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: "var(--accent-text)" }}
              />
            </span>
          )}
          <span>{study.period}</span>
        </div>
      </div>

      {/* Hairline Divider */}
      <div className="my-5 h-px w-full" style={{ background: "var(--border-subtle)" }} />

      {/* Case Study Body */}
      <div className="space-y-5">
        <div>
          <p
            className="text-[0.68rem] font-mono font-semibold uppercase tracking-[0.14em] mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Problem
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {study.problem}
          </p>
        </div>

        <div>
          <p
            className="text-[0.68rem] font-mono font-semibold uppercase tracking-[0.14em] mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Approach
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {study.approach}
          </p>
        </div>

        <div className="outcome-3d rounded-r-lg px-3.5 py-3">
          <p
            className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.16em] mb-1"
            style={{ color: "var(--accent-text)" }}
          >
            Outcome
          </p>
          <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
            {study.outcome}
          </p>
        </div>
      </div>

      {/* Stack / Domain Tags */}
      <div className="mt-6 pt-5 border-t flex flex-wrap gap-2.5" style={{ borderColor: "var(--border-subtle)" }}>
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="pill-3d px-2.5 py-1 rounded-md text-xs font-mono"
            style={{ color: "var(--text-secondary)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="content-section">
      <div className="section-container">
        <motion.h2
          ref={headingRef}
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Product Journey
        </motion.h2>

        <div className="flex flex-col gap-7">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.title} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
