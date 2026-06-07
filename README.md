# Rachit Garg — 3D Portfolio [Hosted Link](https://rachit-3d-portfolio.vercel.app/)

An interactive 3D portfolio website built with Next.js, React Three Fiber, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Interactive 3D scene** — Floating workstation with smooth camera transitions between sections
- **Section-based navigation** — Hero, About, Skills, Experience, Projects, Contact
- **Premium dark aesthetic** — DM Serif Display + JetBrains Mono typography
- **Performance-optimized** — Lazy loading, dynamic imports, adaptive DPR
- **Fully responsive** — Mobile-first, works on all screen sizes
- **TypeScript strict mode** — Type-safe throughout

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000
```

### Build for production

```bash
npm run build
npm start
```

### Type checking

```bash
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles, CSS variables, fonts
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Entry point (lazy-loads Portfolio)
│
├── components/
│   ├── 3d/
│   │   ├── Scene3D.tsx    # Main R3F canvas + camera controller
│   │   ├── Laptop.tsx     # Animated laptop mesh
│   │   ├── SkillOrbs.tsx  # Floating skill spheres
│   │   ├── ProjectScreens.tsx  # Dual project monitor meshes
│   │   ├── Terminal.tsx   # Contact terminal mesh
│   │   └── Particles.tsx  # Ambient floating particles
│   │
│   ├── sections/
│   │   ├── Hero.tsx       # Landing overlay
│   │   ├── About.tsx      # About me panel
│   │   ├── Skills.tsx     # Categorized skills
│   │   ├── Experience.tsx # Work timeline
│   │   ├── Projects.tsx   # Expandable project cards
│   │   └── Contact.tsx    # Contact terminal UI
│   │
│   ├── ui/
│   │   ├── Navbar.tsx     # Top navigation
│   │   ├── SectionDots.tsx # Right-side nav dots
│   │   ├── Tag.tsx        # Reusable tag component
│   │   └── LoadingScreen.tsx # Initial loading state
│   │
│   └── Portfolio.tsx      # Main orchestrator
│
├── data/
│   └── resume.ts          # Single source of truth for all data
│
├── hooks/
│   ├── useActiveSection.ts # Section state + transitions
│   └── useMediaQuery.ts    # Responsive utilities
│
└── types/
    └── index.ts           # Shared TypeScript types
```

## 🌐 Deploy to Vercel

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "feat: initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/rachit-portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Click **Deploy** (no env vars needed)

### Option C: Vercel Dashboard Direct

1. Zip the project (excluding `node_modules` and `.next`)
2. Drag and drop on [vercel.com/new](https://vercel.com/new)

## ⚙️ Environment Variables

No environment variables required for basic deployment.

## 🏗️ Architecture Decisions

### Why React Three Fiber?
R3F provides a React-idiomatic way to build Three.js scenes. It integrates seamlessly with React's lifecycle, hooks, and concurrent rendering. The declarative syntax reduces boilerplate and improves maintainability over imperative Three.js code.

### Camera Transition Strategy
Camera positions are defined per section using a lookup table. The `SceneController` component uses `useFrame` with `lerp` for smooth interpolation — this gives buttery 60fps transitions without external animation libraries adding overhead.

### Performance Optimizations
- `AdaptiveDpr` — auto-reduces pixel ratio under GPU pressure
- `AdaptiveEvents` — disables pointer events when camera is moving
- Dynamic imports for all sections — reduces initial bundle
- `lazy()` for 3D components — deferred until after hydration
- `memo()` on Portfolio component — prevents unnecessary re-renders
- `[1, 1.5]` DPR cap — balances quality vs performance

### State Management
Local `useState` + custom hook pattern. No Redux/Zustand needed — the state is simple (one active section, one transition boolean). Over-engineering this would be a red flag in an interview.

### Type Safety
Strict TypeScript throughout. `SectionId` is a union type derived from actual data keys, preventing typos in navigation calls.

## 📊 Performance Targets

- Lighthouse Performance: 90+
- LCP: < 2.5s
- FID: < 100ms
- CLS: 0 (fixed layout, no layout shift)

## 🎨 Design System

- **Primary font**: DM Serif Display (headings)
- **Mono font**: JetBrains Mono (code, labels, UI)
- **Body font**: DM Sans (paragraphs)
- **Accent amber**: `#f59e0b`
- **Accent teal**: `#2dd4bf`
- **Background**: `#080808`

## 📝 License

MIT — feel free to use as inspiration for your own portfolio.
