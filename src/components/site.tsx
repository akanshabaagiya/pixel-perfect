import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export const GITHUB = "https://github.com/mittarv/hrms";

export function useReveal(dep?: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/brand/kaarya-logo.png"
        alt="Kaarya"
        width={578}
        height={145}
        className="h-6 w-auto"
      />
    </Link>
  );
}

export function Btn({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "outline-light";
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
    ghost: "border border-border bg-card text-ink hover:border-lavender",
    light: "bg-card text-ink hover:bg-surface",
    "outline-light": "border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
  }[variant];
  return (
    <Button asChild variant="ghost" className={`h-auto group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles}`}
    >
      <a href={href}>{children}</a>
    </Button>
  );
}

export const Arrow = () => <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="gradient-border overflow-hidden rounded-2xl shadow-float">
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <div className="mx-auto truncate rounded-md bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

const NAV: [string, string][] = [
  ["Product", "/#product"],
  ["Features", "/#features"],
  ["How it works", "/#how-it-works"],
  ["Docs", "/#docs"],
  ["Developers", "/#developers"],
  ["FAQs", "/#faqs"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto max-w-6xl rounded-2xl border border-border/80 px-4 py-2.5 shadow-soft">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="hidden items-center gap-6 lg:flex">
            {NAV.map(([l, href]) => (
              <a key={l} href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={GITHUB}
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:text-sm"
            >
              View on GitHub
            </a>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-ink lg:hidden"
            >
              {open ? "×" : "≡"}
            </button>
          </div>
        </div>
        <div
          className={`grid transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            {NAV.map(([l, href]) => (
              <a
                key={l}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2.5 text-sm font-medium text-ink hover:bg-accent"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Product", [["Product", "/#product"], ["Features", "/#features"], ["How it works", "/#how-it-works"], ["Developers", "/#developers"]]],
    ["Resources", [["Docs", "/docs"], ["Roadmap", "/docs/roadmap"], ["License", "/#open-source"]]],
    ["Project", [["About", "/#about"], ["Contact", "/#contact"], ["GitHub", GITHUB]]],
  ];
  return (
    <footer className="border-t border-border px-4 pb-10 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Open-source, self-hostable, multi-tenant HRMS for teams that want to own their HR infrastructure.
          </p>
        </div>
        {cols.map(([h, ls]) => (
          <div key={h}>
            <div className="text-sm font-semibold text-ink">{h}</div>
            <ul className="mt-4 space-y-2.5">
              {ls.map(([l, href]) => (
                <li key={l}>
                  <a href={href} className="text-sm text-muted-foreground transition-colors hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-border pt-6 text-sm text-muted-foreground">Kaarya</div>
    </footer>
  );
}
