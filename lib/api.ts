import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({ baseURL: API_URL })

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      Cookies.remove('admin_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

// ── Auth ────────────────────────────────────────────
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password })

export const getMe = () => api.get('/auth/me')

export const changePassword = (currentPassword: string, newPassword: string) =>
  api.put('/auth/change-password', { currentPassword, newPassword })

// ── Profile ─────────────────────────────────────────
export const getProfile = () => api.get('/profile')
export const updateProfile = (data: any) => api.put('/profile', data)

// ── Projects ────────────────────────────────────────
export const getProjects = () => api.get('/projects')
export const getProject = (id: string) => api.get(`/projects/${id}`)
export const createProject = (data: any) => api.post('/projects', data)
export const updateProject = (id: string, data: any) => api.put(`/projects/${id}`, data)
export const deleteProject = (id: string) => api.delete(`/projects/${id}`)

// ── Skills ──────────────────────────────────────────
export const getSkills = () => api.get('/skills')
export const createSkill = (data: any) => api.post('/skills', data)
export const updateSkill = (id: string, data: any) => api.put(`/skills/${id}`, data)
export const deleteSkill = (id: string) => api.delete(`/skills/${id}`)

// ── Experience ──────────────────────────────────────
export const getExperiences = () => api.get('/experience')
export const createExperience = (data: any) => api.post('/experience', data)
export const updateExperience = (id: string, data: any) => api.put(`/experience/${id}`, data)
export const deleteExperience = (id: string) => api.delete(`/experience/${id}`)

// ── Messages ────────────────────────────────────────
export const sendMessage  = (data: any) => api.post('/messages', data)
export const getMessages  = () => api.get('/messages')
export const markRead     = (id: string) => api.put(`/messages/${id}/read`)
export const deleteMessage = (id: string) => api.delete(`/messages/${id}`)

// ── Dashboard Stats ──────────────────────────────────
export const getStats = () => api.get('/stats')

export default api
