import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ALL_DOCS, findDoc } from "@/lib/docs";

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => {
    const doc = findDoc(params.slug);
    if (!doc) throw notFound();
    return { slug: doc.slug };
  },
  head: ({ loaderData }) => {
    const doc = loaderData ? findDoc(loaderData.slug) : undefined;
    if (!doc) return { meta: [{ title: "Not found | Karya Docs" }, { name: "robots", content: "noindex" }] };
    const title = `${doc.title} | Karya Docs`;
    const desc = doc.summary ?? `${doc.title} in the Karya documentation (${doc.section}).`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: DocNotFound,
  component: DocPage,
});

function DocNotFound() {
  return (
    <main>
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-muted-foreground">This documentation topic does not exist.</p>
      <Link to="/docs" className="mt-6 inline-block text-sm font-semibold text-primary">Back to docs</Link>
    </main>
  );
}

function DocPage() {
  const { slug } = Route.useLoaderData();
  const doc = findDoc(slug)!;
  const i = ALL_DOCS.findIndex((d) => d.slug === slug);
  const prev = ALL_DOCS[i - 1];
  const next = ALL_DOCS[i + 1];
  return (
    <main className="max-w-3xl">
      <p className="text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-primary">Docs</Link> / {doc.section}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{doc.title}</h1>
      {doc.summary && <p className="mt-3 text-lg text-muted-foreground">{doc.summary}</p>}
      <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
        {doc.body ? (
          doc.body.map((b, k) =>
            "p" in b ? (
              <p key={k}>{b.p}</p>
            ) : "code" in b ? (
              <pre key={k} className="overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm text-background">{b.code}</pre>
            ) : (
              <ul key={k} className="list-disc space-y-1 pl-5">
                {b.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            ),
          )
        ) : (
          <div className="gradient-border rounded-2xl p-6">
            <p className="font-semibold text-ink">Documentation pending</p>
            <p className="mt-2 text-sm">This topic is being written. Check back soon or follow progress on GitHub.</p>
          </div>
        )}
      </div>
      <div className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <Link to="/docs/$slug" params={{ slug: prev.slug }} className="rounded-xl border border-border p-4 hover:border-lavender">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="block font-semibold text-ink">{prev.title}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to="/docs/$slug" params={{ slug: next.slug }} className="rounded-xl border border-border p-4 text-right hover:border-lavender">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="block font-semibold text-ink">{next.title}</span>
          </Link>
        )}
      </div>
    </main>
  );
}
