import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Footer, Nav } from "@/components/site";
import { DOC_SECTIONS } from "@/lib/docs";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const query = q.toLowerCase();
  return (
    <nav aria-label="Documentation">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the docs"
        aria-label="Search the docs"
        className="w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-ink outline-none focus:border-lavender"
      />
      <Link
        to="/docs"
        onClick={onNavigate}
        className={`mt-5 block rounded-lg px-3 py-1.5 text-sm font-semibold ${path === "/docs" || path === "/docs/" ? "bg-secondary text-ink" : "text-muted-foreground hover:text-ink"}`}
      >
        Overview
      </Link>
      {DOC_SECTIONS.map((sec) => {
        const pages = sec.pages.filter((p) => p.title.toLowerCase().includes(query));
        if (!pages.length) return null;
        return (
          <div key={sec.title} className="mt-5">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-ink">{sec.title}</p>
            <ul className="mt-1.5 space-y-0.5">
              {pages.map((p) => {
                const active = path === `/docs/${p.slug}`;
                return (
                  <li key={p.slug}>
                    <Link
                      to="/docs/$slug"
                      params={{ slug: p.slug }}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? "bg-secondary font-medium text-ink" : "text-muted-foreground hover:bg-secondary/60 hover:text-ink"}`}
                    >
                      <span>{p.title}</span>
                      {!p.body && <span className="text-[10px] text-primary">Pending</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function DocsLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <div className="mx-auto flex max-w-7xl gap-10 px-4 pb-24 pt-28">
        <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] w-64 shrink-0 overflow-y-auto pb-8 lg:block">
          <DocsSidebar />
        </aside>
        <div className="min-w-0 flex-1">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mb-6 rounded-xl border border-input bg-card px-4 py-2 text-sm font-semibold text-ink lg:hidden"
          >
            {open ? "Close topics" : "Browse topics"}
          </button>
          {open && (
            <div className="mb-8 rounded-2xl border border-input bg-card p-4 lg:hidden">
              <DocsSidebar onNavigate={() => setOpen(false)} />
            </div>
          )}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
