'use client'
import { useState, useEffect, useRef } from 'react'

const SHOPIFY = 'https://natures-creamery.myshopify.com/collections/all'

type Product = {
  id: string
  tag: string
  tagColor: string
  title: string
  subtitle: string
  desc: string
  from: string
  sizes: string[]
  img: string
  imgAlt: string
  accentBg: string
}

const PRODUCTS: Product[] = [
  {
    id: '1', tag: 'Bestseller', tagColor: '#1E3A2F',
    title: 'Classic Mayo', subtitle: "Nature's Creamery Mayonnaise",
    desc: 'Creamy plant-based mayo crafted without eggs, gums, or artificial additives. Rich texture, authentic flavour every time.',
    from: '5.25',
    sizes: ['354ml Squeeze Bottle — $5.25', '500ml Mason Jar — $7.39', '4L Tub — $32.00'],
    img: '/product-bottle.png',
    imgAlt: "Nature's Creamery Classic Mayonnaise squeeze bottle with yellow cap and farmhouse label",
    accentBg: '#1E3A2F',
  },
  {
    id: '2', tag: 'Spicy', tagColor: '#8B1A1A',
    title: 'Chipotle Mayo', subtitle: "Nature's Creamery Chipotle",
    desc: 'Boldly smoky with a chipotle kick. Perfect for sandwiches, tacos, dips, and wraps.',
    from: '5.69',
    sizes: ['354ml Squeeze Bottle — $5.69', '500ml Mason Jar — $8.00', '4L Tub — $32.00'],
    img: '/product-chipotle.png',
    imgAlt: "Nature's Creamery Chipotle Mayo bottle surrounded by red peppers, garlic, and chipotle spices on a dark background",
    accentBg: '#5C1010',
  },
  {
    id: '3', tag: 'Artisan', tagColor: '#2D5A1E',
    title: 'OliVida', subtitle: 'Mediterranean Spread',
    desc: 'Crema della vita. A Mediterranean-inspired spread that transforms every board and sandwich.',
    from: '5.45',
    sizes: ['354ml Squeeze Bottle — $5.45', '500ml Mason Jar — $7.79', '4L Tub — $34.00'],
    img: '/product-olivida.png',
    imgAlt: "Nature's Creamery OliVida Mediterranean Spread bottle with green olives, rosemary, and olive oil on a wooden board",
    accentBg: '#1A3D0A',
  },
  {
    id: '4', tag: 'New', tagColor: '#5C3317',
    title: 'CocoVida', subtitle: 'Chocolate Spread',
    desc: 'Indulgence without compromise. A rich, creamy chocolate spread for those who love flavour and read labels.',
    from: '7.00',
    sizes: ['250ml — $7.00', '500ml — $14.00'],
    img: '/product-cocovida.png',
    imgAlt: "Nature's Creamery CocoVida Chocolate Spread bottle with coconut halves and dark chocolate pieces on a dark surface",
    accentBg: '#2C1400',
  },
]

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, dir = 'up' }: {
  children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right'
}) {
  const { ref, visible } = useReveal()
  const from = dir === 'left' ? 'translateX(-32px)' : dir === 'right' ? 'translateX(32px)' : 'translateY(32px)'
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : from,
      transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

function ProductCard({ p, delay }: { p: Product; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      role="listitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? p.accentBg : '#FAFAF8',
        display: 'flex', flexDirection: 'column',
        border: '1px solid #E0D8C8',
        borderRadius: 6,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(40px)',
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms, background .4s ease`,
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,.18)' : '0 2px 12px rgba(0,0,0,.04)',
      }}
    >
      <div style={{
        height: 260, overflow: 'hidden', position: 'relative',
        background: hovered ? 'rgba(0,0,0,.2)' : '#F0EBE0',
        transition: 'background .4s',
      }}>
        <img
          src={p.img}
          alt={p.imgAlt}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            transition: 'transform .6s cubic-bezier(.16,1,.3,1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: hovered ? 'rgba(255,255,255,.15)' : p.tagColor,
          color: '#fff',
          fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: 100, fontWeight: 500,
          backdropFilter: hovered ? 'blur(8px)' : 'none',
          transition: 'all .4s',
        }}>
          {p.tag}
        </div>
      </div>
      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{
          fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase',
          color: hovered ? 'rgba(255,255,255,.5)' : '#B8933A', marginBottom: 6, transition: 'color .4s',
        }}>{p.subtitle}</p>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 700,
          color: hovered ? '#fff' : '#1E3A2F', lineHeight: 1.1, marginBottom: 10, transition: 'color .4s',
        }}>{p.title}</h3>
        <p style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 400,
          color: hovered ? 'rgba(255,255,255,.72)' : '#4A3728',
          lineHeight: 1.7, flex: 1, marginBottom: 18, transition: 'color .4s',
        }}>{p.desc}</p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 22 }}>
          {p.sizes.map(s => (
            <li key={s} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'DM Mono, monospace', fontSize: 11,
              color: hovered ? 'rgba(255,255,255,.6)' : '#1E3A2F',
              padding: '6px 0',
              borderBottom: `1px solid ${hovered ? 'rgba(255,255,255,.08)' : 'rgba(30,58,47,.07)'}`,
              transition: 'color .4s, border-color .4s',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#B8933A', flexShrink: 0 }} aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: hovered ? 'rgba(255,255,255,.4)' : 'rgba(30,58,47,.4)', marginBottom: 2, transition: 'color .4s' }}>From</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 700, color: hovered ? '#fff' : '#1E3A2F', lineHeight: 1, transition: 'color .4s' }}>
              ${p.from} <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 400 }}>CAD</span>
            </div>
          </div>
          <a href={SHOPIFY} target="_blank" rel="noopener noreferrer"
            aria-label={`Shop ${p.title} on Shopify (opens in new tab)`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700,
              background: hovered ? '#B8933A' : '#1E3A2F',
              color: '#fff', padding: '12px 20px', textDecoration: 'none', borderRadius: 4,
              transition: 'background .25s, transform .2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}>
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  )
}

function StoryCard({ num, title, body }: { num: string; title: string; body: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{ background: '#FAFAF8', padding: '52px 40px', position: 'relative', overflow: 'hidden', borderRadius: 6, border: '1px solid #E0D8C8', transition: 'box-shadow .3s', boxShadow: hov ? '0 12px 40px rgba(30,58,47,.12)' : '0 2px 12px rgba(0,0,0,.03)' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#1E3A2F,#B8933A)', transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s cubic-bezier(.16,1,.3,1)', borderRadius: '0 0 6px 6px' }} />
      <div aria-hidden="true" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 96, fontWeight: 700, color: 'rgba(30,58,47,.06)', lineHeight: 1, marginBottom: 20 }}>{num}</div>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: '#1E3A2F', marginBottom: 14, lineHeight: 1.15 }}>{title}</h3>
      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 400, lineHeight: 1.8, color: '#3D2E1A' }}>{body}</p>
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!form.name.trim()) { setErr('Please enter your name.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErr('Please enter a valid email address.'); return }
    if (!form.message.trim()) { setErr('Please enter a message.'); return }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:hello@naturescreamery.com?subject=${encodeURIComponent(form.subject || 'Website Enquiry')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const NAV = [['#products', 'Products'], ['#about', 'About'], ['#story', 'Our Story'], ['#contact', 'Contact']]

  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background: #F5F0E8; color: #1E3A2F; font-family: Outfit, system-ui, sans-serif; overflow-x: hidden; line-height: 1.6; }
        :focus-visible { outline: 3px solid #B8933A; outline-offset: 3px; border-radius: 3px; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F5F0E8; }
        ::-webkit-scrollbar-thumb { background: #1E3A2F; border-radius: 3px; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        @media (max-width: 1100px) { .four-col { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .hero-badges { justify-content: center !important; }
          .hero-btns { justify-content: center !important; }
          .hero-center { text-align: center; }
        }
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .sp { padding: 80px 24px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) { .four-col { grid-template-columns: 1fr !important; } }
      `}</style>

      <a href="#content" onFocus={e => { e.currentTarget.style.top = '16px' }} onBlur={e => { e.currentTarget.style.top = '-100%' }}
        style={{ position: 'absolute', top: '-100%', left: 16, zIndex: 9999, background: '#1E3A2F', color: '#fff', padding: '12px 24px', fontFamily: 'DM Mono, monospace', fontSize: 13, textDecoration: 'none', transition: 'top .2s', borderRadius: 4 }}>
        Skip to main content
      </a>

      <header role="banner">
        <nav role="navigation" aria-label="Main navigation" style={{
          position: 'fixed', inset: '0 0 auto', zIndex: 900,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', height: 70,
          background: scrolled ? 'rgba(245,240,232,.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(30,58,47,.1)' : 'none',
          transition: 'background .4s, box-shadow .4s',
        }}>
          <a href="#hero" aria-label="Nature's Creamery home" style={{ display: 'flex', flexDirection: 'column', gap: 1, textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: '#1E3A2F', lineHeight: 1.1 }}>Nature&apos;s Creamery</span>
            <span aria-hidden="true" style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#B8933A' }}>Creamy Without Compromise</span>
          </a>
          <ul className="nav-links" role="list" style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none', padding: 0 }}>
            {NAV.map(([h, l]) => (
              <li key={h}>
                <a href={h} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: '#1E3A2F', textDecoration: 'none', opacity: .8, transition: 'opacity .2s, color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#B8933A' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '.8'; e.currentTarget.style.color = '#1E3A2F' }}>{l}</a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Shop now on Shopify (opens in new tab)"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 700, background: '#1E3A2F', color: '#fff', padding: '10px 24px', textDecoration: 'none', borderRadius: 4, transition: 'background .25s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.transform = 'none' }}>
              Shop Now
            </a>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#1E3A2F', borderRadius: 1, transition: 'all .3s',
                  transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"
            style={{ position: 'fixed', inset: '70px 0 0', zIndex: 800, background: '#F5F0E8', display: 'flex', flexDirection: 'column', padding: '48px 32px', gap: 8 }}>
            {NAV.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 700, color: '#1E3A2F', borderBottom: '1px solid rgba(30,58,47,.12)', paddingBottom: 20, textDecoration: 'none', lineHeight: 1.3 }}>{l}</a>
            ))}
            <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              style={{ marginTop: 16, alignSelf: 'flex-start', fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 700, background: '#1E3A2F', color: '#fff', padding: '14px 28px', textDecoration: 'none', borderRadius: 4 }}>
              Shop Now →
            </a>
          </div>
        )}
      </header>

      <div id="content">

        <section id="hero" aria-label="Introduction" style={{ minHeight: '100svh', background: 'linear-gradient(150deg,#F5F0E8 0%,#EAE2D0 50%,#DDD4BB 100%)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 800, height: 800, top: -300, right: -200, borderRadius: '50%', border: '1px solid rgba(30,58,47,.06)' }} />
            <div style={{ position: 'absolute', width: 600, height: 600, top: -150, right: -50, borderRadius: '50%', border: '1px solid rgba(184,147,58,.08)' }} />
            <div style={{ position: 'absolute', bottom: -200, left: -300, width: 700, height: 700, borderRadius: '50%', background: 'rgba(30,58,47,.04)' }} />
          </div>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '100svh', padding: '100px 64px 80px', maxWidth: 1440, margin: '0 auto', gap: 60, position: 'relative', zIndex: 1 }}>
            <div className="hero-center">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '8px 16px', background: 'rgba(30,58,47,.08)', borderRadius: 100, opacity: 0, animation: 'fadeUp .6s .1s cubic-bezier(.16,1,.3,1) forwards' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8933A', display: 'inline-block' }} aria-hidden="true" />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#1E3A2F', fontWeight: 500 }}>Indulgence Without Compromise</span>
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px,6vw,88px)', fontWeight: 700, lineHeight: 1.0, color: '#1E3A2F', marginBottom: 24, opacity: 0, animation: 'fadeUp .7s .2s cubic-bezier(.16,1,.3,1) forwards' }}>
                Real food.<br /><em style={{ color: '#B8933A', fontStyle: 'italic' }}>Real creamy.</em><br />Real good.
              </h1>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: '#3D2E1A', maxWidth: 480, marginBottom: 36, opacity: 0, animation: 'fadeUp .7s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                Plant-based spreads crafted in Milton, Ontario using Burcon&apos;s breakthrough pea and canola protein isolates. No eggs, no gums, no compromise.
              </p>
              <div className="hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48, opacity: 0, animation: 'fadeUp .7s .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Shop all spreads (opens in new tab)"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1E3A2F', color: '#fff', padding: '16px 32px', fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, textDecoration: 'none', borderRadius: 4, transition: 'background .25s, transform .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.transform = 'none' }}>
                  Shop All Spreads
                </a>
                <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid rgba(30,58,47,.3)', color: '#1E3A2F', padding: '16px 32px', fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, textDecoration: 'none', borderRadius: 4, transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1E3A2F'; e.currentTarget.style.background = 'rgba(30,58,47,.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,58,47,.3)'; e.currentTarget.style.background = 'transparent' }}>
                  Our Story
                </a>
              </div>
              <ul className="hero-badges" aria-label="Brand highlights" role="list" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 0, listStyle: 'none', opacity: 0, animation: 'fadeUp .7s .5s cubic-bezier(.16,1,.3,1) forwards' }}>
                {[['🌱', 'Plant-Based'], ['🇨🇦', 'Made in Canada'], ['✨', 'Clean Label'], ['💪', 'Protein-Rich'], ['🚫', 'No Eggs or Gums']].map(([icon, text]) => (
                  <li key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(30,58,47,.08)', padding: '7px 14px', borderRadius: 100 }}>
                    <span aria-hidden="true" style={{ fontSize: 14 }}>{icon}</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: '#1E3A2F' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-right" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', opacity: 0, animation: 'fadeIn 1s .3s forwards' }}>
              <div style={{ position: 'relative', animation: 'floatY 6s ease-in-out infinite' }}>
                <img src="/product-both" alt="" role="presentation" style={{ maxHeight: 580, objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(30,58,47,.2))' }} />
                <div style={{ position: 'absolute', bottom: 20, left: -32, background: '#1E3A2F', color: '#fff', padding: '18px 24px', borderRadius: 6, boxShadow: '0 16px 48px rgba(30,58,47,.3)' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.2em', color: 'rgba(255,255,255,.5)', marginBottom: 4, textTransform: 'uppercase' }}>Starting from</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 700, lineHeight: 1 }}>$5.25</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.15em', color: '#B8933A', marginTop: 4, textTransform: 'uppercase' }}>CAD</div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: .4 }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#1E3A2F' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,#1E3A2F,transparent)' }} />
          </div>
        </section>

        <div aria-hidden="true" style={{ background: '#1E3A2F', overflow: 'hidden', padding: '16px 0' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 30s linear infinite' }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', flexShrink: 0 }}>
                {['Plant-Based', 'Clean Label', 'Milton Ontario', 'Burcon Protein', 'No Eggs', 'No Gums', 'No Additives', 'Creamy Without Compromise'].map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '0 32px', fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' }}>
                    {t} <span style={{ color: '#B8933A', fontSize: 5 }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section aria-label="Key brand statistics" style={{ background: '#FAFAF8', borderBottom: '1px solid #E0D8C8' }}>
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: 1280, margin: '0 auto' }}>
            {[
              { val: '100%', label: 'Plant-Based', sub: 'No animal products' },
              { val: '0', label: 'Artificial Additives', sub: 'Clean label guaranteed' },
              { val: '4', label: 'Signature Spreads', sub: 'Something for everyone' },
              { val: 'Milton', label: 'Ontario, Canada', sub: 'Proudly made locally' },
            ].map(({ val, label, sub }, i) => (
              <Reveal key={label} delay={i * 70}>
                <div style={{ padding: '52px 40px', borderRight: i < 3 ? '1px solid #E0D8C8' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: i === 3 ? 40 : 56, fontWeight: 700, color: '#1E3A2F', lineHeight: 1, marginBottom: 6 }}>{val}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, color: '#1E3A2F', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'rgba(30,58,47,.5)' }}>{sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" aria-label="Our product collection" className="sp" style={{ padding: '120px 48px', background: '#F5F0E8' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Reveal>
              <div style={{ marginBottom: 64 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '7px 16px', background: 'rgba(30,58,47,.08)', borderRadius: 100 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8933A', display: 'inline-block' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#1E3A2F', fontWeight: 500 }}>Our Collection</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px,4.5vw,64px)', fontWeight: 700, color: '#1E3A2F', lineHeight: 1.05, marginBottom: 16 }}>
                  Four spreads.<br /><em style={{ color: '#B8933A', fontStyle: 'italic' }}>Endless possibilities.</em>
                </h2>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 400, color: '#3D2E1A', maxWidth: 520, lineHeight: 1.7 }}>
                  Every product is made with Burcon&apos;s innovative protein isolates — the same creamy indulgence you love, with ingredients you can actually pronounce.
                </p>
              </div>
            </Reveal>
            <div className="four-col" role="list" aria-label="Products" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
              {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} delay={i * 100} />)}
            </div>
            <Reveal delay={200}>
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="View all products (opens in new tab)"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #1E3A2F', color: '#1E3A2F', padding: '14px 36px', fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, textDecoration: 'none', borderRadius: 4, transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E3A2F' }}>
                  View All Products →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" aria-label="About Nature's Creamery" className="sp" style={{ background: '#1E3A2F', padding: '120px 48px' }}>
          <div className="two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <Reveal dir="left">
              <div style={{ position: 'relative' }}>
                <div style={{ padding: 3, background: 'linear-gradient(135deg,#B8933A 0%,rgba(184,147,58,.15) 100%)', borderRadius: 8 }}>
                  <img src="/hero-illustration.png" alt="Illustrated farmhouse with sunflowers, pea pods, and botanical vines — the Nature's Creamery brand illustration" style={{ width: '100%', display: 'block', borderRadius: 6, opacity: .92 }} />
                </div>
                <div aria-hidden="true" style={{ position: 'absolute', bottom: -24, right: -24, width: 80, height: 80, border: '2px solid rgba(184,147,58,.3)', borderRadius: 6 }} />
              </div>
            </Reveal>
            <Reveal dir="right" delay={150}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '7px 16px', background: 'rgba(255,255,255,.08)', borderRadius: 100 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8933A', display: 'inline-block' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#B8933A', fontWeight: 500 }}>Our Philosophy</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,3.5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 28 }}>
                  Where <em style={{ fontStyle: 'italic', color: '#D4AD59' }}>flavour</em><br />meets integrity
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,.75)', marginBottom: 40 }}>
                  <p>At Nature&apos;s Creamery, we believe treats should feel good during and after the last spoonful. Our recipes are crafted using plant-based ingredients, clean-label formulations, and protein-powered blends from Burcon NutraScience.</p>
                  <p>Think slow mornings, shared boards, and late-night snacks — all elevated with rich, creamy textures and nutrition you can feel good about.</p>
                </div>
                <div role="list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[['🌱', 'Plant-Based', 'Never compromise on texture'], ['💪', 'Protein-Enhanced', 'Innovative Burcon blends'], ['🍞', 'Versatile', 'Toast, boards, baking'], ['📋', 'Clean Label', 'No gums or additives']].map(([icon, label, sub]) => (
                    <div key={label} role="listitem" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', padding: '18px 20px', borderRadius: 6 }}>
                      <div aria-hidden="true" style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700, color: '#D4AD59', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'rgba(255,255,255,.45)' }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="story" aria-label="Our process" className="sp" style={{ padding: '120px 48px', background: '#EDE5D0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Reveal>
              <div style={{ marginBottom: 72 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '7px 16px', background: 'rgba(30,58,47,.1)', borderRadius: 100 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8933A', display: 'inline-block' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#1E3A2F', fontWeight: 500 }}>The Science of Creamy</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px,4.5vw,64px)', fontWeight: 700, color: '#1E3A2F', lineHeight: 1.05, marginBottom: 16 }}>
                  Powered by <em style={{ color: '#B8933A', fontStyle: 'italic' }}>Burcon</em>
                </h2>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 400, color: '#3D2E1A', maxWidth: 560, lineHeight: 1.7 }}>
                  Burcon NutraScience&apos;s Peazazz C and Puratein C protein isolates give our spreads their legendary creaminess without a single egg or gum.
                </p>
              </div>
            </Reveal>
            <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {[
                ['01', 'Source', "We start with Burcon's pure pea and canola protein isolates — the cleanest plant-based emulsifiers available, harvested responsibly in Canada."],
                ['02', 'Craft', "Our team blends each spread to achieve the exact texture and richness of traditional mayo — without any artificial shortcuts, preservatives, or added sugars."],
                ['03', 'Deliver', "Bottled fresh in Milton, Ontario. Whether 354ml or 4L, every jar is made with the same care, precision, and pride."],
              ].map(([num, title, body], i) => (
                <Reveal key={num} delay={i * 120}>
                  <StoryCard num={num} title={title} body={body} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Product spotlight" className="sp" style={{ padding: '120px 48px', background: '#FAFAF8', overflow: 'hidden' }}>
          <div className="two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
            <Reveal>
              <img src="/product-label.png" alt="Nature's Creamery Mayonnaise label featuring farmhouse botanical illustration with sunflowers and Creamy Without Compromise tagline" style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(30,58,47,.12))', animation: 'floatY 7s ease-in-out 1s infinite', borderRadius: 4 }} />
            </Reveal>
            <Reveal dir="right" delay={150}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '7px 16px', background: 'rgba(30,58,47,.08)', borderRadius: 100 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8933A', display: 'inline-block' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#1E3A2F', fontWeight: 500 }}>Signature Product</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,3.5vw,56px)', fontWeight: 700, color: '#1E3A2F', lineHeight: 1.1, marginBottom: 28 }}>
                  The original.<br /><em style={{ fontStyle: 'italic', color: '#B8933A' }}>Perfectly creamy.</em>
                </h2>
                <ul role="list" aria-label="Product highlights" style={{ display: 'flex', flexDirection: 'column', marginBottom: 40, padding: 0, listStyle: 'none' }}>
                  {['No eggs, no gums, no artificial additives — just honest ingredients', "Rich, creamy texture powered by Burcon's Peazazz C and Puratein C", 'Allergen-friendly, preservative-free, and fully plant-based', 'Available in 354ml squeeze bottle, 500ml mason jar, and 4L tub'].map(t => (
                    <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 0', borderBottom: '1px solid #E0D8C8' }}>
                      <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: '#B8933A', flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500, color: '#1E3A2F', lineHeight: 1.6 }}>{t}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Order Classic Mayo (opens in new tab)"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#B8933A', color: '#fff', padding: '16px 32px', fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, textDecoration: 'none', borderRadius: 4, transition: 'background .25s, transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.transform = 'none' }}>
                    Order Now →
                  </a>
                  <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid rgba(30,58,47,.25)', color: '#1E3A2F', padding: '16px 32px', fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, textDecoration: 'none', borderRadius: 4, transition: 'all .25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1E3A2F'; e.currentTarget.style.background = 'rgba(30,58,47,.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,58,47,.25)'; e.currentTarget.style.background = 'transparent' }}>
                    All Products
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" aria-label="Contact Nature's Creamery" className="sp" style={{ background: '#141414', padding: '120px 48px' }}>
          <div className="two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            <Reveal dir="left">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '7px 16px', background: 'rgba(255,255,255,.07)', borderRadius: 100 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8933A', display: 'inline-block' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#B8933A', fontWeight: 500 }}>Get in Touch</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,3.5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
                  Let&apos;s talk <em style={{ fontStyle: 'italic', color: '#D4AD59' }}>spreads.</em>
                </h2>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,.6)', marginBottom: 52 }}>
                  Retailers, chefs, food service, or just a passionate mayo lover — we&apos;d love to hear from you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {[
                    { icon: '📍', label: 'Location', val: '201 Main St E, Milton, ON, Canada', href: undefined },
                    { icon: '🌐', label: 'Main Website', val: 'naturescreamery.com', href: 'https://naturescreamery.com' },
                    { icon: '🛒', label: 'Shop Online', val: 'natures-creamery.myshopify.com', href: SHOPIFY },
                  ].map(({ icon, label, val, href }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.06)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }} aria-hidden="true">{icon}</div>
                      <div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8933A', marginBottom: 4, fontWeight: 500 }}>{label}</div>
                        {href ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,.75)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,.2)', textUnderlineOffset: 3 }}>{val}</a>
                        ) : (
                          <address style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,.75)', fontStyle: 'normal' }}>{val}</address>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={150}>
              {sent ? (
                <div role="alert" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                  <div aria-hidden="true" style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Message sent!</h3>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: 'rgba(255,255,255,.5)' }}>We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate aria-label="Contact form">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', ph: 'Jane Smith', auto: 'name', req: true },
                    { id: 'email', label: 'Email Address', type: 'email', ph: 'jane@example.com', auto: 'email', req: true },
                    { id: 'subject', label: 'Subject (optional)', type: 'text', ph: 'Retail inquiry, bulk order…', auto: 'off', req: false },
                  ].map(f => (
                    <div key={f.id} style={{ marginBottom: 20 }}>
                      <label htmlFor={`cf-${f.id}`} style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.8)', marginBottom: 8 }}>
                        {f.label}{f.req && <span aria-label="required" style={{ color: '#B8933A' }}> *</span>}
                      </label>
                      <input id={`cf-${f.id}`} type={f.type} autoComplete={f.auto} placeholder={f.ph} required={f.req}
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                        style={{ width: '100%', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', padding: '14px 16px', fontFamily: 'Outfit, sans-serif', fontSize: 15, outline: 'none', borderRadius: 4, transition: 'border-color .2s, background .2s' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#B8933A'; e.currentTarget.style.background = 'rgba(184,147,58,.08)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.background = 'rgba(255,255,255,.07)' }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="cf-message" style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.8)', marginBottom: 8 }}>
                      Message <span aria-label="required" style={{ color: '#B8933A' }}>*</span>
                    </label>
                    <textarea id="cf-message" required rows={5} placeholder="Tell us what you have in mind..."
                      value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ width: '100%', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', padding: '14px 16px', fontFamily: 'Outfit, sans-serif', fontSize: 15, outline: 'none', resize: 'vertical', minHeight: 130, borderRadius: 4, transition: 'border-color .2s, background .2s' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#B8933A'; e.currentTarget.style.background = 'rgba(184,147,58,.08)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.background = 'rgba(255,255,255,.07)' }} />
                  </div>
                  {err && (
                    <div role="alert" aria-live="assertive" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: '#ff6b6b', marginBottom: 16, padding: '10px 14px', background: 'rgba(255,107,107,.1)', borderRadius: 4, border: '1px solid rgba(255,107,107,.2)' }}>
                      {err}
                    </div>
                  )}
                  <button type="submit" style={{ width: '100%', background: '#B8933A', color: '#fff', padding: '16px', fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', borderRadius: 4, transition: 'background .25s, transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#D4AD59'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.transform = 'none' }}>
                    Send Message →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </div>

      <footer role="contentinfo" style={{ background: '#0A0A0A', padding: '64px 48px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Nature&apos;s Creamery</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#B8933A', marginBottom: 16 }}>Creamy Without Compromise</div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.7 }}>Plant-based spreads crafted with care in Milton, Ontario, Canada.</p>
            </div>
            <nav aria-label="Footer navigation">
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Navigation</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0 }} role="list">
                {NAV.map(([h, l]) => (
                  <li key={h}>
                    <a href={h} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#B8933A' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.55)' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Shop</div>
              <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Shop all products (opens in new tab)"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#B8933A', color: '#fff', padding: '12px 24px', fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none', borderRadius: 4, transition: 'background .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4AD59' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#B8933A' }}>
                Shop All Products →
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 28 }}>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'rgba(255,255,255,.2)' }}>
              {new Date().getFullYear()} Nature&apos;s Creamery. All rights reserved. Milton, Ontario, Canada.
            </p>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,.15)' }}>Built with Next.js + Shopify</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
