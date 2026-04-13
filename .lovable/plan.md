

## Antigravity Awesome Skills — Web App

A sleek, dark-themed web catalog for browsing 1,400+ agentic AI coding skills across Claude Code, Cursor, Codex CLI, Gemini CLI, and Antigravity.

### Design Direction
- **Palette**: Midnight Indigo — deep navy (#0a0a1a, #141432, #1e1e5a) with electric indigo (#4f46e5) accents
- **Typography**: Space Grotesk headings + DM Sans body — clean geometric developer aesthetic
- **Layout**: Card grid with search bar and filters at top
- **Style**: Generous whitespace, subtle card borders with indigo glow on hover, rounded-lg corners, smooth transitions

### Pages & Routes

1. **Homepage (`/`)** — Hero section with stats (1,400+ skills, 32K+ stars, 5 supported tools), search bar, and featured skill cards
2. **Catalog (`/catalog`)** — Full searchable/filterable card grid of all skills with autocomplete search, category/tag filters (by AI tool, language, use case), and pagination
3. **Skill Detail (`/skills/$skillId`)** — Individual skill page with description, install CLI commands for each supported AI tool (copy-to-clipboard), usage examples, tags, and author info
4. **About (`/about`)** — Project overview, supported AI tools, contribution guidelines, MIT license info

### Key Features

- **Search with autocomplete** — Instant fuzzy search across skill names, descriptions, and tags
- **Category/tag filtering** — Filter by AI tool (Claude Code, Cursor, etc.), language (Python, JS, etc.), and use case (debugging, refactoring, testing, etc.)
- **Install CLI instructions** — Each skill shows copy-paste install commands for supported AI tools with one-click copy
- **Skill detail pages** — Rich detail view with docs, examples, and compatibility info
- **Responsive design** — Works great on mobile and desktop
- **Mock data** — ~50 representative skills with realistic names, descriptions, and categories to demonstrate the catalog

### Data Model (client-side mock)

Skills will have: id, name, description, author, tags, supportedTools, language, category, installCommands, usageExample, stars, downloads.

