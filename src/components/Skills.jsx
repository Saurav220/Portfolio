import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const techMarks = [
  {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    invert: true,
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    invert: true,
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
];

const stackGroups = [
  {
    title: "Languages",
    items: [
      {
        name: "Go",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "SQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
    ],
  },
  {
    title: "Frontend",
    items: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        invert: true,
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Shadcn UI",
        icon: "https://cdn.simpleicons.org/shadcnui/a1a1aa",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.simpleicons.org/framer/a1a1aa",
      },
    ],
  },
  {
    title: "Backend & DB",
    items: [
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
    ],
  },
  {
    title: "Infra & Tools",
    items: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Vercel",
        icon: "https://cdn.simpleicons.org/vercel/a1a1aa",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        invert: true,
      },
      {
        name: "Linux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
    ],
  },
  {
    title: "AI & ML",
    items: [
      {
        name: "Hugging Face",
        icon: "https://cdn.simpleicons.org/huggingface/a1a1aa",
      },
      {
        name: "Pandas",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "PyTorch",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      },
    ],
  },
];

function TechLogo({ tech }) {
  return (
    <div className="tech-logo" title={tech.name} aria-label={tech.name}>
      <img
        src={tech.icon}
        alt=""
        className={tech.invert ? "tech-logo__icon tech-logo__icon--invert" : "tech-logo__icon"}
        loading="lazy"
      />
      <span className="sr-only">{tech.name}</span>
    </div>
  );
}

function StackItem({ item }) {
  return (
    <li className="full-stack-item">
      <span className="full-stack-icon-wrap" aria-hidden="true">
        <img
          src={item.icon}
          alt=""
          className={item.invert ? "full-stack-icon full-stack-icon--invert" : "full-stack-icon"}
          loading="lazy"
        />
      </span>
      <span>{item.name}</span>
    </li>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showFullStack, setShowFullStack] = useState(false);
  const marqueeItems = [...techMarks, ...techMarks];

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
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-4">
            <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I'm a generalist at heart who can build with anything, but here's the core stack I've
              spent the most time with:
            </p>

            <button
              type="button"
              onClick={() => setShowFullStack((value) => !value)}
              aria-expanded={showFullStack}
              className="view-full-stack-btn inline-flex items-center gap-2 self-end text-[0.65rem] font-semibold uppercase tracking-[0.28em] transition-all"
              style={{ color: "var(--text-muted)" }}
            >
              {showFullStack ? "Show less" : "View full stack"}
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${showFullStack ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {!showFullStack ? (
            <div className="tech-marquee" style={{ marginTop: "4rem" }} aria-label="Moving row of core technologies">
              <div className="tech-marquee__track">
                {marqueeItems.map((tech, index) => (
                  <TechLogo key={`${tech.name}-${index}`} tech={tech} />
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              className="full-stack-grid" style={{ marginTop: "4rem" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {stackGroups.map((group) => (
                <div key={group.title} className="full-stack-group">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <StackItem key={item.name} item={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
