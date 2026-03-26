"use client";

import React from "react";
import { motion } from "framer-motion";
import RevealSection from "@/components/ui/RevealSection";
import { SkeletonExperience } from "@/components/ui/Shimmer";
import { fadeUp, stag, mono, display, EASE } from "@/lib/theme";

interface ExperienceSectionProps {
  experiences: any[];
  loading: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  loading,
}) => {
  const fmtDate = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Present";

  return (
    <RevealSection id="experience">
      <div className="section-inner">
        <motion.div variants={fadeUp} className="section-label">
          03 — Experience
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-heading">
          Where I've{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--accent)",
              fontWeight: 400,
            }}
          >
            Grown.
          </em>
        </motion.h2>

        {loading ? (
          <SkeletonExperience />
        ) : experiences.length === 0 ? (
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
            No experience added yet
          </motion.div>
        ) : (
          <motion.div variants={stag()} className="timeline">
            {/* Timeline line animates down */}
            <motion.div
              className="timeline-line"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.15, ease: EASE }}
            />

            {experiences.map((exp: any) => (
              <motion.div
                key={exp._id}
                variants={fadeUp}
                className="timeline-item"
              >
                {/* Dot springs in */}
                <motion.div
                  className="timeline-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    delay: 0.18,
                  }}
                />

                <div
                  style={{
                    ...mono,
                    fontSize: 9,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 10,
                    opacity: 0.75,
                  }}
                >
                  {fmtDate(exp.startDate)} —{" "}
                  {exp.current ? "Present" : fmtDate(exp.endDate)} · {exp.type}
                  {exp.remote ? " · Remote" : ""}
                </div>
                <div
                  style={{
                    ...display,
                    fontSize: "clamp(20px,3vw,28px)",
                    fontWeight: 500,
                    marginBottom: 5,
                  }}
                >
                  {exp.role}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    marginBottom: 14,
                    fontWeight: 300,
                  }}
                >
                  {exp.company} · {exp.location}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.82,
                    color: "var(--muted)",
                    marginBottom: 16,
                    fontWeight: 300,
                    maxWidth: 680,
                  }}
                >
                  {exp.description}
                </div>
                {exp.highlights?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {exp.highlights.map((h: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        style={{
                          display: "flex",
                          gap: 10,
                          fontSize: 13,
                          color: "var(--muted)",
                          fontWeight: 300,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent3)",
                            flexShrink: 0,
                            ...mono,
                          }}
                        >
                          ✓
                        </span>
                        {h}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </RevealSection>
  );
};

export default ExperienceSection;
