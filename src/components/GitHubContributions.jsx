import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const levels = [
  "rgba(63, 63, 80, 0.55)",
  "rgba(74, 222, 128, 0.22)",
  "rgba(74, 222, 128, 0.42)",
  "rgba(34, 197, 94, 0.66)",
  "rgba(22, 163, 74, 0.92)",
];

function buildContributionCells() {
  return Array.from({ length: 52 * 7 }, (_, index) => {
    const week = Math.floor(index / 7);
    const day = index % 7;
    const wave = Math.sin(week * 0.55) + Math.cos(day * 1.35) + Math.sin((week + day) * 0.22);
    const gap = (week + day * 3) % 13 === 0 || (week * day) % 29 === 0;
    const spike = week > 31 && week < 39 ? 1 : 0;

    if (gap) return 0;
    if (wave + spike > 1.65) return 4;
    if (wave + spike > 0.7) return 3;
    if (wave > -0.15) return 2;
    return 1;
  });
}

export default function GitHubContributions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const cells = useMemo(() => buildContributionCells(), []);

  return (
    <section id="github-contributions" className="content-section">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          GitHub Contributions
        </motion.h2>

        <motion.div
          ref={ref}
          className="overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full overflow-hidden pb-3">
            <div className="github-heatmap">
              <div className="ml-6 grid grid-cols-11 text-xs" style={{ color: "var(--text-muted)" }}>
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>

              <div className="mt-3 grid grid-flow-col grid-rows-7 gap-1">
                {cells.map((level, index) => (
                  <motion.span
                    key={index}
                    className="github-heatmap-cell rounded-[3px] border"
                    style={{
                      background: levels[level],
                      borderColor: level === 0 ? "var(--border-color)" : "rgba(74, 222, 128, 0.18)",
                    }}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.0015, duration: 0.18 }}
                    title={`Activity level ${level}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>Steady contribution rhythm across the year</span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                {levels.map((level, index) => (
                  <span
                    key={level}
                    className="h-3 w-3 rounded-[3px] border"
                    style={{
                      background: level,
                      borderColor: index === 0 ? "var(--border-color)" : "rgba(74, 222, 128, 0.18)",
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
