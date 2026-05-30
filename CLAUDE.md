# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese news portal (TIN TP.HCM) built with React + TypeScript + Vite + Supabase. Features articles with real-time view tracking and radio episodes with listen count tracking.

## Common Commands

```bash
# Development
npm run dev          # Start dev server (port 5173)

# Build & Deploy
npm run build        # Production build to dist/
npm run preview      # Preview production build

# Quality
npm run lint         # ESLint check
npm run typecheck    # TypeScript check (no emit)
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Routing**: react-router-dom v7
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Icons**: lucide-react

### Data Flow

**Articles:**
- `src/services/api.ts` calls Edge Functions
- `supabase/functions/articles/index.ts` queries `articles` table
- View tracking: `track-view` Edge Function → `article_views` table → trigger updates `articles.views_count`

**Radio Episodes:**
- Episode data: `src/data/radioEpisodes.ts` (static metadata)
- Listen counts: `radio_episodes` table (dynamic)
- Listen tracking: `track-radio-listen` Edge Function → `radio_episodes_views` table → trigger updates `radio_episodes.listen_count`

### Database Schema

**Tables:**
- `articles` - UUID primary key, created_at for sorting (newest first), views_count with auto-increment trigger
- `article_views` - Individual view records for tracking
- `radio_episodes` - TEXT primary key (ep-001, ep-002...), listen_count with trigger
- `radio_episodes_views` - Individual listen records for tracking

**Triggers:**
- `update_article_view_count` - Auto-increments views_count on INSERT to article_views
- `update_radio_listen_count` - Auto-increments listen_count on INSERT to radio_episodes_views

### Key Components

**Audio System:**
- `src/contexts/AudioPlayerContext.tsx` - Single audio player context, manages playback state
- Logic: Only tracks listen on NEW episode selection (not on pause/resume)
- Auto-refreshes listen/visit counts every 3 seconds for real-time sync

**Routing:**
- Category pages: Dynamic routes like `/thanh-pho`, `/168-phuong-xa`, `/doi-song`
- Article pages: `/bai-viet/:articleId`
- Article view tracking: Only once per page load (not on scroll)

### Edge Functions

Located in `supabase/functions/`:
- `articles/` - Fetch articles, supports category filter & limit
- `track-view/` - Record article view
- `track-radio-listen/` - Record radio listen
- `radio-episodes/` - Fetch listen counts

All Edge Functions use CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Client-Info, Apikey
```

### Adding New Features

**To add new article category:**
1. Update `src/data/newsData.ts` categories
2. Add route in `src/App.tsx`
3. Edge Function automatically handles category filtering via `?category=slug` param

**To add new radio episode:**
1. Add episode object to `src/data/radioEpisodes.ts` array
2. Add seed data in migration or directly to `radio_episodes` table (with matching id)
3. Audio player and tracking work automatically

### View/Listen Count Tracking

**Important behaviors:**
- Article views: Counted once per page load (tracked in ArticlePage via `viewTrackedRef`)
- Radio listens: Counted ONLY when selecting NEW episode (not on pause/resume)
- Both use database triggers for atomic increments
- Both auto-refresh frontend every 3 seconds for real-time display
- Data persists in database - survives page reloads

### Environment Variables

Required in `.env`:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (public, safe for frontend)

### Database Migrations

Always use `mcp__supabase__apply_migration` tool for schema changes:
1. Start with descriptive multi-line comment explaining changes
2. Use `IF NOT EXISTS` for safety
3. Enable RLS on all tables
4. Create restrictive policies (never `USING (true)`)
5. Update triggers for count fields

### Styling Guidelines

- Use Tailwind utility classes
- Framer Motion for animations
- Lucide React for icons
- Never use purple/indigo colors
- Responsive design with mobile-first approach
