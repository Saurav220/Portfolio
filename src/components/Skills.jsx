import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import TiltCard from "./TiltCard";

import goIcon from "../assets/icons/go.svg";
import pythonIcon from "../assets/icons/python.svg";
import typescriptIcon from "../assets/icons/typescript.svg";
import javascriptIcon from "../assets/icons/javascript.svg";
import javaIcon from "../assets/icons/java.svg";
import reactIcon from "../assets/icons/react.svg";
import nextjsIcon from "../assets/icons/nextjs.svg";
import tailwindcssIcon from "../assets/icons/tailwindcss.svg";
import nodejsIcon from "../assets/icons/nodejs.svg";
import dockerIcon from "../assets/icons/docker.svg";
import githubIcon from "../assets/icons/github.svg";
import fastapiIcon from "../assets/icons/fastapi.svg";
import mongodbIcon from "../assets/icons/mongodb.svg";
import postgresqlIcon from "../assets/icons/postgresql.svg";
import redisIcon from "../assets/icons/redis.svg";
import mysqlIcon from "../assets/icons/mysql.svg";
import gitIcon from "../assets/icons/git.svg";
import linuxIcon from "../assets/icons/linux.svg";
import pandasIcon from "../assets/icons/pandas.svg";
import pytorchIcon from "../assets/icons/pytorch.svg";
import shadcnuiIcon from "../assets/icons/shadcnui.svg";
import framerIcon from "../assets/icons/framer.svg";
import vercelIcon from "../assets/icons/vercel.svg";
import huggingfaceIcon from "../assets/icons/huggingface.svg";

const techMarks = [
  { name: "Go", icon: goIcon },
  { name: "Python", icon: pythonIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "JavaScript", icon: javascriptIcon },
  { name: "Java", icon: javaIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextjsIcon, invert: true },
  { name: "Tailwind CSS", icon: tailwindcssIcon },
  { name: "Node.js", icon: nodejsIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "GitHub", icon: githubIcon, invert: true },
  { name: "FastAPI", icon: fastapiIcon },
  { name: "MongoDB", icon: mongodbIcon },
  { name: "PostgreSQL", icon: postgresqlIcon },
  { name: "Redis", icon: redisIcon },
];

const stackGroups = [
  {
    title: "Languages",
    items: [
      { name: "Go", icon: goIcon },
      { name: "Python", icon: pythonIcon },
      { name: "TypeScript", icon: typescriptIcon },
      { name: "JavaScript", icon: javascriptIcon },
      { name: "Java", icon: javaIcon },
      { name: "SQL", icon: mysqlIcon },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: reactIcon },
      { name: "Next.js", icon: nextjsIcon, invert: true },
      { name: "Tailwind CSS", icon: tailwindcssIcon },
      { name: "Shadcn UI", icon: shadcnuiIcon, monochrome: true },
      { name: "Framer Motion", icon: framerIcon, monochrome: true },
    ],
  },
  {
    title: "Backend & DB",
    items: [
      { name: "FastAPI", icon: fastapiIcon },
      { name: "Node.js", icon: nodejsIcon },
      { name: "PostgreSQL", icon: postgresqlIcon },
      { name: "MongoDB", icon: mongodbIcon },
      { name: "Redis", icon: redisIcon },
    ],
  },
  {
    title: "Infra & Tools",
    items: [
      { name: "Docker", icon: dockerIcon },
      { name: "Vercel", icon: vercelIcon, monochrome: true },
      { name: "Git", icon: gitIcon },
      { name: "GitHub", icon: githubIcon, invert: true },
      { name: "Linux", icon: linuxIcon },
    ],
  },
  {
    title: "AI & ML",
    items: [
      { name: "Hugging Face", icon: huggingfaceIcon },
      { name: "Pandas", icon: pandasIcon },
      { name: "PyTorch", icon: pytorchIcon },
    ],
  },
];

function TechLogo({ tech, isDup }) {
  const iconClasses = [
    "tech-logo__icon",
    tech.invert ? "tech-logo__icon--invert" : "",
    tech.monochrome ? "tech-logo__icon--monochrome" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={isDup ? "tech-logo tech-marquee__dup" : "tech-logo"}
      tabIndex={isDup ? -1 : 0}
      aria-label={tech.name}
      aria-hidden={isDup ? "true" : undefined}
    >
      <img src={tech.icon} alt="" className={iconClasses} loading="lazy" />
      <span className="tech-logo__label" aria-hidden="true">
        {tech.name}
      </span>
    </div>
  );
}

function StackItem({ item }) {
  const iconClasses = [
    "full-stack-icon",
    item.invert ? "full-stack-icon--invert" : "",
    item.monochrome ? "full-stack-icon--monochrome" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className="full-stack-item">
      <span className="full-stack-icon-wrap" aria-hidden="true">
        <img src={item.icon} alt="" className={iconClasses} loading="lazy" />
      </span>
      <span>{item.name}</span>
    </li>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showFullStack, setShowFullStack] = useState(false);

  return (
    <section id="skills" className="content-section">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <p className="max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I'm a generalist at heart who can build with anything, but here's the core stack I've
              spent the most time with:
            </p>

            <button
              type="button"
              onClick={() => setShowFullStack((value) => !value)}
              aria-expanded={showFullStack}
              className="view-full-stack-btn btn-3d-secondary inline-flex items-center gap-1.5 self-start sm:self-end shrink-0 rounded-full px-3.5 py-1.5 text-[0.68rem] font-mono font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--text-secondary)" }}
            >
              {showFullStack ? "Show less" : "View full stack"}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${showFullStack ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!showFullStack ? (
              <motion.div
                key="marquee"
                className="tech-marquee mt-9"
                aria-label="Moving row of core technologies"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="tech-marquee__track">
                  {techMarks.map((tech) => (
                    <TechLogo key={tech.name} tech={tech} isDup={false} />
                  ))}
                  {techMarks.map((tech) => (
                    <TechLogo key={`dup-${tech.name}`} tech={tech} isDup />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="full-stack"
                className="full-stack-grid mt-9"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {stackGroups.map((group) => (
                  <TiltCard
                    key={group.title}
                    className="bento-card !p-5 full-stack-group h-full"
                    maxTilt={7}
                  >
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <StackItem key={item.name} item={item} />
                      ))}
                    </ul>
                  </TiltCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
