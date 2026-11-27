import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/portfolio";
import { ExternalLink } from "lucide-react";
import TiltCard from "./TiltCard";

const companyLogos = {
  "TCS (Tata Consultancy Services)": {
    label: "TCS",
    className: "company-badge-tcs",
  },
  ConsultAdd: {
    label: "CA",
    className: "company-badge-ca",
  },
};

function CompanyBadge({ company }) {
  const logo = companyLogos[company] || {
    label: company.slice(0, 2).toUpperCase(),
    className: "company-badge-tcs",
  };

  return (
    <span
      className="badge-3d inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-mono font-bold tracking-wide"
      aria-hidden="true"
    >
      <span className={logo.className}>{logo.label}</span>
    </span>
  );
}

function ExperienceCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isCurrent = item.period.toLowerCase().includes("present");

  return (
    <TiltCard
      ref={ref}
      as="article"
      className="bento-card"
      maxTilt={2.5}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <CompanyBadge company={item.company} />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3
                className="text-base sm:text-lg font-semibold tracking-tight leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {item.company}
              </h3>
              {item.link && item.link !== "#" && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs"
                  style={{ color: "var(--accent-text)" }}
                  aria-label={`Open ${item.company}`}
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
            <p className="text-sm font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {item.role}
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
          <span>
            {item.location} &middot; {item.period}
          </span>
        </div>
      </div>

      {/* Hairline Divider */}
      <div className="my-4 h-px w-full" style={{ background: "var(--border-subtle)" }} />

      {/* Responsibilities */}
      <ul className="space-y-3">
        {item.description.map((desc, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background: isCurrent ? "var(--accent-text)" : "var(--text-muted)",
              }}
              aria-hidden="true"
            />
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    </TiltCard>
  );
}

export default function Experience() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="content-section">
      <div className="section-container">
        <motion.h2
          ref={headingRef}
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <div className="flex flex-col gap-5">
          {experience.map((item, i) => (
            <ExperienceCard key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
