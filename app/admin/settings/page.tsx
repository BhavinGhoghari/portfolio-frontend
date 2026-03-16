"use client";
import { useState } from "react";
import { Form, Input, Button, Card, Divider, Alert } from "antd";
import { LockOutlined, SaveOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { changePassword } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsAdmin() {
  const { admin, logout } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (vals: any) => {
    if (vals.newPassword !== vals.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (vals.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await changePassword(vals.currentPassword, vals.newPassword);
      toast.success("Password changed! Please log in again.");
      form.resetFields();
      setTimeout(() => logout(), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    color: "var(--muted)",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 24,
            color: "var(--text)",
          }}
        >
          Settings
        </h2>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          Manage your admin account.
        </p>
      </div>

      {/* Account Info */}
      <Card
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Account
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "10px 24px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            Name
          </span>
          <span style={{ color: "var(--text)", fontSize: 14 }}>
            {admin?.name}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            Email
          </span>
          <span style={{ color: "var(--text)", fontSize: 14 }}>
            {admin?.email}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            Role
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--accent)",
              background: "rgba(56,189,248,.08)",
              border: "1px solid rgba(56,189,248,.25)",
              padding: "2px 10px",
              borderRadius: 4,
              display: "inline-block",
            }}
          >
            Admin
          </span>
        </div>
      </Card>

      {/* Change Password */}
      <Card
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Change Password
        </div>
        <Alert
          message="After changing your password you will be logged out automatically."
          type="warning"
          showIcon
          style={{
            background: "rgba(251,191,36,.06)",
            border: "1px solid rgba(251,191,36,.25)",
            marginBottom: 20,
            borderRadius: 8,
          }}
        />
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="currentPassword"
            label={<span style={labelStyle}>Current Password</span>}
            rules={[{ required: true }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "var(--muted)" }} />}
              placeholder="Enter current password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label={<span style={labelStyle}>New Password</span>}
            rules={[{ required: true, min: 8, message: "Min 8 characters" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "var(--muted)" }} />}
              placeholder="Min 8 characters"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={<span style={labelStyle}>Confirm New Password</span>}
            rules={[{ required: true }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "var(--muted)" }} />}
              placeholder="Repeat new password"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Change Password
          </Button>
        </Form>
      </Card>

      {/* Danger Zone */}
      <Card
        style={{
          background: "rgba(248,113,113,.04)",
          border: "1px solid rgba(248,113,113,.2)",
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#f87171",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Danger Zone
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
          Logging out will clear your session cookie. You will need to log in
          again to access the admin panel.
        </p>
        <Button danger onClick={logout}>
          Log Out
        </Button>
      </Card>
    </div>
  );
}
