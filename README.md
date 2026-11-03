# Secure Services

React + Framer Motion catalog site (Create React App).

```bash
npm install
npm run dev     # same as npm start, opens http://localhost:3000
npm run build   # production build
```

- Business details (phone, WhatsApp, email, city): `src/config.js`
- Products: `src/data/products.js` (id, code, image, category)
- Category names/covers/tile sizes: `src/data/catalog.js`
- Colors and fonts: top of `src/index.css`

## Hero background video

Put your own looping clip at `public/hero.mp4` (landscape, muted, ideally under 8 MB, 1080p, 10-20 s).
It fades in behind the hero automatically. Without it, the animated camera-beam backdrop is shown.
