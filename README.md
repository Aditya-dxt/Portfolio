# Aditya Dixit — Portfolio Website 🚀

A modern, premium, interactive personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **15+ Sections**: Hero, About, Stats, Skills, Projects, Achievements, Hackathons, Experience, Education, Coding Profiles, Certifications, Resume, Testimonials, Photography, Contact
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Animated UI**: Framer Motion scroll-triggered animations, typing effects, floating elements, 3D tilt cards
- **Glassmorphism Design**: Premium glass-effect cards with backdrop blur
- **Purple + Cyan Gradient**: Consistent brand identity across all elements
- **Responsive**: Fully responsive on mobile, tablet, and desktop
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Filterable Projects**: Filter by category (Full Stack, AI/ML, Frontend, etc.)
- **Animated Counters**: Stats that count up when scrolled into view
- **Contact Form**: Formspree integration ready
- **Resume Download**: One-click PDF resume download

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Typing Effect | react-type-animation |
| Icons | react-icons |
| Theme | next-themes |
| Fonts | Inter + JetBrains Mono |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Aditya-dxt/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── images/          # Profile photo, project images, certificates
│   └── resume/          # Resume PDF
├── src/
│   ├── app/             # Next.js App Router pages & layout
│   ├── components/
│   │   ├── layout/      # Navbar, Footer
│   │   ├── sections/    # All 15 section components
│   │   ├── ui/          # Reusable UI components
│   │   └── effects/     # Animation wrappers
│   ├── data/            # All portfolio content (easily editable)
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
```

## ✏️ Updating Content

All portfolio data lives in `src/data/`. Simply edit these files to update your content:

- `personal.ts` — Name, bio, taglines, social links
- `education.ts` — School & college details
- `skills.ts` — Technical skills by category
- `projects.ts` — Project details
- `achievements.ts` — Awards & achievements
- `hackathons.ts` — Hackathon participation
- `experience.ts` — Work & leadership experience
- `certifications.ts` — Professional certifications
- `codingProfiles.ts` — Coding platform profiles
- `testimonials.ts` — Testimonials
- `stats.ts` — Counter numbers

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect your repo on [vercel.com](https://vercel.com)
3. Deploy with zero configuration

### Netlify

1. Push to GitHub
2. Connect your repo on [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`

## 📝 Contact Form Setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in `src/components/sections/ContactSection.tsx`

## 📄 License

MIT License — feel free to use this as a template for your own portfolio!

---

Built with ❤️ by [Aditya Dixit](https://github.com/Aditya-dxt)
