# Aditya Dixit — Portfolio Website

A production-ready, single-page portfolio built with **Vite**, **React 18**, and **TypeScript**. The site uses GSAP scroll animations, Lenis smooth scrolling, Three.js particles, and a dark void aesthetic with cyan accents.

## Features

- **Hero** — Three.js particle field, rotating role titles, live clock, social links
- **About** — Scroll-pinned narrative with portrait and stats
- **Skills** — Category tabs with animated skill lists
- **Projects** — Horizontal scroll gallery with filterable project cards
- **Education** — School and college timelines with images
- **Timeline** — Experience and leadership milestones
- **GitHub Stats** — Profile highlights and activity metrics
- **Testimonials** — Client and peer quotes
- **Contact** — Email scramble effect, contact form, resume download, social cards
- **UX polish** — Custom cursor, grain overlay, preloader, scroll progress bar, lazy-loaded sections
- **Responsive** — Mobile-first layout across all breakpoints
- **Accessible** — Respects `prefers-reduced-motion`

## Tech Stack

| Layer | Technology |
|-------|------------|
| Build tool | Vite 6 |
| Framework | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Scroll | Lenis + GSAP ScrollTrigger |
| Animation | GSAP, Framer Motion |
| 3D | Three.js |
| Icons | react-icons |
| Fonts | Space Grotesk + Inter |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Aditya-dxt/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on `src/` |

### Build for Production

```bash
npm run build
npm run preview
```

The output is written to the `dist/` directory.

## Project Structure

```
portfolio/
├── public/
│   ├── images/              # Portrait, education photos, project screenshots
│   ├── resume/              # Resume PDF
│   └── manifest.json
├── src/
│   ├── App.tsx              # Root layout, lazy-loaded sections
│   ├── main.tsx             # React entry point
│   ├── index.css            # Tailwind + global styles
│   ├── context/
│   │   └── LenisContext.tsx # Smooth scroll + ScrollTrigger proxy
│   ├── components/          # Section and UI components
│   ├── data/
│   │   └── portfolio.ts     # All portfolio content (single source of truth)
│   ├── hooks/               # Cursor, magnet, scramble effects
│   └── lib/
│       └── gsap.ts          # GSAP plugin registration
├── index.html               # HTML shell + meta tags
└── vite.config.ts
```

## Updating Content

All portfolio data lives in **`src/data/portfolio.ts`**. Edit this file to update:

- Personal info (name, bio, email, location, social links)
- Navigation links
- Skills and categories
- Projects (title, description, tech stack, links, images)
- Education (school, college, timelines)
- Timeline / experience entries
- GitHub stats
- Testimonials
- Resume path (`resumePath`)

Place new images under `public/images/` and reference them with paths like `/images/your-file.jpg`.

## Contact Form

The contact form currently shows a demo success message on submit. To connect a real backend:

1. Create a form at [Formspree](https://formspree.io) (or use your own API)
2. Update the `handleSubmit` function in `src/components/Contact.tsx` to POST to your endpoint

## Deployment

### Vercel

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify

1. Push the repo to GitHub
2. Import the project on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages / static hosts

Run `npm run build` and upload the contents of `dist/` to any static file host.

## License

MIT License — feel free to use this as a template for your own portfolio.

---

Built with ❤️ by [Aditya Dixit](https://github.com/Aditya-dxt)
