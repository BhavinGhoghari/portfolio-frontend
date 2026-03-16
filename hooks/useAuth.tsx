'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { getMe } from '@/lib/api'

interface Admin { id: string; name: string; email: string }
interface AuthCtx {
  admin: Admin | null
  loading: boolean
  logout: () => void
  setAdmin: (a: Admin | null) => void
}

const Ctx = createContext<AuthCtx>({ admin: null, loading: true, logout: () => {}, setAdmin: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('admin_token')
    if (!token) { setLoading(false); return }
    getMe()
      .then(res => setAdmin(res.data.admin))
      .catch(() => Cookies.remove('admin_token'))
      .finally(() => setLoading(false))
  }, [])

  const logout = () => {
    Cookies.remove('admin_token')
    setAdmin(null)
    window.location.href = '/admin/login'
  }

  return <Ctx.Provider value={{ admin, loading, logout, setAdmin }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
