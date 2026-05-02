import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { personalInfo } from "../data/portfolio";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const email = personalInfo.email;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent("Hey Saurav - Let's Connect!")}`;

  return (
    <section id="contact" className="content-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href={mailtoUrl}
            className="mb-8 inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl" 
            style={{
              background: "linear-gradient(135deg, var(--color-accent), rgba(56,189,248,0.4))",
              boxShadow: "0 0 40px rgba(56,189,248,0.15)", marginBottom: "1rem"
            }}
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 52px rgba(56,189,248,0.24)" }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Email ${email}`}
            title={`Email ${email}`}
          >
            <Mail size={28} color="#000" strokeWidth={2} />
          </motion.a>

          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Get in Touch
          </h2>

          <motion.p
            className="mb-10 text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have a project in mind, a question, or just want to say hi?
            <br />
            I'd love to hear from you - let's start a conversation.
          </motion.p>

          <motion.a
            href={mailtoUrl}
            className="mt-5 inline-block text-xs font-mono tracking-wider transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {email}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
