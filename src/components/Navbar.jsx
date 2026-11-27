import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  Home,
  Briefcase,
  LayoutGrid,
  Mail,
  CalendarDays,
  Bot,
  UserRound,
  QrCode,
} from "lucide-react";
import QRModal from "./QRModal";

/* Custom SVG brand icons since lucide dropped them */
const GithubIcon = ({ size = 17, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 17, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = ({ size = 17, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const sectionLinks = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "experience", label: "Experience", href: "#experience", icon: Briefcase },
  { id: "projects", label: "Work", href: "#projects", icon: LayoutGrid },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

const socialNavLinks = [
  { label: "GitHub", href: "https://github.com/saurav220", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saurav-pratihast/", icon: LinkedinIcon },
  { label: "X", href: "https://x.com/PratihastSaurav", icon: XIcon },
  { label: "Calendar", href: "https://cal.com/saurav-pratihast/30min", icon: CalendarDays },
];

function DockTooltip({ label, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[0.65rem] font-medium whitespace-nowrap glass"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.14 }}
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function DockDivider() {
  return (
    <div
      className="w-px h-4 sm:h-5 mx-0.5 sm:mx-1 shrink-0"
      style={{ background: "var(--border-color)" }}
      aria-hidden="true"
    />
  );
}

function DockItem({
  id,
  label,
  href,
  external,
  onClick,
  active,
  hoveredId,
  setHoveredId,
  highlightBg,
  children,
}) {
  const isHovered = hoveredId === id;
  const sharedProps = {
    className:
      "relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full cursor-pointer transition-colors duration-200",
    style: {
      background: highlightBg ? "var(--color-accent-subtle)" : "transparent",
      color: active || isHovered || highlightBg ? "var(--accent-text)" : "var(--text-secondary)",
    },
    onMouseEnter: () => setHoveredId(id),
    onMouseLeave: () => setHoveredId(null),
    onFocus: () => setHoveredId(id),
    onBlur: () => setHoveredId(null),
    whileHover: { scale: 1.12 },
    whileTap: { scale: 0.92 },
    "aria-label": label,
  };

  const inner = (
    <>
      {children}
      {active && (
        <span
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
          style={{ background: "var(--accent-text)" }}
          aria-hidden="true"
        />
      )}
      <DockTooltip label={label} visible={isHovered} />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-current={active ? "location" : undefined}
        {...sharedProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...sharedProps}>
      {inner}
    </motion.button>
  );
}

export default function Navbar() {
  const { agentMode, toggleAgentMode } = useTheme();
  const [qrOpen, setQrOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (agentMode) return;

    const sectionIds = sectionLinks.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 100) {
          setActiveSection("hero");
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));

    const handleScrollTop = () => {
      if (window.scrollY < 100) setActiveSection("hero");
    };
    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [agentMode]);

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-3">
        <motion.nav
          aria-label="Primary navigation dock"
          className="flex items-center gap-0.5 sm:gap-1 rounded-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 glass pointer-events-auto max-w-[calc(100vw-1.5rem)]"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Agent Mode Toggle */}
          <DockItem
            id="agent-mode"
            label={agentMode ? "Human Mode" : "Agent Mode"}
            onClick={toggleAgentMode}
            highlightBg={agentMode}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          >
            {agentMode ? <Bot size={17} /> : <UserRound size={17} />}
          </DockItem>

          <DockDivider />

          {/* In-page section jumps */}
          {!agentMode && (
            <>
              {sectionLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <DockItem
                    key={item.id}
                    id={`section-${item.id}`}
                    label={item.label}
                    href={item.href}
                    active={activeSection === item.id}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                  >
                    <Icon size={17} />
                  </DockItem>
                );
              })}
              <DockDivider />
            </>
          )}

          {/* External Social Links */}
          {socialNavLinks.map((item) => {
            const Icon = item.icon;
            return (
              <DockItem
                key={item.label}
                id={`social-${item.label}`}
                label={item.label}
                href={item.href}
                external
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              >
                <Icon size={17} />
              </DockItem>
            );
          })}

          <DockDivider />

          {/* Share QR Code */}
          <DockItem
            id="share-qr"
            label="Share QR"
            onClick={() => setQrOpen(true)}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          >
            <QrCode size={17} />
          </DockItem>
        </motion.nav>
      </div>

      <QRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}
