import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Star, Download, Copy, Check, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getSkillById } from "@/lib/skills-data";
import { toast } from "sonner";

export const Route = createFileRoute("/skills/$skillId")({
  head: ({ params }) => {
    const skill = getSkillById(params.skillId);
    return {
      meta: [
        { title: skill ? `${skill.name} — Antigravity Skills` : "Skill Not Found" },
        { name: "description", content: skill?.description ?? "Skill not found." },
        { property: "og:title", content: skill ? `${skill.name} — Antigravity Skills` : "Skill Not Found" },
        { property: "og:description", content: skill?.description ?? "" },
      ],
    };
  },
  component: SkillDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Skill Not Found</h1>
      <p className="mt-2 text-muted-foreground">This skill doesn't exist in the catalog.</p>
      <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>
    </div>
  ),
});

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function SkillDetailPage() {
  const { skillId } = Route.useParams();
  const skill = getSkillById(skillId);

  if (!skill) throw notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/catalog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mb-8">
        <div className="flex items-start gap-3 flex-wrap">
          <h1 className="font-heading text-3xl font-bold text-foreground">{skill.name}</h1>
          {skill.featured && <Badge className="mt-1">Featured</Badge>}
          {skill.source === "official" && <Badge variant="default" className="mt-1">Official</Badge>}
          {skill.risk && (
            <Badge variant={skill.risk === "safe" ? "secondary" : "outline"} className="mt-1 gap-1">
              <Shield className="h-3 w-3" />
              {skill.risk}
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">by {skill.author}</p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{skill.description}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {skill.stars.toLocaleString()} stars</span>
          <span className="flex items-center gap-1"><Download className="h-4 w-4" /> {skill.downloads.toLocaleString()} downloads</span>
          {skill.dateAdded && <span>Added {skill.dateAdded}</span>}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h2 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{skill.category}</Badge>
          <Badge variant="secondary">{skill.language}</Badge>
          {skill.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Supported Tools */}
      <div className="mb-8">
        <h2 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Supported Tools</h2>
        <div className="flex flex-wrap gap-2">
          {skill.supportedTools.map((tool) => (
            <span key={tool} className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Install Commands */}
      {Object.keys(skill.installCommands).length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Install Commands</h2>
          <div className="space-y-3">
            {Object.entries(skill.installCommands).map(([tool, cmd]) => (
              <div key={tool} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                <span className="shrink-0 text-xs font-medium text-muted-foreground w-24">{tool}</span>
                <code className="flex-1 text-sm text-foreground font-mono break-all">{cmd}</code>
                <CopyButton text={cmd} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Example */}
      <div className="mb-8">
        <h2 className="font-heading mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Usage Example</h2>
        <div className="relative rounded-lg border border-border bg-secondary/50 p-4">
          <pre className="overflow-x-auto text-sm text-foreground font-mono whitespace-pre-wrap">{skill.usageExample}</pre>
          <div className="absolute top-3 right-3">
            <CopyButton text={skill.usageExample} />
          </div>
        </div>
      </div>
    </div>
  );
}
