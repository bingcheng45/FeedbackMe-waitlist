# FeedbackMe - Waitlist Landing Page

A modern, glassmorphism-designed waitlist landing page for FeedbackMe startup, built to capture early user interest and provide an engaging pre-launch experience.

## 🚀 Features

- **Modern Design**: Glassmorphism UI with consistent black/yellow theming
- **Queue Management**: Real-time waitlist position tracking
- **Responsive**: Mobile-first design with touch-friendly elements
- **Database Integration**: PostgreSQL with Neon serverless database
- **Form Validation**: Zod-powered validation with user-friendly error handling
- **Toast Notifications**: Auto-dismissing success messages with queue positions

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and optimized builds
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS with CSS variables for theming
- TanStack Query for server state management
- React Hook Form with Zod validation
- Framer Motion for smooth animations
- Wouter for lightweight client-side routing

### Backend
- Express.js with TypeScript
- Drizzle ORM for type-safe database operations
- PostgreSQL (Neon Database)
- RESTful API design with proper error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd feedbackme-waitlist
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file with:
DATABASE_URL="postgresql://username:password@ep-xyz.region.aws.neon.tech/database_name?sslmode=require"
```

4. Push database schema:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

Visit `http://localhost:5000` to see your waitlist page.

## 📊 Database Schema

### Waitlist Registrations
- `id`: Auto-incrementing primary key (determines queue position)
- `fullName`: User's full name
- `email`: Unique email address
- `createdAt`: Registration timestamp

### Users (Future Authentication)
- `id`: Auto-incrementing primary key
- `username`: Unique username
- `password`: Hashed password

## 🎯 API Endpoints

### POST /api/waitlist
Register a new user or return existing user's position.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

**Response (New User):**
```json
{
  "message": "Successfully joined the waitlist!",
  "id": 1,
  "position": 1
}
```

**Response (Existing User):**
```json
{
  "message": "You have already been added to the waitlist",
  "position": 1,
  "alreadyRegistered": true
}
```

## 🌐 Deployment

### Database Setup (Neon)
1. Create account at [neon.com](https://neon.com)
2. Create new project
3. Copy connection string to `DATABASE_URL`
4. Run `npm run db:push` to create tables

### Hosting (Replit Recommended)
1. Deploy on Replit for instant hosting
2. Set `DATABASE_URL` in Replit Secrets
3. Your app will be available at `your-repl.your-username.replit.app`

## 🎨 Design System

- **Colors**: Black backgrounds with yellow/amber accents
- **Typography**: Clean, modern sans-serif fonts
- **Components**: Glassmorphism cards with subtle transparency
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first approach with consistent padding

## 📝 License

MIT License - feel free to use this project as a template for your own waitlist pages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for capturing early user interest and building excitement for product launches.