/**
 * Shop configuration — the single place that knows about Shopify.
 *
 * HOW TO FINISH SETUP (10 minutes in Shopify admin):
 *   1. Products → open a product → copy the handle from the URL
 *      (e.g. ".../products/classic-mayo" → handle is "classic-mayo").
 *   2. On the same page, open a variant (354ml / 500ml / 4L). The number at
 *      the end of the browser URL is the variantId (e.g. 45678901234567).
 *   3. Paste them below. Each size you fill in turns that card's button into a
 *      real one-click "Add to cart". Sizes without an id fall back to the
 *      product page, and products without a handle fall back to the
 *      collection page — so the site keeps working while you fill this in.
 */

export const SHOPIFY_STORE = 'https://natures-creamery.myshopify.com'
export const SHOPIFY_COLLECTION = `${SHOPIFY_STORE}/collections/all`

export type Size = {
  /** Shown on the selector button, e.g. "354 ml" */
  label: string
  /** Shown beside the price, e.g. "Squeeze bottle" */
  format: string
  /** CAD */
  price: number
  /** Shopify numeric variant id — enables one-click add-to-cart */
  variantId?: string
}

export type Product = {
  id: string
  /** Shopify product handle — enables the product-page fallback */
  handle?: string
  tag: string
  tagColor: string
  title: string
  subtitle: string
  desc: string
  sizes: Size[]
  /** Index into `sizes` selected by default (the one most people buy) */
  defaultSize: number
  img: string
  imgAlt: string
  accentBg: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'classic-mayo',
    handle: undefined, // e.g. 'classic-mayo'
    tag: 'Bestseller',
    tagColor: '#1E3A2F',
    title: 'Classic Mayo',
    subtitle: "Nature's Creamery Mayonnaise",
    desc: 'Creamy plant-based mayo crafted without eggs, gums, or artificial additives. Rich texture, authentic flavour every time.',
    sizes: [
      { label: '354 ml', format: 'Squeeze bottle', price: 5.25, variantId: undefined },
      { label: '500 ml', format: 'Mason jar', price: 7.39, variantId: undefined },
      { label: '4 L', format: 'Tub', price: 32.0, variantId: undefined },
    ],
    defaultSize: 0,
    img: '/product-bottle.png',
    imgAlt: "Nature's Creamery Classic Mayonnaise squeeze bottle with yellow cap and farmhouse label",
    accentBg: '#1E3A2F',
  },
  {
    id: 'chipotle-mayo',
    handle: undefined,
    tag: 'Spicy',
    tagColor: '#8B1A1A',
    title: 'Chipotle Mayo',
    subtitle: "Nature's Creamery Chipotle",
    desc: 'Boldly smoky with a chipotle kick. Perfect for sandwiches, tacos, dips, and wraps.',
    sizes: [
      { label: '354 ml', format: 'Squeeze bottle', price: 5.69, variantId: undefined },
      { label: '500 ml', format: 'Mason jar', price: 8.0, variantId: undefined },
      { label: '4 L', format: 'Tub', price: 32.0, variantId: undefined },
    ],
    defaultSize: 0,
    img: '/product-chipotle.png',
    imgAlt: "Nature's Creamery Chipotle Mayo bottle surrounded by red peppers, garlic, and chipotle spices on a dark background",
    accentBg: '#5C1010',
  },
  {
    id: 'olivida',
    handle: undefined,
    tag: 'Artisan',
    tagColor: '#2D5A1E',
    title: 'OliVida',
    subtitle: 'Mediterranean Spread',
    desc: 'Crema della vita. A Mediterranean-inspired spread that transforms every board and sandwich.',
    sizes: [
      { label: '354 ml', format: 'Squeeze bottle', price: 5.45, variantId: undefined },
      { label: '500 ml', format: 'Mason jar', price: 7.79, variantId: undefined },
      { label: '4 L', format: 'Tub', price: 34.0, variantId: undefined },
    ],
    defaultSize: 0,
    img: '/product-olivida.png',
    imgAlt: "Nature's Creamery OliVida Mediterranean Spread bottle with green olives, rosemary, and olive oil on a wooden board",
    accentBg: '#1A3D0A',
  },
  {
    id: 'cocovida',
    handle: undefined,
    tag: 'New',
    tagColor: '#5C3317',
    title: 'CocoVida',
    subtitle: 'Chocolate Spread',
    desc: 'Indulgence without compromise. A rich, creamy chocolate spread for those who love flavour and read labels.',
    sizes: [
      { label: '250 ml', format: 'Jar', price: 7.0, variantId: undefined },
      { label: '500 ml', format: 'Jar', price: 14.0, variantId: undefined },
    ],
    defaultSize: 0,
    img: '/product-cocovida.png',
    imgAlt: "Nature's Creamery CocoVida Chocolate Spread bottle with coconut halves and dark chocolate pieces on a dark surface",
    accentBg: '#2C1400',
  },
]

export const cad = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' })

export type BuyLink = {
  href: string
  /** true when the link adds the exact variant to the Shopify cart in one click */
  adds: boolean
  /** button text that tells the truth about what the link does */
  label: string
}

/**
 * The best link we can build for "buy this product in this size":
 *   variantId set  → Shopify cart permalink; adds 1 unit and opens the cart.
 *   handle set     → the product page (shopper still has to pick the size).
 *   neither        → the collection page.
 */
export function buyLink(p: Product, sizeIndex: number): BuyLink {
  const size = p.sizes[sizeIndex] ?? p.sizes[p.defaultSize]
  if (size?.variantId) {
    return { href: `${SHOPIFY_STORE}/cart/${size.variantId}:1`, adds: true, label: 'Add to cart' }
  }
  if (p.handle) {
    return { href: `${SHOPIFY_STORE}/products/${p.handle}`, adds: false, label: 'Buy on Shopify' }
  }
  return { href: SHOPIFY_COLLECTION, adds: false, label: 'Buy on Shopify' }
}

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!
