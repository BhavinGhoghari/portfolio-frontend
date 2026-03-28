"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TypingText from "@/components/ui/TypingText";
import { SkeletonHero } from "@/components/ui/Shimmer";
import { fadeUp, stag, mono, display, EASE, fluid } from "@/lib/theme";

interface HeroSectionProps {
  profile: any;
  loading?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  loading = false,
}) => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);
  const heroO = useTransform(scrollY, [0, 420], [1, 0]);
  console.log("Profile Detial:- ", profile);
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: `${fluid(100, 160)} clamp(20px,5vw,60px) ${fluid(60, 100)}`,
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          y: heroY,
          opacity: heroO,
          width: "100%",
          maxWidth: 880,
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <SkeletonHero />
        ) : (
          <motion.div variants={stag(0.08)} initial="hidden" animate="show">
            {/* Available badge */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <motion.div
                data-hover
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "8px 20px",
                  border: "1px solid rgba(56,189,248,.2)",
                  borderRadius: 100,
                  background: "rgba(56,189,248,.04)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.45, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  style={{
                    width: 7,
                    height: 7,
                    background: profile?.available ? "var(--accent3)" : "#555",
                    borderRadius: "50%",
                    display: "inline-block",
                    boxShadow: profile?.available
                      ? "0 0 10px var(--accent3)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    ...mono,
                    fontSize: 10,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  {profile?.available ? "Available for work" : "Not available"}{" "}
                  · {profile?.location || "Surat, Gujarat, India"}
                </span>
              </motion.div>
            </motion.div>

            {/* Name — word by word with blur reveal */}
            <motion.h1
              style={{
                ...display,
                fontSize: "clamp(52px,10vw,124px)",
                lineHeight: 0.88,
                fontWeight: 300,
                letterSpacing: "-.025em",
                marginBottom: 18,
                wordBreak: "break-word",
              }}
            >
              {profile?.name?.split(" ").map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 38, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.1 + i * 0.12,
                    duration: 0.72,
                    ease: EASE,
                  }}
                  style={{ display: "inline-block", marginRight: ".22em" }}
                >
                  {i === 1 ? (
                    <em
                      style={{
                        fontStyle: "italic",
                        color: "var(--accent)",
                        fontWeight: 400,
                      }}
                    >
                      {word}
                    </em>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Typing tagline */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                alignItems: "center",
                gap: fluid(8, 14),
                justifyContent: "center",
                marginBottom: fluid(18, 22),
                minHeight: 34,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.55 }}
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg,transparent,rgba(61,85,112,.5))",
                }}
              />
              <span
                style={{
                  ...mono,
                  fontSize: 13,
                  color: "var(--muted)",
                  letterSpacing: ".04em",
                }}
              >
                <TypingText
                  words={[
                    "MERN Stack Developer",
                    "React.js Developer",
                    "Next.js Developer",
                    "Node.js Developer",
                    "MERN Stack Dev",
                    "Open to Work",
                  ]}
                />
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.55 }}
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg,rgba(61,85,112,.5),transparent)",
                }}
              />
            </motion.div>

            {/* Badges */}
            <motion.div
              variants={stag(0.07)}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              {[
                {
                  l: "MERN Stack Dev",
                  c: "var(--accent)",
                  bg: "rgba(56,189,248,.06)",
                  b: "rgba(56,189,248,.3)",
                },
                {
                  l: "✓ Internship Complete",
                  c: "var(--accent3)",
                  bg: "rgba(52,211,153,.06)",
                  b: "rgba(52,211,153,.28)",
                },
                {
                  l: "Open to Work",
                  c: "var(--accent2)",
                  bg: "rgba(129,140,248,.07)",
                  b: "rgba(129,140,248,.28)",
                },
              ].map(({ l, c, bg, b }) => (
                <motion.span
                  key={l}
                  variants={fadeUp}
                  data-hover
                  whileHover={{ scale: 1.08, y: -3 }}
                  transition={{ type: "spring", stiffness: 350 }}
                  style={{
                    ...mono,
                    fontSize: 10,
                    letterSpacing: ".1em",
                    padding: "6px 14px",
                    borderRadius: 4,
                    color: c,
                    border: `1px solid ${b}`,
                    background: bg,
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </motion.div>

            {/* Bio paragraph */}
            {profile?.bio && (
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: fluid(15, 17),
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  maxWidth: 600,
                  margin: "24px auto 32px",
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                {profile.bio}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: fluid(12, 16),
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <motion.a
                href="#projects"
                data-hover
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "14px 32px",
                  background: "var(--accent)",
                  color: "#000",
                  ...mono,
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  borderRadius: 5,
                  textDecoration: "none",
                  fontWeight: 700,
                  boxShadow: "0 0 22px rgba(56,189,248,.18)",
                }}
              >
                See My Work ↓
              </motion.a>
              <motion.a
                href="#contact"
                data-hover
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 30px",
                  background: "transparent",
                  color: "var(--text)",
                  ...mono,
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  border: "1px solid var(--border)",
                  borderRadius: 5,
                  textDecoration: "none",
                }}
              >
                Let's Talk →
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 7,
        }}
      >
        <span
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--muted)",
            opacity: 0.5,
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.85,
            ease: "easeInOut",
          }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom,var(--accent),transparent)",
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
