import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, Check, Workflow } from "lucide-react";
import { useState } from "react";
import { workflows } from "@/lib/skills-data";
import type { Workflow as WorkflowType } from "@/lib/types";

export const Route = createFileRoute("/workflows")({
  head: () => ({
    meta: [
      { title: "Workflows — Antigravity Skills" },
      { name: "description", content: "Multi-step automated workflows that chain skills together for end-to-end automation." },
      { property: "og:title", content: "Workflows — Antigravity Skills" },
      { property: "og:description", content: "Multi-step automated workflows that chain skills together." },
    ],
  }),
  component: WorkflowsPage,
});

function WorkflowsPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Workflows
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Chain multiple skills together into automated pipelines. Run complex multi-step tasks with a single command.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: WorkflowType }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(workflow.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">{workflow.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{workflow.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {workflow.supportedTools.map((tool) => (
              <span key={tool} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {tool}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-secondary px-3 py-2 font-mono text-xs text-foreground transition-colors hover:bg-secondary/80"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
          <span className="max-w-[260px] truncate">{workflow.installCommand}</span>
        </button>
      </div>

      <div className="mt-6">
        <div className="relative flex flex-col gap-0">
          {workflow.steps.map((step, i) => (
            <div key={step.skillId} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                {i < workflow.steps.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>
              <div className="pb-4">
                <Link
                  to="/skills/$skillId"
                  params={{ skillId: step.skillId }}
                  className="font-heading text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {step.name}
                </Link>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
