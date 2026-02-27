'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ── Fallback product data (shown when Shopify isn't connected yet) ──────────
const FALLBACK_PRODUCTS = [
  {
    id: '1',
    title: "Nature's Creamery Mayonnaise",
    handle: 'mayonnaise',
    description: 'Creamy, plant-based mayonnaise crafted without eggs, gums, or artificial additives. Rich texture, authentic flavour.',
    priceRange: { minVariantPrice: { amount: '5.25', currencyCode: 'CAD' }, maxVariantPrice: { amount: '32.00', currencyCode: 'CAD' } },
    tag: 'BESTSELLER',
    emoji: '🫙',
    sizes: ['354ml · $5.25', '500ml · $7.39', '4L · $32.00'],
    checkoutUrl: 'https://natures-creamery.myshopify.com/collections/all',
  },
  {
    id: '2',
    title: 'Chipotle Mayo',
    handle: 'chipotle-mayo',
    description: 'Boldly flavorful with a smoky chipotle kick. Perfect for sandwiches, dips, and any time you crave a little heat.',
    priceRange: { minVariantPrice: { amount: '5.69', currencyCode: 'CAD' }, maxVariantPrice: { amount: '32.00', currencyCode: 'CAD' } },
    tag: 'SPICY',
    emoji: '🌶️',
    sizes: ['354ml · $5.69', '500ml · $8.00', '4L · $32.00'],
    checkoutUrl: 'https://natures-creamery.myshopify.com/collections/all',
  },
  {
    id: '3',
    title: 'OliVida',
    handle: 'olivida',
    description: 'Crema della vita — a Mediterranean-inspired spread that transforms every board, sandwich, and salad into something special.',
    priceRange: { minVariantPrice: { amount: '5.45', currencyCode: 'CAD' }, maxVariantPrice: { amount: '34.00', currencyCode: 'CAD' } },
    tag: 'ARTISAN',
    emoji: '🫒',
    sizes: ['354ml · $5.45', '500ml · $7.79', '4L · $34.00'],
    checkoutUrl: 'https://natures-creamery.myshopify.com/collections/all',
  },
  {
    id: '4',
    title: 'CocoVida',
    handle: 'cocovida',
    description: 'Indulgence without compromise. A rich, creamy chocolate spread made for those who love flavour and read labels.',
    priceRange: { minVariantPrice: { amount: '7.00', currencyCode: 'CAD' }, maxVariantPrice: { amount: '14.00', currencyCode: 'CAD' } },
    tag: 'NEW',
    emoji: '🍫',
    sizes: ['250ml · $7.00', '500ml · $14.00'],
    checkoutUrl: 'https://natures-creamery.myshopify.com/collections/all',
  },
]

// ── Scroll animation hook ────────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#F5F0E8]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-xl font-700 tracking-wide">
            Nature&apos;s Creamery
          </span>
          <span className="text-[#C9A84C] text-xs tracking-[0.25em] font-light" style={{ fontFamily: "'DM Mono', monospace" }}>
            CREAMY WITHOUT COMPROMISE
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[['#products', 'Products'], ['#about', 'About'], ['#story', 'Our Story'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={href} href={href} className="nav-link text-[#2D4A3E] text-sm tracking-wider hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
              {label}
            </a>
          ))}
          <a
            href="https://natures-creamery.myshopify.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2D4A3E] text-[#F5F0E8] px-5 py-2.5 text-sm tracking-widest hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            SHOP NOW
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#2D4A3E] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2D4A3E] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2D4A3E] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F0E8] border-t border-[#2D4A3E]/10 px-6 py-6 flex flex-col gap-4">
          {[['#products', 'Products'], ['#about', 'About'], ['#story', 'Our Story'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-[#2D4A3E] text-sm tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
              {label}
            </a>
          ))}
          <a href="https://natures-creamery.myshopify.com/collections/all" target="_blank" rel="noopener noreferrer" className="bg-[#2D4A3E] text-[#F5F0E8] px-5 py-3 text-sm tracking-widest text-center" style={{ fontFamily: "'DM Mono', monospace" }}>
            SHOP NOW
          </a>
        </div>
      )}
    </nav>
  )
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #F5F0E8 0%, #EBE3D0 50%, #E0D5BE 100%)' }}>
      {/* Decorative botanical circles */}
      <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] rounded-full border border-[#2D4A3E]/10 pointer-events-none" />
      <div className="absolute top-32 right-[5%] w-[380px] h-[380px] rounded-full border border-[#C9A84C]/15 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[600px] h-[600px] rounded-full bg-[#2D4A3E]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>
              INDULGENCE WITHOUT COMPROMISE
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-5xl md:text-7xl font-800 leading-tight mb-6">
            Creamy,<br />
            <em className="italic text-[#C9A84C]">plant-based</em><br />
            perfection.
          </h1>
          <p className="text-[#6B4E35] text-lg leading-relaxed max-w-md mb-10" style={{ fontFamily: "'Lato', sans-serif" }}>
            Crafted in Milton, Ontario with Burcon&apos;s revolutionary pea and canola protein isolates. Real flavour. Clean labels. Nothing hidden.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://natures-creamery.myshopify.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#2D4A3E] text-[#F5F0E8] px-8 py-4 text-sm tracking-widest hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-400 group"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              SHOP SPREADS
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 border border-[#2D4A3E]/30 text-[#2D4A3E] px-8 py-4 text-sm tracking-widest hover:border-[#2D4A3E] transition-all duration-300"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              OUR STORY
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-6">
            {['🌱 Plant-Based', '🇨🇦 Made in Canada', '✨ Clean Label', '💪 Protein-Enhanced'].map(badge => (
              <span key={badge} className="text-[#2D4A3E]/70 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right — product image with floating card */}
        <div className="relative flex justify-center">
          <div className="relative animate-float">
            <Image
              src="/product-both.png"
              alt="Nature's Creamery Mayonnaise — jar and bottle"
              width={600}
              height={500}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          {/* Floating badge */}
          <div className="absolute bottom-8 left-0 bg-[#2D4A3E] text-[#F5F0E8] px-5 py-4 shadow-xl">
            <div className="text-xs tracking-widest mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>FROM</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold">$5.25</div>
            <div className="text-xs text-[#C9A84C] mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>CAD / 354ml</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="h-8 w-px bg-[#2D4A3E]/30" />
        <span className="text-[#2D4A3E]/50 text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>SCROLL</span>
      </div>
    </section>
  )
}

// ── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: '100%', label: 'Plant-Based' },
    { value: '0', label: 'Artificial Additives' },
    { value: '4', label: 'Signature Spreads' },
    { value: 'Milton', label: 'Ontario, Canada' },
  ]
  return (
    <div className="bg-[#2D4A3E] py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#F5F0E8]/10">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center px-4">
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#C9A84C] text-3xl font-bold mb-1">{value}</div>
              <div className="text-[#F5F0E8]/60 text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Products Section ─────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: typeof FALLBACK_PRODUCTS[0]; index: number }) {
  const { ref, visible } = useScrollAnimation()
  const colors = ['#E8F0EC', '#F0E8E8', '#E8EBF0', '#F0ECE0']
  const bgColor = colors[index % colors.length]

  return (
    <div
      ref={ref}
      className="group relative flex flex-col overflow-hidden border border-[#2D4A3E]/8 hover:border-[#C9A84C]/40 transition-all duration-500 hover:shadow-xl"
      style={{
        background: bgColor,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.8s ease ${index * 120}ms`,
      }}
    >
      {/* Tag */}
      <div className="absolute top-4 left-4 z-10 bg-[#2D4A3E] text-[#C9A84C] text-xs px-3 py-1 tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
        {product.tag}
      </div>

      {/* Product visual */}
      <div className="h-52 flex items-center justify-center text-7xl pt-8 pb-4 group-hover:scale-110 transition-transform duration-500">
        {product.emoji}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-xl font-semibold mb-2">{product.title}</h3>
        <p className="text-[#6B4E35]/80 text-sm leading-relaxed flex-1 mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>{product.description}</p>

        {/* Sizes */}
        <div className="space-y-1.5 mb-5">
          {product.sizes.map(size => (
            <div key={size} className="flex items-center gap-2 text-xs text-[#2D4A3E]/70" style={{ fontFamily: "'DM Mono', monospace" }}>
              <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
              {size}
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#6B4E35]/60 tracking-wider mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>FROM</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-2xl font-semibold">
              ${product.priceRange.minVariantPrice.amount} <span className="text-sm font-normal">CAD</span>
            </div>
          </div>
          <a
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2D4A3E] text-[#F5F0E8] px-5 py-2.5 text-xs tracking-widest hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            ADD TO CART →
          </a>
        </div>
      </div>
    </div>
  )
}

function ProductsSection() {
  return (
    <section id="products" className="py-24 px-6" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>OUR COLLECTION</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-4xl md:text-5xl font-bold mb-4">
            Crafted to <em className="italic text-[#C9A84C]">elevate</em>
          </h2>
          <p className="text-[#6B4E35]/80 max-w-xl mx-auto" style={{ fontFamily: "'Lato', sans-serif" }}>
            Every spread in our collection is made with Burcon's innovative protein blends — delivering real creaminess without compromise.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FALLBACK_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={200}>
          <a
            href="https://natures-creamery.myshopify.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-[#2D4A3E] text-[#2D4A3E] px-10 py-4 text-sm tracking-widest hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-400 group"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            VIEW ALL PRODUCTS
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 overflow-hidden" style={{ background: '#2D4A3E' }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <AnimatedSection>
          <div className="relative">
            <Image
              src="/hero-illustration.png"
              alt="Nature's Creamery illustration — farmhouse with botanical elements"
              width={600}
              height={500}
              className="w-full object-contain opacity-90 drop-shadow-2xl"
            />
            {/* Decorative frame */}
            <div className="absolute inset-4 border border-[#C9A84C]/20 pointer-events-none rounded-sm" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>A HOLISTIC WAY TO INDULGE</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#F5F0E8] text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Where <em className="italic text-[#C9A84C]">flavour</em> meets integrity
          </h2>
          <div className="space-y-4 text-[#F5F0E8]/75 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
            <p>At Nature&apos;s Creamery, we believe treats should feel good during and after the last spoonful. Our recipes are intentionally crafted using plant-based ingredients, clean-label formulations, and protein-powered blends from Burcon NutraScience.</p>
            <p>Think slow mornings, shared boards, and late-night snacks — all elevated with rich, creamy textures and thoughtful nutrition.</p>
            <p>Whether you&apos;re plant-curious or fully plant-based, our spreads are made to fit beautifully into a lifestyle that values nourishment, pleasure, and care for the planet.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { icon: '🌱', label: 'Plant-Based & Creamy', sub: 'Never compromise on texture' },
              { icon: '💪', label: 'Protein-Enhanced', sub: 'Innovative Burcon blends' },
              { icon: '🍞', label: 'Incredibly Versatile', sub: 'Toast, boards, baking' },
              { icon: '📋', label: 'Clean Label', sub: 'No gums, no additives' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="bg-[#F5F0E8]/8 border border-[#F5F0E8]/10 p-4 rounded-sm">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-[#C9A84C] text-xs tracking-wide mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</div>
                <div className="text-[#F5F0E8]/50 text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>{sub}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── Story / Burcon section ────────────────────────────────────────────────────
function StorySection() {
  return (
    <section id="story" className="py-24 px-6" style={{ background: '#EBE3D0' }}>
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>THE SCIENCE OF CREAMY</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-4xl md:text-5xl font-bold mb-6">
            Powered by <em className="italic text-[#C9A84C]">Burcon</em>
          </h2>
          <p className="text-[#6B4E35]/80 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
            Our secret? Burcon NutraScience&apos;s <strong>Peazazz® C</strong> and <strong>Puratein® C</strong> — pea and canola protein isolates that give our spreads their legendary creaminess. No eggs. No gums. Just science and nature working together.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: '01', title: 'Source', body: 'We start with Burcon\'s pure pea and canola protein isolates — the cleanest plant-based emulsifiers on the planet.' },
            { num: '02', title: 'Craft', body: 'Our team blends each spread to achieve the exact texture and richness of traditional mayo, without any artificial shortcuts.' },
            { num: '03', title: 'Deliver', body: 'Bottled fresh in Milton, Ontario and ready for your fridge — whether 354ml or 4L, every jar is made with care.' },
          ].map(({ num, title, body }, i) => (
            <AnimatedSection key={num} delay={i * 150}>
              <div className="relative p-8 border border-[#2D4A3E]/12 hover:border-[#C9A84C]/40 transition-all duration-500 bg-[#F5F0E8] group">
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#C9A84C]/30 text-6xl font-bold mb-4 group-hover:text-[#C9A84C]/50 transition-colors">{num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-[#6B4E35]/80 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>{body}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Product Showcase ─────────────────────────────────────────────────────────
function ProductShowcase() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection delay={100}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>SIGNATURE PRODUCT</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#2D4A3E] text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The original.<br />
            <em className="italic text-[#C9A84C]">Perfectly creamy.</em>
          </h2>
          <p className="text-[#6B4E35]/80 leading-relaxed mb-8 text-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
            Nature&apos;s Creamery Mayonnaise is a premium plant-based mayo crafted for chefs, retailers, and conscious consumers who demand taste without compromise. Allergen-friendly, gum-free, preservative-free.
          </p>
          <div className="space-y-3 mb-10">
            {['No eggs, no gums, no artificial additives', 'Rich, creamy texture you have to taste to believe', 'Perfect for sandwiches, dips, dressings & baking', 'Available in 354ml, 500ml, and 4L sizes'].map(point => (
              <div key={point} className="flex items-center gap-3 text-[#2D4A3E]/80" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                </div>
                {point}
              </div>
            ))}
          </div>
          <a
            href="https://natures-creamery.myshopify.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C9A84C] text-[#1C1C1C] px-8 py-4 text-sm tracking-widest font-semibold hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-400 group"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            ORDER NOW
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative animate-float">
            <Image
              src="/product-bottle.png"
              alt="Nature's Creamery Mayonnaise squeeze bottle"
              width={500}
              height={600}
              className="object-contain mx-auto drop-shadow-2xl"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const mailto = `mailto:hello@naturescreamery.com?subject=Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#2D4A3E' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        <AnimatedSection>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>GET IN TOUCH</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#F5F0E8] text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s talk <em className="italic text-[#C9A84C]">spreads.</em>
          </h2>
          <p className="text-[#F5F0E8]/70 leading-relaxed mb-10" style={{ fontFamily: "'Lato', sans-serif" }}>
            Whether you&apos;re a retailer, chef, or a passionate mayo lover — we&apos;d love to hear from you. Visit us in Milton or drop us a line.
          </p>
          <div className="space-y-6">
            {[
              { icon: '📍', label: 'Location', value: '201 Main St E, Milton, ON, Canada' },
              { icon: '🌐', label: 'Website', value: 'naturescreamery.com' },
              { icon: '🛒', label: 'Shop Online', value: 'natures-creamery.myshopify.com' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="text-2xl">{icon}</div>
                <div>
                  <div className="text-[#C9A84C] text-xs tracking-widest mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</div>
                  <div className="text-[#F5F0E8]/80" style={{ fontFamily: "'Lato', sans-serif" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {sent ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#F5F0E8] text-2xl mb-2">Message sent!</h3>
                <p className="text-[#F5F0E8]/60" style={{ fontFamily: "'Lato', sans-serif" }}>We&apos;ll be in touch soon.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: 'name', label: 'YOUR NAME', type: 'text', placeholder: 'Jane Smith' },
                { name: 'email', label: 'EMAIL ADDRESS', type: 'email', placeholder: 'jane@example.com' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-[#C9A84C] text-xs tracking-widest mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={form[field.name as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full bg-[#F5F0E8]/8 border border-[#F5F0E8]/15 text-[#F5F0E8] placeholder-[#F5F0E8]/30 px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-[#C9A84C] text-xs tracking-widest mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>MESSAGE</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what you have in mind..."
                  required
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-[#F5F0E8]/8 border border-[#F5F0E8]/15 text-[#F5F0E8] placeholder-[#F5F0E8]/30 px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C9A84C] text-[#1C1C1C] py-4 text-sm tracking-widest font-semibold hover:bg-[#F5F0E8] transition-colors duration-300"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                SEND MESSAGE →
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#1C1C1C' }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#F5F0E8] text-xl font-semibold">Nature&apos;s Creamery</div>
            <div className="text-[#C9A84C] text-xs tracking-[0.25em] mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>CREAMY WITHOUT COMPROMISE</div>
          </div>
          <div className="flex gap-8">
            {[['#products', 'Products'], ['#about', 'About'], ['#story', 'Story'], ['#contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} className="text-[#F5F0E8]/50 text-xs tracking-widest hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                {label}
              </a>
            ))}
          </div>
          <a
            href="https://natures-creamery.myshopify.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C9A84C] text-[#1C1C1C] px-6 py-2.5 text-xs tracking-widest font-semibold hover:bg-[#F5F0E8] transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            SHOP NOW
          </a>
        </div>
        <div className="border-t border-[#F5F0E8]/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F0E8]/30 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
            © {new Date().getFullYear()} Nature&apos;s Creamery. All rights reserved. | Milton, Ontario, Canada
          </p>
          <p className="text-[#F5F0E8]/20 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
            Made with 🌱 using Next.js & Shopify
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <ProductsSection />
        <AboutSection />
        <StorySection />
        <ProductShowcase />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
