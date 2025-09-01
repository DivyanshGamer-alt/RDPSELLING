# Star RDP/VPS Platform - Project Documentation

## Overview

This is a professional RDP/VPS selling platform that provides remote desktop and virtual private server solutions. The project has been enhanced with modern animations, optimized performance, and prepared for production deployment on platforms like Render, Railway, or VPS hosting.

**Key Features:**
- Professional RDP and VPS services marketplace
- Enhanced user experience with Framer Motion animations
- Secure payment processing (Razorpay + Cryptocurrency)
- Replit authentication integration
- Cart and order management system
- Admin panel for service management
- Telegram channels integration for support

## User Preferences

- Communication style: Simple, everyday language
- Animation preference: Smooth, professional animations using Framer Motion
- Design approach: Modern, clean UI with gradient accents and hover effects

## System Architecture

### Frontend Architecture
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom animations and gradients
- **Animations**: Framer Motion for smooth, professional animations
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js + TypeScript
- **Runtime**: Node.js 20
- **API Design**: RESTful APIs with proper error handling
- **Session Management**: Express sessions with PostgreSQL store
- **File Structure**: Modular approach with separate routes, storage, and authentication

### Data Storage
- **Database**: PostgreSQL with Neon serverless integration
- **ORM**: Drizzle ORM with Zod schema validation
- **Migration Strategy**: Schema-first approach with `drizzle-kit push`
- **Data Models**: Products, Users, Orders, Cart items with proper relationships

### Authentication & Authorization
- **Primary Auth**: Replit Auth integration
- **Session Storage**: PostgreSQL-backed sessions
- **Security**: Passport.js for additional authentication strategies
- **User Management**: Role-based access (admin/user)

## External Dependencies

### Third-party Services
- **Payment Processing**: Razorpay Gateway for Indian payments
- **Cryptocurrency**: Bitcoin, Ethereum, USDT support
- **Communication**: Telegram channels for customer support
- **Email Service**: Nodemailer for transactional emails
- **Database Hosting**: Neon PostgreSQL serverless

### Development Dependencies
- **Build Tools**: Vite for frontend, ESBuild for backend
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (configured in VS Code)
- **Package Manager**: NPM with lock file for consistent installs

## Recent Enhancements (September 1, 2025)

### Animation System
- Added Framer Motion for smooth page transitions
- Implemented scroll-triggered animations with `whileInView`
- Created floating animations for feature icons
- Added interactive hover effects on cards and buttons
- Implemented staggered animations for lists and grids

### UI/UX Improvements
- Enhanced hero section with gradient backgrounds
- Added professional call-to-action sections
- Improved pricing cards with popularity indicators
- Created animated payment method showcase
- Enhanced footer with comprehensive links and contact info

### Performance Optimizations
- Optimized animation triggers to prevent excessive re-renders
- Used `viewport={{ once: true }}` for one-time scroll animations
- Implemented efficient CSS gradients and transitions
- Minimized bundle size with proper tree shaking

### Deployment Preparation
- Created production build configuration
- Added comprehensive deployment documentation
- Ensured all environment variables are properly configured
- Tested build process for various hosting platforms

## Deployment Status
- ✅ Build process tested and working
- ✅ Database schema synchronized
- ✅ Environment variables documented
- ✅ Production configuration ready
- ✅ Multiple hosting platform support (Railway, Render, VPS)

The application is fully ready for deployment on professional hosting platforms.