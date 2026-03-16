'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, Avatar, Dropdown, Drawer } from 'antd'
import {
  DashboardOutlined, ProjectOutlined, ThunderboltOutlined,
  HistoryOutlined, MessageOutlined, UserOutlined,
  LogoutOutlined, EyeOutlined, SettingOutlined, MenuOutlined, CloseOutlined,
} from '@ant-design/icons'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

const NAV = [
  { key:'/admin',            icon:<DashboardOutlined />, label:'Dashboard' },
  { key:'/admin/profile',    icon:<UserOutlined />,      label:'Profile' },
  { key:'/admin/projects',   icon:<ProjectOutlined />,   label:'Projects' },
  { key:'/admin/skills',     icon:<ThunderboltOutlined />,label:'Skills' },
  { key:'/admin/experience', icon:<HistoryOutlined />,   label:'Experience' },
  { key:'/admin/messages',   icon:<MessageOutlined />,   label:'Messages' },
  { key:'/admin/settings',   icon:<SettingOutlined />,   label:'Settings' },
]

const SIDEBAR_W = 220

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { admin, loading, logout } = useAuth()
  const router   = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile]     = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    if (!loading && !admin && pathname !== '/admin/login') router.replace('/admin/login')
  }, [admin, loading, pathname])

  if (pathname === '/admin/login') return <>{children}</>

  if (loading || !admin) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'grid', placeItems:'center' }}>
      <div style={{ fontFamily:'monospace', fontSize:12, color:'var(--muted)' }}>Loading...</div>
    </div>
  )

  const menuItems = NAV.map(n => ({
    key: n.key,
    icon: n.icon,
    label: <Link href={n.key} style={{ textDecoration:'none' }}>{n.label}</Link>,
  }))

  const userMenuItems = {
    items: [
      { key:'view',   icon:<EyeOutlined />,    label:<a href="/" target="_blank">View Portfolio</a> },
      { key:'logout', icon:<LogoutOutlined />, label:'Logout', danger:true, onClick:logout },
    ]
  }

  const SidebarContent = () => (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--surface)', borderRight:'1px solid var(--border)' }}>
      {/* Logo */}
      <div style={{ padding:'22px 20px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'Georgia,serif', fontSize:20, fontStyle:'italic', color:'var(--accent)' }}>
            Admin<span style={{ color:'var(--accent3)' }}>.</span>
          </div>
          <div style={{ fontFamily:'monospace', fontSize:9, color:'var(--muted)', marginTop:2, letterSpacing:'.12em', textTransform:'uppercase' }}>Portfolio CMS</div>
        </div>
        {isMobile && (
          <button onClick={() => setMobileOpen(false)}
            style={{ background:'transparent', border:'none', cursor:'pointer', color:'var(--muted)', padding:4 }}>
            <CloseOutlined style={{ fontSize:18 }} />
          </button>
        )}
      </div>

      {/* Menu */}
      <div style={{ flex:1, overflowY:'auto' }}>
        <Menu
          mode="inline" theme="dark"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ background:'var(--surface)', border:'none', marginTop:8 }}
        />
      </div>

      {/* User info at bottom */}
      <div style={{ padding:'14px 20px', borderTop:'1px solid var(--border)' }}>
        <Dropdown menu={userMenuItems} trigger={['click']} placement="topLeft">
          <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
            <Avatar size={32} style={{ background:'var(--accent)', color:'#000', fontSize:13, fontWeight:700, flexShrink:0 }}>
              {admin.name?.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:12, color:'var(--text)', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{admin.name}</div>
              <div style={{ fontFamily:'monospace', fontSize:9, color:'var(--muted)' }}>Admin ▾</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex' }}>

      {/* ── Desktop sidebar (fixed) ── */}
      {!isMobile && (
        <div style={{ width:SIDEBAR_W, flexShrink:0, position:'fixed', top:0, left:0, bottom:0, zIndex:100 }}>
          <SidebarContent />
        </div>
      )}

      {/* ── Mobile sidebar drawer ── */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          placement="left"
          width={SIDEBAR_W}
          closable={false}
          styles={{ body:{ padding:0, background:'var(--surface)' }, header:{ display:'none' } }}
          style={{ zIndex:300 }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* ── Main content area ── */}
      <div style={{ flex:1, marginLeft: isMobile ? 0 : SIDEBAR_W, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* Top header bar */}
        <header style={{
          height:56, background:'var(--surface)', borderBottom:'1px solid var(--border)',
          padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between',
          position:'sticky', top:0, zIndex:50,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            {/* Mobile hamburger */}
            {isMobile && (
              <button onClick={() => setMobileOpen(true)}
                style={{ background:'transparent', border:'none', cursor:'pointer', color:'var(--text)', padding:4, display:'flex', alignItems:'center' }}>
                <MenuOutlined style={{ fontSize:20 }} />
              </button>
            )}
            <div style={{ fontFamily:'monospace', fontSize:11, color:'var(--muted)', letterSpacing:'.1em', textTransform:'uppercase' }}>
              {NAV.find(n => n.key === pathname)?.label || 'Admin'}
            </div>
          </div>

          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <a href="/" target="_blank"
              style={{ fontFamily:'monospace', fontSize:11, color:'var(--muted)', textDecoration:'none', display:'flex', alignItems:'center', gap:5, padding:'5px 10px', border:'1px solid var(--border)', borderRadius:5 }}>
              <EyeOutlined /> {!isMobile && 'View Site'}
            </a>
            <button onClick={logout}
              style={{ background:'transparent', border:'1px solid var(--border)', borderRadius:5, padding:'5px 12px', color:'var(--muted)', fontFamily:'monospace', fontSize:11, cursor:'pointer' }}>
              {isMobile ? <LogoutOutlined /> : 'Logout'}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding: isMobile ? '20px 16px' : '28px 28px', overflowX:'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
