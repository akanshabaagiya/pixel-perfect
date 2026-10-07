import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Footer, Nav } from "@/components/site";
import { DOC_SECTIONS } from "@/lib/docs";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Karya Documentation" },
      { name: "description", content: "Everything you need to deploy, configure, use and contribute to Karya." },
      { property: "og:title", content: "Karya Documentation" },
      { property: "og:description", content: "Deploy, configure, use and contribute to Karya." },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
  const [q, setQ] = useState("");
  const query = q.toLowerCase();
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Karya Documentation</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Everything you need to deploy, configure, use and contribute to Karya.
        </p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the docs"
          className="mt-8 w-full max-w-xl rounded-xl border border-input bg-card px-4 py-3 text-sm text-ink outline-none focus:border-lavender"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_SECTIONS.map((sec) => {
            const pages = sec.pages.filter((p) => p.title.toLowerCase().includes(query));
            if (!pages.length) return null;
            return (
              <div key={sec.title} className="gradient-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-semibold text-ink">{sec.title}</h2>
                <ul className="mt-3 space-y-1.5">
                  {pages.map((p) => (
                    <li key={p.slug} className="text-sm text-muted-foreground">
                      {p.title}
                      {!p.body && <span className="ml-2 text-xs text-primary">Pending</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <Link to="/" className="mt-10 inline-block text-sm font-semibold text-primary">Back to home</Link>
      </main>
      <Footer />
    </div>
  );
}
