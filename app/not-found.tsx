import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', display: 'grid', placeItems: 'center',
      fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--text)',
    }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(56,189,248,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.025) 1px, transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(80px,15vw,160px)', lineHeight: 1, color: 'var(--surface)', userSelect: 'none', marginBottom: 8 }}>404</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Page Not Found</div>
        <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32, maxWidth: 340 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/" style={{ padding: '11px 24px', background: 'var(--accent)', color: '#000', fontFamily: 'monospace', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 6, textDecoration: 'none', fontWeight: 700 }}>
            ← Home
          </Link>
          <Link href="/admin" style={{ padding: '11px 24px', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'monospace', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 6, textDecoration: 'none' }}>
            Admin →
          </Link>
        </div>
      </div>
    </div>
  )
}
