import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-xs font-bold text-primary-foreground">AG</span>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">
              Antigravity Skills
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/catalog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Catalog</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          </nav>
          <p className="text-xs text-muted-foreground">MIT License · © 2026</p>
        </div>
      </div>
    </footer>
  );
}
