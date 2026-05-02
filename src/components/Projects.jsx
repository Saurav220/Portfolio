import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/portfolio";
import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const sizeClasses = {
    large: "md:col-span-1",
    medium: "md:col-span-1",
    small: "md:col-span-1",
  };

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`bento-card group relative flex flex-col justify-between overflow-hidden ${sizeClasses[project.size] || ""}`}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56,189,248,0.06), transparent 60%)",
        }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div
            className="inline-flex self-start px-2.5 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-wider mb-6"
          style={{
            background: "var(--color-accent-subtle)",
            color: "var(--color-accent)",
          }}
        >
          Featured
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "var(--color-accent)" }}
          />
        </div>
        <p
          className="text-sm leading-relaxed mb-7"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md text-xs font-medium"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-color)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
