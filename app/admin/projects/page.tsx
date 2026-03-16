"use client";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Space,
  Popconfirm,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await getProjects();
      setProjects(r.data.projects);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ status: "live", featured: false, order: 0 });
    setModalOpen(true);
  };
  const openEdit = (p: any) => {
    setEditing(p);
    form.setFieldsValue({ ...p, tags: p.tags?.join(", ") });
    setModalOpen(true);
  };

  const onSave = async () => {
    try {
      const vals = await form.validateFields();
      const data = {
        ...vals,
        tags: vals.tags
          ? vals.tags
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : [],
      };
      setSaving(true);
      if (editing) {
        await updateProject(editing._id, data);
        toast.success("Project updated!");
      } else {
        await createProject(data);
        toast.success("Project created!");
      }
      setModalOpen(false);
      fetch();
    } catch (err: any) {
      if (err?.response)
        toast.error(err.response.data.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Deleted");
      fetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const cols = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (v: string, r: any) => (
        <div>
          <div style={{ color: "var(--text)", fontWeight: 600 }}>{v}</div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "var(--muted)",
              marginTop: 2,
            }}
          >
            {r.tags?.slice(0, 3).join(" · ")}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (v: string) => (
        <Tag
          color={v === "live" ? "success" : v === "wip" ? "warning" : "default"}
        >
          {v}
        </Tag>
      ),
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      width: 90,
      render: (v: boolean) => (
        <StarOutlined
          style={{ color: v ? "#fbbf24" : "var(--border)", fontSize: 18 }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 110,
      render: (_: any, r: any) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEdit(r)}
          />
          <Popconfirm
            title="Delete this project?"
            onConfirm={() => onDelete(r._id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const labelStyle = {
    color: "var(--muted)",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
  };

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
            Projects
          </h2>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            {projects.length} projects total
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openAdd}
          size="large"
        >
          Add Project
        </Button>
      </div>

      <Table
        dataSource={projects}
        columns={cols}
        rowKey="_id"
        loading={loading}
        style={{
          background: "var(--card)",
          borderRadius: 12,
          overflow: "hidden",
        }}
        pagination={{ pageSize: 8, showSizeChanger: false }}
      />

      <Modal
        title={editing ? "Edit Project" : "New Project"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={onSave}
        confirmLoading={saving}
        okText={editing ? "Save Changes" : "Create Project"}
        width={640}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="title"
            label={<span style={labelStyle}>Title</span>}
            rules={[{ required: true }]}
          >
            <Input placeholder="ShopWise — E-Commerce App" />
          </Form.Item>
          <Form.Item
            name="description"
            label={<span style={labelStyle}>Short Description</span>}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Brief description shown on the card..."
            />
          </Form.Item>
          <Form.Item
            name="longDesc"
            label={<span style={labelStyle}>Long Description (optional)</span>}
          >
            <Input.TextArea rows={3} placeholder="Detailed description..." />
          </Form.Item>
          <div className="form-2col">
            <Form.Item
              name="liveUrl"
              label={<span style={labelStyle}>Live URL</span>}
            >
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item
              name="githubUrl"
              label={<span style={labelStyle}>GitHub URL</span>}
            >
              <Input placeholder="https://github.com/..." />
            </Form.Item>
          </div>
          <Form.Item
            name="imageUrl"
            label={<span style={labelStyle}>Image URL</span>}
          >
            <Input placeholder="https://... (leave blank for gradient)" />
          </Form.Item>
          <Form.Item
            name="tags"
            label={<span style={labelStyle}>Tags (comma-separated)</span>}
          >
            <Input placeholder="React, Node.js, MongoDB, Ant Design" />
          </Form.Item>
          <div className="form-3col">
            <Form.Item
              name="status"
              label={<span style={labelStyle}>Status</span>}
            >
              <Select
                options={[
                  { value: "live", label: "Live" },
                  { value: "wip", label: "WIP" },
                  { value: "archived", label: "Archived" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="order"
              label={<span style={labelStyle}>Display Order</span>}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="featured"
              label={<span style={labelStyle}>Featured</span>}
              valuePropName="checked"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>
          <style>{`.form-2col{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.form-3col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 16px}@media(max-width:560px){.form-2col,.form-3col{grid-template-columns:1fr}}`}</style>
        </Form>
      </Modal>
    </div>
  );
}
