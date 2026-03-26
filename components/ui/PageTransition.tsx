"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PageTransition = () => (
  <motion.div
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9990,
      transformOrigin: "top",
      background: "linear-gradient(135deg,#04070f,#080e1a)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{
        fontFamily: "var(--font-display, Georgia, serif)",
        fontSize: "clamp(24px, 4vw, 40px)",
        color: "var(--accent)",
        fontStyle: "italic",
      }}
    >
      Bhavin Ghoghari
    </motion.span>
  </motion.div>
);

export default PageTransition;
