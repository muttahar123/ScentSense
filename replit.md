# Fragrance - Luxury E-commerce Application

## Overview

This is a full-stack luxury fragrance e-commerce application built with a modern tech stack. The application features a premium shopping experience with the brand name "Fragrance", sophisticated golden-themed UI, RESTful API backend, and comprehensive admin functionality. It includes product catalog management, shopping cart functionality, blog system, and order processing. The application is now fully configured for easy Vercel deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React-based SPA using Vite as the build tool
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM (configured for Neon serverless)
- **UI Framework**: Shadcn/ui components with Tailwind CSS for styling
- **State Management**: React Query for server state, React Context for cart management
- **Routing**: Wouter for client-side routing

The architecture enables a luxury brand aesthetic with premium user experience while maintaining clean code organization and scalability.

## Key Components

### Frontend Architecture
- **Component System**: Radix UI primitives with custom Shadcn/ui components
- **Styling**: Tailwind CSS with luxury-themed custom color palette (gold, cream, elegant dark)
- **State Management**: 
  - React Query for API data fetching and caching
  - Custom cart context for shopping cart state
  - Form state managed with React Hook Form and Zod validation
- **Animation**: Framer Motion for smooth interactions and parallax effects
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints

### Backend Architecture
- **API Design**: RESTful endpoints following REST conventions
- **Data Layer**: Drizzle ORM with PostgreSQL database
- **Storage Pattern**: Abstract storage interface with in-memory implementation for development
- **Middleware**: Express middleware for JSON parsing, CORS, logging, and error handling
- **Development Tools**: Hot reload with Vite integration in development mode

### Database Schema
The application uses four main entities:
- **Products**: Core product catalog with categories, pricing, ratings, and inventory
- **Orders**: Complete order management with customer details and items
- **Blog Posts**: Content management system for marketing and SEO
- **Cart Items**: Session-based shopping cart functionality

## Data Flow

1. **Product Browsing**: Client fetches products via React Query → Express API → Drizzle ORM → PostgreSQL
2. **Cart Management**: Local state managed through React Context with session persistence
3. **Order Processing**: Form validation → API submission → Database persistence → Order confirmation
4. **Admin Operations**: CRUD operations through dedicated admin routes with proper validation
5. **Content Management**: Blog system with slug-based routing and published/draft states

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Components**: Radix UI primitives for accessibility and functionality
- **Validation**: Zod for runtime type checking and form validation
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with PostCSS processing

### Development Dependencies
- **Build Tools**: Vite for fast development and optimized builds
- **Type Safety**: TypeScript throughout the stack
- **Code Quality**: ESBuild for server bundling
- **Development Features**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

The application is designed for deployment on Replit with the following build process:

1. **Development Mode**: 
   - Frontend served by Vite dev server with HMR
   - Backend runs with tsx for TypeScript execution
   - Database migrations applied via Drizzle Kit

2. **Production Build**:
   - Frontend: Vite builds optimized static assets to `dist/public`
   - Backend: ESBuild bundles server code to `dist/index.js`
   - Static assets served by Express in production

3. **Database Setup**:
   - PostgreSQL database provisioned through environment variables
   - Schema migrations managed through Drizzle Kit
   - Sample data seeded through in-memory storage initialization

The architecture supports easy scaling and deployment to various platforms while maintaining development velocity and code quality.

## Recent Updates (August 2025)

### Brand Identity
- ✅ Updated brand name from "Aurum Fragrances" to "Fragrance"
- ✅ Consistent branding across navbar, footer, and all components

### UI Enhancements
- ✅ Enhanced navbar with better blur effects and golden borders
- ✅ Improved product cards with hover effects and golden accent borders
- ✅ Fixed CSS import issues and optimized styling
- ✅ Better visual hierarchy and luxury aesthetic

### Vercel Deployment Configuration
- ✅ Created separate client package.json for standalone deployment
- ✅ Added comprehensive Vercel configuration files
- ✅ TypeScript configuration optimized for Vercel builds
- ✅ Environment variable setup for API connections
- ✅ Static asset handling and SPA routing support
- ✅ Complete deployment guide (DEPLOYMENT.md)

### Deployment Options
1. **Client-Only Deployment**: Deploy just the frontend as a static site
2. **Full-Stack Deployment**: Deploy both client and server to Vercel
3. **Custom Domain Support**: Ready for custom domain configuration
4. **Real-time Updates**: Automatic builds and CDN distribution