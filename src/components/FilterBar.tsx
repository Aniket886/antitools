import { allTools, allCategories, allLanguages, allSources } from "@/lib/skills-data";

interface FilterBarProps {
  tool: string;
  category: string;
  language: string;
  source?: string;
  onToolChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
  onSourceChange?: (v: string) => void;
}

function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-md border border-border bg-secondary px-3 text-sm text-secondary-foreground focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export function FilterBar({ tool, category, language, source, onToolChange, onCategoryChange, onLanguageChange, onSourceChange }: FilterBarProps) {
  const hasFilters = tool || category || language || source;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectFilter label="All Tools" value={tool} options={allTools} onChange={onToolChange} />
      <SelectFilter label="All Categories" value={category} options={allCategories} onChange={onCategoryChange} />
      <SelectFilter label="All Languages" value={language} options={allLanguages} onChange={onLanguageChange} />
      {onSourceChange && (
        <SelectFilter label="All Sources" value={source ?? ""} options={allSources} onChange={onSourceChange} />
      )}
      {hasFilters && (
        <button
          onClick={() => { onToolChange(""); onCategoryChange(""); onLanguageChange(""); onSourceChange?.(""); }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
