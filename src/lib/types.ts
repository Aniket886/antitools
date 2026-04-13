export type AITool = "Claude Code" | "Cursor" | "Codex CLI" | "Gemini CLI" | "Antigravity";

export type SkillCategory =
  | "debugging"
  | "refactoring"
  | "testing"
  | "code-generation"
  | "documentation"
  | "devops"
  | "data"
  | "security"
  | "performance"
  | "architecture";

export type Language = "Python" | "TypeScript" | "JavaScript" | "Rust" | "Go" | "Ruby" | "Java" | "Multi";

export interface Skill {
  id: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  supportedTools: AITool[];
  language: Language;
  category: SkillCategory;
  installCommands: Partial<Record<AITool, string>>;
  usageExample: string;
  stars: number;
  downloads: number;
  featured?: boolean;
}
