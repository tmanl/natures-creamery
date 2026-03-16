"use client";

import { FormEvent, useEffect, useState } from "react";

const marqueeItems = [
  "Plant-Based",
  "Clean Label",
  "Made in Canada",
  "Burcon Protein",
  "No Eggs",
  "No Gums",
  "No Additives",
  "Creamy Without Compromise",
];

const stats = [
  { value: "100%", label: "Plant-Based" },
  { value: "0", label: "Artificial Additives" },
  { value: "4", label: "Signature Spreads" },
  { value: "Milton,\nON", label: "Made in Canada" },
];

const products = [
  {
    tag: "Bestseller",
    title: "Nature's Creamery Mayonnaise",
    desc:
      "Creamy, plant-based mayo crafted without eggs, gums, or artificial additives. Rich texture, authentic flavour — ready for any occasion.",
    sizes: [
      "354ml Squeeze Bottle · $5.25",
      "500ml Mason Jar · $7.39",
      "4L Tub · $32.00",
    ],
    price: "$5.25",
    visual: (
      <img
        src="/images/mayo-bottle.png"
        alt="Nature's Creamery Mayonnaise bottle"
        loading="lazy"
      />
    ),
  },
  {
    tag: "Spicy",
    title: "Chipotle Mayo",
    desc:
      "Boldly flavourful with a smoky chipotle kick. Perfect for sandwiches, dips, and wraps when you want a little heat.",
    sizes: [
      "354ml Squeeze Bottle · $5.69",
      "500ml Mason Jar · $8.00",
      "4L Tub · $32.00",
    ],
    price: "$5.69",
    visual: <div className="emoji-visual">🌶️</div>,
  },
  {
    tag: "Artisan",
    title: "OliVida",
    desc:
      "A smooth and savoury olive-forward spread designed for grazing boards, elevated sandwiches, and everyday indulgence.",
    sizes: ["500ml Mason Jar · $8.99", "4L Tub · $34.00"],
    price: "$8.99",
    visual: <div className="emoji-visual">🫒</div>,
  },
  {
    tag: "Fresh",
    title: "Tzatziki",
    desc:
      "Cool, creamy, and herbaceous with a plant-based twist. A refreshing spread and dip for wraps, bowls, and platters.",
    sizes: ["500ml Mason Jar · $8.99", "4L Tub · $34.00"],
    price: "$8.99",
    visual: <div className="emoji-visual">🥒</div>,
  },
];

const aboutPills = [
  {
    icon: "🌱",
    label: "Plant-Based & Creamy",
    sub: "Never compromise on texture",
  },
  {
    icon: "💪",
    label: "Protein-Enhanced",
    sub: "Innovative Burcon blends",
  },
  {
    icon: "🍞",
    label: "Incredibly Versatile",
    sub: "Toast, boards, baking & more",
  },
  {
    icon: "📋",
    label: "Clean Label",
    sub: "No gums, no additives",
  },
];

const storySteps = [
  {
    num: "01",
    title: "Source",
    body:
      "We start with Burcon's pure pea and canola protein isolates — clean plant-based emulsifiers harvested responsibly in Canada.",
  },
  {
    num: "02",
    title: "Craft",
    body:
      "Each spread is blended for the exact texture and richness people expect from traditional mayo, without artificial shortcuts.",
  },
  {
    num: "03",
    title: "Deliver",
    body:
      "Bottled fresh in Milton, Ontario and ready for your fridge, kitchen, or food-service setup.",
  },
];

const showcasePoints = [
  "No eggs, no gums, no artificial additives — just clean, honest ingredients",
  "Rich, creamy texture powered by Burcon's Peazazz® C and Puratein® C proteins",
  "Allergen-friendly, preservative-free, and suitable for plant-based lifestyles",
  "Available in 354ml, 500ml mason jar, and 4L bulk sizes",
];

const styles = String.raw`
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap");

:root {
  --cream: #f7f2e8;
  --cream-2: #ede5d0;
  --cream-3: #e2d8c0;
  --forest: #1e3a2f;
  --forest-2: #2d5140;
  --sage: #6b8f71;
  --gold: #b8933a;
  --gold-lt: #d4ad59;
  --earth: #5c3d1e;
  --charcoal: #141414;
  --white: #fdfaf5;
  --text: #1e2820;

  --f-display: "Cormorant Garamond", Georgia, serif;
  --f-body: "Outfit", system-ui, sans-serif;
  --f-mono: "DM Mono", monospace;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--cream);
  color: var(--text);
  font-family: var(--f-body);
  line-height: 1.6;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  background: var(--forest);
  color: var(--cream);
  padding: 10px 20px;
  font-family: var(--f-mono);
  font-size: 13px;
  letter-spacing: 0.05em;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 16px;
}

#nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1000;
  height: 72px;
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.4s var(--ease-in-out), box-shadow 0.4s var(--ease-in-out);
}

#nav.scrolled {
  background: rgba(247, 242, 232, 0.92);
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 rgba(30, 58, 47, 0.08);
}

.nav-logo {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-logo-name {
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--forest);
  line-height: 1;
}

.nav-logo-tag {
  font-family: var(--f-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--gold);
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links a {
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--forest);
  opacity: 0.75;
  position: relative;
  padding-bottom: 2px;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s var(--ease-out-expo);
}

.nav-links a:hover,
.nav-links a:focus-visible {
  opacity: 1;
}

.nav-links a:hover::after,
.nav-links a:focus-visible::after {
  width: 100%;
}

.nav-cta,
.btn-primary,
.pc-cta,
.form-btn,
.footer-shop-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  background: var(--forest);
  color: var(--cream);
  padding: 13px 24px;
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: background 0.25s, transform 0.2s, color 0.25s, box-shadow 0.25s;
}

.nav-cta:hover,
.btn-primary:hover,
.pc-cta:hover,
.form-btn:hover,
.footer-shop-btn:hover,
.nav-cta:focus-visible,
.btn-primary:focus-visible,
.pc-cta:focus-visible,
.form-btn:focus-visible,
.footer-shop-btn:focus-visible {
  background: var(--gold);
  color: var(--charcoal);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(184, 147, 58, 0.2);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(30, 58, 47, 0.25);
  color: var(--forest);
  padding: 13px 24px;
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: transparent;
}

.btn-ghost:hover,
.btn-ghost:focus-visible {
  border-color: var(--forest);
  background: rgba(30, 58, 47, 0.04);
}

.hamburger {
  display: none;
  width: 28px;
  padding: 4px;
  background: transparent;
  border: none;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--forest);
  transition: transform 0.3s var(--ease-out-expo), opacity 0.2s;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu {
  position: fixed;
  inset: 72px 0 0;
  background: var(--cream);
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 48px;
  transform: translateY(-20px);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.35s var(--ease-out-expo), opacity 0.25s;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu a {
  font-family: var(--f-display);
  font-size: 32px;
  font-weight: 400;
  color: var(--forest);
  border-bottom: 1px solid var(--cream-3);
  padding-bottom: 18px;
}

main {
  display: block;
}

#hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
  padding: 100px 48px 60px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--cream) 0%, var(--cream-2) 60%, var(--cream-3) 100%);
}

.hero-bg-circle,
.hero-bg-blob {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
}

.hero-bg-circle-1 {
  width: 700px;
  height: 700px;
  top: -200px;
  right: -150px;
  border: 1px solid rgba(30, 58, 47, 0.06);
}

.hero-bg-circle-2 {
  width: 500px;
  height: 500px;
  top: -100px;
  right: -50px;
  border: 1px solid rgba(184, 147, 58, 0.08);
}

.hero-bg-blob {
  width: 600px;
  height: 600px;
  bottom: -100px;
  left: -200px;
  background: rgba(30, 58, 47, 0.04);
}

.hero-left,
.hero-right {
  position: relative;
  z-index: 2;
}

.hero-eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.hero-eyebrow-line,
.eyebrow-line {
  width: 40px;
  height: 1px;
  background: var(--gold);
}

.hero-eyebrow-text,
.eyebrow-text {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
}

.hero-title {
  margin: 0 0 24px;
  font-family: var(--f-display);
  font-size: clamp(48px, 6vw, 82px);
  line-height: 1.05;
  font-weight: 400;
  color: var(--forest);
}

.hero-title em,
.section-title em,
.about-title em,
.contact-title em {
  color: var(--gold);
  font-style: italic;
}

.hero-desc {
  max-width: 460px;
  margin: 0 0 40px;
  font-size: 17px;
  font-weight: 300;
  line-height: 1.75;
  color: var(--earth);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 40px;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.hero-badge {
  font-size: 13px;
  color: rgba(30, 58, 47, 0.65);
}

.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-img-wrap {
  position: relative;
  animation: floatY 6s ease-in-out infinite;
}

.hero-img-wrap img {
  max-height: 600px;
  object-fit: contain;
  filter: drop-shadow(0 40px 60px rgba(30, 58, 47, 0.18));
}

.hero-price-badge {
  position: absolute;
  left: -20px;
  bottom: 0;
  background: var(--forest);
  color: var(--cream);
  padding: 16px 24px;
  box-shadow: 0 20px 40px rgba(30, 58, 47, 0.25);
}

.hero-price-badge .from,
.pc-from {
  font-family: var(--f-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.6);
}

.hero-price-badge .price,
.pc-price {
  font-family: var(--f-display);
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
}

.hero-price-badge .currency {
  margin-top: 4px;
  font-family: var(--f-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--gold-lt);
  text-transform: uppercase;
}

.marquee-bar {
  overflow: hidden;
  background: var(--forest);
  padding: 14px 0;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee 28s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding: 0 28px;
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.72);
}

.marquee-dot {
  color: var(--gold);
}

#stats,
.section-shell,
.story-inner,
.showcase-inner,
.contact-inner,
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
}

#stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  padding: 44px 48px;
}

.stat-item {
  background: rgba(253, 250, 245, 0.65);
  border: 1px solid rgba(30, 58, 47, 0.08);
  padding: 26px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-value {
  white-space: pre-line;
  font-family: var(--f-display);
  font-size: 44px;
  line-height: 1.15;
  color: var(--forest);
  margin-bottom: 8px;
}

.stat-label {
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(30, 58, 47, 0.7);
}

#products,
#about,
#story,
#showcase,
#contact {
  padding: 110px 48px;
}

.section-header {
  max-width: 760px;
  margin: 0 auto 56px;
  text-align: center;
}

.section-title,
.about-title,
.contact-title {
  margin: 0 0 18px;
  font-family: var(--f-display);
  font-size: clamp(40px, 4.6vw, 64px);
  font-weight: 400;
  line-height: 1.05;
  color: var(--forest);
}

.section-desc,
.about-text,
.contact-desc,
.step-body,
.pc-desc {
  color: var(--earth);
}

.section-desc {
  margin: 0 auto;
  max-width: 640px;
  font-size: 17px;
  font-weight: 300;
  line-height: 1.8;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

.product-card {
  overflow: hidden;
  border: 1px solid rgba(30, 58, 47, 0.08);
  background: rgba(253, 250, 245, 0.72);
  box-shadow: 0 18px 40px rgba(30, 58, 47, 0.06);
}

.pc-visual {
  min-height: 280px;
  display: grid;
  place-items: center;
  padding: 32px;
  background: linear-gradient(180deg, rgba(247, 242, 232, 0.3), rgba(226, 216, 192, 0.35));
}

.pc-visual img {
  max-height: 240px;
  object-fit: contain;
}

.emoji-visual {
  font-size: 90px;
  line-height: 1;
}

.pc-inner {
  padding: 28px;
}

.pc-tag {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 6px 10px;
  background: rgba(184, 147, 58, 0.12);
  color: var(--gold);
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.pc-title {
  margin: 0 0 12px;
  font-family: var(--f-display);
  font-size: 34px;
  line-height: 1.1;
  font-weight: 500;
  color: var(--forest);
}

.pc-desc {
  margin: 0 0 18px;
  font-size: 16px;
  line-height: 1.75;
}

.pc-sizes {
  padding-left: 18px;
  margin: 0 0 24px;
  color: var(--forest-2);
}

.pc-sizes li + li {
  margin-top: 8px;
}

.pc-footer {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-top: 24px;
}

.pc-price {
  color: var(--forest);
  font-size: 34px;
}

#about {
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(253,250,245,0.5) 100%);
}

.about-grid,
.showcase-inner,
.contact-inner {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
}

.about-img-wrap {
  position: relative;
}

.about-img-frame {
  overflow: hidden;
  background: rgba(253, 250, 245, 0.8);
  border: 1px solid rgba(30, 58, 47, 0.08);
  box-shadow: 0 18px 40px rgba(30, 58, 47, 0.08);
}

.about-img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-img-decoration {
  position: absolute;
  right: -18px;
  bottom: -18px;
  width: 140px;
  height: 140px;
  border: 1px solid rgba(184, 147, 58, 0.25);
  background: rgba(184, 147, 58, 0.05);
}

.about-text {
  margin: 0 0 18px;
  font-size: 16px;
  line-height: 1.85;
}

.about-pills {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.about-pill {
  border: 1px solid rgba(30, 58, 47, 0.08);
  background: rgba(253, 250, 245, 0.7);
  padding: 20px;
}

.about-pill-icon {
  font-size: 24px;
  margin-bottom: 12px;
}

.about-pill-label {
  color: var(--forest);
  font-weight: 500;
  margin-bottom: 4px;
}

.about-pill-sub {
  color: rgba(30, 58, 47, 0.7);
  font-size: 14px;
}

#story {
  background: var(--forest);
  color: var(--cream);
}

#story .section-title,
#story .step-title,
#story .step-num {
  color: var(--cream);
}

#story .section-desc,
#story .step-body,
#story .eyebrow-text {
  color: rgba(247, 242, 232, 0.8);
}

#story .eyebrow-line {
  background: rgba(212, 173, 89, 0.75);
}

.story-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.story-step {
  padding: 28px;
  border: 1px solid rgba(247, 242, 232, 0.12);
  background: rgba(255, 255, 255, 0.02);
}

.step-num {
  margin-bottom: 14px;
  font-family: var(--f-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--gold-lt);
}

.step-title {
  margin: 0 0 10px;
  font-family: var(--f-display);
  font-size: 32px;
  font-weight: 500;
}

.step-body {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
}

.showcase-img {
  overflow: hidden;
  border: 1px solid rgba(30, 58, 47, 0.08);
  background: rgba(253, 250, 245, 0.78);
  box-shadow: 0 18px 40px rgba(30, 58, 47, 0.06);
}

.showcase-points {
  list-style: none;
  padding: 0;
  margin: 24px 0 32px;
  display: grid;
  gap: 16px;
}

.showcase-point {
  display: flex;
  gap: 14px;
  align-items: start;
}

.sp-dot {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  border-radius: 999px;
  background: var(--gold);
  flex-shrink: 0;
}

.sp-text {
  color: var(--earth);
  line-height: 1.75;
}

.contact-left {
  padding-right: 16px;
}

.contact-info {
  display: grid;
  gap: 18px;
  margin-top: 28px;
}

.ci-item {
  display: flex;
  gap: 16px;
  align-items: start;
}

.ci-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: rgba(184, 147, 58, 0.1);
  font-size: 18px;
}

.ci-label {
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(30, 58, 47, 0.6);
  margin-bottom: 4px;
}

.ci-value {
  color: var(--forest);
  line-height: 1.7;
}

.contact-form {
  border: 1px solid rgba(30, 58, 47, 0.08);
  background: rgba(253, 250, 245, 0.72);
  box-shadow: 0 18px 40px rgba(30, 58, 47, 0.06);
  padding: 28px;
}

.form-grid {
  display: grid;
  gap: 18px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(30, 58, 47, 0.7);
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(30, 58, 47, 0.14);
  background: rgba(255, 255, 255, 0.75);
  color: var(--forest);
}

.form-input:focus {
  outline: none;
  border-color: var(--gold);
}

.form-error {
  color: #b3261e;
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.form-success {
  margin-top: 18px;
  padding: 18px;
  background: rgba(107, 143, 113, 0.1);
  border: 1px solid rgba(107, 143, 113, 0.2);
  color: var(--forest);
}

footer {
  background: var(--forest);
  color: rgba(247, 242, 232, 0.78);
  padding: 36px 48px;
}

.footer-top,
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-top {
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(247, 242, 232, 0.1);
}

.footer-bottom {
  padding-top: 24px;
}

.footer-brand-name {
  color: var(--cream);
  font-family: var(--f-display);
  font-size: 32px;
  line-height: 1;
}

.footer-brand-tag {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-lt);
  margin-top: 8px;
}

.footer-nav {
  display: flex;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav a:hover,
.footer-nav a:focus-visible {
  color: var(--cream);
}

.footer-copy {
  margin: 0;
  font-size: 14px;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 1080px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  #hero,
  .about-grid,
  .showcase-inner,
  .contact-inner,
  .story-steps,
  .products-grid,
  #stats {
    grid-template-columns: 1fr;
  }

  #hero,
  #products,
  #about,
  #story,
  #showcase,
  #contact,
  footer,
  #stats {
    padding-left: 24px;
    padding-right: 24px;
  }

  #hero {
    padding-top: 120px;
  }

  .hero-right {
    order: -1;
  }

  .hero-img-wrap img {
    max-height: 420px;
  }

  .about-pills {
    grid-template-columns: 1fr;
  }

  .footer-top,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-nav {
    flex-wrap: wrap;
  }
}

@media (max-width: 680px) {
  #nav {
    padding: 0 20px;
  }

  .mobile-menu {
    padding: 28px 20px;
  }

  #hero,
  #products,
  #about,
  #story,
  #showcase,
  #contact,
  footer,
  #stats {
    padding-left: 20px;
    padding-right: 20px;
  }

  .pc-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
`;

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );

    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => observer.observe(el));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKeyDown);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim() || "Website Enquiry";
    const message = String(data.get("message") || "").trim();

    if (!name) {
      setFormError("Please enter your name.");
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!message) {
      setFormError("Please enter a message.");
      return;
    }

    const body = `Name: ${name}
Email: ${email}

${message}`;

    window.location.href = `mailto:hello@naturescreamery.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    form.reset();
  };

  return (
    <>
      <style jsx global>{styles}</style>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header>
        <nav id="nav" className={scrolled ? "scrolled" : ""} aria-label="Main navigation">
          <a href="#hero" className="nav-logo" aria-label="Nature's Creamery home">
            <span className="nav-logo-name">Nature&apos;s Creamery</span>
            <span className="nav-logo-tag">Creamy Without Compromise</span>
          </a>

          <ul className="nav-links">
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <a
            href="https://natures-creamery.myshopify.com/collections/all"
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
          >
            Shop Now
          </a>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a
          href="https://natures-creamery.myshopify.com/collections/all"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ marginTop: 8, alignSelf: "flex-start" }}
        >
          Shop Now →
        </a>
      </div>

      <main id="main-content">
        <section id="hero" aria-label="Nature's Creamery hero">
          <div className="hero-bg-circle hero-bg-circle-1" aria-hidden="true" />
          <div className="hero-bg-circle hero-bg-circle-2" aria-hidden="true" />
          <div className="hero-bg-blob" aria-hidden="true" />

          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Indulgence Without Compromise</span>
            </div>

            <h1 className="hero-title">
              Creamy,
              <br />
              <em>plant-based</em>
              <br />
              perfection.
            </h1>

            <p className="hero-desc">
              Crafted in Milton, Ontario with Burcon&apos;s revolutionary pea and
              canola protein isolates. Real flavour. Clean labels. Nothing hidden.
            </p>

            <div className="hero-actions">
              <a
                href="https://natures-creamery.myshopify.com/collections/all"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Shop Spreads <span aria-hidden="true">→</span>
              </a>
              <a href="#about" className="btn-ghost">
                Our Story
              </a>
            </div>

            <ul className="hero-badges">
              <li className="hero-badge">🌱 Plant-Based</li>
              <li className="hero-badge">🇨🇦 Made in Canada</li>
              <li className="hero-badge">✨ Clean Label</li>
              <li className="hero-badge">💪 Protein-Enhanced</li>
            </ul>
          </div>

          <div className="hero-right">
            <div className="hero-img-wrap">
              <img src="/images/hero-bottle.png" alt="Nature's Creamery hero bottle" />
              <div className="hero-price-badge">
                <div className="from">From</div>
                <div className="price">$5.25</div>
                <div className="currency">CAD</div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-bar" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>
                {item} <span className="marquee-dot">◆</span>
              </span>
            ))}
          </div>
        </div>

        <section id="stats" aria-label="Brand stats">
          {stats.map((stat) => (
            <div className="stat-item reveal" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </section>

        <section id="products">
          <div className="section-shell">
            <div className="section-header">
              <div className="section-eyebrow">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Our Collection</span>
                <div className="eyebrow-line" />
              </div>

              <h2 className="section-title">
                Crafted to <em>elevate</em>
              </h2>

              <p className="section-desc">
                Every spread is made with Burcon&apos;s innovative protein blends —
                delivering real creaminess, zero compromise.
              </p>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <article className="product-card reveal" key={product.title}>
                  <div className="pc-visual">{product.visual}</div>
                  <div className="pc-inner">
                    <span className="pc-tag">{product.tag}</span>
                    <h3 className="pc-title">{product.title}</h3>
                    <p className="pc-desc">{product.desc}</p>
                    <ul className="pc-sizes">
                      {product.sizes.map((size) => (
                        <li key={size}>{size}</li>
                      ))}
                    </ul>

                    <div className="pc-footer">
                      <div>
                        <div className="pc-from">From</div>
                        <div className="pc-price">{product.price}</div>
                      </div>
                      <a
                        href="https://natures-creamery.myshopify.com/collections/all"
                        target="_blank"
                        rel="noreferrer"
                        className="pc-cta"
                      >
                        Shop Now →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about">
          <div className="section-shell about-grid">
            <div className="about-img-wrap reveal">
              <div className="about-img-frame">
                <img
                  src="/images/farmhouse-illustration.png"
                  alt="Nature's Creamery farmhouse illustration"
                  loading="lazy"
                />
              </div>
              <div className="about-img-decoration" aria-hidden="true" />
            </div>

            <div className="about-content reveal">
              <div className="section-eyebrow">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">A Holistic Way to Indulge</span>
              </div>

              <h2 className="about-title">
                Where <em>flavour</em> meets integrity
              </h2>

              <p className="about-text">
                At Nature&apos;s Creamery, we believe treats should feel good during
                and after the last spoonful. Our recipes are intentionally crafted
                using plant-based ingredients, clean-label formulations, and
                protein-powered blends from Burcon NutraScience.
              </p>

              <p className="about-text">
                Think slow mornings, shared boards, and late-night snacks — all
                elevated with rich, creamy textures and thoughtful nutrition.
              </p>

              <p className="about-text">
                Whether you&apos;re plant-curious or fully plant-based, our spreads
                fit beautifully into a lifestyle that values nourishment, pleasure,
                and care for the planet.
              </p>

              <div className="about-pills">
                {aboutPills.map((pill) => (
                  <div className="about-pill" key={pill.label}>
                    <div className="about-pill-icon">{pill.icon}</div>
                    <div className="about-pill-label">{pill.label}</div>
                    <div className="about-pill-sub">{pill.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="story">
          <div className="story-inner">
            <div className="section-header">
              <div className="section-eyebrow">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">The Science of Creamy</span>
                <div className="eyebrow-line" />
              </div>

              <h2 className="section-title">
                Powered by <em>Burcon</em>
              </h2>

              <p className="section-desc">
                Our secret? Burcon NutraScience&apos;s pea and canola protein isolates
                that give our spreads their legendary creaminess without eggs or gums.
              </p>
            </div>

            <div className="story-steps">
              {storySteps.map((step) => (
                <div className="story-step reveal" key={step.num}>
                  <div className="step-num">{step.num}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="showcase">
          <div className="showcase-inner">
            <div className="showcase-img reveal">
              <img
                src="/images/label-detail.png"
                alt="Nature's Creamery label detail"
                loading="lazy"
              />
            </div>

            <div className="showcase-content reveal">
              <div className="section-eyebrow">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Signature Product</span>
              </div>

              <h2 className="section-title" style={{ textAlign: "left" }}>
                The original.
                <br />
                <em>Perfectly creamy.</em>
              </h2>

              <ul className="showcase-points">
                {showcasePoints.map((point) => (
                  <li className="showcase-point" key={point}>
                    <div className="sp-dot" aria-hidden="true" />
                    <span className="sp-text">{point}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://natures-creamery.myshopify.com/collections/all"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Order Now <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="contact-inner">
            <div className="contact-left reveal">
              <div className="section-eyebrow">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Get in Touch</span>
              </div>

              <h2 className="contact-title">
                Let&apos;s talk <em>spreads.</em>
              </h2>

              <p className="contact-desc">
                Whether you&apos;re a retailer, chef, or a passionate mayo lover —
                we&apos;d love to hear from you. Visit us in Milton or drop us a line
                anytime.
              </p>

              <div className="contact-info">
                <div className="ci-item">
                  <div className="ci-icon">📍</div>
                  <div>
                    <div className="ci-label">Location</div>
                    <div className="ci-value">201 Main St E, Milton, ON, Canada</div>
                  </div>
                </div>

                <div className="ci-item">
                  <div className="ci-icon">🌐</div>
                  <div>
                    <div className="ci-label">Main Website</div>
                    <a
                      href="https://naturescreamery.com"
                      target="_blank"
                      rel="noreferrer"
                      className="ci-value"
                    >
                      naturescreamery.com
                    </a>
                  </div>
                </div>

                <div className="ci-item">
                  <div className="ci-icon">🛒</div>
                  <div>
                    <div className="ci-label">Shop Online</div>
                    <a
                      href="https://natures-creamery.myshopify.com/collections/all"
                      target="_blank"
                      rel="noreferrer"
                      className="ci-value"
                    >
                      natures-creamery.myshopify.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form reveal">
              <form onSubmit={handleSubmit} className="form-grid" noValidate>
                <div>
                  <label htmlFor="name" className="form-label">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="Retail inquiry, bulk order, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="form-input"
                    placeholder="Tell us what you have in mind..."
                  />
                </div>

                {formError ? <div className="form-error">{formError}</div> : null}

                <button type="submit" className="form-btn">
                  Send Message →
                </button>

                {submitted ? (
                  <div className="form-success">
                    <strong>Message started.</strong>
                    <div>Your email app should open with the pre-filled message.</div>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">Nature&apos;s Creamery</div>
              <div className="footer-brand-tag">Creamy Without Compromise</div>
            </div>

            <ul className="footer-nav">
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#story">Story</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            <a
              href="https://natures-creamery.myshopify.com/collections/all"
              target="_blank"
              rel="noreferrer"
              className="footer-shop-btn"
            >
              Shop Now
            </a>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} Nature&apos;s Creamery. All rights reserved.
              Milton, Ontario, Canada.
            </p>
            <p className="footer-copy">Made with 🌱</p>
          </div>
        </div>
      </footer>
    </>
  );
}
