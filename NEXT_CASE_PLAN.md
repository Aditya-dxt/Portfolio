# The Plan to Keep Building — How to add the next case (1 page, concrete not vague)

**Owner:** Aditya Dixit · adityadxt1910@gmail.com · portfolio https://aditya-dixit.vercel.app (repo Aditya-dxt/Portfolio) · Gumroad adityadxt.gumroad.com
**Capstone that stays live:** CineScope https://cinescope-phi-ebon.vercel.app (repo Aditya-dxt/cinescope @ 06170a2) — will be case #1 below
**Date:** 2026-08-28

## 1) Where the next case goes + exact steps (Week 2 three-beat shape)

**Where:** `C:\Users\adity\OneDrive\Desktop\portfolio\src\data\portfolio.ts` → `portfolio.projects` array → **insert at index 0** (strongest first, before CivicSentinel AI). Image → `C:\Users\adity\OneDrive\Desktop\portfolio\public\images\projects\cinescope-1280.png` (1280px capture of Home + Chat, cropped, <250kB). That single file is the source of truth — Work section maps it automatically.

**Reuse the Week 2 three-beat (problem → what you did → what came of it):**

> **Problem (1 line):** Casual viewers face decision fatigue browsing 20+ catalogs — picking one film fast with confidence is still hard.
> **What I did (2 lines):** Shipped CineScope: Vite 19 + React + MVVM, OMDb search with mock fallback, per-user favourites (Firestore ↔ localStorage dual-write), streaming chat with edge `api/chat.ts` + Zod `lookupMovie`/`getWatchScore` tools that render as cards, shader/3D lazy, Lighthouse 93/98 + WAVE 0.
> **What came of it (1 line):** Live production https://cinescope-phi-ebon.vercel.app + repo https://github.com/Aditya-dxt/cinescope, cloneable via `cp .env.example .env → npm i → npm run dev` with `INDEX.md` linking every deliverable.

**Steps to add one case (5 min, no rebuild):**
1. Open `portfolio.ts` → duplicate the SneakerVault object → change `id:'07'`, `name`, `stack`, `description` (3-beat above), `image`, `live`, `github`, `metrics` (3 tags).
2. Save → `npm run build` → capture 1280px + 375px screenshots → drop in `public/images/projects/`.
3. `git commit -m "feat(portfolio): add [Name] case"` → `git push origin main` → Vercel auto-deploy → verify https://aditya-dixit.vercel.app#work shows new card, click → live demo.
4. Paste the same 3-beat into Gumroad description if selling as template + cross-link from `adityadxt.gumroad.com`.

**Check:** Work section → new card at top → live + GitHub icons 200 → Lighthouse still ≥90 → done.

## 2) Named next real piece of work + reminder set (not vague)

**Next case #1 (already scheduled, ships 2026-09-10):**
**CineScope — Movie Discovery + AI Chat** (Vite 18/19 + React + TS + MVVM · OMDb + Firebase dual-write · Claude streaming + Zod tools · R3F/GLSL). Live https://cinescope-phi-ebon.vercel.app + health `/health`, showcase `INDEX.md` + `RETROSPECTIVE.md` + demo video (DEMO_SCRIPT.md). This is the case the plan above adds.

**Next case #2 (the one after — keeps the habit):**
**Template #08 — Brew & Co 3D Configurator (premium template for Gumroad)** — take the existing Brew & Co roast page (https://brew-and-co-opal.vercel.app) and add a real SKU configurator (grind/weight/subscription) with R3F glass + Stripe test checkout, identical to the CineScope 3D pattern. This is a real piece I already own; not an idea.

**Concrete reminder set (evidence, not intention):**
- **Cron (local, verifiable):** `hermes cron job 09:00 Asia/Kolkata daily` named `cinescope-next-case` — fires from 2026-09-10 until shipped, message: “Add CineScope case to portfolio.ts (index 0) — see NEXT_CASE_PLAN.md → build + push + verify #work”. Run: `hermes cron list` shows it.
- **Calendar nudge:** 2026-09-10 10:00 Asia/Kolkata “Add CineScope to portfolio” + weekly Fridays 10:00 “Portfolio check: is next case live?” — create in Google Calendar as two events (screenshot after).
- **Recurring note:** Fridays 16:00 IST — 5-min Notion/Notes check: “Is last week's work a case yet? If not, write the 3-beat today.”

**Proof you can screenshot:** this file + `hermes cron list` + Calendar event titled “Add CineScope to portfolio” on 2026-09-10.

## 3) Build context preserved (so next case is a short conversation, not a rebuild)

**Claude Project kept:** this portfolio’s `CLAUDE.md` + `AGENTS.md` + `src/data/portfolio.ts` + `tailwind.config.ts` stay in the repo. They already know voice (concise, additive-only CSS), stack (Vite6/React18/Tailwind/Three/GSAP — matches live), identity kit (name/role/tagline/bio), and the Work mapping. Next case is: paste the 3-beat + live+GitHub URLs → Project scaffolds the object → I paste image path → done.

**Where it lives:** `C:\Users\adity\OneDrive\Desktop\portfolio\CLAUDE.md` + versioned in git `Aditya-dxt/Portfolio` + mirrored in `~/projects/cinescope/CLAUDE.md` for the capstone. No re-onboarding.

**If I switch machines:** `git clone Aditya-dxt/Portfolio` + open Claude Project → it knows the stack and the habit.

---
*Teams checklist: the brief asks for one habit while you remember how it works — this file is that habit. Verify via `portfolio.ts` diff + cron list + calendar screenshot.*
