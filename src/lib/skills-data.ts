import type { Skill, Bundle, Workflow } from "./types";
import {
  skills as generatedSkills,
  bundles as generatedBundles,
  workflows as generatedWorkflows,
} from "./generated-skills";

export const skills: Skill[] = generatedSkills;
export const bundles: Bundle[] = generatedBundles;
export const workflows: Workflow[] = generatedWorkflows;

export const allTags = Array.from(new Set(skills.flatMap((s) => s.tags))).sort();
export const allCategories = Array.from(new Set(skills.map((s) => s.category))).sort();
export const allTools: string[] = ["Claude Code", "Cursor", "Codex CLI", "Gemini CLI", "Antigravity"];
export const allLanguages = Array.from(new Set(skills.map((s) => s.language))).sort();
export const allSources = Array.from(new Set(skills.map((s) => s.source ?? "community"))).sort();
export const featuredSkills = skills.filter((s) => s.featured);

export function searchSkills(
  query: string,
  filters?: { tool?: string; category?: string; language?: string; source?: string }
): Skill[] {
  let results = skills;
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (filters?.tool) results = results.filter((s) => s.supportedTools.includes(filters.tool!));
  if (filters?.category) results = results.filter((s) => s.category === filters.category);
  if (filters?.language) results = results.filter((s) => s.language === filters.language);
  if (filters?.source) results = results.filter((s) => (s.source ?? "community") === filters.source);
  return results;
}

export function getSkillById(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function getAutocompleteSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const names = skills.filter((s) => s.name.toLowerCase().includes(q)).map((s) => s.name);
  const tags = allTags.filter((t) => t.includes(q));
  return [...new Set([...names, ...tags])].slice(0, 8);
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}

export function getWorkflowById(id: string): Workflow | undefined {
  return workflows.find((w) => w.id === id);
}
