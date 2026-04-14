# Antigravity Awesome Skills

The largest open-source catalog of agentic AI coding skills — browse, filter, compare, and install 1,400+ skills with a single command.

🌐 **Live site:** [antitools.lovable.app](https://antitools.lovable.app)

## Features

- **📚 Skill Catalog** — Searchable, filterable grid of 1,400+ skills with sorting by name, date added, stars, downloads, and more
- **🔍 Advanced Filtering** — Filter by AI tool, category, language, risk level, and source
- **⚖️ Skill Comparison** — Compare up to 4 skills side-by-side
- **📦 Bundles** — Pre-configured skill collections for common workflows (core-dev, ops-core, ai-ml, security, etc.)
- **🔄 Workflows** — Multi-step automation pipelines that chain skills together
- **🏆 Leaderboard** — Contributor rankings with GitHub-style generated avatars
- **👤 Contributor Profiles** — Dedicated pages for each author showing all their skills
- **🆕 New Skill Badges** — Visual indicators for recently added skills
- **🌙 Dark Theme** — Midnight Indigo design with electric indigo accents

## Supported AI Tools

| Tool | Description |
|------|-------------|
| **Claude Code** | Anthropic's agentic coding assistant |
| **Cursor** | AI-first code editor |
| **Codex CLI** | OpenAI's command-line coding agent |
| **Gemini CLI** | Google's AI coding assistant |
| **Antigravity** | Open-source agentic framework |

## Quick Install

```bash
npx antigravity-awesome-skills
```

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Build Tool:** Vite 7
- **Typography:** Space Grotesk (headings) + DM Sans (body)

## Project Structure

```
/
├── public/               # Static assets
├── scripts/              # Build-time data fetch scripts
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # shadcn/ui primitives
│   │   ├── AuthorAvatar.tsx
│   │   ├── CompareBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   └── SkillCard.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── use-compare.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-theme.ts
│   ├── lib/              # Data, types, and utilities
│   │   ├── types.ts          # TypeScript interfaces (Skill, Bundle, Workflow)
│   │   ├── skills-data.ts    # Search, filter, and helper functions
│   │   ├── generated-skills.ts  # Build-time generated skill data (1,400+ entries)
│   │   └── utils.ts
│   ├── routes/           # File-based routes (TanStack Router)
│   │   ├── __root.tsx        # Root layout (header, footer, providers)
│   │   ├── index.tsx         # Homepage
│   │   ├── catalog.tsx       # Skill catalog with filters
│   │   ├── skills.$skillId.tsx  # Individual skill detail pages
│   │   ├── bundles.tsx       # Skill bundles
│   │   ├── workflows.tsx     # Multi-step workflows
│   │   ├── compare.tsx       # Side-by-side comparison
│   │   ├── leaderboard.tsx   # Contributor rankings
│   │   ├── contributors.$author.tsx  # Author profile pages
│   │   ├── install.tsx       # Installation guide
│   │   └── about.tsx         # About page
│   ├── styles.css        # Design tokens and theme
│   └── router.tsx        # Router configuration
├── components.json       # shadcn/ui config
├── vite.config.ts        # Vite build config
├── tsconfig.json         # TypeScript config
└── wrangler.jsonc        # Cloudflare Workers config
```

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

## Deployment

### GitHub Pages

This project can be deployed to GitHub Pages. After building, the static output is served from the repository root.

1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to the branch and `/` (root) directory
4. The site will be available at `https://<username>.github.io/<repo-name>/`

> **Note:** For SPA routing to work on GitHub Pages, you may need a `404.html` that redirects to `index.html`.

### Lovable Cloud

Click **Publish** in the Lovable editor to deploy instantly to `*.lovable.app`.

## Data Pipeline

Skill data is fetched from the [awesome-skills GitHub repository](https://github.com) at build time via `scripts/fetch-skills.ts`. The script:

1. Fetches `skills_index.json`, `bundles.json`, and `workflows.json` from GitHub
2. Transforms 1,400+ skills with derived fields (tags, language, stars, downloads)
3. Writes `src/lib/generated-skills.ts` as a static TypeScript module

This keeps the app fully static with no runtime API calls.

## Contributing

Contributions are welcome! Submit new skills, report issues, or improve existing ones through the GitHub repository. All contributions are reviewed for quality and compatibility.

## License

MIT
