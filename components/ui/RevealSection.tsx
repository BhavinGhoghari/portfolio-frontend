"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const stag = (d = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren: d } },
});

const RevealSection = memo(
  ({
    id,
    children,
    pad = true,
  }: {
    id?: string;
    children: React.ReactNode;
    pad?: boolean;
  }) => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-70px" });
    return (
      <motion.section
        ref={ref}
        id={id}
        className={pad ? "section-pad" : undefined}
        variants={stag()}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{ position: "relative", zIndex: 2 }}
      >
        {children}
      </motion.section>
    );
  },
);

RevealSection.displayName = "RevealSection";

export default RevealSection;
