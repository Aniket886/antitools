import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ArrowLeft, Star, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getSkillById } from "@/lib/skills-data";
import type { Skill } from "@/lib/types";
import { toast } from "sonner";

const compareSearchSchema = z.object({
  ids: fallback(z.string().array(), []).default([]),
});

export const Route = createFileRoute("/compare")({
  validateSearch: zodValidator(compareSearchSchema),
  head: () => ({
    meta: [
      { title: "Compare Skills — Antigravity Skills" },
      { name: "description", content: "Compare agentic AI coding skills side by side." },
    ],
  }),
  component: ComparePage,
});

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copied");
        setTimeout(() => setCopied(false), 2000);
      }}
      className="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

function ComparePage() {
  const { ids } = Route.useSearch();
  const skills: Skill[] = (ids as string[]).map(getSkillById).filter((s): s is Skill => !!s);

  if (skills.length < 2) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Compare Skills</h1>
        <p className="mt-3 text-muted-foreground">Select at least 2 skills from the catalog to compare.</p>
        <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Go to catalog
        </Link>
      </div>
    );
  }

  const allToolsSet = new Set(skills.flatMap((s) => s.supportedTools));
  const allTools = Array.from(allToolsSet).sort();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/catalog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Compare Skills</h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="w-40 border-b border-border p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground" />
              {skills.map((skill) => (
                <th key={skill.id} className="border-b border-border p-4 text-left">
                  <Link to="/skills/$skillId" params={{ skillId: skill.id }} className="font-heading text-base font-bold text-foreground hover:text-primary transition-colors">
                    {skill.name}
                  </Link>
                  {skill.featured && <Badge className="ml-2 text-[10px]">Featured</Badge>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row label="Description">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 text-sm text-muted-foreground leading-relaxed align-top">{s.description}</td>
              ))}
            </Row>
            <Row label="Author">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 text-sm text-foreground align-top">{s.author}</td>
              ))}
            </Row>
            <Row label="Language">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 align-top"><Badge variant="secondary">{s.language}</Badge></td>
              ))}
            </Row>
            <Row label="Category">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 align-top"><Badge variant="secondary">{s.category}</Badge></td>
              ))}
            </Row>
            <Row label="Stars">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 text-sm text-foreground align-top">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-primary" />{s.stars.toLocaleString()}</span>
                </td>
              ))}
            </Row>
            <Row label="Downloads">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 text-sm text-foreground align-top">
                  <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5 text-primary" />{s.downloads.toLocaleString()}</span>
                </td>
              ))}
            </Row>
            <Row label="Tags">
              {skills.map((s) => (
                <td key={s.id} className="border-b border-border p-4 align-top">
                  <div className="flex flex-wrap gap-1">{s.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}</div>
                </td>
              ))}
            </Row>
            {allTools.map((tool) => (
              <Row key={tool} label={tool}>
                {skills.map((s) => {
                  const cmd = s.installCommands[tool as keyof typeof s.installCommands];
                  return (
                    <td key={s.id} className="border-b border-border p-4 align-top">
                      {cmd ? (
                        <div className="flex items-center gap-2 rounded-md bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-foreground">
                          <span className="flex-1 truncate">{cmd}</span>
                          <CopyBtn text={cmd} />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  );
                })}
              </Row>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <td className="border-b border-border p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-top whitespace-nowrap">{label}</td>
      {children}
    </tr>
  );
}
