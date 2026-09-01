# Portfolio

Personal portfolio site for Chatt Kush, built with **Next.js** (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create an optimized production build
- `npm run start` – start the production server
- `npm run lint` – run ESLint

## Environment Variables

The app relies on `NEXT_PUBLIC_*` environment variables (project image URLs, profile image, resume links). Copy `.env` with the appropriate values. All variables previously prefixed with `VITE_` are now `NEXT_PUBLIC_`.

## Structure

- `src/app/` – Next.js App Router pages and root layout
- `src/components/` – React components (marketing sections, UI primitives)
- `src/constants/` – projects, companies, blogs, tech list data
- `src/content/blog/` – markdown blog posts
- `src/lib/` – markdown loading and utilities
- `public/` – static assets
