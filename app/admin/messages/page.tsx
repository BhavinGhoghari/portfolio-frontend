"use client";
import { useEffect, useState } from "react";
import { Table, Button, Badge, Tag, Space, Popconfirm, Modal } from "antd";
import { DeleteOutlined, EyeOutlined, MailOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getMessages, markRead, deleteMessage } from "@/lib/api";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<any>(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await getMessages();
      setMessages(r.data.messages);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const onView = async (msg: any) => {
    setViewing(msg);
    if (!msg.read) {
      try {
        await markRead(msg._id);
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)),
        );
      } catch {}
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      toast.success("Deleted");
      fetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  const cols = [
    {
      title: "",
      dataIndex: "read",
      key: "read",
      width: 20,
      render: (v: boolean) => (!v ? <Badge color="#f87171" /> : null),
    },
    {
      title: "From",
      dataIndex: "name",
      key: "name",
      render: (v: string, r: any) => (
        <div>
          <div style={{ color: "var(--text)", fontWeight: r.read ? 400 : 700 }}>
            {v}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "var(--muted)",
            }}
          >
            {r.email}
          </div>
        </div>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (v: string, r: any) => (
        <span style={{ color: "var(--muted)", fontSize: 13 }}>
          {v || r.message?.slice(0, 50) + "..."}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (v: string) => (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "var(--muted)",
          }}
        >
          {new Date(v).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "read",
      key: "status",
      width: 90,
      render: (v: boolean) => (
        <Tag color={v ? "default" : "error"}>{v ? "Read" : "Unread"}</Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 90,
      render: (_: any, r: any) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onView(r)}
          />
          <Popconfirm
            title="Delete message?"
            onConfirm={() => onDelete(r._id)}
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 24,
              color: "var(--text)",
            }}
          >
            Messages
          </h2>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            {messages.length} total ·{" "}
            <span style={{ color: "#f87171" }}>{unread} unread</span>
          </p>
        </div>
        <Button icon={<MailOutlined />} onClick={fetch}>
          Refresh
        </Button>
      </div>

      <Table
        dataSource={messages}
        columns={cols}
        rowKey="_id"
        loading={loading}
        style={{
          background: "var(--card)",
          borderRadius: 12,
          overflow: "hidden",
        }}
        pagination={{ pageSize: 10 }}
        rowClassName={(r: any) => (r.read ? "" : "unread-row")}
        onRow={(r: any) => ({
          onClick: () => onView(r),
          style: { cursor: "pointer" },
        })}
      />

      <Modal
        open={!!viewing}
        onCancel={() => setViewing(null)}
        footer={[
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              onDelete(viewing._id);
              setViewing(null);
            }}
          >
            Delete
          </Button>,
          <Button key="close" onClick={() => setViewing(null)}>
            Close
          </Button>,
        ]}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 18,
                color: "var(--text)",
              }}
            >
              Message from {viewing?.name}
            </span>
            {!viewing?.read && (
              <Badge
                color="#f87171"
                text={
                  <span
                    style={{
                      color: "#f87171",
                      fontSize: 11,
                      fontFamily: "monospace",
                    }}
                  >
                    New
                  </span>
                }
              />
            )}
          </div>
        }
      >
        {viewing && (
          <div style={{ padding: "8px 0" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "8px 16px",
                marginBottom: 20,
              }}
            >
              {[
                ["From", viewing.name],
                [
                  "Email",
                  <a
                    href={`mailto:${viewing.email}`}
                    style={{ color: "var(--accent)" }}
                  >
                    {viewing.email}
                  </a>,
                ],
                ["Subject", viewing.subject || "—"],
                ["Date", new Date(viewing.createdAt).toLocaleString()],
              ].map(([k, v]: any) => (
                <>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                    }}
                  >
                    {k}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text)" }}>
                    {v}
                  </span>
                </>
              ))}
            </div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "var(--muted)",
                  marginBottom: 10,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                Message
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--text)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {viewing.message}
              </div>
            </div>
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <a
                href={`mailto:${viewing.email}?subject=Re: ${viewing.subject}`}
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Reply via Email →
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
