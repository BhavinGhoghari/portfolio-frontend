"use client";
import { useEffect, useState } from "react";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperiences,
  sendMessage,
} from "@/lib/api";
import toast from "react-hot-toast";

//Shimmer base style
const shimmer: React.CSSProperties = {
  background:
    "linear-gradient(90deg, var(--surface) 25%, #1a2744 50%, var(--surface) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.6s infinite",
  borderRadius: 8,
};

// Skeleton components
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
      {/* Status badge */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
      >
        <div
          style={{ ...shimmer, height: 28, width: 220, borderRadius: 100 }}
        />
      </div>
      {/* Name */}
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
      {/* Badges */}
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
      {/* Bio */}
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
      {/* CTAs */}
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
        <div
          key={i}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
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
        <div
          key={i}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 13,
            overflow: "hidden",
          }}
        >
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

//Main Page
export default function PortfolioPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExps] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [navScrolled, setNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Loading states per section
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingExp, setLoadingExp] = useState(true);

  useEffect(() => {
    getProfile()
      .then((r) => setProfile(r.data.profile))
      .catch(() => {})
      .finally(() => setLoadingProfile(false));

    getProjects()
      .then((r) => setProjects(r.data.projects))
      .catch(() => {})
      .finally(() => setLoadingProjects(false));

    getSkills()
      .then((r) => setSkills(r.data.skills))
      .catch(() => {})
      .finally(() => setLoadingSkills(false));

    getExperiences()
      .then((r) => setExps(r.data.experiences))
      .catch(() => {})
      .finally(() => setLoadingExp(false));

    const onScroll = () => setNav(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
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

  const NAV_LINKS = ["about", "projects", "experience", "contact"];

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── Grid Background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(56,189,248,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.025) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 60,
          backdropFilter: "blur(24px)",
          background: navScrolled ? "rgba(6,10,18,.95)" : "transparent",
          borderBottom: navScrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "all .3s",
        }}
      >
        {/* Logo — shimmer while loading */}
        {loadingProfile ? (
          <div style={{ ...shimmer, height: 24, width: 90, borderRadius: 4 }} />
        ) : (
          <a
            href="#"
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 22,
              fontStyle: "italic",
              color: "var(--accent)",
              letterSpacing: 1,
              textDecoration: "none",
            }}
          >
            {profile?.name?.split(" ")[0] || "Portfolio"}
            <span style={{ color: "var(--accent3)" }}>.</span>
          </a>
        )}

        {/* Desktop nav links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 28, alignItems: "center" }}
        >
          {NAV_LINKS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: ".1em",
                color: "var(--muted)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {s}
            </a>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: menuOpen ? "transparent" : "var(--text)",
              transition: "all .3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "var(--text)",
              transition: "all .3s",
              transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "var(--text)",
              transition: "all .3s",
              transform: menuOpen
                ? "rotate(-45deg) translate(5px,-5px)"
                : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          zIndex: 199,
          background: "rgba(12,18,32,.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform .3s cubic-bezier(.4,0,.2,1)",
          padding: menuOpen ? "20px 24px 24px" : "0 24px",
        }}
      >
        {NAV_LINKS.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: ".1em",
              color: "var(--muted)",
              textDecoration: "none",
              textTransform: "uppercase",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
              transition: "color .2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {s}
          </a>
        ))}
        {/* <a
          href="/admin"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block",
            marginTop: 16,
            textAlign: "center",
            padding: "12px",
            border: "1px solid var(--accent)",
            borderRadius: 6,
            color: "var(--accent)",
            fontFamily: "monospace",
            fontSize: 12,
            textDecoration: "none",
            letterSpacing: ".1em",
          }}
        >
          Admin Panel ↗
        </a> */}
      </div>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "100px 24px 60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {loadingProfile ? (
          <SkeletonHero />
        ) : (
          <div style={{ maxWidth: 860, width: "100%", textAlign: "center" }}>
            {/* Status badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "monospace",
                fontSize: 10,
                color: "var(--accent)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                marginBottom: 24,
                padding: "6px 14px",
                border: "1px solid rgba(56,189,248,.3)",
                borderRadius: 100,
                animation: "fadeUp .5s ease both",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: profile?.available ? "var(--accent3)" : "#666",
                  borderRadius: "50%",
                  display: "inline-block",
                  flexShrink: 0,
                  boxShadow: profile?.available
                    ? "0 0 6px var(--accent3)"
                    : "none",
                }}
              />
              {profile?.available ? "Available for work" : "Not available"} ·{" "}
              {profile?.location || "Surat, Gujarat"}
            </div>

            <h1
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "clamp(44px,9vw,118px)",
                lineHeight: 0.92,
                marginBottom: 20,
                animation: "fadeUp .5s .1s ease both",
                animationFillMode: "both",
                wordBreak: "break-word",
              }}
            >
              {profile?.name || "Your Name"}
            </h1>

            {/* Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                marginBottom: 20,
                animation: "fadeUp .5s .18s ease both",
                animationFillMode: "both",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  padding: "5px 12px",
                  borderRadius: 4,
                  color: "var(--accent)",
                  border: "1px solid rgba(56,189,248,.4)",
                  background: "rgba(56,189,248,.06)",
                }}
              >
                MERN Stack Dev
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  padding: "5px 12px",
                  borderRadius: 4,
                  color: "var(--accent3)",
                  border: "1px solid rgba(52,211,153,.4)",
                  background: "rgba(52,211,153,.06)",
                }}
              >
                ✓ Internship Complete
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  padding: "5px 12px",
                  borderRadius: 4,
                  color: "var(--accent2)",
                  border: "1px solid rgba(129,140,248,.35)",
                  background: "rgba(129,140,248,.05)",
                }}
              >
                Open to Work
              </span>
            </div>

            <p
              style={{
                fontSize: "clamp(14px,2.2vw,17px)",
                lineHeight: 1.8,
                color: "var(--muted)",
                maxWidth: 520,
                margin: "0 auto 36px",
                animation: "fadeUp .5s .26s ease both",
                animationFillMode: "both",
              }}
            >
              {profile?.bio ||
                "MERN Stack Developer building fast, accessible web applications."}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: "fadeUp .5s .34s ease both",
                animationFillMode: "both",
              }}
            >
              <a
                href="#projects"
                style={{
                  padding: "12px 24px",
                  background: "var(--accent)",
                  color: "#000",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                See My Work ↓
              </a>
              <a
                href="#contact"
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  color: "var(--text)",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                Let's Talk →
              </a>
            </div>
          </div>
        )}
      </section>

      {/* ── MARQUEE ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "13px 0",
          overflow: "hidden",
          background: "var(--surface)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 44,
            whiteSpace: "nowrap",
            animation: "marquee 22s linear infinite",
          }}
        >
          {[
            "MongoDB",
            "Express.js",
            "React.js",
            "Node.js",
            "JavaScript",
            "Tailwind CSS",
            "Ant Design",
            "Redux Toolkit",
            "REST APIs",
            "Git & GitHub",
            "MongoDB",
            "Express.js",
            "React.js",
            "Node.js",
            "JavaScript",
            "Tailwind CSS",
            "Ant Design",
            "Redux Toolkit",
            "REST APIs",
            "Git & GitHub",
          ].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: ".14em",
                color: "var(--muted)",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              {t}
              <span style={{ color: "var(--accent)", fontSize: 6 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SKILLS ── */}
      <section
        id="about"
        className="section-pad reveal"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all .6s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="section-inner">
          <div className="section-label">
            <span className="section-line" />
            01 — About
          </div>
          <h2 className="section-heading">
            Skills &amp; <span style={{ color: "var(--accent)" }}>Stack.</span>
          </h2>
          {loadingSkills ? (
            <SkeletonSkills />
          ) : (
            <div className="skills-grid">
              {Object.entries(grouped).map(
                ([cat, catSkills]: [string, any]) => (
                  <div
                    key={cat}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginBottom: 16,
                      }}
                    >
                      {cat}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {catSkills.map((sk: any) => (
                        <div key={sk._id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 5,
                            }}
                          >
                            <span
                              style={{ fontSize: 13, color: "var(--text)" }}
                            >
                              {sk.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontSize: 11,
                                color: "var(--accent)",
                              }}
                            >
                              {sk.level}%
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
                            <div
                              style={{
                                height: "100%",
                                width: `${sk.level}%`,
                                background:
                                  "linear-gradient(90deg,var(--accent),var(--accent2))",
                                borderRadius: 2,
                                transition: "width 1.4s ease",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="section-pad reveal"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all .6s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="section-inner">
          <div className="section-label">
            <span className="section-line" />
            02 — Projects
          </div>
          <h2 className="section-heading">
            Things I've <span style={{ color: "var(--accent)" }}>Built.</span>
          </h2>
          {loadingProjects ? (
            <SkeletonProjects />
          ) : projects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--muted)",
                fontFamily: "monospace",
                fontSize: 13,
              }}
            >
              No projects yet — add from the Admin Panel
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((p: any) => (
                <div
                  key={p._id}
                  className="project-card"
                  style={{
                    background: "var(--card)",
                    border: `1px solid ${p.featured ? "rgba(56,189,248,.4)" : "var(--border)"}`,
                    borderRadius: 13,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 170,
                      background:
                        "linear-gradient(135deg,var(--surface),var(--card))",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          fontFamily: "Georgia,serif",
                          fontSize: 52,
                          color: "rgba(255,255,255,.04)",
                          letterSpacing: -2,
                        }}
                      >
                        {p.title}
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        fontFamily: "monospace",
                        fontSize: 10,
                        color:
                          p.status === "live"
                            ? "var(--accent3)"
                            : p.status === "wip"
                              ? "#fbbf24"
                              : "var(--muted)",
                        background: "rgba(6,10,18,.75)",
                        padding: "3px 10px",
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
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "var(--accent)",
                          background: "rgba(56,189,248,.1)",
                          padding: "3px 10px",
                          borderRadius: 100,
                          border: "1px solid rgba(56,189,248,.3)",
                        }}
                      >
                        ★ Featured
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 20 }}>
                    <div
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 20,
                        marginBottom: 7,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.65,
                        color: "var(--muted)",
                        marginBottom: 12,
                      }}
                    >
                      {p.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 5,
                        marginBottom: 12,
                      }}
                    >
                      {p.tags?.map((t: string) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "monospace",
                            fontSize: 10,
                            color: "var(--muted)",
                            padding: "3px 8px",
                            border: "1px solid var(--border)",
                            borderRadius: 3,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: "var(--accent)",
                            textDecoration: "none",
                          }}
                        >
                          Live →
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener"
                          style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: "var(--muted)",
                            textDecoration: "none",
                          }}
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        className="section-pad reveal"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all .6s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="section-inner">
          <div className="section-label">
            <span className="section-line" />
            03 — Experience
          </div>
          <h2 className="section-heading">
            Where I've <span style={{ color: "var(--accent)" }}>Grown.</span>
          </h2>
          {loadingExp ? (
            <SkeletonExperience />
          ) : experiences.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--muted)",
                fontFamily: "monospace",
                fontSize: 13,
              }}
            >
              No experience added yet
            </div>
          ) : (
            <div className="timeline">
              <div className="timeline-line" />
              {experiences.map((exp: any) => (
                <div key={exp._id} className="timeline-item">
                  <div className="timeline-dot" />
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "var(--accent)",
                      letterSpacing: ".1em",
                      marginBottom: 8,
                    }}
                  >
                    {fmtDate(exp.startDate)} —{" "}
                    {exp.current ? "Present" : fmtDate(exp.endDate)} ·{" "}
                    {exp.type.toUpperCase()}
                    {exp.remote ? " · Remote" : ""}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia,serif",
                      fontSize: "clamp(18px,3vw,24px)",
                      marginBottom: 4,
                    }}
                  >
                    {exp.role}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      marginBottom: 10,
                    }}
                  >
                    {exp.company} · {exp.location}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--muted)",
                      marginBottom: 12,
                    }}
                  >
                    {exp.description}
                  </div>
                  {exp.highlights?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {exp.highlights.map((h: string, i: number) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 8,
                            fontSize: 13,
                            color: "var(--muted)",
                          }}
                        >
                          <span
                            style={{ color: "var(--accent3)", flexShrink: 0 }}
                          >
                            ✓
                          </span>
                          {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="section-pad reveal"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all .6s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="section-inner">
          <div className="section-label">
            <span className="section-line" />
            04 — Contact
          </div>
          <div
            className="contact-card"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
            }}
          >
            <div className="contact-info">
              <h2
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: "clamp(28px,4.5vw,52px)",
                  lineHeight: 0.95,
                  marginBottom: 16,
                }}
              >
                Let's Build
                <br />
                Something
                <br />
                <span style={{ color: "var(--accent)" }}>Together.</span>
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--muted)",
                  marginBottom: 28,
                }}
              >
                Looking for my{" "}
                <strong style={{ color: "var(--text)" }}>
                  first full-time role
                </strong>{" "}
                or freelance projects. If you have something, I'd love to hear
                about it.
              </p>
              {loadingProfile
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
                      text: profile?.email || "your@email.com",
                      href: `mailto:${profile?.email}`,
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
                  ].map(({ icon, text, href }) => (
                    <a
                      key={text}
                      href={href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "var(--muted)",
                        textDecoration: "none",
                        marginBottom: 12,
                        transition: "color .2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "var(--accent)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {icon}
                      </div>
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {text}
                      </span>
                    </a>
                  ))}
            </div>

            <form className="contact-form" onSubmit={handleContact}>
              {[
                { label: "Name", key: "name", type: "text", ph: "Rohan Mehta" },
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
                      fontFamily: "monospace",
                      fontSize: 10,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      display: "block",
                      marginBottom: 6,
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
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "11px 14px",
                      color: "var(--text)",
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: 6,
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
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "11px 14px",
                    color: "var(--text)",
                    fontSize: 14,
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "var(--accent)",
                  color: "#000",
                  border: "none",
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  transition: "opacity .2s",
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? "⟳ Sending..." : "Send Message ↗"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="footer-inner">
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            © 2026 {profile?.name || "Portfolio"} · MERN Stack Developer ·
            Surat, Gujarat
          </div>
          <a
            href="/admin"
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--muted)",
              textDecoration: "none",
              display: "block",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            Admin Panel →
          </a>
        </div>
      </footer>

      <style>{`
        /* ── Shimmer keyframe ── */
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Reveal animation */
        .reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }

        /* Keyframes */
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* Section shared styles */
        .section-pad   { padding: 80px 24px; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-label { font-family: monospace; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
        .section-line  { width: 20px; height: 1px; background: var(--accent); display: inline-block; flex-shrink: 0; }
        .section-heading { font-family: Georgia,serif; font-size: clamp(36px,5.5vw,70px); line-height: 1; margin-bottom: 40px; }

        /* Skills grid */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 20px; }

        /* Projects grid */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px,1fr)); gap: 20px; }
        .project-card  { transition: transform .3s, box-shadow .3s; }
        .project-card:hover { transform: translateY(-6px); box-shadow: 0 16px 44px rgba(56,189,248,.08); }

        /* Experience timeline */
        .timeline      { position: relative; padding-left: 28px; }
        .timeline-line { position: absolute; left: 0; top: 8px; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--accent), transparent); }
        .timeline-item { position: relative; margin-bottom: 44px; padding-left: 6px; }
        .timeline-dot  { position: absolute; left: -33px; top: 7px; width: 10px; height: 10px; background: var(--bg); border: 2px solid var(--accent); border-radius: 50%; }

        /* Contact card */
        .contact-card  { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 52px 56px; }
        .contact-form  { display: flex; flex-direction: column; gap: 14px; }

        /* Footer */
        .footer-inner  { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }

        .desktop-nav { display: flex !important; }
        .hamburger   { display: none !important; }

        @media (max-width: 900px) {
          .contact-card { grid-template-columns: 1fr; gap: 36px; padding: 36px 32px; }
        }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .section-pad { padding: 60px 20px; }
          .skills-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
          .contact-card { padding: 28px 20px; gap: 28px; }
          .footer-inner { flex-direction: column; gap: 8px; }
        }
        @media (max-width: 400px) {
          .section-pad { padding: 48px 16px; }
          .contact-card { padding: 22px 16px; }
        }
      `}</style>
    </div>
  );
}
