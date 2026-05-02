import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "../data/portfolio";
import { GraduationCap } from "lucide-react";

function EducationCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="bento-card"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-start gap-4 mb-5">
        <GraduationCap size={20} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
            {item.institution}
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {item.degree}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {item.period}
          </p>
        </div>
      </div>

      {item.highlights && item.highlights.length > 0 && (
        <ul className="space-y-2 ml-10">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {h}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {education.map((item, i) => (
            <EducationCard key={item.institution} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
