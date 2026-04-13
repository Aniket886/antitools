import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { SkillCard } from "@/components/SkillCard";
import { searchSkills } from "@/lib/skills-data";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Skill Catalog — Antigravity Awesome Skills" },
      { name: "description", content: "Browse and filter 1,400+ agentic AI coding skills by tool, category, and language." },
      { property: "og:title", content: "Skill Catalog — Antigravity Awesome Skills" },
      { property: "og:description", content: "Browse and filter 1,400+ agentic AI coding skills." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

  const results = useMemo(
    () => searchSkills(query, { tool, category, language }),
    [query, tool, category, language]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Skill Catalog</h1>
        <p className="mt-2 text-muted-foreground">
          Browse and filter all available agentic skills
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar value={query} onChange={setQuery} className="flex-1" />
      </div>

      <div className="mb-8">
        <FilterBar
          tool={tool}
          category={category}
          language={language}
          onToolChange={setTool}
          onCategoryChange={setCategory}
          onLanguageChange={setLanguage}
        />
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {results.length} skill{results.length !== 1 ? "s" : ""} found
      </p>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-foreground">No skills found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
