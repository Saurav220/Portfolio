import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function QRModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 rounded-2xl p-8 glass max-w-sm w-full mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} style={{ color: "var(--text-muted)" }} />
            </button>

            <h3
              className="text-lg font-semibold mb-4 text-center"
              style={{ color: "var(--text-primary)" }}
            >
              Share this portfolio
            </h3>

            {/* QR Code placeholder using SVG */}
            <div className="flex justify-center mb-4">
              <div
                className="w-48 h-48 rounded-xl flex items-center justify-center"
                style={{
                  background: "white",
                  padding: "1rem",
                }}
              >
                <svg viewBox="0 0 100 100" width="160" height="160">
                  {/* Simple QR-like pattern */}
                  <rect x="5" y="5" width="25" height="25" rx="2" fill="#000" />
                  <rect x="70" y="5" width="25" height="25" rx="2" fill="#000" />
                  <rect x="5" y="70" width="25" height="25" rx="2" fill="#000" />
                  <rect x="10" y="10" width="15" height="15" rx="1" fill="#fff" />
                  <rect x="75" y="10" width="15" height="15" rx="1" fill="#fff" />
                  <rect x="10" y="75" width="15" height="15" rx="1" fill="#fff" />
                  <rect x="14" y="14" width="7" height="7" fill="#000" />
                  <rect x="79" y="14" width="7" height="7" fill="#000" />
                  <rect x="14" y="79" width="7" height="7" fill="#000" />
                  {/* Data modules */}
                  {Array.from({ length: 12 }).map((_, i) =>
                    Array.from({ length: 12 }).map((_, j) => {
                      const x = 35 + j * 3;
                      const y = 5 + i * 3;
                      if (Math.random() > 0.5) {
                        return (
                          <rect
                            key={`${i}-${j}`}
                            x={x}
                            y={y}
                            width="2.5"
                            height="2.5"
                            fill="#000"
                          />
                        );
                      }
                      return null;
                    })
                  )}
                  {Array.from({ length: 12 }).map((_, i) =>
                    Array.from({ length: 20 }).map((_, j) => {
                      const x = 5 + j * 3;
                      const y = 40 + i * 3;
                      if (Math.random() > 0.55) {
                        return (
                          <rect
                            key={`b-${i}-${j}`}
                            x={x}
                            y={y}
                            width="2.5"
                            height="2.5"
                            fill="#000"
                          />
                        );
                      }
                      return null;
                    })
                  )}
                </svg>
              </div>
            </div>

            <p
              className="text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Scan to visit this portfolio on your phone
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
