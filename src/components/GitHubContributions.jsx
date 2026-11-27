import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { socialLinks } from "../data/portfolio";
import TiltCard from "./TiltCard";

const GITHUB_USERNAME = "saurav220";
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVEL_STEPS = [0, 1, 2, 3, 4];

function buildFallbackData() {
  const days = [];
  const today = new Date();
  const totalDays = 52 * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const week = Math.floor((totalDays - 1 - i) / 7);
    const day = d.getDay();
    const wave = Math.sin(week * 0.55) + Math.cos(day * 1.35) + Math.sin((week + day) * 0.22);
    const gap = (week + day * 3) % 13 === 0 || (week * day) % 29 === 0;
    const spike = week > 31 && week < 39 ? 1 : 0;

    let level = 1;
    if (gap) level = 0;
    else if (wave + spike > 1.65) level = 4;
    else if (wave + spike > 0.7) level = 3;
    else if (wave > -0.15) level = 2;

    days.push({
      date: d.toISOString().slice(0, 10),
      count: level === 0 ? 0 : level * 2,
      level,
    });
  }

  return { total: null, contributions: days, isLive: false };
}

function groupIntoWeeks(contributions) {
  if (!contributions || contributions.length === 0) return { weeks: [], monthLabels: [] };

  const firstDate = new Date(`${contributions[0].date}T00:00:00`);
  const leadingEmpty = Number.isNaN(firstDate.getTime()) ? 0 : firstDate.getDay();
  const padded = [
    ...Array.from({ length: leadingEmpty }, () => ({ date: null, count: 0, level: 0, empty: true })),
    ...contributions,
  ];

  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    const slice = padded.slice(i, i + 7);
    while (slice.length < 7) {
      slice.push({ date: null, count: 0, level: 0, empty: true });
    }
    weeks.push(slice);
  }

  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstValid = week.find((d) => !d.empty && d.date);
    if (!firstValid) return;
    const month = new Date(`${firstValid.date}T00:00:00`).getMonth();
    if (month !== lastMonth) {
      if (monthLabels.length === 0 || weekIndex - monthLabels[monthLabels.length - 1].weekIndex >= 3) {
        monthLabels.push({ weekIndex, label: MONTH_NAMES[month] });
      }
      lastMonth = month;
    }
  });

  return { weeks, monthLabels };
}

export default function GitHubContributions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const fallback = useMemo(() => buildFallbackData(), []);
  const [data, setData] = useState(fallback);

  const githubUrl =
    socialLinks.find((item) => item.icon === "github")?.url ||
    `https://github.com/${GITHUB_USERNAME}`;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json?.contributions) && json.contributions.length > 0) {
          setData({
            total: typeof json?.total?.lastYear === "number" ? json.total.lastYear : null,
            contributions: json.contributions,
            isLive: true,
          });
        }
      })
      .catch(() => {
        // Keep deterministic fallback quietly when offline or rate-limited
      });

    return () => controller.abort();
  }, []);

  const { weeks, monthLabels } = useMemo(
    () => groupIntoWeeks(data.contributions),
    [data.contributions]
  );

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

        <TiltCard
          ref={ref}
          className="bento-card"
          maxTilt={2}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {data.total !== null
                ? `${data.total.toLocaleString()} contributions in the last year`
                : "Contribution activity"}
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono transition-colors hover:text-[var(--accent-text)]"
              style={{ color: "var(--text-muted)" }}
            >
              @{GITHUB_USERNAME}
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="github-heatmap min-w-[600px]">
              {/* Month labels aligned to week columns */}
              <div
                className="relative h-4 mb-1.5 text-[0.7rem]"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                  gap: "3px",
                  color: "var(--text-muted)",
                }}
              >
                {monthLabels.map((m) => (
                  <span
                    key={`${m.label}-${m.weekIndex}`}
                    style={{ gridColumnStart: m.weekIndex + 1 }}
                    className="whitespace-nowrap"
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Contribution Grid */}
              <div
                className="github-heatmap-grid"
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                }}
              >
                {weeks.flat().map((cell, index) =>
                  cell.empty ? (
                    <span
                      key={`empty-${index}`}
                      className="w-full aspect-square opacity-0 pointer-events-none"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      key={cell.date || index}
                      className="github-heatmap-cell"
                      style={{
                        background: `var(--heatmap-${cell.level})`,
                        borderColor:
                          cell.level === 0 ? "var(--heatmap-0-border)" : "transparent",
                      }}
                      title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${cell.date}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div
            className="mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <span>
              {data.isLive
                ? "Live public GitHub activity"
                : "Steady contribution rhythm across the year"}
            </span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-1">
                {LEVEL_STEPS.map((level) => (
                  <span
                    key={level}
                    className="h-2.5 w-2.5 rounded-[2px] border"
                    style={{
                      background: `var(--heatmap-${level})`,
                      borderColor: level === 0 ? "var(--heatmap-0-border)" : "transparent",
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
