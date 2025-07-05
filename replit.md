# FeedbackMe - Replit Development Guide

## Overview

FeedbackMe is a plug-and-play web analysis tool designed to make user feedback collection effortless and transparent. This is currently a waitlist landing page built with React, TypeScript, and Express.js, featuring a modern tech stack optimized for rapid development and deployment.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth interactions
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Management**: Ready for connect-pg-simple integration
- **API Design**: RESTful endpoints with proper error handling
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express.js application
├── shared/          # Shared types and schemas
├── attached_assets/ # Product documentation and assets
└── migrations/      # Database migration files
```

## Key Components

### Data Models
- **Users**: Basic user authentication structure (future use)
- **Waitlist Registrations**: Email collection with full name for early access

### API Endpoints
- `POST /api/waitlist`: Register for product waitlist with email validation and duplicate prevention

### Frontend Pages
- **Home**: Landing page with product information and waitlist signup
- **404**: Custom not found page

### UI Component System
- Complete Shadcn/ui component library
- Custom GlassCard component for modern glass morphism effects
- Consistent design system with neutral color palette
- Mobile-responsive components

## Data Flow

1. **User Registration**: Users submit email and name through landing page form
2. **Validation**: Client-side validation with Zod, server-side validation with Drizzle schemas
3. **Storage**: Data persisted to PostgreSQL via Drizzle ORM
4. **Feedback**: Immediate user feedback via toast notifications
5. **Error Handling**: Comprehensive error handling with user-friendly messages

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL for production
- **Connection**: WebSocket-enabled connection pooling
- **Migrations**: Drizzle Kit for schema management

### Development Tools
- **Replit Integration**: Cartographer plugin for development environment
- **Error Handling**: Runtime error overlay for development
- **Linting**: TypeScript strict mode with comprehensive type checking

### UI Libraries
- **Radix UI**: Headless component primitives
- **Lucide React**: Icon library
- **Date-fns**: Date manipulation utilities
- **Class Variance Authority**: Component variant management

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: esbuild compiles TypeScript server to `dist/index.js`
3. **Database**: Drizzle pushes schema changes with `db:push`

### Environment Configuration
- **Development**: tsx runs server with hot reloading
- **Production**: Node.js serves compiled bundle
- **Database**: Requires `DATABASE_URL` environment variable

### Performance Optimizations
- Static asset serving in production
- Middleware logging for API monitoring
- Optimized bundle splitting with Vite
- Tree-shaking for minimal bundle size

## Changelog

Changelog:
- July 04, 2025. Initial setup with PostgreSQL database and waitlist functionality
- July 04, 2025. Updated color scheme from purple/indigo to yellow/amber/orange gradients
- July 04, 2025. Fixed navigation overlap issue by adding pt-16 to hero section
- July 04, 2025. Updated integration time from 48hrs to 15mins
- July 04, 2025. Implemented consistent padding standards using CSS constants
- July 04, 2025. Updated button text to "Join Waitlist" and removed down arrow element
- July 04, 2025. Fixed scroll offset to account for navigation header height
- July 04, 2025. Added toast auto-dismiss after 5 seconds and improved input text contrast
- July 04, 2025. Fixed mobile and desktop padding for stats section
- July 04, 2025. Changed background color from slate-900 to true black
- July 04, 2025. Updated copyright year from 2024 to 2025
- July 04, 2025. Fixed input text visibility with yellow-themed glass inputs
- July 04, 2025. Implemented consistent black and yellow theme throughout all components
- July 04, 2025. Updated success messages and component colors for theme consistency
- July 04, 2025. Enhanced waitlist functionality to show queue position instead of errors for duplicate emails

## User Preferences

Preferred communication style: Simple, everyday language.