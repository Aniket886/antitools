import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, Star, Download, Package, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/skills-data";
import type { Skill } from "@/lib/types";

export const Route = createFileRoute("/contributors/$author")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.author)} — Contributor — Antigravity Skills` },
      { name: "description", content: `Skills authored by ${decodeURIComponent(params.author)} in the Antigravity Skills catalog.` },
      { property: "og:title", content: `${decodeURIComponent(params.author)} — Antigravity Skills` },
      { property: "og:description", content: `Skills authored by ${decodeURIComponent(params.author)}.` },
    ],
  }),
  component: ContributorProfilePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Contributor Not Found</h1>
      <Link to="/leaderboard" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to leaderboard
      </Link>
    </div>
  ),
});

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function ContributorProfilePage() {
  const { author } = Route.useParams();
  const decodedAuthor = decodeURIComponent(author);

  const { authorSkills, totalStars, totalDownloads, categories, languages } = useMemo(() => {
    const authorSkills = skills.filter((s) => (s.author || "unknown") === decodedAuthor);
    const totalStars = authorSkills.reduce((sum, s) => sum + s.stars, 0);
    const totalDownloads = authorSkills.reduce((sum, s) => sum + s.downloads, 0);
    const categories = [...new Set(authorSkills.map((s) => s.category))].sort();
    const languages = [...new Set(authorSkills.map((s) => s.language))].sort();
    return { authorSkills, totalStars, totalDownloads, categories, languages };
  }, [decodedAuthor]);

  if (authorSkills.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">No Skills Found</h1>
        <p className="mt-2 text-muted-foreground">No skills found for author "{decodedAuthor}".</p>
        <Link to="/leaderboard" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to leaderboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/leaderboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to leaderboard
      </Link>

      {/* Profile Header */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-3xl font-bold text-foreground">{decodedAuthor}</h1>
          <p className="mt-1 text-muted-foreground">Skill contributor</p>

          <div className="mt-4 flex flex-wrap gap-4">
            <StatCard icon={<Package className="h-4 w-4 text-primary" />} label="Skills" value={authorSkills.length} />
            <StatCard icon={<Star className="h-4 w-4 text-primary" />} label="Total Stars" value={formatNumber(totalStars)} />
            <StatCard icon={<Download className="h-4 w-4 text-primary" />} label="Total Downloads" value={formatNumber(totalDownloads)} />
          </div>

          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills List */}
      <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
        All Skills ({authorSkills.length})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {authorSkills
          .sort((a, b) => b.stars - a.stars)
          .map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
      {icon}
      <div>
        <p className="text-sm font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <Link
      to="/skills/$skillId"
      params={{ skillId: skill.id }}
      className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-card/80"
    >
      <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
        {skill.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{skill.description}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Star className="h-3 w-3 text-primary" />{formatNumber(skill.stars)}</span>
        <span className="flex items-center gap-1"><Download className="h-3 w-3 text-primary" />{formatNumber(skill.downloads)}</span>
        <Badge variant="outline" className="text-[10px]">{skill.category}</Badge>
      </div>
    </Link>
  );
}
