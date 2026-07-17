# Image Assets

Every image in this site is currently a **placeholder** — most are
`placehold.co` URLs referenced directly in the HTML, and `og-share.jpg`
here is a generated stand-in. Nothing needs to be treated as final;
the site is fully previewable without any real photos.

**Both JPG and PNG work with zero code changes.** As proof, two images
on the homepage are already wired to real local files instead of
`placehold.co`:
- `hero/hero.jpg` — the homepage hero photo (a `.jpg`)
- `products/linen-shirt.png` — the first featured product photo (a `.png`)

Open `frontend/index.html` and search for either filename to see
exactly how they're referenced — it's just a normal `<img src="...">`
path, the same as any other image on the site. `.webp` and `.gif`
work the same way too. To use your own photo, replace one of these
two files (keep the same filename) or point any `<img src="...">` in
the HTML at a new file of your own.

## Folders

- `hero/` — homepage hero banner (recommend 1000×1250 or larger, portrait 4:5)
- `categories/` — the 4 category tiles (Women / Men / Kids / Accessories), 600×800
- `products/` — product photography, 500×625 (4:5 ratio), consistent lighting/background
- `gallery/` — store & styling photos for the Gallery page and Home preview grid
- `store/` — storefront / interior / owner photos used on Home & About
- `og-share.jpg` — 1200×630 social share preview (WhatsApp/Instagram/Facebook link previews)
- `../favicon/` — favicon set (currently a generated "F." monogram in the brand colors)

## How to swap a placeholder for a real photo

1. Drop your photo into the matching folder above, e.g.
   `frontend/assets/images/products/linen-shirt.jpg`.
2. In the relevant `.html` file, replace the `https://placehold.co/...`
   `src` with your local path:
   `src="/assets/images/products/linen-shirt.jpg"`.
3. Update the `width`/`height` attributes to your real image's
   dimensions (prevents layout shift), and write a specific, descriptive
   `alt` — not "image1.jpg", but what's actually in the photo.
4. Replace `og-share.jpg` with a real photo for link previews once you
   have one — keep the 1200×630 ratio.
5. Optionally replace `frontend/assets/favicon/*` with the real shop
   logo if one exists (same file names, so no HTML changes needed).
