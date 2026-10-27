# Land Viewer

**Explore how places change over time.**

Land Viewer is a community-driven web application for showcasing and comparing imagery of local environments across different points in time. It is designed to help people explore changes in urban areas, agricultural land, commercial zones, and residential neighborhoods through before-and-after visual comparisons.

🌐 **Live Demo:** https://land-viewer.vercel.app/  
💻 **Source Code:** https://github.com/sarfrazcodes/land_viewer

## Overview

Land Viewer provides a gallery-based experience for documenting environmental and land-use transformations. Visitors can browse comparison entries, explore featured changes, and submit imagery to contribute to the collection.

The homepage highlights selected transformations and uses animated visual elements to introduce the project. The gallery organizes entries by category, while comparison cards present the imagery and supporting details.

## Features

- **Before-and-after exploration** — present imagery that illustrates how a place has changed over time.
- **Featured transformations** — highlight selected comparison entries on the homepage.
- **Gallery browsing** — explore comparison entries in one place.
- **Category filtering** — browse categories such as Urban, Agricultural, Commercial, and Residential.
- **Community submissions** — access a submission flow for contributing comparison imagery and information.
- **Responsive interface** — layouts designed for different screen sizes.
- **Animated UI** — transitions, reveal animations, and a parallax-style homepage background.
- **Dark-mode styling** — components include dark-theme styling.
- **Shared application state** — Zustand manages comparison entries and loading state.
- **Data integration foundations** — the project includes Supabase client configuration and a comparison-fetching flow.

> The application is an exploration and documentation tool. Do not treat its imagery as official land records, surveyed boundaries, or legally authoritative evidence of land ownership.

## Tech Stack

| Technology | Role |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | UI components |
| TypeScript | Type-safe application code |
| Tailwind CSS 4 | Styling and responsive layouts |
| Framer Motion | Animations and scroll effects |
| Zustand | Client-side state management |
| Supabase JavaScript client | Supabase integration |
| Lucide React | Icons |
| `clsx` and `tailwind-merge` | Conditional and merged utility classes |
| Vercel | Live application hosting |

## Application Pages

The application navigation includes the following main pages:

- **Home (`/`)** — introduces Land Viewer and displays featured transformations.
- **Gallery (`/gallery`)** — browses comparison entries and category filters.
- **Submit (`/submit`)** — provides the interface for submitting imagery and comparison details.
- **About (`/about`)** — explains the project.

## Project Structure

The repository uses the Next.js App Router. The main directories and files include:

```text
land_viewer/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages and layouts
│   │   ├── page.tsx         # Homepage and featured transformations
│   │   ├── gallery/         # Comparison gallery
│   │   ├── submit/          # Submission interface
│   │   └── about/           # Project information
│   ├── components/
│   │   └── ComparisonCard.tsx
│   ├── lib/
│   │   ├── mockData.ts      # Comparison entry types/data
│   │   └── supabase.ts      # Supabase client configuration
│   └── store/
│       └── useStore.ts      # Zustand store for comparison entries
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── eslint.config.mjs
```

The structure above highlights the main files reviewed; additional files may exist in the repository.

## Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js version
- npm

### 1. Clone the repository

```bash
git clone https://github.com/sarfrazcodes/land_viewer.git
cd land_viewer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

The repository includes a Supabase client configured to read these public environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `.env.local` file in the project root if your local setup requires Supabase. Use the public/anonymous key intended for browser use and configure appropriate Supabase Row Level Security (RLS) policies. Never put a Supabase service-role key or other server secret in a `NEXT_PUBLIC_` variable.

The comparison store also requests data from `/api/comparisons`. Ensure the corresponding API route and its data source are configured for the environment you are running. The route's complete implementation and database schema should be checked before assuming that a fresh local setup can retrieve or persist entries.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create a production build

```bash
npm run build
npm run start
```

### 6. Run lint checks

```bash
npm run lint
```

## How It Works

At a high level:

1. The homepage loads comparison entries through the shared Zustand store.
2. The store requests comparison data from the application's `/api/comparisons` endpoint.
3. Featured entries are displayed on the homepage using reusable comparison cards.
4. The gallery lets visitors explore entries and browse by category.
5. The submission page provides a user interface for contributing imagery and related information.

The exact persistence, upload-storage, and submission-processing behavior depends on the configured API and backend/data-source implementation.

## Data and Privacy Considerations

- Only submit imagery that you have permission to share.
- Avoid uploading identifiable personal information without appropriate consent.
- Clearly label the location and dates associated with comparison images.
- Keep API credentials and server secrets out of source control.
- Configure Supabase access policies so users can only read or write the data they are authorized to access.
- Explain how submitted images and metadata are stored and used before opening the platform to public contributions.

## Current Scope

Land Viewer is intended to make visual comparison and community documentation of local changes approachable. Image comparisons can be useful for exploration, but they do not independently establish why a change occurred or prove an official land-use classification.

Potential future improvements include stronger location metadata, date-based comparison, map-based discovery, image provenance, accessibility refinements, and clearer submission moderation workflows.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Implement and test the change locally.
4. Open a pull request describing the update.

## License

Check the repository for a license file before reusing or redistributing this project. If no license is present, do not assume that the code is released under an open-source license.
