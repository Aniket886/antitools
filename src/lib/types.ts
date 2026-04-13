export type AITool = "Claude Code" | "Cursor" | "Codex CLI" | "Gemini CLI" | "Antigravity";

export interface Skill {
  id: string;
  name: string;
  description: string;
  path?: string;
  author: string;
  tags: string[];
  supportedTools: string[];
  language: string;
  category: string;
  installCommands: Record<string, string>;
  usageExample: string;
  stars: number;
  downloads: number;
  risk?: string;
  source?: string;
  dateAdded?: string;
  featured?: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  skillIds: string[];
  icon: string;
  installCommand: string;
  tags: string[];
  totalSkills?: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  supportedTools: string[];
  installCommand: string;
  tags: string[];
}

export interface WorkflowStep {
  skillId: string;
  name: string;
  description: string;
}
