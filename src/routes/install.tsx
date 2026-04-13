import { createFileRoute } from "@tanstack/react-router";
import { Copy, Check, Terminal, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/install")({
  head: () => ({
    meta: [
      { title: "Install — Antigravity Skills" },
      { name: "description", content: "Quick-start guide for installing Antigravity Awesome Skills with any AI coding assistant." },
      { property: "og:title", content: "Install — Antigravity Skills" },
      { property: "og:description", content: "Quick-start guide for installing skills with any AI coding assistant." },
    ],
  }),
  component: InstallPage,
});

function CopyBlock({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group">
      {label && <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>}
      <button
        onClick={handleCopy}
        className="flex w-full items-center gap-2 rounded-lg bg-secondary px-4 py-3 font-mono text-sm text-foreground transition-colors hover:bg-secondary/80"
      >
        <Terminal className="h-4 w-4 shrink-0 text-primary" />
        <span className="flex-1 text-left">{command}</span>
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
      </button>
    </div>
  );
}

function InstallPage() {
  const tools = [
    { name: "Claude Code", install: "claude skill install <skill-name>", config: "claude config set skills-source antigravity" },
    { name: "Cursor", install: "cursor ext install <skill-name>", config: "cursor settings set ag.source antigravity-awesome-skills" },
    { name: "Codex CLI", install: "codex install <skill-name>", config: "codex config skills.registry antigravity" },
    { name: "Gemini CLI", install: "gemini install <skill-name>", config: "gemini config set --skills-source antigravity" },
    { name: "Antigravity", install: "ag install <skill-name>", config: "ag config set registry antigravity-awesome-skills" },
  ];

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Quick Install
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started with Antigravity Awesome Skills in under a minute.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Quick Start */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-foreground">1. Quick Start</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The fastest way to get started — run the interactive installer:
          </p>
          <div className="mt-4">
            <CopyBlock command="npx antigravity-awesome-skills" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            This launches an interactive CLI that lets you browse skills, select bundles, and configure your preferred AI tool.
          </p>
        </div>

        {/* Install a single skill */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-foreground">2. Install Individual Skills</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Install any skill directly with your AI coding tool:
          </p>
          <div className="mt-4 space-y-3">
            <CopyBlock command="npx antigravity-awesome-skills install <skill-name>" label="Using the CLI" />
            <CopyBlock command="npx antigravity-awesome-skills install-bundle <bundle-name>" label="Install a bundle" />
            <CopyBlock command="npx antigravity-awesome-skills install-workflow <workflow-name>" label="Install a workflow" />
          </div>
        </div>

        {/* Tool-specific instructions */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-foreground">3. Tool-Specific Setup</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Configure your preferred AI coding assistant:
          </p>
          <div className="mt-4 space-y-4">
            {tools.map((tool) => (
              <div key={tool.name} className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-heading text-sm font-bold text-foreground">{tool.name}</h3>
                <div className="mt-3 space-y-2">
                  <CopyBlock command={tool.config} label="Configure registry" />
                  <CopyBlock command={tool.install} label="Install a skill" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">4. CLI Options</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-2.5 text-left font-heading font-semibold text-foreground">Flag</th>
                  <th className="px-4 py-2.5 text-left font-heading font-semibold text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["--tool <name>", "Target AI tool (claude, cursor, codex, gemini, ag)"],
                  ["--dry-run", "Preview changes without installing"],
                  ["--force", "Overwrite existing skills"],
                  ["--list", "List all available skills"],
                  ["--search <query>", "Search skills by name or tag"],
                  ["--update", "Update all installed skills"],
                  ["--version", "Show CLI version"],
                ].map(([flag, desc]) => (
                  <tr key={flag}>
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">{flag}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
