import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full glass cursor-pointer transition-colors hover:border-[var(--accent-text)]"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon size={16} style={{ color: "var(--accent-text)" }} />
        ) : (
          <Sun size={16} className="text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
