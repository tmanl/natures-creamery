/**
 * Shop configuration — the single place that knows about Shopify.
 *
 * Every size below carries its Shopify `variantId`, so each button adds that
 * exact item to the Shopify cart in one click (cart permalink). When you add
 * or change a listing in Shopify admin:
 *   Products → open the product → copy the handle from the URL
 *   (…/products/<handle>) and the variant id from the end of the variant URL.
 */

export const SITE_URL = 'https://www.naturescreamery.com'
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
  /** Shopify product handle, when this size lives in its own listing */
  handle?: string
  /** Listing is a pre-order: button says "Pre-order" */
  preorder?: boolean
  /** Listing is sold out on Shopify: button says "Sold out" and goes to the product page */
  soldOut?: boolean
}

export type Product = {
  id: string
  /** Shopify product handle — fallback for sizes that don't set their own */
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

/** Products that can be bought on Shopify today. */
export const PRODUCTS: Product[] = [
  {
    id: 'classic-mayo',
    handle: 'mayonnaise',
    tag: 'Bestseller',
    tagColor: '#1E3A2F',
    title: 'Classic Mayo',
    subtitle: "Nature's Creamery Mayonnaise",
    desc: 'Creamy plant-based mayo crafted without eggs, gums, or artificial additives. Rich texture, authentic flavour every time.',
    sizes: [{ label: '354 ml', format: 'Squeeze bottle', price: 5.25, variantId: '44486762954831' }],
    defaultSize: 0,
    img: '/product-bottle.png',
    imgAlt: "Nature's Creamery Classic Mayonnaise squeeze bottle with yellow cap and farmhouse label",
    accentBg: '#1E3A2F',
  },
  {
    id: 'chocolate-protein',
    handle: 'chocolate-protein-powder',
    tag: 'New',
    tagColor: '#5C3317',
    title: 'Chocolate Protein',
    subtitle: 'Fava & Pea Protein Powder',
    desc: 'A clean-tasting chocolate shake made from fava and pea protein isolates. 26.5 g of protein per 35 g scoop, sweetened with stevia.',
    sizes: [
      {
        label: '1.015 kg',
        format: '29 servings',
        price: 80.0,
        variantId: '46406966378575',
        handle: 'chocolate-protein-powder',
      },
      {
        label: '2.03 kg',
        format: '58 servings',
        price: 97.99,
        variantId: '46627581460559',
        handle: 'chocolate-protein-powder-2-03kg',
      },
      {
        label: 'Pre-order',
        format: '2.03 kg · 58 servings',
        price: 97.99,
        variantId: '46727617151055',
        handle: 'chocolate-protein-powder-2-03kg-pre-order-oct-18-ship-date',
        preorder: true,
      },
    ],
    defaultSize: 1,
    img: `${SHOPIFY_STORE}/cdn/shop/files/2.03Kg_58_servings.jpg?v=1788818649&width=900`,
    imgAlt: "Nature's Creamery Chocolate Protein Powder 2.03 kg bag, 58 servings",
    accentBg: '#2C1400',
  },
  {
    id: 'cocovida',
    handle: 'cocovida',
    tag: 'Chocolate',
    tagColor: '#5C3317',
    title: 'CocoVida',
    subtitle: 'Chocolate Spread',
    desc: 'Indulgence without compromise. A rich, salty-chocolate spread with no preservatives or enhancers.',
    sizes: [{ label: '500 ml', format: 'Jar', price: 14.0, variantId: '44486893568079', soldOut: true }],
    defaultSize: 0,
    img: '/product-cocovida.png',
    imgAlt: "Nature's Creamery CocoVida Chocolate Spread bottle with coconut halves and dark chocolate pieces on a dark surface",
    accentBg: '#2C1400',
  },
]

/** Spreads that are made but not yet listed on Shopify. Shown as "coming soon". */
export const COMING_SOON = [
  {
    id: 'chipotle-mayo',
    title: 'Chipotle Mayo',
    subtitle: 'Boldly smoky with a chipotle kick',
    img: '/product-chipotle.png',
    imgAlt: "Nature's Creamery Chipotle Mayo bottle surrounded by red peppers, garlic, and chipotle spices",
  },
  {
    id: 'olivida',
    title: 'OliVida',
    subtitle: 'Mediterranean-inspired spread',
    img: '/product-olivida.png',
    imgAlt: "Nature's Creamery OliVida Mediterranean Spread bottle with green olives, rosemary, and olive oil",
  },
]

export const cad = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' })

export type BuyLink = {
  href: string
  /** true when the link adds the exact variant to the Shopify cart in one click */
  adds: boolean
  /** button text that tells the truth about what the link does */
  label: string
  /** sold-out items: the link goes to the product page instead of the cart */
  soldOut: boolean
}

/**
 * The best link we can build for "buy this product in this size":
 *   sold out       → the product page, labelled "Sold out".
 *   variantId set  → Shopify cart permalink; adds 1 unit and opens the cart.
 *   handle set     → the product page (shopper still has to pick the size).
 *   neither        → the collection page.
 */
export function buyLink(p: Product, sizeIndex: number): BuyLink {
  const size = p.sizes[sizeIndex] ?? p.sizes[p.defaultSize]
  const handle = size?.handle ?? p.handle
  const productUrl = handle
    ? `${SHOPIFY_STORE}/products/${handle}${size?.variantId ? `?variant=${size.variantId}` : ''}`
    : SHOPIFY_COLLECTION

  if (size?.soldOut) return { href: productUrl, adds: false, label: 'Sold out', soldOut: true }
  if (size?.variantId) {
    return {
      href: `${SHOPIFY_STORE}/cart/${size.variantId}:1`,
      adds: true,
      label: size.preorder ? 'Pre-order' : 'Add to cart',
      soldOut: false,
    }
  }
  return { href: productUrl, adds: false, label: 'Buy on Shopify', soldOut: false }
}

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!
