import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CompareProvider } from "@/hooks/use-compare";
import { CompareBar } from "@/components/CompareBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Antigravity Awesome Skills — 1,400+ Agentic AI Coding Skills" },
      { name: "description", content: "Browse and install 1,400+ agentic skills for Claude Code, Cursor, Codex CLI, Gemini CLI, and Antigravity." },
      { property: "og:title", content: "Antigravity Awesome Skills — 1,400+ Agentic AI Coding Skills" },
      { property: "og:description", content: "Browse and install 1,400+ agentic skills for Claude Code, Cursor, Codex CLI, Gemini CLI, and Antigravity." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Antigravity Awesome Skills — 1,400+ Agentic AI Coding Skills" },
      { name: "twitter:description", content: "Browse and install 1,400+ agentic skills for Claude Code, Cursor, Codex CLI, Gemini CLI, and Antigravity." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/89ec28c4-486f-436e-8cb1-0c3ca7135d42" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/89ec28c4-486f-436e-8cb1-0c3ca7135d42" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ag-theme');document.documentElement.className=t==='light'?'light':'dark'}catch(e){document.documentElement.className='dark'}})()` }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CompareProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CompareBar />
        <Toaster />
      </div>
    </CompareProvider>
  );
}
