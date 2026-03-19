"use client";
import { useEffect, useRef, useState, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperiences,
  sendMessage,
} from "@/lib/api";
import toast from "react-hot-toast";

// ─── Constants ───────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stag = (d = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren: d } },
});

// ─── Your original shimmer style (unchanged) ─────────
const shimmer: React.CSSProperties = {
  background:
    "linear-gradient(90deg, var(--surface) 25%, #1a2744 50%, var(--surface) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.6s infinite",
  borderRadius: 8,
};

// ─── Your original skeleton components (unchanged) ───
function SkeletonHero() {
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
          style={{ ...shimmer, height: 28, width: 220, borderRadius: 100 }}
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
            ...shimmer,
            height: "clamp(44px,9vw,80px)",
            width: "70%",
            borderRadius: 8,
          }}
        />
        <div
          style={{
            ...shimmer,
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
            style={{ ...shimmer, height: 28, width: w, borderRadius: 4 }}
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
        <div style={{ ...shimmer, height: 16, width: "60%" }} />
        <div style={{ ...shimmer, height: 16, width: "50%" }} />
        <div style={{ ...shimmer, height: 16, width: "40%" }} />
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <div style={{ ...shimmer, height: 44, width: 140, borderRadius: 6 }} />
        <div style={{ ...shimmer, height: 44, width: 120, borderRadius: 6 }} />
      </div>
    </div>
  );
}

function SkeletonSkills() {
  return (
    <div className="skills-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glow-card" style={{ padding: 20 }}>
          <div
            style={{
              ...shimmer,
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
                    ...shimmer,
                    height: 12,
                    width: `${w * 0.7}%`,
                    borderRadius: 3,
                  }}
                />
                <div
                  style={{ ...shimmer, height: 12, width: 32, borderRadius: 3 }}
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

function SkeletonProjects() {
  return (
    <div className="projects-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glow-card" style={{ overflow: "hidden" }}>
          <div style={{ ...shimmer, height: 170, borderRadius: 0 }} />
          <div style={{ padding: 20 }}>
            <div
              style={{
                ...shimmer,
                height: 20,
                width: "70%",
                marginBottom: 10,
                borderRadius: 4,
              }}
            />
            <div
              style={{
                ...shimmer,
                height: 13,
                width: "100%",
                marginBottom: 6,
                borderRadius: 3,
              }}
            />
            <div
              style={{
                ...shimmer,
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
                  style={{ ...shimmer, height: 20, width: w, borderRadius: 3 }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{ ...shimmer, height: 14, width: 44, borderRadius: 3 }}
              />
              <div
                style={{ ...shimmer, height: 14, width: 56, borderRadius: 3 }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonExperience() {
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
              ...shimmer,
              height: 11,
              width: 220,
              marginBottom: 10,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmer,
              height: 22,
              width: "55%",
              marginBottom: 6,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              ...shimmer,
              height: 13,
              width: "35%",
              marginBottom: 12,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmer,
              height: 13,
              width: "100%",
              marginBottom: 6,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmer,
              height: 13,
              width: "90%",
              marginBottom: 6,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              ...shimmer,
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
                  ...shimmer,
                  height: 13,
                  width: 12,
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  ...shimmer,
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

// ─── Custom Cursor (mouse-tracking with RAF) ──────────
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

// ─── Typing animation ─────────────────────────────────
const TypingText = memo(({ words }: { words: string[] }) => {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const word = words[wi];
    const delay = del ? 55 : ci === word.length ? 1800 : 88;
    const t = setTimeout(() => {
      if (!del) {
        if (ci < word.length) {
          setTxt(word.slice(0, ci + 1));
          setCi((c) => c + 1);
        } else setDel(true);
      } else {
        if (ci > 0) {
          setTxt(word.slice(0, ci - 1));
          setCi((c) => c - 1);
        } else {
          setDel(false);
          setWi((i) => (i + 1) % words.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);

  return (
    <span>
      <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{txt}</span>
      <span className="typing-cursor" />
    </span>
  );
});
TypingText.displayName = "TypingText";

// ─── Tilt card (3D mouse effect) ─────────────────────
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

// ─── Animated skill bar ───────────────────────────────
const SkillBar = memo(({ name, level }: { name: string; level: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "var(--text)",
            fontFamily: "var(--font-body, system-ui)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 11,
            color: "var(--accent)",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 2,
          background: "var(--border)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
          style={{
            height: "100%",
            borderRadius: 2,
            background: "linear-gradient(90deg,var(--accent),var(--accent2))",
          }}
        />
      </div>
    </div>
  );
});
SkillBar.displayName = "SkillBar";

// ─── Section with scroll-reveal ───────────────────────
const RevealSection = memo(
  ({
    id,
    children,
    pad = true,
  }: {
    id?: string;
    children: React.ReactNode;
    pad?: boolean;
  }) => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-70px" });
    return (
      <motion.section
        ref={ref}
        id={id}
        className={pad ? "section-pad" : undefined}
        variants={stag()}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{ position: "relative", zIndex: 2 }}
      >
        {children}
      </motion.section>
    );
  },
);
RevealSection.displayName = "RevealSection";

// ─── Project detail modal ─────────────────────────────
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
            height: 230,
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
      <div style={{ padding: 32 }}>
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
              fontSize: 28,
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

// ─── Page enter transition ────────────────────────────
const PageTransition = () => (
  <motion.div
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9990,
      transformOrigin: "top",
      background: "linear-gradient(135deg,#04070f,#080e1a)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{
        fontFamily: "var(--font-display, Georgia, serif)",
        fontSize: "clamp(24px,5vw,52px)",
        fontStyle: "italic",
        fontWeight: 300,
        color: "var(--accent)",
        letterSpacing: ".04em",
      }}
    >
      BG<span style={{ color: "var(--accent3)" }}>.</span>
    </motion.span>
  </motion.div>
);

// ─── MAIN PAGE ────────────────────────────────────────
export default function PortfolioPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [exps, setExps] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [modal, setModal] = useState<any>(null);
  const [ready, setReady] = useState(false);

  const [lp, setLp] = useState(true);
  const [lpr, setLpr] = useState(true);
  const [ls, setLs] = useState(true);
  const [le, setLe] = useState(true);

  // Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);
  const heroO = useTransform(scrollY, [0, 420], [1, 0]);

  // Mouse-tracking orbs
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
    setTimeout(() => setReady(true), 150);
    getProfile()
      .then((r) => setProfile(r.data.profile))
      .catch(() => {})
      .finally(() => setLp(false));
    getProjects()
      .then((r) => setProjects(r.data.projects))
      .catch(() => {})
      .finally(() => setLpr(false));
    getSkills()
      .then((r) => setSkills(r.data.skills))
      .catch(() => {})
      .finally(() => setLs(false));
    getExperiences()
      .then((r) => setExps(r.data.experiences))
      .catch(() => {})
      .finally(() => setLe(false));

    const onScroll = () => setNavScrolled(window.scrollY > 60);
    const onMouse = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleContact = async (e: any) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendMessage(form);
      toast.success("Message sent! I'll reply within 24h 🚀");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Try emailing directly.");
    } finally {
      setSending(false);
    }
  };

  const grouped = skills.reduce((acc: any, s: any) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const fmtDate = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Present";

  const NAV = ["about", "projects", "experience", "contact"];

  const mono: React.CSSProperties = {
    fontFamily: "var(--font-mono, monospace)",
  };
  const display: React.CSSProperties = {
    fontFamily: "var(--font-display, Georgia, serif)",
  };

  return (
    <>
      {/* Page enter transition */}
      {!ready && <PageTransition />}

      {/* Custom cursor */}
      <Cursor />

      {/* Grain overlay */}
      <div
        className="grain"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 8000,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
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
            background:
              "radial-gradient(circle,rgba(56,189,248,.075) 0%,transparent 70%)",
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
            background:
              "radial-gradient(circle,rgba(129,140,248,.065) 0%,transparent 70%)",
          }}
        />

        {/* Grid */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(56,189,248,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.016) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* ── NAV ── */}
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
          {lp ? (
            <div
              style={{ ...shimmer, height: 26, width: 88, borderRadius: 4 }}
            />
          ) : (
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
            style={{ display: "flex", gap: 32, alignItems: "center" }}
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
              display: "none",
              flexDirection: "column",
              gap: 5,
              background: "transparent",
              border: "none",
              padding: 8,
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

        {/* ── HERO ── */}
        <section
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "120px clamp(20px,5vw,60px) 80px",
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
            {lp ? (
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
                        background: profile?.available
                          ? "var(--accent3)"
                          : "#555",
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
                      {profile?.available
                        ? "Available for work"
                        : "Not available"}{" "}
                      · {profile?.location || "Surat, Gujarat"}
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
                    gap: 14,
                    justifyContent: "center",
                    marginBottom: 22,
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

                {/* Bio */}
                <motion.p
                  variants={fadeUp}
                  style={{
                    fontSize: "clamp(14px,2vw,17px)",
                    lineHeight: 1.84,
                    color: "var(--muted)",
                    maxWidth: 520,
                    margin: "0 auto 40px",
                    fontWeight: 300,
                  }}
                >
                  {profile?.bio ||
                    "MERN Stack Developer building fast, accessible web applications."}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={stag(0.1)}
                  style={{
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <motion.a
                    variants={fadeUp}
                    href="#projects"
                    data-hover
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 0 32px rgba(56,189,248,.28)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "13px 30px",
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
                    variants={fadeUp}
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
                background:
                  "linear-gradient(to bottom,var(--accent),transparent)",
              }}
            />
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <div
          style={{
            borderTop: "1px solid rgba(22,32,53,.55)",
            borderBottom: "1px solid rgba(22,32,53,.55)",
            padding: "13px 0",
            overflow: "hidden",
            background: "rgba(8,14,26,.5)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[
              "MongoDB",
              "Express.js",
              "React.js",
              "Node.js",
              "TypeScript",
              "Next.js",
              "Tailwind CSS",
              "Ant Design",
              "Redux",
              "REST APIs",
              "Git",
              "Vercel",
              "MongoDB",
              "Express.js",
              "React.js",
              "Node.js",
              "TypeScript",
              "Next.js",
              "Tailwind CSS",
              "Ant Design",
              "Redux",
              "REST APIs",
              "Git",
              "Vercel",
            ].map((t, i) => (
              <span
                key={i}
                style={{
                  ...mono,
                  fontSize: 10,
                  letterSpacing: ".15em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                {t}
                <span
                  style={{ color: "var(--accent)", fontSize: 5, opacity: 0.5 }}
                >
                  ◆
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── SKILLS ── */}
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
            {ls ? (
              <SkeletonSkills />
            ) : (
              <motion.div variants={stag()} className="skills-grid">
                {Object.entries(grouped).map(
                  ([cat, catSkills]: [string, any]) => (
                    <motion.div key={cat} variants={fadeUp}>
                      <TiltCard>
                        <div className="glow-card" style={{ padding: 22 }}>
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
                              gap: 14,
                            }}
                          >
                            {catSkills.map((sk: any) => (
                              <SkillBar
                                key={sk._id}
                                name={sk.name}
                                level={sk.level}
                              />
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

        {/* ── PROJECTS ── */}
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
            {lpr ? (
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
                            <motion.img
                              src={p.imageUrl}
                              alt={p.title}
                              loading="lazy"
                              decoding="async"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              whileHover={{ scale: 1.07 }}
                              transition={{ duration: 0.5 }}
                            />
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
                              }}
                            >
                              ★ Featured
                            </div>
                          )}
                        </div>

                        {/* Body */}
                        <div
                          style={{
                            padding: 22,
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
        </RevealSection>

        {/* ── EXPERIENCE ── */}
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
            {le ? (
              <SkeletonExperience />
            ) : exps.length === 0 ? (
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

                {exps.map((exp: any) => (
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
                      {exp.current ? "Present" : fmtDate(exp.endDate)} ·{" "}
                      {exp.type}
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

        {/* ── CONTACT ── */}
        <RevealSection id="contact">
          <div className="section-inner">
            <motion.div variants={fadeUp} className="section-label">
              04 — Contact
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="contact-card glass glow-card"
              style={{
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Card glow spot */}
              <div
                style={{
                  position: "absolute",
                  top: "-18%",
                  right: "-4%",
                  width: "38%",
                  height: "50%",
                  background:
                    "radial-gradient(ellipse,rgba(56,189,248,.055) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Left: info */}
              <div style={{ position: "relative" }}>
                <h2
                  style={{
                    ...display,
                    fontSize: "clamp(30px,5vw,56px)",
                    fontWeight: 300,
                    lineHeight: 0.92,
                    marginBottom: 20,
                    letterSpacing: "-.02em",
                  }}
                >
                  Let's Build
                  <br />
                  Something
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "var(--accent)",
                      fontWeight: 400,
                    }}
                  >
                    Together.
                  </em>
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.86,
                    color: "var(--muted)",
                    marginBottom: 36,
                    fontWeight: 300,
                    maxWidth: 310,
                  }}
                >
                  Looking for my{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                    first full-time role
                  </strong>{" "}
                  or freelance projects. I'd love to hear about it.
                </p>
                {lp
                  ? [1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            ...shimmer,
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            ...shimmer,
                            height: 13,
                            width: "55%",
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    ))
                  : [
                      {
                        icon: "📧",
                        text: profile?.email || "bhavinrghoghari@gmail.com",
                        href: `mailto:${profile?.email || "bhavinrghoghari@gmail.com"}`,
                      },
                      {
                        icon: "💼",
                        text: "LinkedIn",
                        href: profile?.linkedin || "#",
                      },
                      {
                        icon: "🐙",
                        text: "GitHub",
                        href: profile?.github || "#",
                      },
                      {
                        icon: "📍",
                        text: profile?.location || "Surat, Gujarat · Remote OK",
                        href: "#",
                      },
                    ].map(({ icon, text, href }, i) => (
                      <motion.a
                        key={icon}
                        href={href}
                        data-hover
                        initial={{ opacity: 0, x: -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.09 }}
                        whileHover={{ x: 7, color: "var(--accent)" }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          marginBottom: 14,
                          textDecoration: "none",
                          color: "var(--muted)",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            flexShrink: 0,
                          }}
                        >
                          {icon}
                        </div>
                        <div>
                          <div
                            style={{
                              ...mono,
                              fontSize: 9,
                              letterSpacing: ".12em",
                              textTransform: "uppercase",
                              color: "var(--muted)",
                              opacity: 0.5,
                              marginBottom: 2,
                            }}
                          >
                            {["Email", "LinkedIn", "GitHub", "Location"][i]}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: 210,
                            }}
                          >
                            {text}
                          </div>
                        </div>
                      </motion.a>
                    ))}
              </div>

              {/* Right: form */}
              <form className="contact-form" onSubmit={handleContact}>
                {[
                  {
                    label: "Name",
                    key: "name",
                    type: "text",
                    ph: "Rohan Mehta",
                  },
                  {
                    label: "Email",
                    key: "email",
                    type: "email",
                    ph: "rohan@company.com",
                  },
                  {
                    label: "Subject",
                    key: "subject",
                    type: "text",
                    ph: "Job / Project / Collaboration...",
                  },
                ].map(({ label, key, type, ph }) => (
                  <div key={key}>
                    <label
                      style={{
                        ...mono,
                        fontSize: 9,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      value={(form as any)[key]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      placeholder={ph}
                      required={key !== "subject"}
                      style={{
                        width: "100%",
                        background: "rgba(8,14,26,.75)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "12px 16px",
                        color: "var(--text)",
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "var(--font-body, system-ui)",
                        boxSizing: "border-box",
                        backdropFilter: "blur(8px)",
                        transition: "border-color .2s, box-shadow .2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(56,189,248,.07)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      ...mono,
                      fontSize: 9,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      display: "block",
                      marginBottom: 7,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell me about the opportunity..."
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      background: "rgba(8,14,26,.75)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "12px 16px",
                      color: "var(--text)",
                      fontSize: 14,
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "var(--font-body, system-ui)",
                      boxSizing: "border-box",
                      backdropFilter: "blur(8px)",
                      transition: "border-color .2s, box-shadow .2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(56,189,248,.07)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  data-hover
                  whileHover={
                    !sending
                      ? {
                          scale: 1.02,
                          boxShadow: "0 0 28px rgba(56,189,248,.26)",
                        }
                      : {}
                  }
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  style={{
                    padding: "14px",
                    background: "var(--accent)",
                    color: "#000",
                    border: "none",
                    borderRadius: 10,
                    ...mono,
                    fontSize: 11,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    cursor: sending ? "not-allowed" : "pointer",
                    opacity: sending ? 0.7 : 1,
                    transition: "opacity .2s",
                    boxShadow: "0 0 22px rgba(56,189,248,.14)",
                  }}
                >
                  {sending ? "⟳ Sending..." : "Send Message ↗"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </RevealSection>

        {/* ── FOOTER ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            borderTop: "1px solid rgba(22,32,53,.45)",
            padding: "28px clamp(20px,5vw,60px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="footer-inner">
            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--muted)",
                letterSpacing: ".1em",
              }}
            >
              © 2026 {profile?.name || "Bhavin Ghoghari"} · MERN Stack Developer
              · Surat
            </span>
            <motion.a
              href="/admin"
              data-hover
              whileHover={{ color: "var(--accent)" }}
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--muted)",
                textDecoration: "none",
                letterSpacing: ".1em",
              }}
            >
              Admin →
            </motion.a>
          </div>
        </motion.footer>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {modal && <ProjectModal p={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}
