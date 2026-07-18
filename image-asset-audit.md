# D Fashion Mart — Image Asset Audit

Audit only — no code was changed. Every number below comes from the actual CSS (`frontend/css/style.css`) and HTML, not generic defaults. Where I say "computed," I mean I traced the real container width through `.container`'s 1280px max-width, its responsive padding, and the grid's actual column/gap values at that breakpoint.

**Format policy (applies to every photo below unless noted):** shoot/export as JPEG, quality ~80–85%. Optionally also export a WebP copy of the same crop for a `<picture>` source — it's a bonus, not a requirement, since plain JPEG at that quality already performs fine here. Don't over-compress; several of these images (hero, shopfront, gallery) are large enough on desktop that heavy compression artifacts will show. PNG is only appropriate for the logo (already done) and any future flat-color/transparent graphic. SVG is only appropriate for the favicon/logo, never for photography.

---

## 1. Home page (`index.html`)

### 1.1 Hero photo
- **Container:** `.hero__media img`, inside `.hero__grid` (2-col at ≥768px, single stacked column below)
- **Current file:** `assets/images/hero/hero.jpg` (already placed — keep this exact path/filename, no HTML change needed)
- **CSS behavior:** `object-fit: cover`. **Two different aspect ratios by breakpoint** — this is a real dual-crop case:
  - **Desktop/tablet (≥768px):** `aspect-ratio: 4/5` (portrait), `max-height: 680px`
  - **Mobile (<768px):** `aspect-ratio: 4/3` (landscape), no max-height
- **Computed display width:** ~552px max at 1280px desktop (hero column = (1152px content − 48px gap) / 2); ~280–374px on mobile (single full-width column, container padding subtracted).
- **Recommended source dimensions:** **1400 × 1750px** (4:5). This single portrait source comfortably covers both crops — the 4:3 mobile crop is just a shorter horizontal slice out of the same frame, so no second photo is required.
- **Orientation:** Portrait (source) — displayed portrait on desktop, landscape-cropped on mobile.
- **Format:** JPEG.
- **Used as:** `<img>`, plain (not a background-image).
- **Mobile crop risk: YES — meaningful.** Going from 4:5 to 4:3 removes a real chunk off the top and/or bottom.
- **Safe area / composition:** Keep the subject (person modeling the outfit) vertically centered in the frame with generous headroom above and footroom below — roughly the middle 60% of the frame's height should contain everything essential (face, outfit, any product detail). Don't compose with the subject's feet at the very bottom edge or their head near the very top; both are the first things a 4:3 mobile crop will cut. Keep them horizontally centered too, not off to one side — no code currently shifts the crop position (`object-position` isn't set, so it defaults to center), so off-center subjects will visibly drift toward one edge on mobile.
- **`<picture>`/`srcset` recommendation:** Not required for correctness (one image + CSS aspect-ratio already handles both crops), but if you want the *best* possible mobile crop specifically (rather than an automatic center-crop of the portrait source), use `<picture>` with a separately-cropped landscape source for mobile. Optional polish, not a blocker.

### 1.2 Category tiles (4 cards: Ethnic·Women, Ethnic·Men, Western Wear, Footwear)
- **Container:** `.category-card img`, inside `.categories-grid`
- **Current files:** placehold.co placeholders → replace with real files
- **Recommended path/filenames:**
  - `assets/images/categories/ethnic-women.jpg`
  - `assets/images/categories/ethnic-men.jpg`
  - `assets/images/categories/western-wear.jpg`
  - `assets/images/categories/footwear.jpg`
- **CSS behavior:** `object-fit: cover`, fixed `aspect-ratio: 3/4` (portrait) at **every** breakpoint — no dual-crop concern, same ratio on mobile and desktop.
- **Computed display width:** ~134–181px (mobile, 2-col), ~209–286px (tablet, 3-col), ~206–264px (desktop, 4-col).
- **Recommended source dimensions:** **900 × 1200px** (3:4). Comfortably covers the ~264px max computed display width at 2×+ retina density.
- **Orientation:** Portrait.
- **Format:** JPEG.
- **Used as:** `<img>` with a CSS gradient overlay (`.category-card::after`) darkening the bottom ~60% so the white label text stays legible — **compose the shot knowing the bottom third will be dimmed**; don't put essential visual detail there.
- **Mobile crop risk:** No — same ratio at all sizes, so what you see on desktop is what you see on mobile, just smaller.
- **Safe area:** Keep the main subject (racks, category signage, mannequin) in the upper two-thirds of the frame. The label text ("Ethnic · Women" etc.) sits at the bottom over the gradient, so keep that zone visually simple/uncluttered rather than putting a face or important detail there.

### 1.3 Featured products (4 cards: Saree, Sherwani, Casual Shirt, Juttis & Mojaris)
- **Container:** `.product-card__frame img`
- **Current files:** 3 placehold.co placeholders + one real file already in place (`assets/images/products/linen-shirt.png` — keep this filename per the existing convention, or rename consistently, your call)
- **Recommended path/filenames:** `assets/images/products/saree.jpg`, `sherwani.jpg`, `casual-shirt.jpg` (or keep `linen-shirt.png`), `juttis-mojaris.jpg`
- **CSS behavior:** `object-fit: cover`, fixed `aspect-ratio: 4/5` (portrait) at every breakpoint. No dual-crop concern.
- **Computed display width:** same grid math as categories — ~134–181px mobile, up to ~264px desktop.
- **Recommended source dimensions:** **800 × 1000px** (4:5). This is above the strict computed minimum (528px) — worth the headroom for product photography specifically, since these are also the images most likely to get reused (social posts, WhatsApp Catalog, etc.) beyond just this grid.
- **Orientation:** Portrait.
- **Format:** JPEG. Consistent lighting/background across all four is worth more than any single technical spec — mixed backgrounds will be the most visually obvious inconsistency in this grid.
- **Used as:** `<img>` inside a card that also gets a `.hang-tag` badge absolutely positioned at `top: var(--space-4); right: -8px` — keep the top-right corner relatively uncluttered so the badge doesn't sit over important garment detail.
- **Mobile crop risk:** No — consistent ratio.
- **Safe area:** Product centered, filling most of the frame with a small even margin on all sides (avoid tight crops at the source — `object-fit: cover` will crop further if the card's rendered proportions ever shift, so don't compose edge-to-edge).

### 1.4 "In The Shop" feature image
- **Container:** a plain `<img>` in the "meet the shop" / owner section (700×560 placeholder currently)
- **Recommended path/filename:** `assets/images/store/in-the-shop.jpg`
- **CSS behavior:** I didn't find a dedicated CSS rule keying off a unique class for this one specifically beyond the generic `data-fade`/`data-reveal` treatment — it renders at its natural `width`/`height` attributes (700×560, landscape) scaled responsively via the page's normal image reset (`max-width:100%`). No aspect-ratio lock, so keep the source at the same 5:4-ish landscape ratio as the placeholder to avoid any layout shift.
- **Recommended source dimensions:** **1400 × 1120px** (5:4 landscape).
- **Orientation:** Landscape.
- **Format:** JPEG.
- **Used as:** `<img>`.
- **Mobile crop risk:** Low — it scales as a whole image rather than being cropped by a fixed-ratio container, so composition just needs to read reasonably at small sizes.
- **Safe area:** No special constraint — standard "don't put the essential action in the extreme corners" advice applies.

### 1.5 Instagram-style preview grid (5 images: Storefront, Interior, Folded Stock, Fitting Room, Styling)
- **Container:** `.ig-feed__item img`
- **CSS behavior:** `object-fit: cover`, fixed `aspect-ratio: 1/1` (square) at every breakpoint.
- **Computed display width:** 3-col at <640px, 5-col at ≥640px — roughly 90–150px per tile depending on viewport.
- **Recommended source dimensions:** **600 × 600px** (1:1).
- **⚠️ Important cross-page duplicate:** these same five subjects — Storefront, Interior, Folded Stock, Fitting Room, Styling — **also appear on the Gallery page** (section 4 below), but cropped to **4:5 portrait**, not 1:1 square. If you want to reuse the same five photos in both places (recommended, since it's the same store), **shoot each with a generous margin around the subject** so it can be safely cropped to *either* a tight square or a taller 4:5 without losing anything important — keep the subject in the center ~70% of the frame both horizontally and vertically. If you'd rather not compromise either crop, treat these as 10 separate photos (5 square-composed, 5 portrait-composed) instead.
- **Format:** JPEG.
- **Mobile crop risk:** No — 1:1 at all breakpoints on this page specifically (the cross-page concern above is the real one).
- **Safe area:** Center-weighted subject, since a square crop has no "long axis" to play with.

---

## 2. About page (`about.html`)

### 2.1 Shopfront / storefront image
- **Container:** `.about-hero img`
- **Current file:** placehold.co placeholder (700×875)
- **Recommended path/filename:** `assets/images/store/shopfront.jpg`
- **CSS behavior:** `object-fit: cover`. **Same dual-ratio pattern as the Home hero:**
  - **Desktop/tablet (≥768px):** `aspect-ratio: 4/5` (portrait), `max-height: 640px`
  - **Mobile (<768px):** `aspect-ratio: 4/3` (landscape), no max-height
- **Computed display width:** same as hero — ~552px max desktop, ~280–374px mobile.
- **Recommended source dimensions:** **1400 × 1750px** (4:5) — same reasoning as the Home hero: one portrait source safely covers both crops if the storefront itself is centered in the frame with margin above/below.
- **Orientation:** Portrait (source).
- **Format:** JPEG.
- **Used as:** `<img>`.
- **Mobile crop risk: YES.** Same magnitude as the hero image.
- **Safe area:** The full storefront (signage/entrance) should sit in the vertical middle of the frame with sky/street visible above and below as buffer — don't compose so the shop sign is right at the top edge, since that's exactly what the 4:3 mobile crop trims first.

### 2.2 Owner portrait
- **Container:** `.owner-note img`
- **Current file:** placehold.co placeholder (200×200)
- **Recommended path/filename:** `assets/images/store/owner-portrait.jpg`
- **CSS behavior:** displayed as a fixed **88×88px circle** (`border-radius: 50%`) at every breakpoint — `object-fit: cover`, fixed 1:1, no dual-crop concern.
- **Computed display width:** 88px flat (not responsive/grid-based — this one's a fixed CSS pixel size).
- **Recommended source dimensions:** **400 × 400px** (1:1) — well above the ~176px (2×) minimum, since a face crop benefits from extra resolution insurance.
- **Orientation:** Square.
- **Format:** JPEG.
- **Used as:** `<img>`, masked circular via CSS.
- **Mobile crop risk:** No — same 88×88px circle on every device.
- **Safe area: face-centered, close crop.** Because the final shape is a small circle, keep the face filling most of the frame with even margin — a distant full-body shot will read as a tiny, unrecognizable dot at 88px.

---

## 3. Collections page (`collections.html`)

### 3.1 Product grid (10 cards, same visual component as Home's featured products)
- **Container:** `.product-card__frame img` — identical CSS to section 1.3 above (fixed `aspect-ratio: 4/5` at every breakpoint, `object-fit: cover`)
- **Current files:** placehold.co placeholders for all 10
- **Recommended path pattern:** `assets/images/products/<slug>.jpg`, e.g. `designer-saree.jpg`, `anarkali-lehenga.jpg`, `kurti-kurta-set.jpg`, `sherwani.jpg` (can reuse the Home page one), `kurta-pyjama.jpg`, `dresses-jumpsuits.jpg`, `casual-formal-shirts.jpg` (can reuse Home's `casual-shirt.jpg`), `juttis-mojaris.jpg` (reuse from Home), `sneakers-canvas.jpg`
- **Recommended source dimensions, ratio, format, safe area:** identical to section 1.3 — **800 × 1000px, 4:5, JPEG**, product centered with even margin.
- **Mobile crop risk:** No — fixed ratio at all breakpoints.
- **Note:** four of these ten product slots overlap conceptually with Home's featured products (Sherwani, Casual Shirt, Juttis & Mojaris) — reuse the same source file rather than shooting/sourcing twice.

---

## 4. Gallery page (`gallery.html`)

### 4.1 Gallery grid (8 images: Storefront, Interior, Folded Stock, Fitting Room, Styling, Denim Wall, Accessories, Checkout)
- **Container:** `.gallery-card img`
- **Current files:** placehold.co placeholders with **inconsistent source dimensions** (500×500 up to 500×700) — this was the actual cause of the "oversized cards" bug fixed in an earlier pass; the container now has a **fixed `aspect-ratio: 4/5`** regardless of source image proportions, so this is resolved at the CSS level already. You still want to *shoot* at 4:5 rather than rely on the crop, for quality.
- **Recommended path pattern:** `assets/images/gallery/<slug>.jpg`
- **CSS behavior:** `object-fit: cover`, fixed `aspect-ratio: 4/5` at every breakpoint (added in a prior fix — previously had none, which was the root cause of that earlier bug). No dual-crop concern now.
- **Computed display width:** ~134–181px mobile (2-col), ~209–286px tablet (3-col, inherited from the 640px rule), up to ~264px desktop (4-col).
- **Recommended source dimensions:** **800 × 1000px** (4:5).
- **Orientation:** Portrait.
- **Format:** JPEG.
- **Used as:** `<img>`, `cursor: zoom-in` — clicking opens a lightbox (`.lightbox img`) that reuses the **same file** at up to `max-width: min(90vw, 1000px)` / `max-height: 85vh` with `object-fit: contain` (not cover — the full uncropped image shows here). **This means each gallery photo needs to look good both cropped-to-4:5 in the grid AND uncropped/full-frame in the lightbox** — don't compose so tightly that the 4:5 grid crop is the only "acceptable" framing; leave enough surrounding context that the full original frame also reads well.
- **Mobile crop risk:** No, for the grid itself (fixed ratio). The lightbox view is uncropped by design.
- **Safe area:** Center-weighted, generous margin — same reasoning as 4.1's cross-referenced note about the Home page's IG-preview duplicates (Storefront, Interior, Folded Stock, Fitting Room, Styling appear on both pages at different ratios — see section 1.5).

---

## 5. Contact page (`contact.html`)

**No photographic images.** The only visual element is a Google Maps `<iframe>` embed (`.map-frame iframe`) — not a photo asset, nothing to prepare here. `object-fit`/`aspect-ratio` don't apply to an iframe the way they do a photo; the map frame already has its own `aspect-ratio: 4/3` container that's unrelated to photography.

---

## 6. Shared components

### 6.1 Logo
- **Status:** already done — `assets/images/logo.png`, used in navbar (40px tall) and footer (36px tall). No further action.

### 6.2 Social share preview (`og-share.jpg`)
- **Used on:** every page's `<meta property="og:image">` and the homepage's JSON-LD `image` field — this is what shows up when a link to the site is shared on WhatsApp/Instagram/Facebook.
- **Current file:** already exists at the correct spec — **1200×630px**, matches the standard Open Graph ratio (1.91:1). No change needed unless you want to replace the generated placeholder with a real photo (e.g., the shopfront or a styled flat-lay) at the same 1200×630 dimensions.
- **Format:** JPEG.
- **Safe area:** keep essential content (logo/text if any) away from the extreme edges — some platforms crop OG images slightly differently.

### 6.3 Favicon
- **Status:** out of scope for this audit (not a content photograph) — currently a generated monogram (`favicon.svg` + PNG fallbacks + apple-touch-icon). Not mentioned in your request; flagging only for completeness. Let me know if you want this swapped for a simplified mark based on your real logo.

### 6.4 Lightbox (Gallery page)
- Not a separate asset — `<img src="" alt="">` is populated dynamically by `gallery.js` when a gallery card is clicked; it reuses whichever gallery image (section 4.1) was selected. No separate file needed.

### 6.5 Background images (CSS)
- The only `background-image` usage in the entire stylesheet is a repeating-gradient "stitch" divider pattern (decorative, code-generated, not a photo). **There are no CSS background-image photo placements anywhere on the site** — every photograph is a real `<img>` element. This matters for your prep: you don't need any image sized/cropped specifically for a CSS `background-size` role.

---

## 7. Master specification table

| Page | Section | Image Purpose | Recommended File Name | Source Dimensions | Aspect Ratio | Orientation | Format | Object Fit | Mobile Crop Risk | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | Hero | Hero photo | `hero/hero.jpg` (existing) | 1400×1750 | 4:5 | Portrait | JPEG | cover | **Yes** | Dual ratio: 4:5 desktop / 4:3 mobile. Center subject, generous head/footroom. |
| Home | Categories ×4 | Category tiles | `categories/ethnic-women.jpg`, `ethnic-men.jpg`, `western-wear.jpg`, `footwear.jpg` | 900×1200 | 3:4 | Portrait | JPEG | cover | No | Bottom ~60% gets a dark gradient overlay for label text — keep it visually simple there. |
| Home | Featured products ×4 | Product shots | `products/saree.jpg`, `sherwani.jpg`, `casual-shirt.jpg`, `juttis-mojaris.jpg` | 800×1000 | 4:5 | Portrait | JPEG | cover | No | Reused on Collections page. Consistent lighting/background across all. |
| Home | "In The Shop" | Lifestyle/feature photo | `store/in-the-shop.jpg` | 1400×1120 | 5:4 | Landscape | JPEG | (natural scale) | Low | No fixed-ratio container; scales as a whole image. |
| Home | IG preview grid ×5 | Store lifestyle thumbnails | `store/storefront.jpg`, `interior.jpg`, `folded-stock.jpg`, `fitting-room.jpg`, `styling.jpg` | 600×600 | 1:1 | Square | JPEG | cover | No (on this page) | **Same subjects reused on Gallery at 4:5** — shoot with margin to support both crops, or shoot twice. |
| About | Shopfront | Storefront exterior | `store/shopfront.jpg` | 1400×1750 | 4:5 | Portrait | JPEG | cover | **Yes** | Same dual-ratio pattern as Home hero. |
| About | Owner portrait | Owner headshot | `store/owner-portrait.jpg` | 400×400 | 1:1 | Square | JPEG | cover | No | Displayed at fixed 88×88px circle — close, face-filling crop. |
| Collections | Product grid ×10 | Product shots | `products/<slug>.jpg` | 800×1000 | 4:5 | Portrait | JPEG | cover | No | Same component/spec as Home featured products; 4 slots overlap and can reuse those files. |
| Gallery | Gallery grid ×8 | Store lifestyle photos | `gallery/<slug>.jpg` | 800×1000 | 4:5 | Portrait | JPEG | cover (grid) / contain (lightbox) | No | Also opens full-frame (uncropped) in lightbox — don't crop so tight the 4:5 view is the only good framing. 5 of 8 subjects overlap with Home's IG grid. |
| Contact | — | — | — | — | — | — | — | — | — | No photographic images on this page. |
| Shared | Logo | Navbar/footer mark | `logo.png` (existing) | — | — | — | PNG | — | No | Already in place. |
| Shared | Social share | OG/link preview image | `og-share.jpg` (existing) | 1200×630 | 1.91:1 | Landscape | JPEG | — | No | Already correctly sized. |

---

## 8. Cross-page duplicate-photo callouts (explicit, as requested)

1. **Home hero (`hero.jpg`) and About shopfront (`shopfront.jpg`)** both need a **different crop for mobile vs. desktop** (4:5 → 4:3). One well-composed portrait source works for both if the subject is centered with margin; no second file is strictly required.
2. **Home's IG-preview grid (5 images, 1:1) and Gallery's grid (same 5 subjects + 3 more, 4:5)** use **different aspect ratios for what's conceptually the same photo set**. Decide up front whether you're shooting each subject once (with margin to support both crops) or twice (one square-composed, one portrait-composed).
3. **Featured products on Home (Sherwani, Casual Shirt, Juttis & Mojaris) and their counterparts on Collections** use the **identical CSS component and ratio (4:5)** — these should just be the same file reused via the same path, not shot/sourced separately.
4. **No image on this site needs `srcset`/multiple resolutions to function correctly** — none of the containers are large enough (max computed display width is ~552px, hero only) to justify serving multiple pixel densities beyond a single 2×-ready source. `<picture>` is optional polish for the two dual-ratio images (hero, shopfront), not a requirement.

---

## 9. Final photography/prep checklist

- [ ] **Hero photo** — portrait, subject centered with generous head/footroom (needs to survive a 4:3 mobile re-crop)
- [ ] **4 category tiles** — portrait, subject in upper two-thirds (bottom third gets a dark overlay)
- [ ] **4 featured products** (Home) — portrait, consistent lighting/background, product filling most of frame with small margin
- [ ] **1 "In the shop" lifestyle photo** — landscape, no special crop constraint
- [ ] **5 store lifestyle photos** (Storefront/Interior/Folded Stock/Fitting Room/Styling) — decide once: shoot with margin for dual square+portrait use, or plan to shoot each twice
- [ ] **Shopfront photo** (About) — portrait, same dual-crop treatment as the hero
- [ ] **Owner portrait** — square, close face crop, even margin
- [ ] **Up to 6 additional product photos** (Collections page items not already covered by Home's 4) — portrait, same spec as featured products
- [ ] **3 additional gallery-only photos** (Denim Wall, Accessories, Checkout) — portrait, same spec as the 5 shared lifestyle photos
- [ ] Export everything as JPEG, ~80–85% quality, sRGB color profile
- [ ] Keep file names lowercase, hyphenated, descriptive (matching the paths above) — makes the eventual HTML swap a pure find-and-replace
- [ ] Don't compress the hero/shopfront images as aggressively as the small grid thumbnails — they render largest on screen and artifacts will be most visible there

---

**Reminder:** nothing in the codebase was touched for this audit. When you're ready to wire the real files in, send them over (or tell me the paths if you've already dropped them into the project) and I'll do the `<img src>` swap and remove the placeholder text/URLs.
