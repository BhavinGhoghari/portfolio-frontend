'use client'
import { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, Slider, Space, Popconfirm, Card, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api'

const CATS = ['frontend','backend','database','tools','other']
const COLORS: Record<string, string> = { frontend:'#38bdf8', backend:'#34d399', database:'#818cf8', tools:'#fbbf24', other:'#f87171' }

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  const fetch = async () => {
    setLoading(true)
    try { const r = await getSkills(); setSkills(r.data.skills) }
    catch { toast.error('Failed to load skills') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const openAdd = () => { setEditing(null); form.resetFields(); form.setFieldsValue({ level:80, category:'frontend', color:'#38bdf8', order:0 }); setModalOpen(true) }
  const openEdit = (s: any) => { setEditing(s); form.setFieldsValue(s); setModalOpen(true) }

  const onSave = async () => {
    try {
      const vals = await form.validateFields()
      setSaving(true)
      if (editing) { await updateSkill(editing._id, vals); toast.success('Skill updated!') }
      else { await createSkill(vals); toast.success('Skill added!') }
      setModalOpen(false); fetch()
    } catch (err: any) {
      if (err?.response) toast.error(err.response.data.message || 'Save failed')
    } finally { setSaving(false) }
  }

  const onDelete = async (id: string) => {
    try { await deleteSkill(id); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  const grouped = skills.reduce((acc: any, s: any) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  const labelStyle = { color:'var(--muted)', fontFamily:'monospace', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase' as const }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:'Georgia, serif', fontSize:24, color:'var(--text)' }}>Skills</h2>
          <p style={{ fontFamily:'monospace', fontSize:12, color:'var(--muted)' }}>{skills.length} skills across {Object.keys(grouped).length} categories</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} size="large">Add Skill</Button>
      </div>

      {loading ? <div style={{ color:'var(--muted)', fontFamily:'monospace', fontSize:12 }}>Loading...</div>
        : Object.entries(grouped).map(([cat, catSkills]: [string, any]) => (
          <Card key={cat} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, marginBottom:16 }}
            title={<div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:10, height:10, borderRadius:'50%', background: COLORS[cat] || '#666', display:'inline-block' }} />
              <span style={{ fontFamily:'monospace', fontSize:12, color:'var(--text)', textTransform:'uppercase', letterSpacing:'.1em' }}>{cat}</span>
              <Tag>{catSkills.length}</Tag>
            </div>}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:12 }}>
              {catSkills.map((sk: any) => (
                <div key={sk._id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:9, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontSize:13, color:'var(--text)', fontWeight:600 }}>{sk.name}</span>
                      <span style={{ fontFamily:'monospace', fontSize:11, color: COLORS[sk.category] || 'var(--accent)' }}>{sk.level}%</span>
                    </div>
                    <div style={{ height:3, background:'var(--border)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${sk.level}%`, background: COLORS[sk.category] || 'var(--accent)', borderRadius:2 }} />
                    </div>
                  </div>
                  <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(sk)} />
                    <Popconfirm title="Delete?" onConfirm={() => onDelete(sk._id)} okButtonProps={{ danger:true }}>
                      <Button size="small" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                </div>
              ))}
            </div>
          </Card>
        ))}

      <Modal title={editing ? 'Edit Skill' : 'New Skill'} open={modalOpen}
        onCancel={() => setModalOpen(false)} onOk={onSave} confirmLoading={saving}
        okText={editing ? 'Save' : 'Add Skill'}>
        <Form form={form} layout="vertical" style={{ marginTop:16 }}>
          <Form.Item name="name" label={<span style={labelStyle}>Skill Name</span>} rules={[{ required:true }]}>
            <Input placeholder="React.js" />
          </Form.Item>
          <Form.Item name="category" label={<span style={labelStyle}>Category</span>} rules={[{ required:true }]}>
            <Select options={CATS.map(c => ({ value:c, label:c.charAt(0).toUpperCase()+c.slice(1) }))} />
          </Form.Item>
          <Form.Item name="level" label={<span style={labelStyle}>Proficiency Level</span>}>
            <Slider min={0} max={100} marks={{ 0:'0%', 50:'50%', 100:'100%' }} />
          </Form.Item>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
            <Form.Item name="color" label={<span style={labelStyle}>Color</span>}>
              <Input placeholder="#38bdf8" />
            </Form.Item>
            <Form.Item name="order" label={<span style={labelStyle}>Order</span>}>
              <Input type="number" placeholder="0" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
