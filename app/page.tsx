'use client'
import { useState, useEffect, useRef } from 'react'

const SHOPIFY = 'https://natures-creamery.myshopify.com/collections/all'

type Product = {
  id: string
  tag: string
  title: string
  desc: string
  from: string
  sizes: string[]
  useImg?: boolean
  emoji?: string
}

const PRODUCTS: Product[] = [
  { id: '1', tag: 'Bestseller', title: "Nature's Creamery Mayonnaise", desc: 'Creamy, plant-based mayo crafted without eggs, gums, or artificial additives. Rich texture, authentic flavour.', from: '5.25', sizes: ['354ml Squeeze Bottle · $5.25', '500ml Mason Jar · $7.39', '4L Tub · $32.00'], useImg: true },
  { id: '2', tag: 'Spicy', title: 'Chipotle Mayo', desc: 'Boldly flavorful with a smoky chipotle kick. Perfect for sandwiches, dips, and wraps.', from: '5.69', sizes: ['354ml Squeeze Bottle · $5.69', '500ml Mason Jar · $8.00', '4L Tub · $32.00'], emoji: '🌶️' },
  { id: '3', tag: 'Artisan', title: 'OliVida', desc: 'Crema della vita. A Mediterranean-inspired spread that transforms every board and sandwich.', from: '5.45', sizes: ['354ml Squeeze Bottle · $5.45', '500ml Mason Jar · $7.79', '4L Tub · $34.00'], emoji: '🫒' },
  { id: '4', tag: 'New', title: 'CocoVida', desc: 'Indulgence without compromise. A rich chocolate spread for those who love flavour and read labels.', from: '7.00', sizes: ['250ml · $7.00', '500ml · $14.00'], emoji: '🍫' },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, dir = 'up' }: {
  children: React.ReactNode
  delay?: number
  dir?: 'up' | 'left' | 'right'
}) {
  const { ref, visible } = useReveal()
  const from = dir === 'left' ? 'translateX(-40px)' : dir === 'right' ? 'translateX(40px)' : 'translateY(40px)'
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : from,
      transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
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
        background: hovered ? '#1E3A2F' : 'white',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(40px)',
        transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms, background .4s`,
      }}
    >
      <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'hidden' }}>
        {p.useImg ? (
          <img
            src="/product-bottle.png"
            alt="Nature's Creamery Mayonnaise squeeze bottle"
            style={{
              height: '100%', objectFit: 'contain',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.12))',
              transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
              transform: hovered ? 'scale(1.06) translateY(-4px)' : 'none',
            }}
          />
        ) : (
          <div aria-hidden="true" style={{
            fontSize: 80, lineHeight: 1,
            transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
            transform: hovered ? 'scale(1.06) translateY(-4px)' : 'none',
          }}>
            {p.emoji}
          </div>
        )}
      </div>
      <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{
          display: 'inline-block', fontFamily: "'DM Mono', monospace", fontSize: 9,
          letterSpacing: '.2em', textTransform: 'uppercase' as const,
          background: hovered ? 'rgba(247,242,232,.12)' : '#EDE5D0',
          color: '#B8933A', padding: '5px 10px', marginBottom: 14, alignSelf: 'flex-start', transition: 'background .4s',
        }}>
          {p.tag}
        </span>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500,
          color: hovered ? '#F7F2E8' : '#1E3A2F', marginBottom: 10, lineHeight: 1.2, transition: 'color .4s',
        }}>
          {p.title}
        </h3>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 300,
          color: hovered ? 'rgba(247,242,232,.7)' : '#5C3D1E',
          lineHeight: 1.65, flex: 1, marginBottom: 18, transition: 'color .4s',
        }}>
          {p.desc}
        </p>
        <ul style={{ listStyle: 'none', marginBottom: 22, padding: 0 }}>
          {p.sizes.map(s => (
            <li key={s} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: "'DM Mono', monospace", fontSize: 11,
              color: hovered ? 'rgba(247,242,232,.55)' : 'rgba(30,58,47,.6)',
              padding: '5px 0',
              borderBottom: `1px solid ${hovered ? 'rgba(247,242,232,.08)' : 'rgba(30,58,47,.06)'}`,
              transition: 'color .4s',
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#B8933A', flexShrink: 0 }} aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div>
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.2em',
              color: hovered ? 'rgba(247,242,232,.4)' : 'rgba(30,58,47,.4)', marginBottom: 2, transition: 'color .4s',
            }}>
              From
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600,
              color: hovered ? '#F7F2E8' : '#1E3A2F', transition: 'color .4s',
            }}>
              ${p.from} <span style={{ fontSize: 13, fontWeight: 400, fontFamily: "'DM Mono', monospace" }}>CAD</span>
            </div>
          </div>
          
            href={SHOPIFY} target="_blank" rel="noopener noreferrer"
            aria-label={`Shop ${p.title} on Shopify (opens in new tab)`}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.12em',
              textTransform: 'uppercase' as const,
              background: hovered ? '#B8933A' : '#1E3A2F',
              color: hovered ? '#141414' : '#F7F2E8',
              padding: '10px 18px', textDecoration: 'none', transition: 'background .3s, color .3s',
            }}
          >
            Shop →
          </a>
        </div>
      </div>
    </div>
  )
}

function StoryStep({ num, title, body }: { num: string; title: string; body: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{ background: '#F7F2E8', padding: '52px 40px', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg,#B8933A,#D4AD59)',
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
      }} />
      <div aria-hidden="true" style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontWeight: 300,
        color: 'rgba(30,58,47,.07)', lineHeight: 1, marginBottom: 16,
      }}>
        {num}
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: '#1E3A2F', marginBottom: 14 }}>
        {title}
      </h3>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: '#5C3D1E' }}>
        {body}
      </p>
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErr('Please enter a valid email.'); return }
    if (!form.message.trim()) { setErr('Please enter a message.'); return }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:hello@naturescreamery.com?subject=${encodeURIComponent(form.subject || 'Website Enquiry')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const NAV_LINKS = [['#products', 'Products'], ['#about', 'About'], ['#story', 'Our Story'], ['#contact', 'Contact']]

  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F7F2E8; color: #1E3A2F; font-family: 'Outfit', system-ui, sans-serif; overflow-x: hidden; }
        :focus-visible { outline: 3px solid #B8933A; outline-offset: 3px; border-radius: 2px; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F7F2E8; }
        ::-webkit-scrollbar-thumb { background: #1E3A2F; border-radius: 3px; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .sp { padding: 72px 24px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 580px) {
          .four-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* SKIP LINK */}
      
        href="#content"
        style={{ position: 'absolute', top: '-100%', left: 16, zIndex: 9999, background: '#1E3A2F', color: '#F7F2E8', padding: '10px 20px', fontFamily: "'DM Mono', monospace", fontSize: 13, textDecoration: 'none', transition: 'top .2s' }}
        onFocus={e => { e.currentTarget.style.top = '16px' }}
        onBlur={e => { e.currentTarget.style.top = '-100%' }}
      >
        Skip to main content
      </a>

      {/* NAV */}
      <header role="banner">
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            position: 'fixed', inset: '0 0 auto', zIndex: 900,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 48px', height: 72,
            background: scrolled ? 'rgba(247,242,232,.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            boxShadow: scrolled ? '0 1px 0 rgba(30,58,47,.08)' : 'none',
            transition: 'background .5s, box-shadow .5s',
          }}
        >
          <a href="#hero" aria-label="Nature's Creamery home" style={{ display: 'flex', flexDirection: 'column', gap: 2, textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#1E3A2F', lineHeight: 1 }}>
              Nature&apos;s Creamery
            </span>
            <span aria-hidden="true" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#B8933A' }}>
              Creamy Without Compromise
            </span>
          </a>

          <ul className="nav-links" role="list" style={{ display: 'flex', alignItems: 'center', gap: 36, listStyle: 'none', padding: 0 }}>
            {NAV_LINKS.map(([h, l]) => (
              <li key={h}>
                <a href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#1E3A2F', opacity: .75, textDecoration: 'none', transition: 'opacity .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '.75' }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            
              href={SHOPIFY} target="_blank" rel="noopener noreferrer"
              aria-label="Shop now (opens in new tab)"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', background: '#1E3A2F', color: '#F7F2E8', padding: '10px 22px', textDecoration: 'none', transition: 'background .25s, color .25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.color = '#141414' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.color = '#F7F2E8' }}
            >
              Shop Now
            </a>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
              style={{ display: 'none', flexDirection: 'column', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 24, height: 2, background: '#1E3A2F', transition: 'all .3s',
                  transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,6px)' : i === 2 ? 'rotate(-45deg) translate(5px,-6px)' : 'none') : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation"
            style={{ position: 'fixed', inset: '72px 0 0', zIndex: 800, background: '#F7F2E8', display: 'flex', flexDirection: 'column', padding: '40px 32px', gap: 24 }}>
            {NAV_LINKS.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: '#1E3A2F', borderBottom: '1px solid #E2D8C0', paddingBottom: 20, textDecoration: 'none' }}>
                {l}
              </a>
            ))}
            <a href={SHOPIFY} target="_blank" rel="noopener noreferrer"
              style={{ alignSelf: 'flex-start', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', background: '#1E3A2F', color: '#F7F2E8', padding: '12px 24px', textDecoration: 'none', marginTop: 8 }}>
              Shop Now →
            </a>
          </div>
        )}
      </header>

      {/* CONTENT */}
      <div id="content">

        {/* HERO */}
        <section id="hero" aria-label="Introduction" style={{ minHeight: '100svh', background: 'linear-gradient(135deg,#F7F2E8 0%,#EDE5D0 60%,#E2D8C0 100%)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', width: 700, height: 700, top: -200, right: -150, borderRadius: '50%', border: '1px solid rgba(30,58,47,.05)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', width: 500, height: 500, top: -100, right: -50, borderRadius: '50%', border: '1px solid rgba(184,147,58,.07)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: -100, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'rgba(30,58,47,.04)', pointerEvents: 'none' }} />
          <div className="hero-grid sp" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 48, padding: '100px 48px 60px', maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, opacity: 0, transform: 'translateY(20px)', animation: 'fadeUp .8s .1s cubic-bezier(.16,1,.3,1) forwards' }}>
                <div style={{ width: 40, height: 1, background: '#B8933A' }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#B8933A' }}>Indulgence Without Compromise</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px,6vw,82px)', fontWeight: 400, lineHeight: 1.05, color: '#1E3A2F', marginBottom: 28, opacity: 0, transform: 'translateY(24px)', animation: 'fadeUp .9s .2s cubic-bezier(.16,1,.3,1) forwards' }}>
                Creamy,<br /><em style={{ fontStyle: 'italic', color: '#B8933A' }}>plant-based</em><br />perfection.
              </h1>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#5C3D1E', maxWidth: 440, marginBottom: 40, opacity: 0, transform: 'translateY(20px)', animation: 'fadeUp .8s .35s cubic-bezier(.16,1,.3,1) forwards' }}>
                Crafted in Milton, Ontario with Burcon&apos;s revolutionary pea and canola protein isolates. Real flavour. Clean labels. Nothing hidden.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 48, opacity: 0, animation: 'fadeUp .8s .45s cubic-bezier(.16,1,.3,1) forwards' }}>
                <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Shop spreads (opens in new tab)"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1E3A2F', color: '#F7F2E8', padding: '14px 28px', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background .25s, color .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.color = '#141414' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.color = '#F7F2E8' }}>
                  Shop Spreads <span aria-hidden="true">→</span>
                </a>
                <a href="#about"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(30,58,47,.25)', color: '#1E3A2F', padding: '14px 28px', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color .25s, background .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1E3A2F'; e.currentTarget.style.background = 'rgba(30,58,47,.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,58,47,.25)'; e.currentTarget.style.background = 'transparent' }}>
                  Our Story
                </a>
              </div>
              <ul aria-label="Brand values" role="list" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: 0, listStyle: 'none', opacity: 0, animation: 'fadeUp .8s .55s cubic-bezier(.16,1,.3,1) forwards' }}>
                {['🌱 Plant-Based', '🇨🇦 Made in Canada', '✨ Clean Label', '💪 Protein-Enhanced'].map(b => (
                  <li key={b} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(30,58,47,.55)' }}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="hero-right" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2, opacity: 0, animation: 'fadeIn 1.1s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
              <div style={{ position: 'relative', animation: 'floatY 6s ease-in-out infinite' }}>
                <img
                  src="/product-both.png"
                  alt="Nature's Creamery Mayonnaise mason jar and squeeze bottle"
                  style={{ maxHeight: 560, objectFit: 'contain', filter: 'drop-shadow(0 40px 60px rgba(30,58,47,.18))' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: -20, background: '#1E3A2F', color: '#F7F2E8', padding: '16px 24px', boxShadow: '0 20px 40px rgba(30,58,47,.25)' }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: 'rgba(247,242,232,.5)', marginBottom: 4 }}>From</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, lineHeight: 1 }}>$5.25</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.2em', color: '#D4AD59', marginTop: 4 }}>CAD</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div aria-hidden="true" style={{ background: '#1E3A2F', overflow: 'hidden', padding: '14px 0' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', flexShrink: 0 }}>
                {['Plant-Based', 'Clean Label', 'Made in Canada', 'Burcon Protein', 'No Eggs', 'No Gums', 'No Additives', 'Creamy Without Compromise'].map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '0 32px', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(247,242,232,.7)' }}>
                    {t} <span style={{ color: '#D4AD59', fontSize: 6 }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <section aria-label="Key statistics">
          <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid #E2D8C0' }}>
            {[['100%', 'Plant-Based'], ['0', 'Artificial Additives'], ['4', 'Signature Spreads'], ['Milton ON', 'Made in Canada']].map(([v, l], i) => (
              <Reveal key={l} delay={i * 80}>
                <div style={{ padding: '52px 32px', borderRight: i < 3 ? '1px solid #E2D8C0' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: i === 3 ? 36 : 52, fontWeight: 400, color: '#1E3A2F', lineHeight: 1, marginBottom: 8 }}>{v}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(30,58,47,.4)' }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" aria-label="Our product collection" className="sp" style={{ padding: '112px 48px', background: '#F7F2E8' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <div aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 1, background: '#B8933A' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#B8933A' }}>Our Collection</span>
                  <div style={{ width: 40, height: 1, background: '#B8933A' }} />
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 400, color: '#1E3A2F', marginBottom: 14 }}>
                  Crafted to <em style={{ fontStyle: 'italic', color: '#B8933A' }}>elevate</em>
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 300, color: '#5C3D1E', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
                  Every spread is made with Burcon&apos;s innovative protein blends — delivering real creaminess, zero compromise.
                </p>
              </div>
            </Reveal>
            <div className="four-col" role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#E2D8C0', border: '1px solid #E2D8C0' }}>
              {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} delay={i * 110} />)}
            </div>
            <Reveal delay={200}>
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="View all products (opens in new tab)"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(30,58,47,.25)', color: '#1E3A2F', padding: '14px 40px', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.color = '#F7F2E8' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E3A2F' }}>
                  View All Products →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" aria-label="About Nature's Creamery" className="sp" style={{ background: '#1E3A2F', padding: '112px 48px' }}>
          <div className="two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <Reveal dir="left">
              <div style={{ position: 'relative' }}>
                <div style={{ padding: 2, background: 'linear-gradient(135deg,#B8933A,transparent 60%)' }}>
                  <img
                    src="/hero-illustration.png"
                    alt="Illustrated farmhouse surrounded by botanical elements including sunflowers and pea pods"
                    style={{ width: '100%', objectFit: 'cover', opacity: .9, display: 'block' }}
                  />
                </div>
                <div aria-hidden="true" style={{ position: 'absolute', bottom: -20, right: -20, width: 96, height: 96, border: '1px solid rgba(184,147,58,.25)', pointerEvents: 'none' }} />
              </div>
            </Reveal>
            <Reveal dir="right" delay={150}>
              <div style={{ color: '#F7F2E8' }}>
                <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 1, background: 'rgba(184,147,58,.6)' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#B8933A' }}>A Holistic Way to Indulge</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,3.5vw,52px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 28 }}>
                  Where <em style={{ fontStyle: 'italic', color: '#D4AD59' }}>flavour</em> meets integrity
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: 'rgba(247,242,232,.72)' }}>
                  <p>At Nature&apos;s Creamery, we believe treats should feel good during and after the last spoonful. Our recipes are intentionally crafted using plant-based ingredients, clean-label formulations, and protein-powered blends from Burcon NutraScience.</p>
                  <p>Think slow mornings, shared boards, and late-night snacks — all elevated with rich, creamy textures and thoughtful nutrition.</p>
                  <p>Whether you&apos;re plant-curious or fully plant-based, our spreads fit beautifully into a lifestyle that values nourishment, pleasure, and care for the planet.</p>
                </div>
                <div role="list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 40, padding: 0 }}>
                  {[['🌱', 'Plant-Based & Creamy', 'Never compromise on texture'], ['💪', 'Protein-Enhanced', 'Innovative Burcon blends'], ['🍞', 'Incredibly Versatile', 'Toast, boards, baking & more'], ['📋', 'Clean Label', 'No gums, no additives']].map(([icon, label, sub]) => (
                    <div key={label} role="listitem" style={{ background: 'rgba(247,242,232,.06)', border: '1px solid rgba(247,242,232,.1)', padding: '16px 18px' }}>
                      <div aria-hidden="true" style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#D4AD59', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(247,242,232,.45)' }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STORY */}
        <section id="story" aria-label="Our process" className="sp" style={{ padding: '112px 48px', background: '#EDE5D0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <div aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 1, background: '#B8933A' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#B8933A' }}>The Science of Creamy</span>
                  <div style={{ width: 40, height: 1, background: '#B8933A' }} />
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 400, color: '#1E3A2F', marginBottom: 14 }}>
                  Powered by <em style={{ fontStyle: 'italic', color: '#B8933A' }}>Burcon</em>
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 300, color: '#5C3D1E', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
                  Burcon NutraScience&apos;s Peazazz® C and Puratein® C — pea and canola protein isolates that give our spreads legendary creaminess without eggs or gums.
                </p>
              </div>
            </Reveal>
            <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: '#E2D8C0' }}>
              {[
                ['01', 'Source', "We start with Burcon's pure pea and canola protein isolates — the cleanest plant-based emulsifiers available, harvested responsibly in Canada."],
                ['02', 'Craft', "Our team blends each spread to achieve the exact texture and richness of traditional mayo — without any artificial shortcuts, preservatives, or added sugars."],
                ['03', 'Deliver', "Bottled fresh in Milton, Ontario and ready for your fridge. Whether 354ml or 4L, every jar is made with the same care and precision."],
              ].map(([num, title, body], i) => (
                <Reveal key={num} delay={i * 150}>
                  <StoryStep num={num} title={title} body={body} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section aria-label="Product spotlight" className="sp" style={{ padding: '112px 48px', background: '#F7F2E8', overflow: 'hidden' }}>
          <div className="two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
            <Reveal>
              <img
                src="/product-label.png"
                alt="Nature's Creamery Mayonnaise label showing the farmhouse botanical illustration"
                style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(30,58,47,.15))', animation: 'floatY 7s ease-in-out 1s infinite' }}
              />
            </Reveal>
            <Reveal dir="right" delay={200}>
              <div>
                <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 1, background: '#B8933A' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#B8933A' }}>Signature Product</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,3.5vw,52px)', fontWeight: 400, lineHeight: 1.1, color: '#1E3A2F', marginBottom: 24 }}>
                  The original.<br /><em style={{ fontStyle: 'italic', color: '#B8933A' }}>Perfectly creamy.</em>
                </h2>
                <ul role="list" aria-label="Product highlights" style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '28px 0 40px', padding: 0, listStyle: 'none' }}>
                  {[
                    'No eggs, no gums, no artificial additives — just clean, honest ingredients',
                    "Rich texture powered by Burcon's Peazazz® C and Puratein® C proteins",
                    'Allergen-friendly, preservative-free, suitable for plant-based lifestyles',
                    'Available in 354ml, 500ml mason jar, and 4L bulk',
                  ].map(t => (
                    <li key={t} role="listitem" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingBottom: 16, borderBottom: '1px solid #E2D8C0' }}>
                      <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: '#B8933A', flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 300, color: '#5C3D1E', lineHeight: 1.6 }}>{t}</span>
                    </li>
                  ))}
                </ul>
                <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Order now (opens in new tab)"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#B8933A', color: '#141414', padding: '14px 28px', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background .25s, color .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E3A2F'; e.currentTarget.style.color = '#F7F2E8' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#B8933A'; e.currentTarget.style.color = '#141414' }}>
                  Order Now →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-label="Contact us" className="sp" style={{ background: '#141414', padding: '112px 48px' }}>
          <div className="two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            <Reveal dir="left">
              <div>
                <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 1, background: 'rgba(184,147,58,.5)' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#D4AD59' }}>Get in Touch</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,3.5vw,52px)', fontWeight: 400, lineHeight: 1.1, color: '#F7F2E8', marginBottom: 20 }}>
                  Let&apos;s talk <em style={{ fontStyle: 'italic', color: '#D4AD59' }}>spreads.</em>
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: 'rgba(247,242,232,.55)', marginBottom: 48 }}>
                  Whether you&apos;re a retailer, chef, or passionate mayo lover — we&apos;d love to hear from you. Visit us in Milton or drop us a line anytime.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {[
                    ['📍', 'Location', '201 Main St E, Milton, ON, Canada'],
                    ['🌐', 'Website', 'naturescreamery.com'],
                    ['🛒', 'Shop Online', 'natures-creamery.myshopify.com'],
                  ].map(([icon, label, val]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4AD59', marginBottom: 4 }}>{label}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(247,242,232,.7)' }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={150}>
              {sent ? (
                <div role="alert" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '60px 0' }}>
                  <div aria-hidden="true" style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: '#F7F2E8', marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(247,242,232,.5)' }}>We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate aria-label="Contact form">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', ph: 'Jane Smith', auto: 'name', req: true },
                    { id: 'email', label: 'Email Address', type: 'email', ph: 'jane@example.com', auto: 'email', req: true },
                    { id: 'subject', label: 'Subject (optional)', type: 'text', ph: 'Retail inquiry, bulk order…', auto: 'off', req: false },
                  ].map(f => (
                    <div key={f.id} style={{ marginBottom: 18 }}>
                      <label htmlFor={`cf-${f.id}`} style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#D4AD59', marginBottom: 8 }}>
                        {f.label}{f.req && <span aria-label="required"> *</span>}
                      </label>
                      <input
                        id={`cf-${f.id}`} type={f.type} autoComplete={f.auto} placeholder={f.ph} required={f.req}
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                        style={{ width: '100%', background: 'rgba(247,242,232,.06)', border: '1px solid rgba(247,242,232,.12)', color: '#F7F2E8', padding: '14px 16px', fontFamily: "'Outfit', sans-serif", fontSize: 14, outline: 'none', transition: 'border-color .25s' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#B8933A' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(247,242,232,.12)' }}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: 18 }}>
                    <label htmlFor="cf-message" style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#D4AD59', marginBottom: 8 }}>
                      Message <span aria-label="required">*</span>
                    </label>
                    <textarea
                      id="cf-message" required rows={5} placeholder="Tell us what you have in mind..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ width: '100%', background: 'rgba(247,242,232,.06)', border: '1px solid rgba(247,242,232,.12)', color: '#F7F2E8', padding: '14px 16px', fontFamily: "'Outfit', sans-serif", fontSize: 14, outline: 'none', resize: 'vertical', minHeight: 120, transition: 'border-color .25s' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#B8933A' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(247,242,232,.12)' }}
                    />
                  </div>
                  {err && (
                    <div role="alert" aria-live="assertive" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#e05c5c', marginBottom: 14 }}>
                      {err}
                    </div>
                  )}
                  <button
                    type="submit"
                    style={{ width: '100%', background: '#B8933A', color: '#141414', padding: 16, fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'background .25s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#D4AD59' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#B8933A' }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer role="contentinfo" style={{ background: '#0D0D0D', padding: '56px 48px 36px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(247,242,232,.07)' }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: '#F7F2E8', marginBottom: 4 }}>Nature&apos;s Creamery</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4AD59' }}>Creamy Without Compromise</div>
            </div>
            <nav aria-label="Footer navigation">
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 32, listStyle: 'none', padding: 0 }} role="list">
                {NAV_LINKS.map(([h, l]) => (
                  <li key={h}>
                    <a href={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(247,242,232,.4)', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#D4AD59' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247,242,232,.4)' }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={SHOPIFY} target="_blank" rel="noopener noreferrer" aria-label="Shop now (opens in new tab)"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', background: '#B8933A', color: '#141414', padding: '10px 22px', textDecoration: 'none', transition: 'background .25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4AD59' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#B8933A' }}>
              Shop Now
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 28 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.1em', color: 'rgba(247,242,232,.2)' }}>
              © {new Date().getFullYear()} Nature&apos;s Creamery. All rights reserved. Milton, Ontario, Canada.
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(247,242,232,.15)' }}>
              Made with 🌱 · Next.js &amp; Shopify
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
