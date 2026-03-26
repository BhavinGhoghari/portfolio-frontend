"use client";

import { motion } from "framer-motion";
import { mono } from "@/lib/theme";

const Marquee = () => {
  const items = [
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Ant Design",
    "Redux",
    "REST APIs",
    "Git",
    "Vercel",
  ];

  return (
    <div
      style={{
        borderTop: "1px solid rgba(22,32,53,.55)",
        borderBottom: "1px solid rgba(22,32,53,.55)",
        padding: "13px 0",
        overflow: "hidden",
        background: "rgba(8,14,26,.5)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <motion.div
        style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: ".15em",
              color: "var(--muted)",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            {t}
            <span style={{ color: "var(--accent)", fontSize: 5, opacity: 0.5 }}>
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
