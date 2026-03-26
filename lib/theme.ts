import React from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stag = (d = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren: d } },
});

export const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono, monospace)",
};

export const display: React.CSSProperties = {
  fontFamily: "var(--font-display, Georgia, serif)",
};

// Responsive helpers
export const fluid = (min: number, max: number) => `clamp(${min}px, ${((max / 1440) * 100).toFixed(2)}vw, ${max}px)`;

export const mobile = "@media (max-width: 768px)";
export const tablet = "@media (max-width: 1024px)";
