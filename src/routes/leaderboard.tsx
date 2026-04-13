import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Download, Package, Trophy, Medal, Award } from "lucide-react";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { skills } from "@/lib/skills-data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Contributor Leaderboard — Antigravity Skills" },
      { name: "description", content: "Top skill contributors ranked by total stars and downloads across 1,200+ agentic AI skills." },
      { property: "og:title", content: "Contributor Leaderboard — Antigravity Skills" },
      { property: "og:description", content: "Top skill contributors ranked by total stars and downloads." },
    ],
  }),
  component: LeaderboardPage,
});

type SortKey = "stars" | "downloads" | "skills";

interface Contributor {
  author: string;
  totalStars: number;
  totalDownloads: number;
  skillCount: number;
  topSkills: { id: string; name: string; stars: number }[];
  categories: string[];
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

const rankIcons = [
  <Trophy className="h-5 w-5 text-yellow-500" />,
  <Medal className="h-5 w-5 text-gray-400" />,
  <Award className="h-5 w-5 text-amber-600" />,
];

function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortKey>("stars");

  const contributors = useMemo(() => {
    const map = new Map<string, Contributor>();

    for (const skill of skills) {
      const author = skill.author || "unknown";
      let entry = map.get(author);
      if (!entry) {
        entry = { author, totalStars: 0, totalDownloads: 0, skillCount: 0, topSkills: [], categories: [] };
        map.set(author, entry);
      }
      entry.totalStars += skill.stars;
      entry.totalDownloads += skill.downloads;
      entry.skillCount += 1;
      entry.topSkills.push({ id: skill.id, name: skill.name, stars: skill.stars });
      if (!entry.categories.includes(skill.category)) {
        entry.categories.push(skill.category);
      }
    }

    // Keep top 3 skills per contributor
    for (const c of map.values()) {
      c.topSkills.sort((a, b) => b.stars - a.stars);
      c.topSkills = c.topSkills.slice(0, 3);
    }

    const list = Array.from(map.values());
    switch (sortBy) {
      case "stars": list.sort((a, b) => b.totalStars - a.totalStars); break;
      case "downloads": list.sort((a, b) => b.totalDownloads - a.totalDownloads); break;
      case "skills": list.sort((a, b) => b.skillCount - a.skillCount); break;
    }
    return list;
  }, [sortBy]);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Contributor Leaderboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Top skill authors ranked by community impact across {skills.length.toLocaleString()} skills
            </p>
          </div>
        </div>
      </section>

      {/* Top 3 podium */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {contributors.slice(0, 3).map((c, i) => (
            <div
              key={c.author}
              className={`relative rounded-xl border bg-card p-6 text-center transition-all ${
                i === 0
                  ? "border-yellow-500/50 shadow-[0_0_24px_-4px_hsl(48_100%_50%/0.15)]"
                  : "border-border"
              }`}
            >
              <div className="mb-3 flex justify-center">{rankIcons[i]}</div>
              <div className="mb-2 flex justify-center">
                <AuthorAvatar name={c.author} size={48} />
              </div>
              <div className="mb-1 text-xs font-medium text-muted-foreground">#{i + 1}</div>
              <Link to="/contributors/$author" params={{ author: c.author }} className="font-heading text-lg font-bold text-foreground hover:text-primary transition-colors">
                {c.author}
              </Link>
              <div className="mt-3 flex justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" /> {formatNumber(c.totalStars)}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" /> {formatNumber(c.totalDownloads)}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" /> {c.skillCount}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                {c.topSkills.map((s) => (
                  <Link
                    key={s.id}
                    to="/skills/$skillId"
                    params={{ skillId: s.id }}
                    className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sort controls */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{contributors.length} contributors</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="h-9 rounded-md border border-border bg-secondary px-3 text-sm text-secondary-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="stars">Sort by Stars</option>
            <option value="downloads">Sort by Downloads</option>
            <option value="skills">Sort by Skill Count</option>
          </select>
        </div>

        {/* Full table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-12">#</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Author</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" /> Stars</span>
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Download className="h-3 w-3" /> Downloads</span>
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Skills</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Top Skills</th>
              </tr>
            </thead>
            <tbody>
              {contributors.slice(0, 50).map((c, i) => (
                <tr
                  key={c.author}
                  className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30"
                >
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {i < 3 ? rankIcons[i] : i + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    <Link to="/contributors/$author" params={{ author: c.author }} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <AuthorAvatar name={c.author} size={24} />
                      {c.author}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right text-foreground tabular-nums">{c.totalStars.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-foreground tabular-nums">{c.totalDownloads.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-foreground tabular-nums">{c.skillCount}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {c.topSkills.map((s) => (
                        <Link
                          key={s.id}
                          to="/skills/$skillId"
                          params={{ skillId: s.id }}
                          className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary hover:bg-primary/20 transition-colors"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
