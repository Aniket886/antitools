import { Link } from "@tanstack/react-router";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "@/hooks/use-compare";
import { getSkillById } from "@/lib/skills-data";

export function CompareBar() {
  const { selected, toggle, clear } = useCompare();

  if (selected.length === 0) return null;

  const skills = selected.map(getSkillById).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl shadow-[0_-4px_20px_-4px_hsl(var(--primary)/0.15)]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <span className="shrink-0 text-sm font-medium text-foreground">
          Compare ({selected.length}/4)
        </span>

        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {skills.map((skill) =>
            skill ? (
              <span
                key={skill.id}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {skill.name}
                <button
                  onClick={() => toggle(skill.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ) : null
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={clear}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
          {selected.length >= 2 && (
            <Link
              to="/compare"
              search={{ ids: selected }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Compare <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
