"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SkillBar = memo(({ name, level }: { name: string; level: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, scale: 1.05 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 14px",
        borderRadius: 100,
        fontSize: 12,
        fontFamily: "var(--font-mono, monospace)",
        letterSpacing: ".04em",
        color: "var(--muted)",
        background: "rgba(56,189,248,.04)",
        border: "1px solid rgba(56,189,248,.14)",
        cursor: "default",
        transition: "border-color .2s, background .2s",
      }}
    >
      <motion.span
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          repeat: Infinity,
          duration: 2.8,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
        }}
      />
      {name}
    </motion.span>
  );
});

SkillBar.displayName = "SkillBar";

export default SkillBar;
