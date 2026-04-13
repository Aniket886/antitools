import { Link } from "@tanstack/react-router";
import { Star, Download, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCompare } from "@/hooks/use-compare";
import type { Skill } from "@/lib/types";

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function SkillCard({ skill }: { skill: Skill }) {
  const { toggle, isSelected } = useCompare();
  const selected = isSelected(skill.id);

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_24px_-4px_var(--color-indigo-glow)]">
      {/* Compare checkbox */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(skill.id);
        }}
        className={`absolute top-3 right-3 z-10 flex h-5 w-5 items-center justify-center rounded border transition-colors ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-secondary text-transparent hover:border-muted-foreground"
        }`}
        aria-label={selected ? "Remove from compare" : "Add to compare"}
        title={selected ? "Remove from compare" : "Add to compare"}
      >
        <Check className="h-3 w-3" />
      </button>

      <Link
        to="/skills/$skillId"
        params={{ skillId: skill.id }}
        className="flex flex-1 flex-col"
      >
        <div className="mb-3 flex items-start justify-between pr-6">
          <h3 className="font-heading text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {skill.name}
          </h3>
          {skill.featured && (
            <Badge variant="default" className="ml-2 shrink-0 text-[10px]">Featured</Badge>
          )}
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {skill.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {skill.source === "official" && (
            <Badge variant="default" className="text-[10px] font-normal">Official</Badge>
          )}
          {skill.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {formatNumber(skill.stars)}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {formatNumber(skill.downloads)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {skill.supportedTools.slice(0, 3).map((tool) => (
              <span key={tool} className="rounded-md bg-secondary px-1.5 py-0.5 text-[9px] text-secondary-foreground">
                {tool.split(" ")[0]}
              </span>
            ))}
            {skill.supportedTools.length > 3 && (
              <span className="text-[9px] text-muted-foreground">+{skill.supportedTools.length - 3}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
