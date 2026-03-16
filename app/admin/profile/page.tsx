"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button, Switch, Card, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "@/lib/api";

export default function ProfileAdmin() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getProfile()
      .then((r) => {
        if (r.data.profile) form.setFieldsValue(r.data.profile);
      })
      .finally(() => setFetching(false));
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await updateProfile(values);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
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
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 24,
            color: "var(--text)",
          }}
        >
          Edit Profile
        </h2>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          This data powers the public portfolio homepage.
        </p>
      </div>

      <Card
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="form-row-2">
            <Form.Item
              name="name"
              label={<span style={labelStyle}>Full Name</span>}
              rules={[{ required: true }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item
              name="tagline"
              label={<span style={labelStyle}>Tagline</span>}
            >
              <Input placeholder="MERN Stack Developer" />
            </Form.Item>
          </div>

          <Form.Item name="bio" label={<span style={labelStyle}>Bio</span>}>
            <Input.TextArea
              rows={4}
              placeholder="Brief bio shown on the portfolio..."
            />
          </Form.Item>

          <div className="form-row-2">
            <Form.Item
              name="location"
              label={<span style={labelStyle}>Location</span>}
            >
              <Input placeholder="Surat, Gujarat, India" />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span style={labelStyle}>Email</span>}
            >
              <Input placeholder="your@email.com" />
            </Form.Item>
          </div>

          <Divider style={{ borderColor: "var(--border)" }} />
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "var(--muted)",
              marginBottom: 16,
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            Social Links
          </div>

          <div className="form-row-2">
            <Form.Item
              name="github"
              label={<span style={labelStyle}>GitHub URL</span>}
            >
              <Input placeholder="https://github.com/yourname" />
            </Form.Item>
            <Form.Item
              name="linkedin"
              label={<span style={labelStyle}>LinkedIn URL</span>}
            >
              <Input placeholder="https://linkedin.com/in/yourname" />
            </Form.Item>
            <Form.Item
              name="twitter"
              label={<span style={labelStyle}>Twitter / X URL</span>}
            >
              <Input placeholder="https://twitter.com/yourname" />
            </Form.Item>
            <Form.Item
              name="resume"
              label={<span style={labelStyle}>Resume URL</span>}
            >
              <Input placeholder="https://drive.google.com/..." />
            </Form.Item>
          </div>

          <style>{`.form-row-2{display:grid;grid-template-columns:1fr 1fr;gap:0 20px}@media(max-width:600px){.form-row-2{grid-template-columns:1fr}}`}</style>

          <Form.Item
            name="avatarUrl"
            label={<span style={labelStyle}>Avatar Image URL</span>}
          >
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item
            name="available"
            label={<span style={labelStyle}>Available for Work</span>}
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
          >
            Save Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
}
