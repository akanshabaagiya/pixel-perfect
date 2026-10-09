import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ALL_DOCS, findDoc, type DocAvailability, type DocBlock } from "@/lib/docs";

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => {
    const doc = findDoc(params.slug);
    if (!doc) throw notFound();
    return { slug: doc.slug };
  },
  head: ({ loaderData }) => {
    const doc = loaderData ? findDoc(loaderData.slug) : undefined;
    if (!doc)
      return {
        meta: [{ title: "Not found | Kaaya Docs" }, { name: "robots", content: "noindex" }],
      };
    const title = `${doc.title} | Kaaya Docs`;
    const desc = doc.summary ?? `${doc.title} in the Kaaya documentation (${doc.section}).`;
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
      <Link to="/docs" className="mt-6 inline-block text-sm font-semibold text-primary">
        Back to docs
      </Link>
    </main>
  );
}

const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Renders `code` and **bold** spans inside a line of documentation text. */
function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    parts.push(
      token.startsWith("`") ? (
        <code
          key={match.index}
          className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {token.slice(1, -1)}
        </code>
      ) : (
        <strong key={match.index} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>
      ),
    );
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

const NOTE_STYLES = {
  info: { label: "Note", className: "border-lavender bg-accent/50" },
  tip: { label: "Tip", className: "border-success/50 bg-success/10" },
  warning: { label: "Important", className: "border-warning/60 bg-warning/10" },
} as const;

function Block({ block }: { block: DocBlock }) {
  if ("p" in block) {
    return (
      <p>
        <Inline text={block.p} />
      </p>
    );
  }
  if ("h" in block) {
    return (
      <h2
        id={headingId(block.h)}
        className="scroll-mt-28 pt-4 text-2xl font-semibold tracking-tight text-ink"
      >
        {block.h}
      </h2>
    );
  }
  if ("h3" in block) {
    return (
      <h3 id={headingId(block.h3)} className="scroll-mt-28 pt-2 text-lg font-semibold text-ink">
        {block.h3}
      </h3>
    );
  }
  if ("code" in block) {
    return (
      <figure className="overflow-hidden rounded-xl bg-ink">
        {block.title ? (
          <figcaption className="border-b border-background/10 px-4 py-2 font-mono text-xs text-background/70">
            {block.title}
          </figcaption>
        ) : null}
        <pre className="overflow-x-auto p-4 font-mono text-sm text-background">{block.code}</pre>
      </figure>
    );
  }
  if ("list" in block) {
    return (
      <ul className="list-disc space-y-1.5 pl-5">
        {block.list.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if ("steps" in block) {
    return (
      <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-primary">
        {block.steps.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ol>
    );
  }
  if ("table" in block) {
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-secondary text-ink">
            <tr>
              {block.table.head.map((cell) => (
                <th key={cell} className="px-4 py-2.5 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, r) => (
              <tr key={r} className="border-t border-border align-top">
                {row.map((cell, c) => (
                  <td key={c} className="px-4 py-2.5">
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const style = NOTE_STYLES[block.tone ?? "info"];
  return (
    <aside className={`rounded-xl border-l-4 px-4 py-3 text-sm ${style.className}`}>
      <p className="font-semibold text-ink">{style.label}</p>
      <p className="mt-1">
        <Inline text={block.note} />
      </p>
    </aside>
  );
}

const AVAILABILITY: Record<
  Exclude<DocAvailability, "available">,
  { label: string; className: string }
> = {
  partial: { label: "Partially available", className: "bg-warning/15 text-ink" },
  unavailable: { label: "Not available yet", className: "bg-secondary text-muted-foreground" },
};

function DocPage() {
  const { slug } = Route.useLoaderData();
  const doc = findDoc(slug)!;
  const i = ALL_DOCS.findIndex((d) => d.slug === slug);
  const prev = ALL_DOCS[i - 1];
  const next = ALL_DOCS[i + 1];
  const availability =
    doc.availability && doc.availability !== "available" ? AVAILABILITY[doc.availability] : null;
  return (
    <main className="max-w-3xl">
      <p className="text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-primary">
          Docs
        </Link>{" "}
        / {doc.section}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{doc.title}</h1>
      {availability ? (
        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${availability.className}`}
        >
          {availability.label}
        </span>
      ) : null}
      {doc.summary && <p className="mt-3 text-lg text-muted-foreground">{doc.summary}</p>}
      <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
        {doc.body ? (
          doc.body.map((block, k) => <Block key={k} block={block} />)
        ) : (
          <div className="gradient-border rounded-2xl p-6">
            <p className="font-semibold text-ink">Documentation pending</p>
            <p className="mt-2 text-sm">
              This topic is being written. Check back soon or follow progress on GitHub.
            </p>
          </div>
        )}
      </div>
      <nav
        aria-label="Pagination"
        className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        {prev ? <PagerLink doc={prev} direction="prev" /> : null}
        {next ? <PagerLink doc={next} direction="next" /> : null}
      </nav>
    </main>
  );
}

function PagerLink({
  doc,
  direction,
}: {
  doc: (typeof ALL_DOCS)[number];
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;
  return (
    <Link
      to="/docs/$slug"
      params={{ slug: doc.slug }}
      className={`group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender hover:shadow-soft ${
        isNext ? "flex-row-reverse text-right sm:col-start-2" : ""
      }`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon
          size={16}
          aria-hidden
          className={`transition-transform duration-300 ${
            isNext ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"
          }`}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {isNext ? "Next" : "Previous"} · {doc.section}
        </span>
        <span className="mt-1 block truncate font-semibold text-ink">{doc.title}</span>
      </span>
    </Link>
  );
}
