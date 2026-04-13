

## Enhance Web App with Bundles, Workflows, and Installer

The system summary describes features (bundles, workflows, installer CLI) that aren't yet reflected in the web app. Here's a plan to add them.

### New Pages

1. **Bundles page (`/bundles`)** — Curated skill bundles (e.g., "SaaS MVP Starter", "Security Hardening", "DevOps Essentials") showing grouped skills with one-click install commands for the entire bundle
2. **Workflows page (`/workflows`)** — Multi-step automated workflows that chain skills together (e.g., "PR Review Pipeline": lint → test-gen → security-scan → changelog)
3. **Install page (`/install`)** — Quick-start guide showing `npx antigravity-awesome-skills` usage, tool-specific plugin instructions, and configuration options

### Data Changes

- Add `bundles` array to `skills-data.ts` with ~8 curated bundles, each referencing existing skill IDs
- Add `workflows` array with ~5 workflow definitions showing skill chaining
- Add bundle/workflow TypeScript types to `types.ts`

### Navigation Updates

- Add Bundles, Workflows, and Install links to Header nav
- Add a "Quick Install" CTA button in the Header (styled with primary color)
- Update Homepage to include a bundles preview section and install command snippet

### Technical Details

- 3 new route files in `src/routes/`
- Updated `Header.tsx` with expanded nav
- Updated `skills-data.ts` and `types.ts` with new data structures
- All client-side, no backend needed

