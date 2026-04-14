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
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Data, types, and utilities
│   ├── types.ts          # TypeScript interfaces (Skill, Bundle, Workflow)
│   ├── skills-data.ts    # Search, filter, and helper functions
│   └── generated-skills.ts  # Build-time generated skill data
├── routes/           # File-based routes (TanStack Router)
│   ├── index.tsx         # Homepage
│   ├── catalog.tsx       # Skill catalog with filters
│   ├── skills.$skillId.tsx  # Individual skill pages
│   ├── bundles.tsx       # Skill bundles
│   ├── workflows.tsx     # Multi-step workflows
│   ├── compare.tsx       # Side-by-side comparison
│   ├── leaderboard.tsx   # Contributor rankings
│   ├── contributors.$author.tsx  # Author profiles
│   ├── install.tsx       # Installation guide
│   └── about.tsx         # About page
└── styles.css        # Design tokens and theme
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

## Data

Skill data is fetched from the [awesome-skills GitHub repository](https://github.com) at build time and compiled into a static TypeScript file. The catalog includes skills across categories like game development, security, AI/ML, DevOps, and more.

## License

MIT
