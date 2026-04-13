import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Download, Package, Users, ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { SkillCard } from "@/components/SkillCard";
import { featuredSkills, skills, searchSkills, bundles } from "@/lib/skills-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [query, setQuery] = useState("");
  const [installCopied, setInstallCopied] = useState(false);
  const searchResults = query ? searchSkills(query) : [];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npx antigravity-awesome-skills");
    setInstallCopied(true);
    setTimeout(() => setInstallCopied(false), 2000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-glow),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              1,400+ Agentic Skills
              <br />
              <span className="text-primary">for AI Coding Assistants</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              The largest open-source catalog of skills for Claude Code, Cursor, Codex CLI, Gemini CLI, and Antigravity. Install with one command.
            </p>

            {/* Install command */}
            <div className="mx-auto mt-8 max-w-md">
              <button
                onClick={handleCopyInstall}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-secondary/50 px-5 py-3.5 font-mono text-sm text-foreground transition-colors hover:bg-secondary/80"
              >
                <Terminal className="h-4 w-4 shrink-0 text-primary" />
                <span className="flex-1 text-left">npx antigravity-awesome-skills</span>
                {installCopied ? (
                  <Check className="h-4 w-4 shrink-0 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
            </div>

            <div className="mx-auto mt-6 max-w-xl">
              <SearchBar value={query} onChange={setQuery} />
              {query && searchResults.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchResults.length} results ·{" "}
                  <Link to="/catalog" className="text-primary hover:underline">
                    View all in catalog
                  </Link>
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {[
                { icon: Package, label: "Skills", value: "1,400+" },
                { icon: Star, label: "GitHub Stars", value: "32K+" },
                { icon: Download, label: "Installs", value: "2.1M+" },
                { icon: Users, label: "Contributors", value: "380+" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-heading text-2xl font-bold text-foreground">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supported Tools */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Works with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {["Claude Code", "Cursor", "Codex CLI", "Gemini CLI", "Antigravity"].map((tool) => (
              <span key={tool} className="font-heading text-sm font-semibold text-muted-foreground/80">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Featured Skills</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked by the community</p>
          </div>
          <Link to="/catalog" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkills.slice(0, 6).map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Bundles Preview */}
      <section className="border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Popular Bundles</h2>
              <p className="mt-1 text-sm text-muted-foreground">Curated skill collections for common workflows</p>
            </div>
            <Link to="/bundles" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bundles.slice(0, 4).map((bundle) => (
              <Link
                key={bundle.id}
                to="/bundles"
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]"
              >
                <span className="text-2xl">{bundle.icon}</span>
                <h3 className="mt-2 font-heading text-sm font-bold text-foreground">{bundle.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{bundle.description}</p>
                <p className="mt-2 text-xs text-primary">{bundle.skillIds.length} skills</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Ready to supercharge your workflow?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Browse the full catalog of {skills.length}+ skills and find the perfect tools for your stack.
            </p>
            <Link
              to="/catalog"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
