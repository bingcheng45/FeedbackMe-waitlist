# Deployment Guide for Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: Set up a PostgreSQL database (recommended: Supabase, Neon, or PlanetScale)
3. **Environment Variables**: Configure the following environment variables in Vercel

## Environment Variables

Set these in your Vercel project dashboard:

```bash
# Database Configuration
DATABASE_URL="postgresql://your-username:your-password@your-host:5432/your-database"

# Environment
NODE_ENV=production

# Optional - if using Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deploy to Vercel

### Option 1: Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

### Option 2: Via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Deploy

## Project Structure

```
├── api/                    # Serverless functions
│   └── waitlist.ts        # Waitlist API endpoint
├── client/                # React frontend
├── server/                # Backend logic (used by serverless functions)
├── shared/                # Shared schemas and types
├── vercel.json            # Vercel configuration
└── package.json
```

## API Endpoints

Once deployed, your API will be available at:
- `https://your-app.vercel.app/api/waitlist` - POST endpoint for waitlist registration

## Frontend

Your frontend will be available at:
- `https://your-app.vercel.app` - Main application

## Local Development

To run locally:
```bash
npm run dev
```

## Build Process

Vercel will automatically:
1. Install dependencies with `npm install`
2. Build the frontend with `npm run build` (which runs `vite build`)
3. Deploy serverless functions from the `api/` directory
4. Serve the built frontend from `dist/public/`

## Database Setup

1. Create a PostgreSQL database
2. Set the `DATABASE_URL` environment variable
3. Run database migrations:
   ```bash
   npm run db:push
   ```

## Troubleshooting

### Common Issues:

1. **Database Connection**: Ensure your `DATABASE_URL` is correct and the database is accessible
2. **Environment Variables**: Double-check all environment variables are set in Vercel dashboard
3. **Build Errors**: Check the Vercel build logs for specific error messages
4. **CORS Issues**: The API includes CORS headers, but verify if additional configuration is needed

### Debugging:

1. Check Vercel function logs in the dashboard
2. Use `console.log` in serverless functions for debugging
3. Test API endpoints directly: `curl -X POST https://your-app.vercel.app/api/waitlist`

## Performance Optimization

The setup includes:
- Static site generation for the frontend
- Serverless functions for API endpoints
- Optimized build process with Vite
- Automatic code splitting and lazy loading 