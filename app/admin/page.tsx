"use client";
import { useEffect, useState } from "react";
import { Tag, Empty, Badge } from "antd";
import {
  ProjectOutlined,
  ThunderboltOutlined,
  HistoryOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { getStats, getProjects, getMessages } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function AdminDashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    messages: 0,
    unread: 0,
  });
  const [recentMsgs, setMsgs] = useState<any[]>([]);
  const [recentProj, setProj] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([getStats(), getProjects(), getMessages()])
      .then(([st, p, m]) => {
        setStats(st.data.stats);
        setMsgs(m.data.messages.slice(0, 5));
        setProj(p.data.projects.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  const CARDS = [
    {
      title: "Projects",
      val: stats.projects,
      icon: <ProjectOutlined />,
      href: "/admin/projects",
      color: "#38bdf8",
    },
    {
      title: "Skills",
      val: stats.skills,
      icon: <ThunderboltOutlined />,
      href: "/admin/skills",
      color: "#818cf8",
    },
    {
      title: "Experience",
      val: stats.experiences,
      icon: <HistoryOutlined />,
      href: "/admin/experience",
      color: "#34d399",
    },
    {
      title: "Messages",
      val: stats.messages,
      icon: <MessageOutlined />,
      href: "/admin/messages",
      color: "#f87171",
      badge: stats.unread,
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(20px,3vw,28px)",
            color: "var(--text)",
            marginBottom: 4,
          }}
        >
          Welcome back, {admin?.name} 👋
        </h1>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          Here's your portfolio overview.
        </p>
      </div>

      {/* Stat cards — responsive grid via CSS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {CARDS.map(({ title, val, icon, href, color, badge }) => (
          <Link key={title} href={href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "18px 20px",
                cursor: "pointer",
                transition: "border-color .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = color)}
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "var(--muted)",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia,serif",
                      fontSize: 40,
                      color,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  {badge !== undefined && badge > 0 && (
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "#f87171",
                        marginTop: 4,
                      }}
                    >
                      {badge} unread
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: 10,
                    background: `${color}15`,
                    borderRadius: 9,
                    fontSize: 20,
                    color,
                  }}
                >
                  {icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent sections — stack on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 16,
        }}
      >
        {/* Recent Projects */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--text)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Recent Projects
            </span>
            <Link
              href="/admin/projects"
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
          </div>
          {recentProj.length === 0 ? (
            <Empty
              description={
                <span style={{ color: "var(--muted)", fontSize: 12 }}>
                  No projects yet
                </span>
              }
            />
          ) : (
            recentProj.map((p: any) => (
              <div
                key={p._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "var(--muted)",
                      marginTop: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.tags?.slice(0, 3).join(" · ")}
                  </div>
                </div>
                <Tag
                  color={
                    p.status === "live"
                      ? "success"
                      : p.status === "wip"
                        ? "warning"
                        : "default"
                  }
                  style={{ flexShrink: 0, marginLeft: 8 }}
                >
                  {p.status}
                </Tag>
              </div>
            ))
          )}
        </div>

        {/* Recent Messages */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--text)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Recent Messages
            </span>
            <Link
              href="/admin/messages"
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
          </div>
          {recentMsgs.length === 0 ? (
            <Empty
              description={
                <span style={{ color: "var(--muted)", fontSize: 12 }}>
                  No messages yet
                </span>
              }
            />
          ) : (
            recentMsgs.map((m: any) => (
              <div
                key={m._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--accent2)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {m.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--text)",
                        fontWeight: m.read ? 400 : 700,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.name}
                    </span>
                    {!m.read && <Badge color="#f87171" />}
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "var(--muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.subject || m.message?.slice(0, 40)}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "var(--muted)",
                    flexShrink: 0,
                  }}
                >
                  {new Date(m.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
