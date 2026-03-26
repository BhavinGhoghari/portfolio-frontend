"use client";

import { memo, useRef } from "react";

const TiltCard = memo(
  ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => {
    const el = useRef<HTMLDivElement>(null);
    const move = (e: React.MouseEvent) => {
      if (!el.current) return;
      const r = el.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.current.style.transform = `perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(6px)`;
    };
    const leave = () => {
      if (el.current)
        el.current.style.transform =
          "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";
    };
    return (
      <div
        ref={el}
        style={{
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          ...style,
        }}
        onMouseMove={move}
        onMouseLeave={leave}
      >
        {children}
      </div>
    );
  },
);

TiltCard.displayName = "TiltCard";

export default TiltCard;
