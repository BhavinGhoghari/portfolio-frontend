"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { fluid } from "@/lib/theme";

const EASE = [0.16, 1, 0.3, 1] as const;

const ProjectModal = memo(({ p, onClose }: { p: any; onClose: () => void }) => (
  <motion.div
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.22 }}
    onClick={onClose}
  >
    <motion.div
      className="modal-box"
      initial={{ opacity: 0, scale: 0.9, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 28 }}
      transition={{ duration: 0.32, ease: EASE }}
      onClick={(e) => e.stopPropagation()}
    >
      {p.imageUrl && (
        <div
          style={{
            height: fluid(180, 230),
            overflow: "hidden",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <img
            src={p.imageUrl}
            alt={p.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div style={{ padding: fluid(20, 32) }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontSize: fluid(22, 28),
              fontWeight: 400,
            }}
          >
            {p.title}
          </h3>
          <button
            onClick={onClose}
            data-hover
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginBottom: 16,
          }}
        >
          {p.tags?.map((t: string) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 10,
                color: "var(--accent)",
                padding: "3px 10px",
                border: "1px solid rgba(56,189,248,.22)",
                borderRadius: 4,
                background: "rgba(56,189,248,.05)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.82,
            color: "var(--muted)",
            marginBottom: 26,
            fontWeight: 300,
          }}
        >
          {p.longDesc || p.description}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener"
              data-hover
              style={{
                padding: "10px 22px",
                background: "var(--accent)",
                color: "#000",
                borderRadius: 6,
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 11,
                letterSpacing: ".12em",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Live Site ↗
            </a>
          )}
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener"
              data-hover
              style={{
                padding: "10px 22px",
                background: "transparent",
                color: "var(--text)",
                borderRadius: 6,
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 11,
                letterSpacing: ".12em",
                textDecoration: "none",
                border: "1px solid var(--border)",
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
));

ProjectModal.displayName = "ProjectModal";

export default ProjectModal;
