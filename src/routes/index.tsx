import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const GITHUB = "https://github.com";
const DOCS = "#developers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karya — The Open-Source HRMS for Modern Teams" },
      {
        name: "description",
        content:
          "Karya is an open-source, self-hostable HRMS. Manage employees, attendance, leave and payroll while keeping full control of your data.",
      },
      { property: "og:title", content: "Karya — The Open-Source HRMS for Modern Teams" },
      {
        property: "og:description",
        content: "Self-host your HR infrastructure and keep complete control of your data. AGPL-3.0.",
      },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Intro />
      <Showcase />
      <Capabilities />
      <MultiTenant />
      <Developers />
      <Audience />
      <About />
      <Security />
      <OpenSource />
      <Faq />
      <Contact />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------- primitives ---------- */

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sm font-bold text-primary-foreground">
        K
      </span>
      <span className="text-lg font-semibold tracking-tight text-ink">Karya</span>
    </a>
  );
}

function Btn({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "outline-light";
}) {
  const styles = {
    primary: "bg-ink text-primary-foreground hover:bg-primary shadow-soft",
    ghost: "border border-border bg-card text-ink hover:border-lavender",
    light: "bg-card text-ink hover:bg-surface",
    "outline-light": "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
  }[variant];
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles}`}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, sub, step }: { eyebrow: string; title: string; sub?: string; step?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <Eyebrow>{step ? `${step} — ${eyebrow}` : eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const links: [string, string][] = [["Product", "#product"], ["Features", "#features"], ["Developers", "#developers"], ["About", "#about"], ["FAQs", "#faqs"]];
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border/80 px-4 py-2.5 shadow-soft">
        <Logo />
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([l, href]) => (
            <a
              key={l}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={DOCS} className="hidden px-3 text-sm font-medium text-ink sm:block">
            Documentation
          </a>
          <a href="#" className="hidden px-3 text-sm font-medium text-ink lg:block">
            Sign in
          </a>
          <a
            href={GITHUB}
            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary sm:text-sm"
          >
            View on GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative px-4 pb-20 pt-32 sm:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[520px] rounded-full glow-lavender blur-3xl animate-drift" />
      <div className="pointer-events-none absolute right-[-10%] top-20 h-[700px] w-[800px] rounded-full glow-violet blur-2xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[45fr_55fr] lg:gap-10">
        <div className="animate-fade-up min-w-0">
          <Eyebrow>OPEN-SOURCE HRMS</Eyebrow>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl">
            The Open-Source HRMS for{" "}
            <span className="font-display font-normal italic text-gradient">Modern Teams.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Self-hostable, multi-tenant human resource management. Control your data, manage your people, and scale
            your operations without per-seat fees.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn href={GITHUB}>
              View on GitHub <span className="transition-transform group-hover:translate-x-1">→</span>
            </Btn>
            <Btn href={DOCS} variant="ghost">Read Documentation</Btn>
          </div>
          <p className="mt-6 text-sm font-medium text-muted-foreground">
            Self-hosted · Multi-tenant · Docker-ready · Open source
          </p>
        </div>
        <div className="animate-fade-up min-w-0 [animation-delay:150ms]">
          <div className="animate-float">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
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

function DashboardPreview() {
  const nav = ["Overview", "Employees", "Attendance", "Leave", "Payroll", "Organization"];
  const bars = [62, 78, 70, 88, 82, 74, 91];
  return (
    <BrowserFrame url="karya.yourcompany.com/overview">
      <div className="flex bg-card text-[11px]">
        <aside className="hidden w-36 shrink-0 border-r border-border bg-surface/60 p-3 sm:block">
          <div className="mb-4 flex items-center gap-1.5 px-1">
            <span className="h-5 w-5 rounded-md bg-ink" />
            <span className="font-semibold text-ink">Acme Labs</span>
          </div>
          {nav.map((n, i) => (
            <div
              key={n}
              className={`mb-0.5 rounded-md px-2 py-1.5 ${i === 0 ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground"}`}
            >
              {n}
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ink">Good morning, Priya</div>
              <div className="text-muted-foreground">Monday, 5 October</div>
            </div>
            <span className="rounded-full bg-accent px-2 py-1 font-medium text-accent-foreground">HR Admin</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Employees", "248"],
              ["Present today", "221"],
              ["On leave", "12"],
              ["Pending requests", "7"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border p-2.5">
                <div className="text-muted-foreground">{k}</div>
                <div className="mt-1 text-lg font-semibold text-ink">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-5">
            <div className="rounded-lg border border-border p-3 sm:col-span-3">
              <div className="flex justify-between">
                <span className="font-semibold text-ink">Attendance this week</span>
                <span className="text-muted-foreground">%</span>
              </div>
              <div className="mt-3 flex h-24 items-end gap-2">
                {bars.map((b, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-lavender/60" style={{ height: `${b}%` }}>
                    <div className="h-full rounded-t-md bg-primary/70" style={{ clipPath: `inset(${100 - b + 20}% 0 0 0)` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border p-3 sm:col-span-2">
              <div className="font-semibold text-ink">Leave requests</div>
              {[
                ["Arjun M.", "Casual · 2d", "bg-warning"],
                ["Sara K.", "Sick · 1d", "bg-success"],
                ["Dev R.", "Earned · 5d", "bg-warning"],
              ].map(([n, t, c]) => (
                <div key={n} className="mt-2 flex items-center gap-2">
                  <span className="h-6 w-6 shrink-0 rounded-full bg-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-ink">{n}</div>
                    <div className="text-muted-foreground">{t}</div>
                  </div>
                  <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border p-3">
              <div className="text-muted-foreground">October payroll</div>
              <div className="mt-1 font-semibold text-ink">Processing · 3 days left</div>
              <div className="mt-2 h-1.5 rounded-full bg-surface-2">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="text-muted-foreground">Departments</div>
              <div className="mt-1 font-semibold text-ink">Engineering · Ops · Sales · HR</div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ---------- 01 intro ---------- */

function Intro() {
  const pillars = [
    ["Employee records", "Profiles, hierarchies and custom fields."],
    ["Time & leave", "Attendance, shifts, leave types and holidays."],
    ["Compensation & expenses", "Salary templates and reimbursements."],
    ["Exits", "Structured offboarding workflows."],
  ];
  return (
    <section id="product" className="relative px-4 py-24">
      <SectionHead
        step="01"
        eyebrow="INTRODUCE"
        title="People operations, connected from entry to exit."
        sub="Karya brings the everyday systems behind employee records, attendance, leave, compensation, expenses, and offboarding into one self-hosted HRMS."
      />
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(([t, d], i) => (
          <div key={t} className="reveal rounded-2xl border border-border bg-card p-5 shadow-soft">
            <span className="font-mono text-xs text-primary">0{i + 1}</span>
            <h3 className="mt-3 font-semibold text-ink">{t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 02 showcase ---------- */

function PeopleView() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] bg-surface px-3 py-2 font-medium text-muted-foreground">
        <span>Name</span><span>Role</span><span>Dept</span><span>Status</span>
      </div>
      {[
        ["Priya Sharma", "HR Lead", "People", "Active"],
        ["Arjun Mehta", "Backend Engineer", "Engineering", "Active"],
        ["Sara Khan", "Designer", "Product", "On leave"],
        ["Dev Rao", "Ops Manager", "Operations", "Active"],
      ].map((r) => (
        <div key={r[0]} className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center border-t border-border px-3 py-2.5">
          <span className="flex min-w-0 items-center gap-2 font-medium text-ink">
            <span className="h-6 w-6 shrink-0 rounded-full bg-accent" />
            <span className="truncate">{r[0]}</span>
          </span>
          <span className="truncate text-muted-foreground">{r[1]}</span>
          <span className="truncate text-muted-foreground">{r[2]}</span>
          <span>
            <span className={`rounded-full px-2 py-0.5 ${r[3] === "Active" ? "bg-accent text-accent-foreground" : "bg-surface-2 text-muted-foreground"}`}>{r[3]}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function AttendanceView() {
  return (
    <div className="rounded-xl border border-border p-4 text-center">
      <div className="text-muted-foreground">Checked in at</div>
      <div className="mt-1 font-mono text-3xl font-medium text-ink">09:12</div>
      <div className="mx-auto mt-4 grid max-w-xs grid-cols-7 gap-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className={`aspect-square rounded ${i % 7 > 4 ? "bg-surface-2" : i === 17 ? "bg-lavender/50" : "bg-primary/70"}`} />
        ))}
      </div>
    </div>
  );
}

function LeaveView() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[["Casual", 8, 12], ["Sick", 5, 7], ["Earned", 14, 18]].map(([k, a, t]) => (
          <div key={k as string} className="rounded-xl border border-border p-3">
            <div className="text-muted-foreground">{k}</div>
            <div className="mt-1 text-xl font-semibold text-ink">{a}<span className="text-xs text-muted-foreground">/{t}</span></div>
            <div className="mt-2 h-1 rounded-full bg-surface-2"><div className="h-full rounded-full bg-primary" style={{ width: `${((a as number) / (t as number)) * 100}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border p-3">
        <span className="text-ink"><b>Sara Khan</b> · 12–14 Oct · Casual</span>
        <span className="flex gap-1.5">
          <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">Decline</span>
          <span className="rounded-full bg-ink px-2 py-0.5 text-primary-foreground">Approve</span>
        </span>
      </div>
    </div>
  );
}

function PayrollView() {
  return (
    <div className="rounded-xl border border-border p-4">
      {[["Basic", 50], ["HRA", 20], ["Special allowance", 18], ["Provident fund", 12]].map(([k, v]) => (
        <div key={k as string} className="mb-2.5 last:mb-0">
          <div className="flex justify-between text-ink"><span>{k}</span><span className="text-muted-foreground">{v}%</span></div>
          <div className="mt-1 h-1.5 rounded-full bg-surface-2"><div className="h-full rounded-full bg-lavender" style={{ width: `${(v as number) * 1.8}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function ProfileView() {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-full bg-accent" />
        <div>
          <div className="text-sm font-semibold text-ink">Arjun Mehta</div>
          <div className="text-muted-foreground">Backend Engineer · Engineering</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[["Reports to", "Neha Iyer"], ["Grade", "L3"], ["Cost center", "ENG-01"], ["Salary", "••••••"]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border p-2.5">
            <div className="text-muted-foreground">{k}</div>
            <div className="mt-0.5 font-medium text-ink">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Showcase() {
  const tabs: [string, string, ReactNode][] = [
    ["Overview", "A daily snapshot of headcount, attendance, pending leave and payroll status.", null],
    ["People", "A searchable employee directory with roles, departments and status.", <PeopleView key="p" />],
    ["Attendance", "Employee check-ins and a monthly view of attendance records.", <AttendanceView key="a" />],
    ["Leave", "Leave balances by type, with requests routed for approval.", <LeaveView key="l" />],
    ["Payroll", "Compensation structures broken down into salary components.", <PayrollView key="c" />],
    ["Employee info", "Profiles with reporting lines, grades, cost centers and masked sensitive fields.", <ProfileView key="e" />],
  ];
  const [active, setActive] = useState(0);
  const [name, desc, view] = tabs[active];
  return (
    <section className="relative px-4 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-lavender blur-3xl" />
      <div className="relative">
        <SectionHead step="02" eyebrow="SHOW" title="See Karya in action." sub="A single workspace for the everyday work behind your people operations." />
        <div className="reveal mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {tabs.map(([t], i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${i === active ? "bg-ink text-primary-foreground" : "border border-border bg-card text-ink hover:border-lavender"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">{desc}</p>
        <div className="reveal mx-auto mt-8 max-w-4xl">
          {view ? (
            <BrowserFrame url={`karya.yourcompany.com/${name.toLowerCase().replace(" ", "-")}`}>
              <div className="bg-card p-5 text-[11px] sm:p-8">{view}</div>
            </BrowserFrame>
          ) : (
            <DashboardPreview />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 capabilities ---------- */

function Capabilities() {
  const items = [
    ["Employee Directory & Profiles", "Model reporting hierarchies, customize employee fields, and keep workforce records organized.", "◉"],
    ["Time & Attendance", "Support employee check-in and check-out, attendance records, and shift management.", "◷"],
    ["Leave Operations", "Configure leave types and holiday calendars while routing requests through approval workflows.", "▤"],
    ["Compensation Structures", "Define salary templates, grades, compensation lines, and cost or revenue center mappings.", "₹"],
    ["Reimbursements", "Give employees a clear expense submission path and managers an approval workflow.", "⇄"],
    ["Exit Management", "Coordinate voluntary exits and offboarding through a defined operational workflow.", "↗"],
    ["Role-Based Access", "Use granular role-based access control to align application access with responsibilities.", "◈"],
    ["Audit Logs", "Keep comprehensive audit records for accountability and operational review.", "≡"],
    ["Sensitive-Field Masking", "Apply field-level sensitivity settings to protect personal information such as salary data.", "◐"],
  ];
  return (
    <section id="features" className="relative px-4 py-24">
      <SectionHead
        step="03"
        eyebrow="CAPABILITIES"
        title="Everything your workforce needs, in one system."
        sub="From daily attendance to compensation structures and employee exits, Karya keeps essential HR operations connected."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([t, d, i]) => (
          <div key={t} className="reveal gradient-border rounded-2xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-mono text-sm text-accent-foreground">{i}</span>
            <h3 className="mt-5 font-semibold text-ink">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 04 multi-tenant ---------- */

function MultiTenant() {
  const node = "rounded-2xl border border-border bg-card px-5 py-4 text-center shadow-soft";
  return (
    <section className="px-4 py-24">
      <div className="reveal mx-auto grid max-w-6xl items-center gap-12 rounded-3xl border border-border bg-surface p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <Eyebrow>04 — ARCHITECTURE</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            One installation. <span className="font-display font-normal italic text-primary">Distinct organizations.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Karya separates instance administration from each organization's workspace, making one deployment useful for
            a single business, agency, or holding company.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className={`${node} w-full max-w-xs`}>
            <div className="font-semibold text-ink">Instance administration</div>
            <div className="mt-1 font-mono text-xs text-primary">/superadmin</div>
          </div>
          <div className="h-8 w-px bg-lavender" />
          <div className="h-px w-1/2 bg-lavender" />
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            {[["Organization A", "/org-a"], ["Organization B", "/org-b"]].map(([o, u]) => (
              <div key={o} className="flex flex-col items-center">
                <div className="h-6 w-px bg-lavender" />
                <div className={`${node} w-full`}>
                  <div className="font-semibold text-ink">{o}</div>
                  <div className="mt-1 font-mono text-xs text-primary">{u}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 self-hosting ---------- */

function Developers() {
  return (
    <section id="developers" className="px-4 py-24">
      <SectionHead
        step="05"
        eyebrow="SELF-HOSTING"
        title="Run Karya on infrastructure you control."
        sub="The supported deployment journey is designed around Docker: clone the project, start the services, and create your instance administrator."
      />
      <div className="reveal mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-border bg-ink shadow-float">
        <div className="flex gap-1.5 border-b border-primary-foreground/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/20" />
        </div>
        <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-primary-foreground/85">
          <span className="text-lavender">$</span> git clone {"<repository-url>"}{"\n"}
          <span className="text-lavender">$</span> cd karya{"\n"}
          <span className="text-lavender">$</span> docker-compose up -d{"\n"}
          <span className="text-success">✓ Karya is ready on your infrastructure</span>
        </pre>
      </div>
    </section>
  );
}

/* ---------- 06 audience ---------- */

function Audience() {
  const items = [
    ["IT & DevOps", "Deploy with Docker, maintain the instance, and keep employee data within your infrastructure.", "</>"],
    ["HR & Founders", "Set up employee structures, policies, access, and organization-level operations.", "▦"],
    ["Employees", "Check in, request leave, view pay slips, and submit reimbursements through one workspace.", "◉"],
  ];
  return (
    <section className="relative px-4 py-24">
      <SectionHead step="06" eyebrow="WHO IT'S FOR" title="One system, clear paths for every team." />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
        {items.map(([t, d, i]) => (
          <div key={t} className="reveal relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full glow-violet opacity-60" />
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-accent font-mono text-sm text-accent-foreground">{i}</span>
            <h3 className="relative mt-6 text-lg font-semibold text-ink">{t}</h3>
            <p className="relative mt-2 leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 07 about ---------- */

function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="reveal mx-auto grid max-w-6xl gap-10 rounded-3xl border border-border bg-surface p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <Eyebrow>07 — ABOUT KARYA</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            HR software that <span className="font-display font-normal italic text-primary">stays yours.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Karya is an <span className="font-semibold text-ink">AGPL-3.0</span> licensed HRMS for organizations that
            prefer transparency, adaptability, and ownership over proprietary lock-in.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            ["Data sovereignty", "Host your employee data inside infrastructure your organization controls."],
            ["Operational breadth", "Bring employee profiles, time, leave, compensation, expenses, and exits together."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-semibold text-ink">{t}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 security ---------- */

function Security() {
  const items = [
    ["Role-based access", "Control application access based on responsibilities.", "◈"],
    ["Audit logs", "Maintain comprehensive records for operational accountability.", "≡"],
    ["Sensitive-field masking", "Protect sensitive employee information such as salary data.", "◐"],
    ["Multi-tenant separation", "Keep organizations separated within a shared Karya installation.", "▦"],
  ];
  return (
    <section className="relative px-4 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-lavender blur-3xl" />
      <div className="relative">
        <SectionHead step="08" eyebrow="CONTROL" title="Built for control, privacy, and accountability." />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([t, d, i]) => (
            <div key={t} className="reveal gradient-border rounded-2xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-mono text-sm text-accent-foreground">{i}</span>
              <h3 className="mt-6 font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- open source ---------- */

function OpenSource() {
  return (
    <section className="px-4 py-16">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-cta px-6 py-16 shadow-float sm:px-14">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full glow-lavender blur-3xl animate-drift" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-lavender">OPEN SOURCE · AGPL-3.0</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Put your people operations on your infrastructure.
            </h2>
            <p className="mt-4 max-w-lg text-primary-foreground/80">
              Inspect the source, deploy Karya on your infrastructure, and shape it around your organization.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Btn href={GITHUB} variant="light">View on GitHub <span className="transition-transform group-hover:translate-x-1">→</span></Btn>
            <Btn href="#developers" variant="outline-light">Deploy Guide</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted-foreground focus:border-lavender focus:ring-4 focus:ring-ring/20";
  return (
    <section id="contact" className="relative px-4 py-24">
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full glow-violet blur-2xl" />
      <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="reveal">
          <Eyebrow>10 — CONTACT US</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Let's talk about Karya.</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Have a question about deploying Karya, using it for your organization, or contributing to the project? Get
            in touch.
          </p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="reveal glass grid gap-3 rounded-3xl border border-border p-6 shadow-soft sm:grid-cols-2"
        >
          <input required placeholder="Name" className={field} />
          <input required type="email" placeholder="Email" className={field} />
          <input placeholder="Organization" className={`${field} sm:col-span-2`} />
          <textarea required rows={4} placeholder="Message" className={`${field} resize-none sm:col-span-2`} />
          <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary sm:col-span-2">
            {sent ? "Thanks — we'll be in touch." : <>Send message <span className="transition-transform group-hover:translate-x-1">→</span></>}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

function Faq() {
  const qs = [
    ["What is Karya?", "Karya is an open-source, self-hostable Human Resource Management System designed to bring essential people operations into one platform."],
    ["Is Karya open source?", "Yes. Karya is licensed under AGPL-3.0."],
    ["Can Karya be self-hosted?", "Yes. Karya is designed to run on infrastructure controlled by the organization."],
    ["Can one installation support multiple organizations?", "Yes. Karya uses a multi-tenant architecture that allows multiple organizations to operate within a single installation."],
    ["What can I manage with Karya?", "Karya supports employee records, attendance, leave operations, compensation structures, reimbursements, exits, access control, audit logs, and sensitive-field controls."],
    ["Who is Karya designed for?", "Karya is designed for IT and DevOps teams, HR teams and founders, and employees using the HR workspace."],
  ];
  return (
    <section id="faqs" className="px-4 py-24">
      <SectionHead step="09" eyebrow="FAQS" title="Frequently asked questions." />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {qs.map(([q, a]) => (
          <details key={q} className="reveal group rounded-2xl border border-border bg-card px-6 shadow-soft transition-colors open:border-lavender">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-ink">
              {q}
              <span className="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-300">+</span>
            </summary>
            <p className="pb-5 leading-relaxed text-muted-foreground animate-fade-up">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- final cta ---------- */

function FinalCta() {
  return (
    <section className="px-4 py-16">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-cta px-6 py-20 text-center shadow-float sm:px-16">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full glow-lavender blur-3xl animate-drift" />
        <span className="relative text-[11px] font-semibold tracking-[0.18em] text-lavender">OPEN SOURCE · AGPL-3.0</span>
        <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
          Own your HR infrastructure.
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-primary-foreground/80">
          Inspect the source, deploy Karya on your infrastructure, and shape it around your organization.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <Btn href={GITHUB} variant="light">View on GitHub <span className="transition-transform group-hover:translate-x-1">→</span></Btn>
          <Btn href={DOCS} variant="outline-light">Read Documentation</Btn>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Product", [["Overview", "#product"], ["Features", "#features"], ["Self-hosting", "#developers"], ["About", "#about"]]],
    ["Resources", [["Documentation", DOCS], ["GitHub", GITHUB], ["FAQs", "#faqs"]]],
    ["Contact", [["Contact Us", "#contact"]]],
  ];
  return (
    <footer className="border-t border-border px-4 pb-10 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Open-source, self-hostable, multi-tenant HRMS for teams that want to own their HR infrastructure.</p>
        </div>
        {cols.map(([h, ls]) => (
          <div key={h}>
            <div className="text-sm font-semibold text-ink">{h}</div>
            <ul className="mt-4 space-y-2.5">
              {ls.map(([l, href]) => (
                <li key={l}><a href={href} className="text-sm text-muted-foreground transition-colors hover:text-ink">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-border pt-6 text-sm text-muted-foreground">Karya · AGPL-3.0</div>
    </footer>
  );
}
