'use client'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error('App error:', error) }, [error])
  return (
    <html><body style={{ margin: 0, background: '#060a12', display: 'grid', placeItems: 'center', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#f0f4ff' }}>
      <div style={{ textAlign: 'center', padding: 32 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#f87171', marginBottom: 16 }}>Something went wrong</div>
        <p style={{ color: '#4a6080', fontSize: 14, marginBottom: 24, maxWidth: 360 }}>{error.message}</p>
        <button onClick={reset} style={{ padding: '11px 24px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          Try Again
        </button>
      </div>
    </body></html>
  )
}
