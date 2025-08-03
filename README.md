# Fragrance - Luxury E-commerce Store

A sophisticated luxury fragrance e-commerce website with a golden theme, parallax scrolling effects, and comprehensive shopping functionality.

## ✨ Features

- **🏪 E-commerce Functionality**: Complete product catalog, shopping cart, and checkout
- **👑 Luxury Design**: Golden yellow theme with elegant Playfair Display typography
- **🌊 Parallax Scrolling**: Smooth parallax effects throughout the site
- **🛒 Shopping Cart**: Add to cart, quantity management, and persistent sessions
- **⚡ Admin Dashboard**: Full product and order management system
- **📝 Blog System**: Content management for perfume-related articles
- **📱 Responsive Design**: Mobile-first approach with elegant breakpoints

## 🚀 Quick Deploy to Vercel

### Option 1: Frontend Only (Recommended for Demo)
```bash
cd client
npm install
vercel --prod
```

### Option 2: Full-Stack Deployment
```bash
vercel --prod
```

## 🛠️ Local Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

## 🎨 Design Features

- **Color Scheme**: Golden yellow (#F2C94C) with cream and elegant dark accents
- **Typography**: Playfair Display for headings, Inter for body text
- **Effects**: Hover animations, glass morphism, and smooth transitions
- **Layout**: Luxury e-commerce focused with premium product showcase

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (configurable for PostgreSQL)
- **UI Components**: Radix UI, Shadcn/ui
- **Build Tools**: Vite, ESBuild
- **Deployment**: Vercel-ready configuration

## 🌐 Live Demo

After deployment, your site will include:
- Product browsing and filtering
- Shopping cart functionality
- Checkout process
- Admin dashboard (`/admin`)
- Blog section (`/blog`)
- Responsive design for all devices

## 📁 Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and configurations
│   ├── dist/           # Build output
│   └── vercel.json     # Vercel deployment config
├── server/             # Backend API
├── shared/             # Shared types and schemas
└── DEPLOYMENT.md       # Detailed deployment guide
```

## 🔧 Configuration

The app is pre-configured with:
- ✅ Vercel deployment settings
- ✅ TypeScript configurations
- ✅ Tailwind CSS setup
- ✅ Path aliases (@/ for src/)
- ✅ Environment variable support

## 📖 Documentation

- `DEPLOYMENT.md` - Complete deployment guide
- `replit.md` - Technical architecture overview

---

**Fragrance** - Creating luxury digital shopping experiences ✨