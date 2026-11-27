import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import QRCode from "qrcode";

const FALLBACK_URL = "https://portfolio-62s2.onrender.com/";

export default function QRModal({ isOpen, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  const shareUrl =
    typeof window !== "undefined" && window.location?.href
      ? window.location.href
      : FALLBACK_URL;

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    QRCode.toDataURL(shareUrl, {
      width: 220,
      margin: 1,
      color: {
        dark: "#0a0a0f",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        // Ignore generation errors gracefully
      });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", handleKeyDown);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, [isOpen, shareUrl, onClose]);

  const handleCopyUrl = async () => {
    let copiedOk = false;
    try {
      await navigator.clipboard.writeText(shareUrl);
      copiedOk = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copiedOk = document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (copiedOk) {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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
            className="relative z-10 rounded-2xl p-6 sm:p-8 glass max-w-sm w-full"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} style={{ color: "var(--text-muted)" }} />
            </button>

            <h3
              id="qr-modal-title"
              className="text-lg font-semibold mb-1.5 text-center"
              style={{ color: "var(--text-primary)" }}
            >
              Share this portfolio
            </h3>

            <p
              className="text-center text-xs mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Scan to visit on your phone
            </p>

            {/* Real Scannable QR Code */}
            <div className="flex justify-center mb-5">
              <div className="w-48 h-48 rounded-2xl bg-white p-3.5 border border-black/10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.28)] flex items-center justify-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`QR code linking to ${shareUrl}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-zinc-500">Generating QR...</span>
                )}
              </div>
            </div>

            <div
              className="pill-3d flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="truncate">{shareUrl}</span>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="btn-3d-secondary inline-flex items-center gap-1 shrink-0 rounded-lg px-2.5 py-1 font-medium cursor-pointer"
                style={{ color: copied ? "var(--accent-text)" : "var(--text-primary)" }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied!" : "Copy link"}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
