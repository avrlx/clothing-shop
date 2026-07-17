# D Fashion Mart — Website

A modern, minimal, premium website for a local clothing shop, built as a
social-internship project. Pure **HTML / CSS / vanilla JS** frontend
(no build step, no framework) with an optional minimal **Node/Express**
backend for the contact form.

The full design brief, sitemap, wireframes, design system, accessibility
and SEO notes live in **[`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md)** —
read that first if you're implementing or extending this.

## Project structure

```
clothing-shop/
│
├── frontend/
│   ├── assets/        # images (currently placeholders — see assets/images/README.md), icons, favicons
│   ├── components/    # canonical navbar.html / footer.html reference snippets
│   ├── css/           # style.css — the whole design system in one file
│   ├── js/            # main.js, gallery.js, contact-form.js
│   ├── pages/         # about, collections, gallery, contact, privacy, 404
│   ├── utils/          # dom-helpers.js — small shared JS helpers
│   └── index.html     # homepage
│
├── backend/
│   ├── controllers/   # contactController.js
│   ├── middleware/    # validateContact.js, errorHandler.js
│   ├── routes/        # contactRoutes.js
│   ├── config/        # config.js (env vars)
│   ├── services/      # emailService.js
│   ├── utils/         # logger.js
│   └── server.js      # Express entry point
│
├── docs/
│   └── DESIGN_SYSTEM.md   # full design brief + design system
│
├── .env.example
├── .gitignore
├── package.json
└── LICENSE
```

## Running it

Every page uses relative paths for CSS/JS/images, so you can open
`frontend/index.html` directly in a browser (double-click it) and the
whole site — styling, navigation, scroll effects, the gallery lightbox
— works immediately, no server required.

The one thing that needs a server is the contact form actually
delivering a message through `POST /api/contact`; without the backend
running it automatically falls back to opening the visitor's email app
instead (see `frontend/js/contact-form.js`), so the form still "works"
either way.

**Option A — with the included backend (recommended for the real deployment):**

```bash
npm install
cp .env.example .env
npm start
```

Then open `http://localhost:3000`. This also enables the contact form
to actually deliver messages (see `backend/services/emailService.js` —
it logs submissions to the console until you add real SMTP details).

**Option B — frontend only, any static server:**

```bash
cd frontend
npx serve .
# or: python3 -m http.server 8080
```

The contact form will still work without the backend running — it
automatically falls back to opening the visitor's email app via a
`mailto:` link (see `frontend/js/contact-form.js`).

## Adding real content

- **Images:** every photo is currently a labelled placeholder. See
  `frontend/assets/images/README.md` for exactly what to drop where.
- **Shop details:** real phone (+91 79053 31239), email (ganuj4769@gmail.com),
  address (NH 27, near Corporation Bank, Junab Ganj, Sarai Sahjadi, U.P.
  226401) and hours (9:00 AM – 9:00 PM daily) are now wired into the
  navbar/footer/contact blocks of every page and the Google Maps embeds
  in `pages/contact.html` and `index.html` (using Plus Code `MR75+W7P`).
  Swap the map embed for an exact pinned location once you have one.
- **Brand name:** "D Fashion Mart" now appears in the `<title>` tags,
  the `navbar__logo`, and the footer — `docs/DESIGN_SYSTEM.md` may still
  reference the old placeholder name and is worth a pass. A real SVG
  logo asset can replace the current text wordmark once provided.
- **Colors/fonts:** every design token lives at the top of
  `frontend/css/style.css` under `:root` — change those and the whole
  site restyles.

## Tech notes

- No build tools, bundlers, or frameworks required for the frontend —
  intentionally, so an intern can edit any file directly.
- Google Fonts: Cormorant Garamond (headings), Work Sans (body), IBM
  Plex Mono (price tags / eyebrow labels).
- Accessibility: keyboard-navigable nav/lightbox/accordion, visible
  focus states, semantic landmarks, `prefers-reduced-motion` respected
  throughout. See §13 of the design doc for the full checklist.
