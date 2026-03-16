'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { login } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLogin() {
  const router = useRouter()
  const { admin, setAdmin } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (admin) router.replace('/admin')
  }, [admin])

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      const res = await login(values.email, values.password)
      Cookies.set('admin_token', res.data.token, { expires: 7 })
      setAdmin(res.data.admin)
      toast.success(`Welcome back, ${res.data.admin.name}!`)
      router.push('/admin')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'grid', placeItems:'center', padding:24, fontFamily:'Inter, system-ui, sans-serif' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(56,189,248,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.025) 1px, transparent 1px)', backgroundSize:'44px 44px', pointerEvents:'none' }} />
      <div style={{ width:'100%', maxWidth:400, position:'relative', zIndex:2 }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontFamily:'Georgia, serif', fontSize:32, fontStyle:'italic', color:'var(--accent)', marginBottom:8 }}>Admin<span style={{ color:'var(--accent3)' }}>.</span></div>
          <div style={{ fontFamily:'monospace', fontSize:11, color:'var(--muted)', letterSpacing:'.12em', textTransform:'uppercase' }}>Portfolio Management</div>
        </div>

        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:32 }}>
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item name="email" label={<span style={{ color:'var(--muted)', fontFamily:'monospace', fontSize:11, letterSpacing:'.1em', textTransform:'uppercase' }}>Email</span>}
              rules={[{ required: true, type:'email', message: 'Enter a valid email' }]}>
              <Input prefix={<UserOutlined style={{ color:'var(--muted)' }} />} placeholder="admin@portfolio.com" size="large"
                style={{ background:'var(--surface)', borderColor:'var(--border)', color:'var(--text)' }} />
            </Form.Item>
            <Form.Item name="password" label={<span style={{ color:'var(--muted)', fontFamily:'monospace', fontSize:11, letterSpacing:'.1em', textTransform:'uppercase' }}>Password</span>}
              rules={[{ required: true, message: 'Enter your password' }]}>
              <Input.Password prefix={<LockOutlined style={{ color:'var(--muted)' }} />} placeholder="••••••••" size="large"
                style={{ background:'var(--surface)', borderColor:'var(--border)', color:'var(--text)' }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}
              style={{ background:'var(--accent)', borderColor:'var(--accent)', color:'#000', fontFamily:'monospace', fontSize:12, letterSpacing:'.1em', fontWeight:700, height:48, marginTop:8 }}>
              Login to Dashboard →
            </Button>
          </Form>
        </div>

        <div style={{ textAlign:'center', marginTop:20, fontFamily:'monospace', fontSize:11, color:'var(--muted)' }}>
          <a href="/" style={{ color:'var(--muted)', textDecoration:'none' }}>← Back to Portfolio</a>
        </div>
      </div>
    </div>
  )
}
