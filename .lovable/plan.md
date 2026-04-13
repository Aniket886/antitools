

## Import All 1,400+ Real Skills from GitHub Repository

The current site has only 49 hardcoded mock skills. The actual GitHub repo has a `data/skills_index.json` with 1,400+ real skills, plus `data/bundles.json` with real bundles and `data/workflows.json` with real workflows. This plan replaces all mock data with the real data.

### Approach

**Build-time script** — Write a Node script that fetches the three JSON files from the GitHub raw URLs, transforms them into the app's data format, and writes them as TypeScript files. This keeps the app fully static (no runtime fetching) and ensures all 1,400+ skills are bundled.

### Data Mapping

The real `skills_index.json` entries have: `id`, `path`, `category`, `name`, `description`, `risk`, `source`, `date_added`. They lack: `author`, `tags`, `supportedTools`, `language`, `installCommands`, `usageExample`, `stars`, `downloads`.

Strategy:
- **Update the `Skill` type** to match the real data shape: add `path`, `risk`, `source`, `dateAdded`; make `author`, `tags`, `supportedTools`, `language`, `installCommands`, `usageExample`, `stars`, `downloads` optional or derived
- **Derive values**: extract `tags` from category + name tokens; infer `language` from path/name patterns; generate deterministic `stars`/`downloads` from a hash of the skill ID (so values are stable); set `supportedTools` to all 5 tools by default; build `installCommands` from the skill ID
- **Featured skills**: mark skills with `source: "official"` or first ~20 alphabetically as featured

### Real Bundles & Workflows

The real `bundles.json` has bundle groups like `core-dev`, `ops-core`, etc. with arrays of skill IDs. The real `workflows.json` has structured multi-step workflows. Both will replace the current mock data.

### Steps

1. **Write a build script** (`scripts/fetch-skills.ts`) that:
   - Fetches `skills_index.json`, `bundles.json`, `workflows.json` from GitHub raw URLs
   - Transforms skills into the updated `Skill` type with derived fields
   - Transforms bundles and workflows into the app's format
   - Writes `src/lib/generated-skills.ts` (the massive data file)

2. **Update `src/lib/types.ts`** — Relax types to accommodate real data (category as `string` instead of union, language as `string`, etc.)

3. **Update `src/lib/skills-data.ts`** — Import from generated file, keep search/filter/helper functions

4. **Update filter options** — `allCategories`, `allLanguages` will be auto-derived from the real data (many more categories than the current 10)

5. **Update UI components** — SkillCard and skill detail page to handle optional fields gracefully (e.g., show "community" as author if none, hide empty install commands, show `source` and `risk` badges)

6. **Run the script** during build to generate the data file

### Technical Details

- Generated TS file will be ~500KB+ but compresses well with gzip
- Categories from real data include: `andruia`, `game-development`, `uncategorized`, and many more
- Bundles from real data: `core-dev`, `ops-core`, `ai-ml`, `data-eng`, `security`, `mobile`, etc.
- Workflows from real data: `ship-saas-mvp`, plus several others with real step structures

### Files Changed/Created

- `scripts/fetch-skills.ts` — new build script
- `src/lib/types.ts` — relaxed types
- `src/lib/generated-skills.ts` — generated data (1,400+ entries)
- `src/lib/skills-data.ts` — imports from generated, keeps helpers
- `src/components/SkillCard.tsx` — handle optional fields
- `src/routes/skills.$skillId.tsx` — handle optional fields, show source/risk
- `src/routes/catalog.tsx` — add source filter
- `src/components/FilterBar.tsx` — add source filter option

