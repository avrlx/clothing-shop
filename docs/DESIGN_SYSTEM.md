# D Fashion Mart — Website
### Complete Design Brief & Design System
Prepared for: Social Internship Web Project — Local Clothing Shop
Prepared by: Senior Product Design / UX Research / Frontend Architecture (design lead role)

> **Brand name:** the shop is D Fashion Mart, an apparel & clothing retailer selling ethnic wear, western wear, and footwear. This system is built around that name — it also seeds the site's one signature visual idea (see §5, Signature Element).

---

## 1. Design Brief

**Business:** an independent, local clothing shop (ready-to-wear — everyday, family, casual/young-adult clothing). Not a luxury flagship — a *neighbourhood* boutique that wants to look as considered as a city boutique without losing warmth or approachability.

**Primary objective of the site:** convert digital attention into **foot traffic and trust**, not just online browsing. Every page ultimately points at one of three actions: *visit the store*, *message/call the store*, or *follow the store's current stock*.

**Users & jobs-to-be-done**

| Audience | What they need from the site |
|---|---|
| Local shoppers | Confirm the shop is real, current, and worth the trip — hours, address, map, photos |
| Families | Reassurance of range/sizes, easy contact, no clutter, fast on a mid-range phone |
| Students / young adults | Visual proof of style ("is this my taste?"), Instagram-style gallery, easy share |
| "Clothing store near me" searchers | Strong local SEO, clear NAP (name/address/phone), map, reviews |

**Design mandate:** minimal, elegant, editorial — but *warm*, not cold luxury. Whitespace does the heavy lifting, not effects.

**What "premium" means here:** restraint, precise type, consistent spacing, and one deliberate signature idea — not gradients, glassmorphism, or stock-template carousels.

---

## 2. Concept & Signature Element

Rather than decorate with generic dividers or numbered steps, the design borrows its structure from garment-making itself:

- **The hang tag** — every real clothing item gets a small paper tag: a rectangle with a punched hole. This becomes the site's recurring badge shape for prices, "new," and category labels — instead of generic pill/chip badges.
- **The stitch line** — visible top-stitching on garments becomes the section-divider motif: a dashed, low-opacity rule instead of a plain hairline.
- **The fold** — the brand name and the hover state on product photography: images lift and a corner "folds" very slightly on hover, like fabric on a shelf.

This is the *one* place the design takes a visual risk (per design-system discipline: spend boldness once, keep everything else quiet).

---

## 3. Color Palette

Rooted in a natural dye / raw-textile story — undyed cotton, indigo, madder root, walnut hull — so the palette reads as *of the subject*, not a generic "boutique cream."

| Token | Hex | Name | Why |
|---|---|---|---|
| `--color-ink` | `#1E2A3D` | Ink (deep indigo-charcoal) | Denim/indigo heritage. Used for nav, footer, headline accents. Reads trustworthy and grounded, not flashy. |
| `--color-linen` | `#ECE8DE` | Linen | Raw, undyed-cotton background. Warm but greyed-down — avoids the "AI cream" cliché while staying soft and premium. |
| `--color-surface` | `#FBFAF6` | Surface (card white) | Slightly warm off-white for cards/forms sitting on Linen, for depth without grey drop-shadows. |
| `--color-madder` | `#8C3F2C` | Madder (brick) | Named for madder-root dye. The **one** accent color — CTAs, links, active states. Muted brick, not saturated orange, so it reads natural/earthy rather than "startup orange." |
| `--color-sage` | `#78876F` | Sage | Secondary accent — plant-dye green. Used sparingly for success states, "in stock," secondary tags. |
| `--color-walnut` | `#2A2420` | Walnut (ink-brown) | Primary body-text color — warm near-black, easier on the eye than pure `#000`. |
| `--color-cloud` | `#D8D2C2` | Cloud | Borders, dividers, disabled states, the stitch-line color. |

**Usage rule:** Madder is the *only* saturated color on the page and appears in small doses (CTA buttons, price tags, active nav underline, form focus ring). This keeps the palette premium instead of loud.

**Accessibility check:** Walnut (`#2A2420`) on Linen (`#ECE8DE`) = ~13.9:1 contrast (AAA). Surface white text-on-Ink and Ink-on-Linen both pass AA at body size; Madder on Surface passes AA for large text/UI (buttons use white text on Madder = 6.4:1, AA).

---

## 4. Typography

Three roles, deliberately different jobs — a fashion-editorial display face, a clean workhorse body face, and a **mono face used the way a garment tag is typeset** (prices, SKUs, care labels, nav eyebrows).

| Role | Font (Google Fonts) | Fallback stack |
|---|---|---|
| Display / Headings | **Cormorant Garamond** (500/600, italic for emphasis) | `"Cormorant Garamond", "Iowan Old Style", Georgia, serif` |
| Body / UI | **Work Sans** (400/500/600) | `"Work Sans", -apple-system, "Segoe UI", sans-serif` |
| Tag / Price / Eyebrow | **IBM Plex Mono** (500) | `"IBM Plex Mono", "SFMono-Regular", Menlo, monospace` |

### Type scale (mobile-first, fluid on desktop via `clamp()`)

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `--text-display` | `clamp(2.25rem, 4vw + 1.2rem, 3.75rem)` | 600 | 1.05 | Hero H1 |
| `--text-h2` | `clamp(1.75rem, 2.4vw + 1rem, 2.75rem)` | 600 | 1.1 | Section titles |
| `--text-h3` | `1.5rem` | 600 | 1.2 | Card/subsection titles |
| `--text-h4` | `1.125rem` | 600 | 1.3 | Small headings |
| `--text-lead` | `1.125rem` | 400 | 1.6 | Intro paragraphs |
| `--text-body` | `1rem` | 400 | 1.65 | Body copy |
| `--text-small` | `0.875rem` | 500 | 1.5 | Captions, meta |
| `--text-micro` | `0.75rem` | 500 | 1.4 | Mono eyebrows/tags, `letter-spacing: .08em`, uppercase |

**Spacing system** — 4px base scale, used for every margin/padding/gap:

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` px → tokens `--space-1` … `--space-10` (see `style.css`).

---

## 5. Design System Tokens

| Category | Tokens |
|---|---|
| **Radius** | `--radius-sm: 3px` (buttons, inputs, tags) · `--radius-md: 6px` (cards) · `--radius-lg: 14px` (photo frames, modals). Kept small deliberately — sharp, tailored, not "bubbly SaaS." |
| **Shadow** | `--shadow-sm: 0 1px 2px rgba(42,36,32,.06)` · `--shadow-md: 0 8px 24px rgba(42,36,32,.10)` · `--shadow-lg: 0 20px 48px rgba(42,36,32,.14)`. Warm-tinted (brown, not blue/grey) shadows only, used sparingly on hover/elevated cards. |
| **Breakpoints** | `--bp-sm: 640px` (large phones) · `--bp-md: 768px` (tablets) · `--bp-lg: 1024px` (small desktop/nav switch) · `--bp-xl: 1280px` (desktop) · `--bp-2xl: 1440px` (max content width) |
| **Container** | Max width `1280px`, side padding `clamp(20px, 5vw, 64px)` |
| **Icons** | Line icons only (Lucide/Feather-style, 1.5px stroke, 20–24px). No filled/glyph icons — keeps the minimal editorial tone. |
| **Motion** | `--ease-out: cubic-bezier(.16,1,.3,1)`; durations `160ms` (micro), `320ms` (reveal), `450ms` (page-level). All motion wrapped in `prefers-reduced-motion` guard. |

### Buttons

| Variant | Style |
|---|---|
| Primary | Madder fill, Surface-white text, `radius-sm`, `12px 28px` padding, `text-small` weight 600, uppercase, `letter-spacing .04em`. Hover: darken 8%, translateY(-1px). Focus: 2px Ink outline offset 2px. |
| Secondary | Transparent, 1.5px Ink border, Ink text. Hover: Ink fill, Linen text. |
| Ghost/Text link | No border, Madder text, underline offset 3px on hover, mono-caps for nav links. |
| Icon button (WhatsApp / back-to-top) | Circular, `48px`, Ink fill on Linen page / Madder fill for WhatsApp, `shadow-md`. |

### Cards

- **Product card:** Surface bg, `radius-md`, image ratio 4:5, hang-tag price badge overlapping top-right corner of the image (rotated -4deg), title in Work Sans 600, category in mono micro-caps, hover = image scale 1.04 + card shadow-md.
- **Category card:** full-bleed photo, gradient-free — a solid Ink scrim (`linear-gradient(transparent 40%, rgba(30,42,61,.75))`) only at the bottom third for label legibility, label in Cormorant italic.
- **Review card:** Surface bg, `radius-md`, quotation mark rendered as an oversized Cormorant glyph in Cloud color behind the text, star rating in Madder line-icons, customer name in mono micro-caps.
- **Gallery card:** square, `radius-sm`, hover reveals a thin Ink stitch-border inset and a zoom cursor.

### Forms & Inputs

- Label above field, `text-small`, Walnut, weight 600.
- Input: Surface bg, 1.5px Cloud border, `radius-sm`, `14px 16px` padding, `text-body`.
- Focus: border → Madder, 3px soft Madder ring (`rgba(140,63,44,.18)`), no color-only signaling (border thickness also increases to 2px).
- Error: border → a desaturated red-brown (`#A13B2E` — stays inside the palette family), helper text below in `text-small`, icon prefix.
- Success (form sent): border → Sage, inline confirmation message replaces the form (not just a toast), so keyboard/screen-reader users reliably get it.
- Textarea min-height 140px, resizable vertically only.
- Checkbox/consent control: square (matches `radius-sm`), Madder check on focus/checked.

---

## 6. Information Architecture — Sitemap

```
Home ("/")
├── About            → builds trust: who runs the shop, story, values
├── Collections       → browsable catalogue by category (product-market fit proof)
│    └── Collection detail (optional future: /collections/:slug)
├── Gallery           → store + styling photos, social proof, "what it's like to visit"
├── Contact           → hours, map, phone/WhatsApp, form — the conversion page
├── Privacy Policy    → legal trust requirement, form-data transparency
└── 404               → recovery path, keeps a lost visitor inside the site
```

**Why each page exists**

- **Home** — the single-visit summary. Must work even if it's the *only* page a mobile searcher opens.
- **About** — local shoppers buy from *people*; humanizes the brand, supports "why choose us."
- **Collections** — the product proof; lets browsers self-sort by category (Men/Women/Kids/New) without needing e-commerce/cart complexity for v1.
- **Gallery** — Instagram-style visual trust for a young-adult/student audience who decide on *look* before they decide on *price*.
- **Contact** — where every CTA on the site should be able to end; hours + map + form remove the last excuse not to visit or message.
- **Privacy Policy** — required the moment there's a contact form collecting personal data; also a quiet trust signal.
- **404** — every real site leaks broken links from search engines; a branded 404 keeps that visitor instead of losing them.

---

## 7. User Flow

```
Google search "clothing store near me"
        │
        ▼
   Home page lands
        │
   ┌────┴─────────────────────────┐
   │                               │
Scans Hero + Categories      Scrolls to Reviews / Gallery
   │                               │
   ▼                               ▼
Taps a category → Collections   Convinced by social proof
   │                               │
   ▼                               ▼
Browses products              Scrolls to Map/Contact
   │                               │
   └───────────────┬───────────────┘
                    ▼
        Contact section (map + hours + form)
                    │
        ┌───────────┼───────────────┐
        ▼           ▼               ▼
   Taps "Call"  Taps WhatsApp   Fills contact form
        │           │               │
        └───────────┴───────────────┘
                    ▼
        Visits store / gets a reply
                    → repeat visitor → follows socials (footer)
```

**F-pattern application:** hero headline + primary CTA sit top-left/left-aligned (first horizontal scan); category imagery runs left-to-right as the second scan line; every section repeats the pattern — eyebrow label (top-left) → heading → supporting line → CTA, so a scanning eye always lands on the CTA last.

---

## 8. Wireframes (textual)

### 8.1 Home

```
┌──────────────────────────────────────────────────────────┐
│ [Logo: D Fashion Mart]      Home  About  Collections  Gallery       │  <- sticky, transparent→Ink on scroll
│                    Contact         [Search] [Call icon]   │
├──────────────────────────────────────────────────────────┤
│  HERO                                                     │
│  eyebrow: "LOCALLY MADE · SEASON 24"                      │
│  H1: "Clothing that fits                                  │
│       your everyday."  (Cormorant, large)                 │
│  sub-line + [Shop Collections] [Visit Us →]                │
│  large lifestyle photo, right 55%, bleeds to edge          │
│  small hang-tag chip pinned on photo: "NEW ARRIVALS"       │
├──────────────────────────────────────────────────────────┤
│  CATEGORIES (eyebrow "SHOP BY CATEGORY")                   │
│  [Women]  [Men]  [Kids]  [Accessories]   ← 2x2 mobile,     │
│  full-bleed photo cards, Ink scrim + label   4-across desk │
├──────────────────────────────────────────────────────────┤
│  FEATURED PRODUCTS (eyebrow "THIS WEEK IN STORE")          │
│  [card][card][card][card]  ← 1-col mobile, 2-col tablet,   │
│  each: photo 4:5, hang-tag price, name, mono category      │
│  [View Full Collection →]                                  │
├──────────────────────────────────────────────────────────┤
│  WHY CHOOSE US (eyebrow "WHY D Fashion Mart")                         │
│  3-up icon+text: Local & Independent / Fair Pricing /       │
│  Easy Returns In-Store        (stitch-divider above/below) │
├──────────────────────────────────────────────────────────┤
│  CUSTOMER REVIEWS (eyebrow "FROM OUR CUSTOMERS")            │
│  horizontal snap-scroll on mobile, 3-up grid on desktop     │
│  [quote card][quote card][quote card]  + dot indicators     │
├──────────────────────────────────────────────────────────┤
│  STORE GALLERY (eyebrow "INSIDE D Fashion Mart")                       │
│  masonry-ish grid, 2-col mobile / 4-col desktop, uneven      │
│  row-spans for editorial feel; [See Full Gallery →]          │
├──────────────────────────────────────────────────────────┤
│  MAP + CONTACT (split section)                               │
│  Left: embedded Google Map (rounded frame)                   │
│  Right: hours table, address, phone, WhatsApp button,         │
│         short contact form (name/phone/message)               │
├──────────────────────────────────────────────────────────┤
│  NEWSLETTER strip (Ink bg) — "Get first look at new drops"   │
│  [email input][Join →] styled like a swing tag                │
├──────────────────────────────────────────────────────────┤
│  FOOTER (Ink bg): Logo+blurb | Sitemap links | Contact info  │
│  | Social icons | Hours | © + Privacy link                    │
└──────────────────────────────────────────────────────────┘
[Floating WhatsApp button — bottom-right, all pages]
[Back-to-top button — appears after 600px scroll]
```

### 8.2 About
```
Header strip (breadcrumb: Home / About)
Split hero: photo of shop-front (left) + story copy (right)
"Our Values" 3-up (Quality, Community, Honesty)
Owner/team note (photo + short quote, builds human trust)
Timeline (optional, mono year labels) — only if real milestones exist
CTA banner → Visit Us (links to Contact)
Footer
```

### 8.3 Collections
```
Header + breadcrumb
Sticky filter bar: [All][Women][Men][Kids][Accessories]  (chips)
Product grid: 2-col mobile / 3-col tablet / 4-col desktop
Each card: image, hang-tag price, name, category mono label
Empty state if a filter has 0 items ("Nothing here yet — new stock every week")
CTA banner → "Can't find your size? Message us on WhatsApp"
Footer
```

### 8.4 Gallery
```
Header + breadcrumb
Intro line ("A look inside D Fashion Mart")
Filter chips: [Store][Styling][Events] (optional)
Masonry/grid gallery, lightbox on click (keyboard + swipe enabled)
CTA banner → Follow on Instagram
Footer
```

### 8.5 Contact
```
Header + breadcrumb
Split layout: Map + hours/address/phone (left) | Full form (right)
Form fields: Name, Phone, Email (optional), Message, consent checkbox
FAQ accordion below (shipping/returns/hours-adjacent questions)
Footer
```

### 8.6 Privacy Policy
```
Header + breadcrumb
Single-column readable measure (max 70ch), Cormorant headings,
Work Sans body, table of contents anchor list at top
Sections: Data We Collect / How We Use It / Contact-Form Data /
Cookies / Your Rights / Contact
Footer
```

### 8.7 404
```
Centered, generous whitespace
Oversized mono "404" styled like a torn price tag
H2: "This page has been returned to stock."
Short line + [Back to Home] [Browse Collections]
Footer
```

---

## 9. Component Library (reusable, matches `frontend/`)

| Component | File | Notes |
|---|---|---|
| Navbar | inlined per page + reference in `components/navbar.html` | Sticky, transparent over hero → Ink bg + shadow after 40px scroll. Hamburger → full-height slide-in panel under 1024px. |
| Footer | inlined per page + reference in `components/footer.html` | 4-column desktop → stacked accordion-free single column mobile. |
| Button | CSS classes `.btn .btn--primary/--secondary/--ghost` | See §5. |
| Product Card | `.product-card` | Hang-tag price badge, hover lift. |
| Category Card | `.category-card` | Scrim + label. |
| Review Card | `.review-card` | Big quote glyph, star rating. |
| Gallery Card | `.gallery-card` | Lightbox trigger. |
| Contact Form | `.form` + `js/contact-form.js` | Inline validation, POST to `/api/contact`, `mailto:` fallback if the API is unreachable. |
| FAQ / Accordion | `.accordion` + `js/main.js` | `<button aria-expanded>` pattern, animates `max-height`. |
| Breadcrumb | `.breadcrumb` | `aria-label="Breadcrumb"`, `aria-current="page"` on last item. |
| Section Header | `.section-header` (eyebrow + h2 + optional lead) | Reused on every section for rhythm/consistency. |
| Newsletter strip | `.newsletter` | Swing-tag shaped submit button. |
| Floating WhatsApp button | `.fab-whatsapp` | Fixed, `aria-label="Chat on WhatsApp"`, opens `wa.me` link in new tab. Hidden under 640px in favor of the mobile CTA bar below. |
| Mobile sticky CTA bar | `.mobile-cta-bar` | Full-width fixed bar, Call + WhatsApp, shown only under 640px — thumb-friendly quick contact on the device most local searchers use. |
| Back to top | `.fab-top` | Appears after scroll threshold, `aria-label="Back to top"`. |
| Trust marquee | `.marquee` | Looping ticker strip under the hero ("Locally Owned · Fair Pricing · …"); pauses under `prefers-reduced-motion`. |
| Brand story block | `.story` | Photo + pull-quote module linking through to the About page — used on Home between Featured Products and Why Choose Us. |
| Reviews carousel | `.carousel` | Manual (no autoplay) carousel — arrows, dots, keyboard arrow-key support and touch swipe on mobile; collapses to a static 3-up grid at desktop widths. `js/carousel.js`. |
| Instagram-style feed | `.ig-feed__grid` / `.ig-feed__item` | Square photo grid with a hover scrim + IG glyph, used for the "Inside D Fashion Mart" section and linking to the full Gallery page. |
| Modal (Size Guide) | `.modal-overlay` / `.modal` | Generic, reusable modal pattern driven by `data-modal-open`/`data-modal-close` attributes in `main.js` — currently powers the Size Guide on Collections, but any page can trigger any modal by id. |
| Loading screen | `.loading-screen` | Brief (≤600ms) logo fade, auto-removed by `main.js`; skipped entirely if `prefers-reduced-motion`. |
| Skeleton loader | `.skeleton` | Shimmer placeholder for product/gallery images while they load. |
| Empty state | `.empty-state` | Used on filtered Collections with 0 results. |

---

## 10. Responsive Strategy

| | Mobile (base–639px) | Tablet (640–1023px) | Desktop (1024px+) |
|---|---|---|---|
| Nav | Hamburger → slide-in panel, logo centered | Hamburger persists to `1023px` | Full horizontal nav, underline-on-active |
| Hero | Stacked: text then photo, photo ratio 4:5 | Text 45% / photo 55%, side by side begins at `768px` | Same, more whitespace, larger type via `clamp()` |
| Categories | 2-column grid | 2-column, larger cards | 4-column row |
| Products | 1-column list-like cards | 2-column | 4-column |
| Reviews | Horizontal snap-scroll, 1 card in view | 2 cards in view | 3-up static grid |
| Gallery | 2-column grid | 3-column | 4-column masonry |
| Map+Contact | Stacked, map first | Stacked, map first | Side-by-side 50/50 |
| Footer | Single column, accordion-free stacked groups | 2-column | 4-column |

All breakpoints are `min-width` (mobile-first CSS). Touch targets ≥ 44×44px throughout. Images use `srcset`/responsive `<picture>` where file size matters (hero, gallery).

---

## 11. UX Reasoning

- **Visual hierarchy:** one H1 per page; eyebrow labels (mono, small, uppercase) always precede a heading to give scanning users a category before the claim — reduces cognitive load.
- **F-pattern:** primary CTA always sits at the end of the natural left-to-right, top-to-bottom scan for a section, never off to a side users skip.
- **CTA placement:** every section ends with exactly one primary action; never two competing primary buttons in the same viewport.
- **Scanning behaviour:** short paragraphs (max ~3 lines), generous line-height (1.6+), left-aligned body text (never centered body copy) for readability at speed.
- **Trust-building elements:** real address + embedded map, visible hours, phone/WhatsApp (not just a form), reviews with names, "local & independent" messaging, privacy policy link near the form.
- **Psychology:** the hang-tag price motif and stitch dividers make the site feel *specific to clothing*, which reads as more credible/crafted than a generic template — specificity signals authenticity.

---

## 12. Animation Guidance

**Use animation for:**
- Scroll reveal: fade + rise (16px), `320ms`, staggered ~60ms per grid item — confirms content loaded, guides eye downward.
- Hover micro-interactions: product image scale 1.04, card shadow, button lift 1px — confirms interactivity.
- Sticky nav background fade-in after 40px scroll — avoids a hard jump-cut.
- Mobile menu slide-in, `250ms` ease-out.
- Loading screen: one brief logo fade (≤600ms), once per session only.

**Avoid animation for:**
- Autoplaying carousels/sliders (kills scanability, accessibility risk) — reviews use manual snap-scroll/dots instead.
- Parallax on hero (perf risk on mid-range phones, motion-sickness risk).
- Text that animates in letter-by-letter or count-up numbers — reads as gimmicky on a trust-first local business site.
- Anything that fires on every scroll pass instead of once (`IntersectionObserver` with `once: true`).

All motion is wrapped in `@media (prefers-reduced-motion: reduce)` to disable non-essential transitions/animation.

---

## 13. Accessibility (WCAG 2.1 AA target)

- **Contrast:** all text pairings checked against tokens in §3 (body text ≥ 7:1, UI text ≥ 4.5:1, large/heading text ≥ 3:1).
- **Keyboard navigation:** logical tab order matching visual order; mobile menu traps focus while open and returns focus to the trigger on close; all interactive components (accordion, lightbox, forms) operable via `Enter`/`Space`/`Esc`/arrow keys where relevant.
- **ARIA:** `aria-label` on icon-only buttons (WhatsApp, back-to-top, hamburger, search); `aria-expanded` on the hamburger and accordion triggers; `aria-current="page"` on the active nav link and breadcrumb; `role="dialog" aria-modal="true"` on the gallery lightbox; live region (`aria-live="polite"`) on the contact form's success/error message.
- **Focus states:** a visible 2px Ink outline with 2px offset on every focusable element — never `outline: none` without an equally visible replacement.
- **Semantic structure:** one `<h1>` per page, `<nav>`, `<main>`, `<footer>` landmarks, `<section aria-labelledby="…">` per home section, real `<button>`/`<a>` elements (never `<div onclick>`), form `<label for>` on every input, descriptive `alt` text on every content image (empty `alt=""` on decorative images).

---

## 14. SEO

- **Heading hierarchy:** single H1 per page (brand claim on Home, page title elsewhere); H2 per section; never skip levels.
- **Meta tags:** unique `<title>` (`Page — D Fashion Mart`) and `<meta name="description">` per page (~150–160 chars), `<meta name="viewport">`, canonical `<link rel="canonical">`.
- **Open Graph / Twitter cards:** `og:title`, `og:description`, `og:image` (1200×630 store/hero photo), `og:type=website`, `og:locale`, `twitter:card=summary_large_image` — critical for link-preview trust when the shop is shared on WhatsApp/Instagram.
- **Schema.org (JSON-LD):** `LocalBusiness` (or `ClothingStore`) type on Home/Contact with `name`, `address`, `geo`, `telephone`, `openingHoursSpecification`, `sameAs` (social links), `priceRange`; `BreadcrumbList` on inner pages; `FAQPage` on the Contact FAQ block.
- **Image optimization:** modern formats (`webp`/`avif` with a `jpg` fallback via `<picture>`), explicit `width`/`height` to prevent layout shift, `loading="lazy"` below the fold, hero image `loading="eager" fetchpriority="high"`.
- **Performance:** self-host or preconnect Google Fonts, `font-display: swap`, minimal JS (no framework needed), CSS/JS minified for production, defer non-critical scripts, one Google Map **embed iframe with `loading="lazy"`** (or a static map image linking out, to avoid heavy third-party JS on first load).

---

## 15. Assets Checklist

| Asset | Notes |
|---|---|
| Logo (wordmark + mark) | SVG, works on both Ink and Linen backgrounds |
| Favicon set | 16/32/180 (apple-touch) + `favicon.svg` |
| Hero banner photo | 1 lifestyle photo, 4:5 crop mobile / wide crop desktop |
| Category photos (×4) | Women / Men / Kids / Accessories |
| Product photos | 4:5 ratio, consistent lighting/background across catalogue |
| Store/gallery photos | Interior, exterior/storefront, folded-stock detail shots, styling shots |
| Owner/team photo | For About page trust section |
| Review avatars (optional) | Initials-based placeholder is fine if real photos unavailable |
| Social icons | Instagram, Facebook, WhatsApp (line-icon set) |
| Map | Google Maps embed (store's real place ID) |
| OG share image | 1200×630 |

**Placeholders used in this build:** all image `src`s point to `https://placehold.co/` sized boxes labelled with what should go there, so the intern/owner can drop real photos in at the exact same filenames under `frontend/assets/images/...` without touching the HTML. See `frontend/assets/images/README.md`.

---

## 16. Development Handoff Notes

- Pure **HTML / CSS / vanilla JS** front end (matches the required folder structure and keeps it buildable by a student intern — no bundler, no framework, no build step required to run it).
- Every page **inlines** its own navbar/footer markup (kept byte-identical across pages) rather than fetching partials at runtime — this avoids CORS/`file://` issues and keeps the site fully functional even opened directly from disk. `frontend/components/*.html` hold the canonical copy of each shared block as the single source of truth to copy from when editing.
- Design tokens live at the top of `frontend/css/style.css` as CSS custom properties — change six color values and two font names to reskin the whole site.
- `frontend/js/main.js` — nav, scroll reveal, back-to-top, WhatsApp fab, accordion, loading screen (shared on every page).
- `frontend/js/gallery.js` — lightbox (Gallery page only).
- `frontend/js/contact-form.js` — validation + submit (Contact page + Home contact form).
- `frontend/utils/dom-helpers.js` — tiny shared helpers, loaded before the other scripts.
- Backend is an optional minimal **Node/Express** API (`backend/`) with a single `POST /api/contact` endpoint the form calls; if it's not running, the form falls back to a `mailto:` link so the site still "works" for a student deployment on static hosting (e.g. GitHub Pages) with no backend at all.

---

## 17. Changelog — Enhancement Pass

A follow-up pass added, on top of the original build:

- **Visual polish:** deeper hover/lift shadows on product & review cards, a looping trust marquee under the hero, image fade-in on load, touch active-states for mobile taps.
- **New content:** a Brand Story block (Home), an upgraded manual testimonials carousel with arrows/dots/keyboard/swipe, the Store Gallery preview restyled as an Instagram-style feed with a follow CTA, and a Size Guide modal (Women/Men/Kids tabs) on Collections.
- **Mobile:** a full-width sticky Call/WhatsApp bar shown only under 640px (replacing the round WhatsApp button on small screens), tighter mobile spacing rhythm, horizontally-scrollable filter chips.
- **Performance/SEO:** hero image preloaded (`<link rel="preload">`) for LCP, all page scripts marked `defer`, `robots.txt` + `sitemap.xml` added, `BreadcrumbList` JSON-LD added to every inner page, extra favicon sizes (16/32/apple-touch) linked from every page, `theme-color` meta added.
- **Image formats:** confirmed JPG/PNG (and WebP/GIF/SVG) all work via plain `<img>` — no code changes needed. Two homepage images (`hero.jpg`, `linen-shirt.png`) now point at real local files instead of `placehold.co` as a working example of both formats — see `frontend/assets/images/README.md`.
