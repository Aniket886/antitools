import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { SkillCard } from "@/components/SkillCard";
import { searchSkills } from "@/lib/skills-data";

const ITEMS_PER_PAGE = 12;

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Skill Catalog — Antigravity Awesome Skills" },
      { name: "description", content: "Browse and filter 1,200+ agentic AI coding skills by tool, category, language, and source." },
      { property: "og:title", content: "Skill Catalog — Antigravity Awesome Skills" },
      { property: "og:description", content: "Browse and filter 1,200+ agentic AI coding skills." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);

  const results = useMemo(
    () => searchSkills(query, { tool, category, language, source }),
    [query, tool, category, language, source]
  );

  const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleQueryChange = (v: string) => { setQuery(v); setPage(1); };
  const handleToolChange = (v: string) => { setTool(v); setPage(1); };
  const handleCategoryChange = (v: string) => { setCategory(v); setPage(1); };
  const handleLanguageChange = (v: string) => { setLanguage(v); setPage(1); };
  const handleSourceChange = (v: string) => { setSource(v); setPage(1); };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Skill Catalog</h1>
        <p className="mt-2 text-muted-foreground">
          Browse and filter all {results.length > 0 ? "1,200+" : ""} available agentic skills
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar value={query} onChange={handleQueryChange} className="flex-1" />
      </div>

      <div className="mb-8">
        <FilterBar
          tool={tool}
          category={category}
          language={language}
          source={source}
          onToolChange={handleToolChange}
          onCategoryChange={handleCategoryChange}
          onLanguageChange={handleLanguageChange}
          onSourceChange={handleSourceChange}
        />
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {results.length} skill{results.length !== 1 ? "s" : ""} found
        {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
      </p>

      {paginatedResults.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedResults.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-foreground">No skills found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pageNumbers.map((n, i) =>
            n === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">…</span>
            ) : (
              <button
                key={n}
                onClick={() => setPage(n as number)}
                className={`h-9 min-w-9 rounded-md px-3 text-sm font-medium transition-colors ${
                  n === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {n}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
