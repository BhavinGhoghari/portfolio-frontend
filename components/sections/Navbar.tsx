"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, mono, display } from "@/lib/theme";

interface NavbarProps {
  profile: any;
  loading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ profile, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = ["about", "projects", "experience", "contact"];

  return (
    <>
      <motion.nav
        className="glass"
        initial={{ y: -68, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,5vw,60px)",
          background: navScrolled ? "rgba(4,7,15,.92)" : "rgba(4,7,15,.25)",
          borderBottom: navScrolled
            ? "1px solid rgba(56,189,248,.08)"
            : "1px solid transparent",
          transition: "background .4s, border-color .4s",
        }}
      >
        {/* Logo */}
        {!loading && (
          <motion.a
            href="#"
            data-hover
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "baseline",
              gap: 1,
            }}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 360 }}
          >
            <span
              style={{
                ...display,
                fontSize: 26,
                fontStyle: "italic",
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              {profile?.name
                ?.split(" ")
                .map((w: string) => w[0])
                .join("") || "BG"}
            </span>
            <span
              style={{
                ...display,
                fontSize: 26,
                fontStyle: "italic",
                color: "var(--accent3)",
              }}
            >
              .
            </span>
          </motion.a>
        )}

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ gap: 32, alignItems: "center" }}
        >
          {NAV.map((s, i) => (
            <motion.a
              key={s}
              href={`#${s}`}
              data-hover
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ color: "var(--text)", y: -1 }}
              style={{
                ...mono,
                fontSize: 10,
                letterSpacing: ".18em",
                color: "var(--muted)",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {s}
            </motion.a>
          ))}
          {profile?.resume && (
            <motion.a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              data-hover
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.04, y: -1 }}
              style={{
                ...mono,
                fontSize: 10,
                letterSpacing: ".16em",
                color: "var(--accent)",
                textDecoration: "none",
                padding: "7px 18px",
                border: "1px solid rgba(56,189,248,.3)",
                borderRadius: 4,
              }}
            >
              Resume ↗
            </motion.a>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="menu"
          style={{
            flexDirection: "column",
            gap: 5,
            background: "transparent",
            border: "none",
            padding: 8,
            cursor: "pointer",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 7 }
                    : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "var(--text)",
                borderRadius: 2,
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.26, ease: EASE }}
            style={{
              position: "fixed",
              top: 68,
              left: 0,
              right: 0,
              zIndex: 490,
              background: "rgba(4,7,15,.97)",
              backdropFilter: "blur(28px)",
              borderBottom: "1px solid var(--border)",
              padding: "22px clamp(20px,5vw,60px) 30px",
            }}
          >
            {NAV.map((s, i) => (
              <motion.a
                key={s}
                href={`#${s}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 8, color: "var(--text)" }}
                style={{
                  display: "block",
                  ...display,
                  fontSize: "clamp(26px,6vw,42px)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--muted)",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(22,32,53,.45)",
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
