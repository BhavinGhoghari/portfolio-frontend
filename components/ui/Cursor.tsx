"use client";

import { memo, useEffect, useRef } from "react";

const Cursor = memo(() => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const lag = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      if (dot.current) {
        dot.current.style.left = pos.current.x + "px";
        dot.current.style.top = pos.current.y + "px";
      }
      lag.current.x += (pos.current.x - lag.current.x) * 0.13;
      lag.current.y += (pos.current.y - lag.current.y) * 0.13;
      if (ring.current) {
        ring.current.style.left = lag.current.x + "px";
        ring.current.style.top = lag.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    const hover = () => ring.current?.classList.add("hovering");
    const leave = () => ring.current?.classList.remove("hovering");
    const down = () => {
      dot.current?.classList.add("clicking");
      ring.current?.classList.add("clicking");
    };
    const up = () => {
      dot.current?.classList.remove("clicking");
      ring.current?.classList.remove("clicking");
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", hover);
      el.addEventListener("mouseleave", leave);
    });
    raf.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="cursor-dot"
        style={{
          position: "fixed",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        ref={ring}
        className="cursor-ring"
        style={{
          position: "fixed",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
    </>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
