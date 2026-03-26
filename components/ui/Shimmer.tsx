"use client";

import React from "react";

export const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg, var(--surface) 25%, #1a2744 50%, var(--surface) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.6s infinite",
  borderRadius: 8,
};

export function SkeletonHero() {
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        maxWidth: 860,
        margin: "0 auto",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
      >
        <div
          style={{ ...shimmerStyle, height: 28, width: 220, borderRadius: 100 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            ...shimmerStyle,
            height: "clamp(44px,9vw,80px)",
            width: "70%",
            borderRadius: 8,
          }}
        />
        <div
          style={{
            ...shimmerStyle,
            height: "clamp(44px,9vw,80px)",
            width: "50%",
            borderRadius: 8,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {[140, 160, 120].map((w, i) => (
          <div
            key={i}
            style={{ ...shimmerStyle, height: 28, width: w, borderRadius: 4 }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          marginBottom: 36,
        }}
      >
        <div style={{ ...shimmerStyle, height: 16, width: "60%" }} />
        <div style={{ ...shimmerStyle, height: 16, width: "50%" }} />
        <div style={{ ...shimmerStyle, height: 16, width: "40%" }} />
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <div
          style={{ ...shimmerStyle, height: 44, width: 140, borderRadius: 6 }}
        />
        <div
          style={{ ...shimmerStyle, height: 44, width: 120, borderRadius: 6 }}
        />
      </div>
    </div>
  );
}

export function SkeletonSkills() {
  return (
    <div className="skills-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glow-card" style={{ padding: 20 }}>
          <div
            style={{
              ...shimmerStyle,
              height: 12,
              width: 80,
              marginBottom: 16,
              borderRadius: 4,
            }}
          />
          {[90, 75, 85, 70, 80].map((w, j) => (
            <div key={j} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    ...shimmerStyle,
                    height: 12,
                    width: `${w * 0.7}%`,
                    borderRadius: 3,
                  }}
                />
                <div
                  style={{
                    ...shimmerStyle,
                    height: 12,
                    width: 32,
                    borderRadius: 3,
                  }}
                />
              </div>
              <div
                style={{
                  height: 2,
                  background: "var(--border)",
                  borderRadius: 2,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonProjects() {
  return (
    <div className="projects-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glow-card" style={{ overflow: "hidden" }}>
          <div style={{ ...shimmerStyle, height: 170, borderRadius: 0 }} />
          <div style={{ padding: 20 }}>
            <div
              style={{
                ...shimmerStyle,
                height: 20,
                width: "70%",
                marginBottom: 10,
                borderRadius: 4,
              }}
            />
            <div
              style={{
                ...shimmerStyle,
                height: 13,
                width: "100%",
                marginBottom: 6,
                borderRadius: 3,
              }}
            />
            <div
              style={{
                ...shimmerStyle,
                height: 13,
                width: "80%",
                marginBottom: 14,
                borderRadius: 3,
              }}
            />
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[60, 70, 50].map((w, j) => (
                <div
                  key={j}
                  style={{
                    ...shimmerStyle,
                    height: 20,
                    width: w,
                    borderRadius: 3,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  ...shimmerStyle,
                  height: 14,
                  width: 44,
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  ...shimmerStyle,
                  height: 14,
                  width: 56,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonExperience() {
  return (
    <div className="timeline">
      <div className="timeline-line" />
      {[1, 2].map((i) => (
        <div key={i} className="timeline-item">
          <div
            className="timeline-dot"
            style={{ background: "var(--surface)" }}
          />
          <div
            style={{
              ...shimmerStyle,
              height: 11,
              width: 220,
              marginBottom: 10,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              height: 22,
              width: "55%",
              marginBottom: 6,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              height: 13,
              width: "35%",
              marginBottom: 12,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              height: 13,
              width: "100%",
              marginBottom: 6,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              height: 13,
              width: "90%",
              marginBottom: 6,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              height: 13,
              width: "75%",
              marginBottom: 16,
              borderRadius: 3,
            }}
          />
          {[1, 2, 3].map((j) => (
            <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <div
                style={{
                  ...shimmerStyle,
                  height: 13,
                  width: 12,
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  ...shimmerStyle,
                  height: 13,
                  width: `${60 + j * 10}%`,
                  borderRadius: 3,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
