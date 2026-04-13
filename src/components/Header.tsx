import { Link } from "@tanstack/react-router";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { to: "/" as const, label: "Home", exact: true },
    { to: "/catalog" as const, label: "Catalog" },
    { to: "/bundles" as const, label: "Bundles" },
    { to: "/workflows" as const, label: "Workflows" },
    { to: "/about" as const, label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-sm font-bold text-primary-foreground">AG</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            Antigravity<span className="text-primary"> Skills</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, exact }) => (
            <Link
              key={to}
              to={to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-foreground" }}
              activeOptions={exact ? { exact: true } : undefined}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/install"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="h-3.5 w-3.5" />
            Install
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-1 rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <button
          className="md:hidden rounded-md p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
            <Link to="/install" className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground" onClick={() => setMobileOpen(false)}>
              <Download className="h-3.5 w-3.5" />
              Install
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
