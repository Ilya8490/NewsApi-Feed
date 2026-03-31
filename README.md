# Personalized News Feed

A production-ready fullstack news platform built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth, Zustand, and NewsAPI.

## Project Structure

```text
.
├── app
│   ├── (auth)/login
│   ├── api
│   │   ├── articles/summary
│   │   ├── auth/[...nextauth]
│   │   ├── feed
│   │   ├── preferences
│   │   ├── saved
│   │   └── user
│   ├── onboarding
│   ├── profile
│   ├── saved
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── auth
│   ├── feed
│   ├── layout
│   ├── profile
│   ├── shared
│   ├── ui
│   └── providers.tsx
├── hooks
├── lib
├── prisma
│   └── schema.prisma
├── store
├── types
├── .env.example
├── middleware.ts
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

4. Start the app:

```bash
npm run dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/personalized_news_feed?schema=public"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEWS_API_KEY="your-newsapi-key"
OPENAI_API_KEY="optional-openai-key"
DEFAULT_NEWS_COUNTRY="us"
```

## Database Migration Steps

1. Ensure PostgreSQL is running locally or update `DATABASE_URL` to your hosted instance.
2. Run `npm run db:generate`.
3. Run `npm run db:migrate`.
4. Use `npm run db:studio` to inspect users and saved articles.

## Notes

- Feed requests are server-side and cached for 10 minutes to reduce NewsAPI usage.
- Articles are deduplicated by URL before rendering.
- Saved articles are persisted in PostgreSQL.
- Google OAuth and credentials login are both supported through NextAuth.
- AI summaries are optional and only enabled when `OPENAI_API_KEY` is present.
