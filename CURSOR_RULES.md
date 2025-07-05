# Cursor Rules for FeedbackMe

## 1. Project Architecture
- **Frontend**: React 18 + TypeScript, Vite, Shadcn/ui, Tailwind CSS, TanStack Query, React Hook Form + Zod, Framer Motion, Wouter.
- **Backend**: Express.js + TypeScript, Drizzle ORM, PostgreSQL (Neon), RESTful API, tsx/esbuild for dev/prod.
- **Shared**: Types and schemas in `/shared`.
- **UI**: Use Shadcn/ui, Radix UI, and custom GlassCard. Maintain a consistent, mobile-first, black/yellow theme.

## 2. Project Structure
- `client/`: Frontend React app
- `server/`: Backend Express app
- `shared/`: Shared types/schemas
- `attached_assets/`: Docs/assets
- `migrations/`: DB migrations

## 3. Code Style & Conventions
- Use TypeScript strict mode.
- Prefer functional, declarative code. Avoid classes.
- Use descriptive variable names (e.g., isLoading, hasError).
- Use TanStack Query for server state, React Hook Form + Zod for forms.
- Use RESTful API patterns and proper error handling.
- Use Tailwind CSS for styling; CSS variables for theming.
- Use Framer Motion for animation.
- Use Wouter for routing.
- Use Shadcn/ui and Radix UI for components. Prefer composition over duplication.
- Use custom GlassCard for glass morphism effects.
- Ensure all components are mobile-responsive.
- Use Lucide React for icons, date-fns for date utilities.
- Use Class Variance Authority for component variants.

## 4. Workflow & Development
- Use Vite for frontend dev/build, esbuild for backend build.
- Use tsx for TypeScript execution in dev.
- Use Drizzle Kit for DB migrations.
- Use Neon Database for production (PostgreSQL, WebSocket pooling).
- Use TypeScript strict mode and comprehensive type checking.
- Use runtime error overlay in dev.
- Use Cartographer plugin for Replit integration.
- Use proper environment variables (e.g., `DATABASE_URL`).
- Use static asset serving in production.
- Use middleware logging for API monitoring.
- Optimize bundle splitting and tree-shaking.

## 5. Data Flow
- User registration via landing page form (email, name).
- Client-side validation (Zod), server-side validation (Drizzle schema).
- Store data in PostgreSQL via Drizzle ORM.
- Provide user feedback via toast notifications.
- Handle errors with user-friendly messages.

## 6. Deployment
- Frontend: Vite builds to `dist/public`.
- Backend: esbuild compiles to `dist/index.js`.
- DB: Drizzle pushes schema with `db:push`.
- Dev: tsx with hot reload; Prod: Node.js serves bundle.

## 7. Changelog & Documentation
- Update changelog in `replit.md` for all major changes.
- Document new features, structure, and standards in `README.md` and `replit.md`.

## 8. Communication
- Use simple, everyday language for documentation and user-facing messages.

---

*These rules are derived from `replit.md` and reflect the current architecture, workflow, and standards of the FeedbackMe project. Update as the project evolves.* 