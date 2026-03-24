"use client";
import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Switch, Card, Divider, Spin } from "antd";
import {
  SaveOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { getProfile, updateProfile, uploadImage } from "@/lib/api";

export default function ProfileAdmin() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProfile()
      .then((r) => {
        if (r.data.profile) {
          form.setFieldsValue(r.data.profile);
          if (r.data.profile.avatarUrl) {
            setAvatarPreview(r.data.profile.avatarUrl);
          }
        }
      })
      .finally(() => setFetching(false));
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    // Ensure avatarUrl is included from form state
    const finalValues = {
      ...values,
      avatarUrl: form.getFieldValue("avatarUrl"),
    };
    try {
      await updateProfile(finalValues);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage(formData);
      if (res.data.success) {
        form.setFieldValue("avatarUrl", res.data.url);
        toast.success("Image uploaded!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
      // Revert preview to saved URL if upload fails
      setAvatarPreview(form.getFieldValue("avatarUrl") || null);
    } finally {
      setUploading(false);
    }
  };

  const clearAvatar = () => {
    setAvatarPreview(null);
    form.setFieldValue("avatarUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const labelStyle = {
    color: "var(--muted)",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
  };

  if (fetching) {
    return (
      <div style={{ padding: 100, textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "100%" }}>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 32,
              marginBottom: 32,
            }}
            className="profile-top-section"
          >
            {/* Avatar Section */}
            <div>
              <span
                style={{ ...labelStyle, display: "block", marginBottom: 12 }}
              >
                Avatar Image
              </span>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  border: "2px dotted var(--border)",
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--surface)",
                  transition: "border-color 0.3s",
                }}
                className="upload-box"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarPreview ? (
                  <>
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="avatar-overlay">
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<EyeOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(avatarPreview, "_blank");
                        }}
                      />
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAvatar();
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: 16 }}>
                    <CloudUploadOutlined
                      style={{ fontSize: 24, color: "var(--muted)" }}
                    />
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        marginTop: 8,
                      }}
                    >
                      Click to Upload
                    </div>
                  </div>
                )}
                {uploading && (
                  <div className="uploading-overlay">
                    <LoadingOutlined style={{ color: "#fff" }} spin />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Basic Info Section */}
            <div>
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
                  rows={13}
                  placeholder="Brief bio shown on the portfolio..."
                />
              </Form.Item>
            </div>
          </div>

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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <Form.Item
              name="available"
              label={<span style={labelStyle}>Available for Work</span>}
              valuePropName="checked"
              style={{ marginBottom: 0 }}
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
          </div>
        </Form>
      </Card>

      <style>{`
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 20px;
        }
        .upload-box:hover {
          border-color: var(--accent) !important;
        }
        .avatar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .upload-box:hover .avatar-overlay {
          opacity: 1;
        }
        .uploading-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .profile-top-section {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
