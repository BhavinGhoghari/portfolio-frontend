"use client";

import React from "react";
import { motion } from "framer-motion";
import RevealSection from "@/components/ui/RevealSection";
import TiltCard from "@/components/ui/TiltCard";
import SkillBar from "@/components/ui/SkillBar";
import { SkeletonSkills } from "@/components/ui/Shimmer";
import { fadeUp, stag, mono, fluid } from "@/lib/theme";

interface SkillsSectionProps {
  groupedSkills: any;
  loading: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  groupedSkills,
  loading,
}) => {
  return (
    <RevealSection id="about">
      <div className="section-inner">
        <motion.div variants={fadeUp} className="section-label">
          01 — About
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-heading">
          Skills &amp;{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--accent)",
              fontWeight: 400,
            }}
          >
            Stack.
          </em>
        </motion.h2>
        {loading ? (
          <SkeletonSkills />
        ) : (
          <motion.div variants={stag()} className="skills-grid" style={{ gap: fluid(16, 20) }}>
            {Object.entries(groupedSkills).map(
              ([cat, catSkills]: [string, any]) => (
                <motion.div key={cat} variants={fadeUp}>
                  <TiltCard>
                    <div className="glow-card" style={{ padding: fluid(18, 22) }}>
                      <div
                        style={{
                          ...mono,
                          fontSize: 9,
                          letterSpacing: ".2em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                          marginBottom: 18,
                          opacity: 0.75,
                        }}
                      >
                        {cat}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: fluid(10, 14),
                        }}
                      >
                        {catSkills.map((sk: any, i: number) => (
                          <motion.div
                            key={sk._id}
                            variants={{
                              hidden: {},
                              show: {
                                transition: { staggerChildren: 0.07 },
                              },
                            }}
                            custom={i}
                          >
                            <SkillBar name={sk.name} level={sk.level} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ),
            )}
          </motion.div>
        )}
      </div>
    </RevealSection>
  );
};

export default SkillsSection;
