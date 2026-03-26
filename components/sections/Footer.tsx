"use client";

import React from "react";
import { motion } from "framer-motion";
import { mono } from "@/lib/theme";

interface FooterProps {
  profile: any;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        borderTop: "1px solid rgba(22,32,53,.45)",
        padding: "28px clamp(20px,5vw,60px)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="footer-inner">
        <span
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--muted)",
            letterSpacing: ".1em",
          }}
        >
          © 2026 {profile?.name || "Bhavin Ghoghari"} · MERN Stack Developer ·
          Surat
        </span>
        <motion.a
          href="/admin"
          data-hover
          whileHover={{ color: "var(--accent)" }}
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--muted)",
            textDecoration: "none",
            letterSpacing: ".1em",
          }}
        >
          Admin →
        </motion.a>
      </div>
    </motion.footer>
  );
};

export default Footer;
