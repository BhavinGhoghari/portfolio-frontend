"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import RevealSection from "@/components/ui/RevealSection";
import TiltCard from "@/components/ui/TiltCard";
import { SkeletonProjects } from "@/components/ui/Shimmer";
import { fadeUp, stag, mono, display, fluid } from "@/lib/theme";

import ProjectModal from "@/components/ui/ProjectModal";
import { AnimatePresence } from "framer-motion";

interface ProjectsSectionProps {
  projects: any[];
  loading?: boolean; // Now optional as we'll use SSR data initially
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  loading = false,
}) => {
  const [modal, setModal] = React.useState<any>(null);
  return (
    <RevealSection id="projects">
      <div className="section-inner">
        <motion.div variants={fadeUp} className="section-label">
          02 — Projects
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-heading">
          Things I've{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--accent)",
              fontWeight: 400,
            }}
          >
            Built.
          </em>
        </motion.h2>

        {loading ? (
          <SkeletonProjects />
        ) : projects.length === 0 ? (
          <motion.div
            variants={fadeUp}
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--muted)",
              ...mono,
              fontSize: 12,
            }}
          >
            No projects yet — add from Admin Panel
          </motion.div>
        ) : (
          <motion.div variants={stag(0.12)} className="projects-grid">
            {projects.map((p: any) => (
              <motion.div key={p._id} variants={fadeUp}>
                <TiltCard style={{ height: "100%" }}>
                  <div
                    className="glow-card project-card"
                    style={{
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image with hover overlay */}
                    <div
                      style={{
                        height: 185,
                        position: "relative",
                        overflow: "hidden",
                        background:
                          "linear-gradient(135deg,var(--surface),var(--card))",
                      }}
                      onClick={() => setModal(p)}
                      data-hover
                    >
                      {p.imageUrl ? (
                        <motion.div
                          whileHover={{ scale: 1.07 }}
                          transition={{ duration: 0.5 }}
                          style={{ width: "100%", height: "100%" }}
                        >
                          <Image
                            src={p.imageUrl}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                          />
                        </motion.div>
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            ...display,
                            fontSize: 52,
                            fontStyle: "italic",
                            fontWeight: 300,
                            color: "rgba(255,255,255,.04)",
                            letterSpacing: -2,
                          }}
                        >
                          {p.title}
                        </div>
                      )}

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.22 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(4,7,15,.76)",
                          backdropFilter: "blur(4px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 10,
                        }}
                      >
                        <div
                          style={{
                            ...mono,
                            fontSize: 11,
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                            padding: "9px 20px",
                            borderRadius: 4,
                          }}
                        >
                          View Details →
                        </div>
                      </motion.div>

                      {/* Status badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          ...mono,
                          fontSize: 9,
                          letterSpacing: ".1em",
                          color:
                            p.status === "live"
                              ? "var(--accent3)"
                              : p.status === "wip"
                                ? "#fbbf24"
                                : "var(--muted)",
                          background: "rgba(4,7,15,.82)",
                          padding: "4px 10px",
                          borderRadius: 100,
                          border: `1px solid ${p.status === "live" ? "rgba(52,211,153,.3)" : p.status === "wip" ? "rgba(251,191,36,.3)" : "var(--border)"}`,
                          zIndex: 5,
                        }}
                      >
                        {p.status === "live"
                          ? "● Live"
                          : p.status === "wip"
                            ? "◐ WIP"
                            : "— Archived"}
                      </div>
                      {p.featured && (
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            ...mono,
                            fontSize: 9,
                            color: "var(--accent)",
                            background: "rgba(56,189,248,.1)",
                            padding: "4px 10px",
                            borderRadius: 100,
                            border: "1px solid rgba(56,189,248,.28)",
                            zIndex: 5,
                          }}
                        >
                          ★ Featured
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div
                      style={{
                        padding: fluid(18, 22),
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          ...display,
                          fontSize: 21,
                          fontWeight: 500,
                          marginBottom: 8,
                          letterSpacing: ".01em",
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          lineHeight: 1.7,
                          color: "var(--muted)",
                          marginBottom: 14,
                          flex: 1,
                          fontWeight: 300,
                        }}
                      >
                        {p.description}
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
                              ...mono,
                              fontSize: 9,
                              color: "var(--accent)",
                              padding: "3px 9px",
                              border: "1px solid rgba(56,189,248,.2)",
                              borderRadius: 4,
                              background: "rgba(56,189,248,.05)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center",
                        }}
                      >
                        {p.liveUrl && (
                          <motion.a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener"
                            data-hover
                            whileHover={{ x: 3 }}
                            style={{
                              ...mono,
                              fontSize: 11,
                              color: "var(--accent)",
                              textDecoration: "none",
                            }}
                          >
                            Live →
                          </motion.a>
                        )}
                        {p.githubUrl && (
                          <motion.a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener"
                            data-hover
                            whileHover={{ x: 3 }}
                            style={{
                              ...mono,
                              fontSize: 11,
                              color: "var(--muted)",
                              textDecoration: "none",
                            }}
                          >
                            GitHub →
                          </motion.a>
                        )}
                        <motion.button
                          onClick={() => setModal(p)}
                          data-hover
                          whileHover={{ color: "var(--accent)" }}
                          style={{
                            marginLeft: "auto",
                            ...mono,
                            fontSize: 10,
                            letterSpacing: ".1em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            background: "transparent",
                            border: "none",
                          }}
                        >
                          Details →
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <ProjectModal p={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </RevealSection>
  );
};

export default ProjectsSection;
