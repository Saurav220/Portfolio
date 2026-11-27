import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "../data/portfolio";
import { Heart } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full max-w-[52rem] pt-8 mt-8 border-t"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <motion.div
        ref={ref}
        className="section-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            &copy; {year} {personalInfo.name}
          </p>
          <p className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
            Designed &amp; built by hand, end to end
            <Heart size={12} className="text-red-400" fill="currentColor" />
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
