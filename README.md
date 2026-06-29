<div align="center">

# ✦ Aditya Dixit — Portfolio

**A high-performance, visually immersive personal portfolio**  
built with React 18 · TypeScript · Three.js · GSAP · Tailwind CSS

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-aditya--dixit.vercel.app-cyan?style=for-the-badge)](https://aditya-dixit.vercel.app)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 🖼️ Preview

> *(Add a screenshot here — drag a PNG into this file on GitHub)*

![Portfolio Preview](public/images/preview.png)

---

## ✨ Highlights

- 🌌 **Three.js particle field** in the hero with rotating role titles and a live clock
- 🎬 **GSAP ScrollTrigger** animations — scroll-pinned sections, horizontal project gallery
- 🖱️ **Lenis smooth scrolling** with a custom cursor and magnetic hover effects
- 🔤 **Email scramble effect** and animated contact form in the Contact section
- 🧱 **Single source of truth** — all content lives in `src/data/portfolio.ts`
- 📱 **Fully responsive** with mobile-first layout and `prefers-reduced-motion` support
- ⚡ **Lazy-loaded sections**, grain overlay, preloader, scroll progress bar

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Build Tool | Vite 6 |
| Framework | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| 3D Graphics | Three.js |
| Animations | GSAP + Framer Motion |
| Smooth Scroll | Lenis + GSAP ScrollTrigger |
| Icons | react-icons |
| Fonts | Space Grotesk + Inter |
| Deployment | Vercel |

---

## 📂 Project Structure
portfolio/

├── public/

│   ├── images/              # Photos, project screenshots

│   └── resume/              # Resume PDF

├── src/

│   ├── components/          # All section & UI components

│   ├── data/

│   │   └── portfolio.ts     # ← Edit ALL your content here

│   ├── hooks/               # Cursor, magnet, scramble effects

│   ├── context/

│   │   └── LenisContext.tsx # Smooth scroll setup

│   └── App.tsx              # Root layout with lazy-loaded sections

└── vite.config.ts

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Aditya-dxt/Portfolio.git
cd Portfolio

# Install
npm install

# Develop
npm run dev        # → http://localhost:5173

# Build
npm run build
npm run preview
```

---

## ✏️ Customizing Content

**All portfolio data lives in one file: `src/data/portfolio.ts`**

Edit it to update your name, bio, skills, projects, education, timeline, social links, and resume path — no hunting through components needed.

| Section | What to edit |
|---|---|
| Hero / About | `name`, `bio`, `roles`, `socialLinks` |
| Skills | `skills` array with categories |
| Projects | `projects` array with title, stack, links, images |
| Education | `education` with school and college entries |
| Experience | `timeline` milestones |
| Contact | `email`, `resumePath` |

---

## 🌐 Sections

| # | Section | Description |
|---|---|---|
| 1 | Hero | Three.js particles, rotating roles, live clock |
| 2 | About | Scroll-pinned narrative with stats |
| 3 | Skills | Category tabs with animated lists |
| 4 | Projects | Horizontal scroll gallery with filters |
| 5 | Education | School & college timelines |
| 6 | Timeline | Experience & leadership milestones |
| 7 | GitHub Stats | Profile metrics & activity |
| 8 | Testimonials | Client and peer quotes |
| 9 | Contact | Form, resume download, social cards |

---

## 📬 Connecting the Contact Form

The form currently shows a demo success state. To make it live:

1. Create a free endpoint at [Formspree](https://formspree.io)
2. Update `handleSubmit` in `src/components/Contact.tsx` to POST to your endpoint

---

## 📦 Deployment

Works on any static host. Recommended: **Vercel** (zero config).

```bash
npm run build   # Output goes to /dist
```

Just connect your GitHub repo on [vercel.com](https://vercel.com) — it auto-detects Vite.

---

## 📜 License

MIT — feel free to use this as a template for your own portfolio. A credit or star ⭐ is appreciated!

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/Aditya-dxt">Aditya Dixit</a>
  <br/>
  <a href="https://aditya-dixit.vercel.app">aditya-dixit.vercel.app</a>
</div>
