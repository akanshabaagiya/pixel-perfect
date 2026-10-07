import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer, Nav } from "@/components/site";
import { DOC_SECTIONS } from "@/lib/docs";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const listRef = useRef<HTMLDivElement>(null);
  const query = q.toLowerCase();
  const sections = DOC_SECTIONS.map((sec) => ({
    ...sec,
    pages: sec.pages.filter((p) => p.title.toLowerCase().includes(query)),
  })).filter((sec) => sec.pages.length);

  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('[data-active="true"]');
    if (!list || !active) return;
    const top =
      active.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    if (top < list.scrollTop + 24 || top > list.scrollTop + list.clientHeight - 48) {
      list.scrollTo({ top: Math.max(0, top - list.clientHeight / 3) });
    }
  }, [path]);

  return (
    <nav aria-label="Documentation" className="flex h-full min-h-0 flex-col">
      <div className="relative shrink-0">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the docs"
          aria-label="Search the docs"
          className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm text-ink outline-none transition-colors focus:border-lavender"
        />
      </div>
      <div
        ref={listRef}
        className="docs-scroll relative mt-3 min-h-0 flex-1 overflow-y-auto pb-6 pr-1 pt-3"
      >
        <Link
          to="/docs"
          onClick={onNavigate}
          activeOptions={{ exact: true }}
          className={`block rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${path === "/docs" || path === "/docs/" ? "bg-secondary text-ink" : "text-muted-foreground hover:bg-secondary/60 hover:text-ink"}`}
        >
          Overview
        </Link>
        {sections.map((sec) => (
          <div key={sec.title} className="mt-6">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink/70">
              {sec.title}
            </p>
            <ul className="mt-2 space-y-0.5 border-l border-border/70 pl-2 ml-3">
              {sec.pages.map((p) => {
                const active = path === `/docs/${p.slug}`;
                return (
                  <li key={p.slug}>
                    <Link
                      to="/docs/$slug"
                      params={{ slug: p.slug }}
                      onClick={onNavigate}
                      data-active={active}
                      className={`relative flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? "bg-secondary font-medium text-ink before:absolute before:-left-[9px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:rounded-full before:bg-primary" : "text-muted-foreground hover:bg-secondary/60 hover:text-ink"}`}
                    >
                      <span>{p.title}</span>
                      {!p.body && <span className="text-[10px] text-primary">Pending</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {!sections.length && (
          <p className="mt-6 px-3 text-sm text-muted-foreground">No topics match “{q}”.</p>
        )}
      </div>
    </nav>
  );
}

function DocsLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative overflow-x-clip">
      <Nav />
      <div className="mx-auto flex max-w-7xl gap-10 px-4 pb-24 pt-28">
        <aside className="sticky top-28 hidden h-[calc(100vh-8.5rem)] w-64 shrink-0 self-start lg:block">
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
