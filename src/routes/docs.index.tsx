import { createFileRoute, Link } from "@tanstack/react-router";
import { DOC_SECTIONS } from "@/lib/docs";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Karya Documentation" },
      { name: "description", content: "Everything you need to deploy, configure, use and contribute to Karya." },
      { property: "og:title", content: "Karya Documentation" },
      { property: "og:description", content: "Deploy, configure, use and contribute to Karya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <main>
      <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Karya Documentation</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Everything you need to deploy, configure, use and contribute to Karya.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {DOC_SECTIONS.map((sec) => (
          <div key={sec.title} className="gradient-border rounded-2xl p-6 shadow-soft">
            <h2 className="font-semibold text-ink">{sec.title}</h2>
            <ul className="mt-3 space-y-1.5">
              {sec.pages.map((p) => (
                <li key={p.slug}>
                  <Link to="/docs/$slug" params={{ slug: p.slug }} className="text-sm text-muted-foreground hover:text-primary">
                    {p.title}
                  </Link>
                  {!p.body && <span className="ml-2 text-xs text-primary">Pending</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
