import type { Metadata, Viewport } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/hooks/useAuth'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | MERN Stack Developer',
  description: 'Full-stack MERN developer portfolio — Surat, Gujarat',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#101828', color: '#f0f4ff', border: '1px solid #1e2d45' },
                success: { iconTheme: { primary: '#34d399', secondary: '#000' } },
                error:   { iconTheme: { primary: '#f87171', secondary: '#000' } },
              }}
            />
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
