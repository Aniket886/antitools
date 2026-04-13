import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Antigravity Awesome Skills" },
      { name: "description", content: "Learn about the Antigravity Awesome Skills project, supported AI tools, and how to contribute." },
      { property: "og:title", content: "About — Antigravity Awesome Skills" },
      { property: "og:description", content: "The largest open-source catalog of agentic AI coding skills." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">About Antigravity Awesome Skills</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        Antigravity Awesome Skills is the largest open-source catalog of agentic skills for AI coding assistants.
        With over 1,400 skills and growing, it provides a comprehensive, searchable directory that developers can
        browse, filter, and install with a single command.
      </p>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-bold text-foreground">Supported AI Tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Claude Code", desc: "Anthropic's agentic coding assistant with terminal integration." },
            { name: "Cursor", desc: "AI-first code editor with deep codebase understanding." },
            { name: "Codex CLI", desc: "OpenAI's command-line coding agent for terminal workflows." },
            { name: "Gemini CLI", desc: "Google's AI coding assistant with multimodal capabilities." },
            { name: "Antigravity", desc: "Open-source agentic framework with extensible skill system." },
          ].map((tool) => (
            <div key={tool.name} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-heading text-base font-semibold text-card-foreground">{tool.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-bold text-foreground">Key Features</h2>
        <ul className="mt-4 space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span><strong className="text-foreground">Installer CLI</strong> — Install skills with a single command for any supported AI tool.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span><strong className="text-foreground">Bundles</strong> — Pre-configured skill bundles for common workflows (testing, DevOps, security).</span></li>
          <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span><strong className="text-foreground">Community Skills</strong> — Community-contributed skills with quality reviews and ratings.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span><strong className="text-foreground">Workflows</strong> — Chain multiple skills together into automated development workflows.</span></li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-bold text-foreground">Contributing</h2>
        <p className="mt-3 text-muted-foreground">
          Contributions are welcome! Submit new skills, report issues, or improve existing skills through
          the GitHub repository. All contributions are reviewed for quality and compatibility.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="font-heading text-xl font-bold text-card-foreground">Licensed under MIT</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Free to use, modify, and distribute. Built by the community, for the community.
        </p>
        <Link
          to="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse the Catalog <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
