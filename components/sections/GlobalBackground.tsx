"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const GlobalBackground = () => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  
  const orbX = useSpring(useTransform(mx, [0, 1], [-28, 28]), {
    stiffness: 45,
    damping: 18,
  });
  const orbY = useSpring(useTransform(my, [0, 1], [-18, 18]), {
    stiffness: 45,
    damping: 18,
  });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [mx, my]);

  return (
    <>
      {/* Mouse-tracked radial orb */}
      <motion.div
        style={{
          position: "fixed",
          top: "8vh",
          left: "18vw",
          width: 520,
          height: 520,
          borderRadius: "50%",
          filter: "blur(110px)",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(circle,rgba(56,189,248,.075) 0%,transparent 70%)",
          x: orbX,
          y: orbY,
        }}
      />
      
      {/* Static secondary orb */}
      <motion.div
        animate={{ y: [0, -24, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
        style={{
          position: "fixed",
          bottom: "12vh",
          right: "12vw",
          width: 380,
          height: 380,
          borderRadius: "50%",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(circle,rgba(129,140,248,.065) 0%,transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(56,189,248,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.016) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </>
  );
};

export default GlobalBackground;
