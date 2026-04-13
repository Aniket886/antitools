import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { bundles, getSkillById } from "@/lib/skills-data";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Skill Bundles — Antigravity Skills" },
      { name: "description", content: "Curated bundles of agentic skills for common workflows. Install an entire stack with one command." },
      { property: "og:title", content: "Skill Bundles — Antigravity Skills" },
      { property: "og:description", content: "Curated bundles of agentic skills for common workflows." },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Skill Bundles
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Curated collections of skills for common workflows. Install an entire stack with one command.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BundleCard({ bundle }: { bundle: (typeof bundles)[number] }) {
  const [copied, setCopied] = useState(false);
  const skills = bundle.skillIds.map(getSkillById).filter(Boolean);

  const handleCopy = () => {
    navigator.clipboard.writeText(bundle.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]">
      <div className="flex items-start gap-4">
        <span className="text-3xl">{bundle.icon}</span>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold text-foreground">{bundle.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{bundle.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {bundle.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Includes {skills.length} skills:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) =>
            skill ? (
              <Link
                key={skill.id}
                to="/skills/$skillId"
                params={{ skillId: skill.id }}
                className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {skill.name}
              </Link>
            ) : null
          )}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleCopy}
          className="flex w-full items-center gap-2 rounded-lg bg-secondary px-3 py-2 font-mono text-xs text-foreground transition-colors hover:bg-secondary/80"
        >
          <Package className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="flex-1 truncate text-left">{bundle.installCommand}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 shrink-0 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
