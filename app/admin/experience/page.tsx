'use client'
import { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, Switch, Space, Popconfirm, Card, Tag, DatePicker } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/lib/api'

const TYPE_COLORS: Record<string, string> = { internship:'blue', fulltime:'green', parttime:'orange', freelance:'purple', contract:'cyan' }

export default function ExperienceAdmin() {
  const [exps, setExps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [isCurrent, setIsCurrent] = useState(false)
  const [form] = Form.useForm()

  const fetch = async () => {
    setLoading(true)
    try { const r = await getExperiences(); setExps(r.data.experiences) }
    catch { toast.error('Failed to load experience') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const openAdd = () => {
    setEditing(null); setIsCurrent(false); form.resetFields()
    form.setFieldsValue({ type:'internship', remote:false, current:false, order:0 })
    setModalOpen(true)
  }

  const openEdit = (e: any) => {
    setEditing(e); setIsCurrent(e.current)
    form.setFieldsValue({
      ...e,
      startDate: e.startDate ? dayjs(e.startDate) : null,
      endDate:   e.endDate   ? dayjs(e.endDate)   : null,
      highlights: e.highlights?.join('\n'),
    })
    setModalOpen(true)
  }

  const onSave = async () => {
    try {
      const vals = await form.validateFields()
      const data = {
        ...vals,
        startDate:  vals.startDate?.toISOString(),
        endDate:    vals.current ? null : vals.endDate?.toISOString(),
        highlights: vals.highlights ? vals.highlights.split('\n').map((h:string) => h.trim()).filter(Boolean) : [],
      }
      setSaving(true)
      if (editing) { await updateExperience(editing._id, data); toast.success('Experience updated!') }
      else         { await createExperience(data);              toast.success('Experience added!') }
      setModalOpen(false); fetch()
    } catch (err: any) {
      if (err?.response) toast.error(err.response.data.message || 'Save failed')
    } finally { setSaving(false) }
  }

  const onDelete = async (id: string) => {
    try { await deleteExperience(id); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  const fmt = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month:'short', year:'numeric' }) : 'Present'
  const labelStyle = { color:'var(--muted)', fontFamily:'monospace', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase' as const }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:'Georgia, serif', fontSize:24, color:'var(--text)' }}>Experience</h2>
          <p style={{ fontFamily:'monospace', fontSize:12, color:'var(--muted)' }}>{exps.length} entries</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} size="large">Add Experience</Button>
      </div>

      {loading ? <div style={{ color:'var(--muted)', fontFamily:'monospace', fontSize:12 }}>Loading...</div>
        : exps.length === 0 ? <div style={{ textAlign:'center', padding:'60px 0', color:'var(--muted)', fontFamily:'monospace' }}>No experience yet. Add your internship!</div>
        : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {exps.map((exp: any) => (
              <Card key={exp._id} style={{ background: exp.type === 'internship' ? 'rgba(56,189,248,.04)' : 'var(--card)', border: exp.type === 'internship' ? '1px solid rgba(56,189,248,.2)' : '1px solid var(--border)', borderRadius:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                      <Tag color={TYPE_COLORS[exp.type] || 'default'}>{exp.type}</Tag>
                      {exp.remote && <Tag color="cyan">Remote</Tag>}
                      {exp.current && <Tag color="success">Current</Tag>}
                    </div>
                    <div style={{ fontFamily:'Georgia, serif', fontSize:20, color:'var(--text)', marginBottom:3 }}>{exp.role}</div>
                    <div style={{ fontSize:13, color:'var(--muted)', marginBottom:6 }}>{exp.company} · {exp.location}</div>
                    <div style={{ fontFamily:'monospace', fontSize:11, color:'var(--accent)', marginBottom:8 }}>{fmt(exp.startDate)} — {exp.current ? 'Present' : fmt(exp.endDate)}</div>
                    <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>{exp.description}</div>
                    {exp.highlights?.length > 0 && (
                      <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:4 }}>
                        {exp.highlights.map((h: string, i: number) => (
                          <div key={i} style={{ fontSize:12, color:'var(--muted)', display:'flex', gap:6 }}><span style={{ color:'var(--accent3)' }}>✓</span>{h}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Space style={{ flexShrink:0, marginLeft:16 }}>
                    <Button icon={<EditOutlined />} onClick={() => openEdit(exp)} />
                    <Popconfirm title="Delete this experience?" onConfirm={() => onDelete(exp._id)} okButtonProps={{ danger:true }}>
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                </div>
              </Card>
            ))}
          </div>
        )}

      <Modal title={editing ? 'Edit Experience' : 'New Experience'} open={modalOpen}
        onCancel={() => setModalOpen(false)} onOk={onSave} confirmLoading={saving}
        okText={editing ? 'Save Changes' : 'Add'} width={620}>
        <Form form={form} layout="vertical" style={{ marginTop:16 }}>
          <div className="exp-row-2">
            <Form.Item name="role" label={<span style={labelStyle}>Job Title / Role</span>} rules={[{ required:true }]}>
              <Input placeholder="Frontend Developer Intern" />
            </Form.Item>
            <Form.Item name="company" label={<span style={labelStyle}>Company</span>} rules={[{ required:true }]}>
              <Input placeholder="Company Name" />
            </Form.Item>
          </div>
          <div className="exp-row-3">
            <Form.Item name="type" label={<span style={labelStyle}>Type</span>}>
              <Select options={['internship','fulltime','parttime','freelance','contract'].map(v => ({ value:v, label:v.charAt(0).toUpperCase()+v.slice(1) }))} />
            </Form.Item>
            <Form.Item name="location" label={<span style={labelStyle}>Location</span>}>
              <Input placeholder="Surat, Gujarat" />
            </Form.Item>
            <Form.Item name="remote" label={<span style={labelStyle}>Remote</span>} valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>
          <div className="exp-row-3">
            <Form.Item name="startDate" label={<span style={labelStyle}>Start Date</span>} rules={[{ required:true }]}>
              <DatePicker picker="month" style={{ width:'100%' }} />
            </Form.Item>
            <Form.Item name="endDate" label={<span style={labelStyle}>End Date</span>}>
              <DatePicker picker="month" style={{ width:'100%' }} disabled={isCurrent} />
            </Form.Item>
            <Form.Item name="current" label={<span style={labelStyle}>Current Job</span>} valuePropName="checked">
              <Switch onChange={setIsCurrent} checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>
          <style>{`.exp-row-2{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.exp-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 16px}@media(max-width:560px){.exp-row-2,.exp-row-3{grid-template-columns:1fr}}`}</style>
          <Form.Item name="description" label={<span style={labelStyle}>Description</span>}>
            <Input.TextArea rows={3} placeholder="Brief description of your role..." />
          </Form.Item>
          <Form.Item name="highlights" label={<span style={labelStyle}>Highlights (one per line)</span>}>
            <Input.TextArea rows={4} placeholder={"Built reusable React component library\nIntegrated 10+ REST API endpoints\nImproved page load by 30%"} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
