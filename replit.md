# Curățenie Pro - Professional Cleaning Services Website

## Overview

Curățenie Pro is a professional cleaning services website for a Romanian business based in Târgoviște. The website is a marketing-focused single-page application that showcases cleaning services for furniture, mattresses, vehicles, radiators, and commercial spaces. Built with React and Vite, it features modern animations, responsive design, and clear service information with transparent pricing.

The primary goal is to convert visitors into customers by presenting professional cleaning services in an attractive, trustworthy manner with clear pricing, service descriptions, and multiple contact options (WhatsApp, phone, online form).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 19.2.0 with Vite 7.2.2 as the build tool
- **Rationale**: Vite provides extremely fast HMR (Hot Module Replacement) and optimized production builds. React 19 offers the latest features and performance improvements for building interactive UIs.
- **Alternative considered**: Next.js was likely considered but rejected since this is a simple marketing site without need for SSR or complex routing.
- **Pros**: Fast development experience, minimal configuration, excellent performance
- **Cons**: Client-side only rendering may impact initial SEO (mitigated by meta tags in index.html)

**Styling Solution**: TailwindCSS 4.1.17 with custom configuration
- **Rationale**: Utility-first CSS framework allows rapid UI development with consistent design system. Custom theme extends base Tailwind with brand colors and animations.
- **Custom theme includes**:
  - Brand colors: primary (#2563EB blue), secondary (#10B981 green), accent, dark
  - Custom animations: fade-in, scale-up, slide-up, bounce-subtle, pulse-glow
  - Gradient utilities for visual appeal
- **Pros**: Fast iteration, small bundle size with PurgeCSS, maintainable
- **Cons**: Learning curve for developers unfamiliar with utility classes

**Animation Library**: Framer Motion 12.23.24
- **Rationale**: Industry-standard animation library for React providing smooth, declarative animations for enhanced user experience
- **Use cases**: Page transitions, scroll-triggered animations, interactive elements
- **Pros**: Excellent performance, declarative API, gesture support
- **Cons**: Adds ~60KB to bundle size

**Icon System**: React Icons 5.5.0
- **Rationale**: Comprehensive icon library with multiple icon families, tree-shakeable
- **Pros**: Easy to use, consistent sizing, wide variety of icons
- **Cons**: Can increase bundle size if many icons are imported

### Build Configuration

**Vite Configuration**:
- React plugin for JSX transformation and Fast Refresh
- Development server configured for external access (host: '0.0.0.0', port: 5000)
- **Rationale**: Allows testing on mobile devices and from remote environments (Replit compatibility)

**PostCSS Pipeline**:
- TailwindCSS PostCSS plugin for processing utility classes
- Autoprefixer for browser compatibility
- **Rationale**: Standard modern CSS processing pipeline ensuring cross-browser compatibility

### Content Structure

**Language**: Romanian (lang="ro")
- All content, meta tags, and UI text in Romanian for local market targeting

**SEO Optimization**:
- Meta description highlighting key services and location
- Keywords targeting local search: "curățenie Târgoviște, curățare canapea, detailing auto"
- Semantic HTML structure
- **Rationale**: Local business depends on search visibility in Târgoviște area

**Content Sections** (fully implemented from Romanian specification):
1. **Hero Section**: Main value proposition with gradient animations, subtitle, CTA buttons (WhatsApp, pricing), trust indicators
2. **De ce noi?** (Why us?): 4 key benefits with icons - Professional Kärcher equipment, Results + Parfum, Transparent Pricing, Complete Services
3. **Cum Lucrăm** (How we work): 4-step process with detailed descriptions - Contact, Evaluation, Cleaning, Finalization
4. **Servicii** (Services): 6 service cards - Couches/Sofas, Mattresses, Auto Detailing, Steam Cleaning, Commercial Spaces, Additional Services
5. **Prețuri & Pachete** (Pricing): Complete pricing tables for:
   - Textiles & Upholstery (couches, mattresses, chairs, auto)
   - Steam Services (radiators, bathroom, kitchen, tiles)
   - Additional Services (anti-smell, hydrophobic protection, ozone, UV lamp)
   - COMBO Packages (Living, Bedroom, Auto) with 50-100 lei savings
6. **Rezultate în Numere** (Stats): Animated counters - 500+ clients, 10,000+ hours, 98% rating, 30+ zones
7. **Testimonials Carousel**: Interactive carousel with auto-rotation (5s), navigation controls, dot indicators - 3 detailed reviews
8. **Garanție & Siguranță** (Guarantees): 4 guarantee cards - 100% satisfaction, locked prices, RCA insurance, complete disinfection
9. **FAQ**: 6 collapsible questions - Equipment, drying time, discounts, schedule, combos, booking
10. **Blog/Articole**: 3 article previews with images - Mattress signs, Couch maintenance, Auto care
11. **Contact Section**: Form with validation, WhatsApp integration, direct contact cards, working hours
12. **Sticky WhatsApp Button**: Fixed bottom-right pulsing button for quick contact

**Interactive Features**:
- Testimonials carousel with auto-rotation, manual navigation (prev/next buttons), dot indicators, pause on hover
- Animated counter for statistics (scroll-triggered)
- Collapsible FAQ accordion
- Contact form with WhatsApp integration
- Smooth scroll navigation
- Hover effects on all interactive elements

### Design System

**Typography**: Inter font family (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800
- **Rationale**: Modern, readable sans-serif with excellent Romanian character support

**Color Strategy**:
- Primary blue (#2563EB): Trust, professionalism
- Secondary green (#10B981): Freshness, cleanliness
- Gradient combinations for visual interest
- **Rationale**: Colors psychologically associated with cleanliness and professionalism

**Animation Strategy**:
- Subtle animations to enhance UX without overwhelming
- Scroll-triggered animations for engagement
- Hover effects for interactivity
- **Rationale**: Modern web standards expect smooth interactions while maintaining fast performance

## External Dependencies

### Third-Party Libraries

**React & React DOM** (v19.2.0)
- Core framework for building the user interface
- Latest stable version with improved performance

**Framer Motion** (v12.23.24)
- Animation and gesture library
- Provides scroll-triggered animations and page transitions

**React Icons** (v5.5.0)
- Icon library for UI elements
- Likely used for service icons, contact buttons, feature highlights

### Build Tools & Development

**Vite** (v7.2.2)
- Build tool and development server
- Provides fast HMR and optimized production builds

**@vitejs/plugin-react** (v5.1.1)
- Official Vite plugin for React support
- Enables JSX transformation and Fast Refresh

### Styling Dependencies

**TailwindCSS** (v4.1.17)
- Utility-first CSS framework
- Custom configuration in tailwind.config.js

**@tailwindcss/postcss** (v4.1.17)
- PostCSS plugin for TailwindCSS v4

**PostCSS** (v8.5.6)
- CSS transformation tool

**Autoprefixer** (v10.4.22)
- Adds vendor prefixes for browser compatibility

### Font Services

**Google Fonts**
- Inter font family
- Preconnected for performance (preconnect tags in index.html)

### Hosting Considerations

**Development Server Configuration**:
- Configured for 0.0.0.0 host access (Replit-compatible)
- Port 5000
- Allows external connections for testing

**Note**: No backend, database, or authentication system is present. This is a static marketing website that likely integrates with external contact services (WhatsApp, phone) for lead generation. Any contact form functionality would require future integration with email services or CRM systems.