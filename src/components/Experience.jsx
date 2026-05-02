import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/portfolio";
import { ExternalLink } from "lucide-react";

const companyLogos = {
  "TCS (Tata Consultancy Services)": {
    label: "TCS",
    className: "text-sky-300",
  },
  ConsultAdd: {
    label: "CA",
    className: "text-violet-300",
  },
};

function CompanyLogo({ company }) {
  const logo = companyLogos[company] || {
    label: company.slice(0, 2).toUpperCase(),
    className: "text-[var(--color-accent)]",
  };

  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-[var(--bg-elevated)] text-[0.7rem] font-bold tracking-wide"
      style={{ borderColor: "var(--border-color)" }}
      aria-hidden="true"
    >
      <span className={logo.className}>{logo.label}</span>
    </span>
  );
}

function ExperienceCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-6">
        <div className="relative flex justify-center">
          <div
            className="absolute top-11 bottom-[-5rem] w-px"
            style={{ background: "var(--border-color)" }}
          />
          <CompanyLogo company={item.company} />
        </div>

        <div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-xl font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                {item.company}
              </h3>
              {item.link && item.link !== "#" && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs"
                  style={{ color: "var(--color-accent)" }}
                  aria-label={`Open ${item.company}`}
                >
                  <ExternalLink size={13} />
                </a>
              )}
              </div>
              <p className="mt-1 text-base" style={{ color: "var(--text-secondary)" }}>
                {item.role}
              </p>
            </div>

            <p className="text-sm sm:max-w-56 sm:text-right" style={{ color: "var(--text-muted)" }}>
              {item.location} - {item.period}
            </p>
          </div>

          <ul className="mt-8 space-y-4.5">
            {item.description.map((desc, i) => (
              <li
                key={i}
                className="text-sm leading-[1.7] max-w-[65ch]"
                style={{ color: "var(--text-secondary)" }}
              >
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
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

        <div className="mt-10 grid gap-20">
          {experience.map((item, i) => (
            <ExperienceCard key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
