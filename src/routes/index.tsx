import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Arrow, BrowserFrame, Btn, Eyebrow, Footer, GITHUB, Nav, SectionHead, useReveal } from "@/components/site";

const DOCS = "/docs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karya | The Open-Source HRMS for Modern Teams" },
      {
        name: "description",
        content:
          "Karya is an open-source, self-hostable HRMS. Manage employees, attendance, leave, compensation and exits while keeping full control of your data.",
      },
      { property: "og:title", content: "Karya | The Open-Source HRMS for Modern Teams" },
      {
        property: "og:description",
        content: "Self-host your HR infrastructure and keep complete control of your data. AGPL-3.0.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Product />
      <Showcase />
      <Capabilities />
      <HowItWorks />
      <Configured />
      <MultiTenant />
      <WhyOpenSource />
      <Audience />
      <Developers />
      <DocsSummary />
      <About />
      <Faq />
      <Contact />
      <FinalCta />
      <Footer />
    </div>
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
              View on GitHub <Arrow />
            </Btn>
            <Btn href={DOCS} variant="ghost">Read the Docs</Btn>
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
  const [name, desc, view] = tabs[active] as [string, string, ReactNode];
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

/* ---------- 01 product ---------- */

function Mini({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-border bg-surface/60 p-3 text-[10px]">{children}</div>;
}

function Row({ a, b, tone = "bg-accent text-accent-foreground" }: { a: string; b: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-card px-2 py-1.5 [&+&]:mt-1.5">
      <span className="flex min-w-0 items-center gap-1.5 font-medium text-ink">
        <span className="h-4 w-4 shrink-0 rounded-full bg-accent" />
        <span className="truncate">{a}</span>
      </span>
      <span className={`shrink-0 rounded-full px-1.5 py-0.5 ${tone}`}>{b}</span>
    </div>
  );
}

function Product() {
  const mods: [string, string, ReactNode][] = [
    ["Employee Management", "Employee directory, profiles, organizational structure and workforce information.",
      <Mini key="1"><Row a="Priya Sharma" b="People" /><Row a="Arjun Mehta" b="Engineering" /><Row a="Dev Rao" b="Operations" /></Mini>],
    ["Attendance and Leave", "Check-ins, attendance, shifts, leave types, holiday calendars and approvals.",
      <Mini key="2"><div className="grid grid-cols-7 gap-1">{Array.from({ length: 14 }).map((_, i) => <span key={i} className={`aspect-square rounded ${i % 7 > 4 ? "bg-surface-2" : i === 9 ? "bg-lavender/50" : "bg-primary/70"}`} />)}</div></Mini>],
    ["Compensation", "Salary structures, grades, compensation components and payroll-related workflows.",
      <Mini key="3">{[["Basic", 90], ["HRA", 36], ["Allowance", 32]].map(([k, v]) => <div key={k} className="mb-1.5 last:mb-0"><div className="flex justify-between text-ink"><span>{k}</span></div><div className="mt-1 h-1.5 rounded-full bg-surface-2"><div className="h-full rounded-full bg-lavender" style={{ width: `${v}%` }} /></div></div>)}</Mini>],
    ["Reimbursements", "Employee expense submission and manager approval.",
      <Mini key="4"><Row a="Travel claim" b="Pending" tone="bg-surface-2 text-muted-foreground" /><Row a="Client lunch" b="Approved" /></Mini>],
    ["Onboarding and Offboarding", "Manage employee journeys from joining through exit.",
      <Mini key="5"><div className="flex items-center gap-1">{["Joined", "Active", "Notice", "Exit"].map((s, i) => <span key={s} className={`flex-1 rounded-full px-1 py-1 text-center ${i < 2 ? "bg-primary/80 text-primary-foreground" : "bg-card text-muted-foreground"}`}>{s}</span>)}</div></Mini>],
    ["Policies and Access", "Define policies, roles and permissions according to organizational requirements.",
      <Mini key="6"><Row a="HR Admin" b="Full" /><Row a="Manager" b="Team" /><Row a="Employee" b="Self" tone="bg-surface-2 text-muted-foreground" /></Mini>],
  ];
  return (
    <section id="product" className="relative px-4 py-24">
      <SectionHead
        step="01"
        eyebrow="PRODUCT"
        title="People operations, connected from entry to exit."
        sub="Karya brings employee records, attendance, leave, compensation, expenses, policies and offboarding into one self-hosted HRMS."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mods.map(([t, d, v]) => (
          <div key={t} className="reveal group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-lavender hover:shadow-float">
            {v}
            <h3 className="mt-5 font-semibold text-ink">{t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 03 features ---------- */

function Capabilities() {
  const items = [
    ["Employee Directory and Profiles", "Reporting hierarchies, custom employee fields and organized workforce records.", "◉"],
    ["Time and Attendance", "Check-in and check-out, attendance records and shift management.", "◷"],
    ["Leave Operations", "Leave types and holiday calendars, with requests routed for approval.", "▤"],
    ["Compensation Structures", "Salary templates, grades, compensation lines and cost or revenue centers.", "₹"],
    ["Reimbursements", "A clear expense submission path for employees and approvals for managers.", "⇄"],
    ["Exit Management", "Voluntary exits and offboarding through a defined workflow.", "↗"],
    ["Role-Based Access", "Granular roles that match access to responsibilities.", "◈"],
    ["Audit Logs", "Records of who did what, for accountability and review.", "≡"],
    ["Sensitive-Field Masking", "Field-level controls that protect data such as salaries.", "◐"],
  ];
  return (
    <section id="features" className="relative px-4 py-24">
      <SectionHead
        step="03"
        eyebrow="FEATURES"
        title="Everything your workforce needs, in one system."
        sub="From everyday attendance to compensation structures and employee exits, Karya keeps essential HR operations connected."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([t, d, i]) => (
          <div key={t} className="reveal group gradient-border rounded-2xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-mono text-sm text-accent-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-primary-foreground">{i}</span>
            <h3 className="mt-5 font-semibold text-ink">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 04 how it works ---------- */

function HowItWorks() {
  const steps = [
    ["Deploy", "Deploy Karya on infrastructure you control."],
    ["Configure", "Set up your organization, policies, roles, fields and workflows."],
    ["Invite people", "Onboard employees, managers and administrators into the workspace."],
    ["Run operations", "Manage attendance, leave, compensation, expenses, policies and employee lifecycle operations."],
  ];
  return (
    <section id="how-it-works" className="relative px-4 py-24">
      <SectionHead step="04" eyebrow="HOW IT WORKS" title="How it works" sub="Four steps from a fresh install to everyday HR operations." />
      <div className="relative mx-auto mt-14 max-w-6xl">
        <div className="pointer-events-none absolute left-[12%] right-[12%] top-11 hidden h-px bg-gradient-to-r from-transparent via-lavender to-transparent lg:block" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <div
              key={t}
              style={{ transitionDelay: `${i * 120}ms` }}
              className="reveal group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-lavender hover:shadow-float"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-mono text-xs text-primary-foreground transition-colors duration-500 group-hover:bg-primary">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 configured ---------- */

function Configured() {
  const items = [
    ["Roles", "Define who can access what.", "◈"],
    ["Fields", "Customize the information captured for your people and organization.", "▦"],
    ["Leave policies", "Define leave types, rules and approval paths.", "▤"],
    ["Holiday calendars", "Configure calendars for your organization and location.", "◷"],
    ["Approval flows", "Set up workflows that match how your teams operate.", "⇄"],
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="px-4 py-24">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-14">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full glow-violet" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>05 · CONFIGURABLE</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Built to be configured, <span className="font-display font-normal italic text-primary">not hardcoded.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Every organization works differently. Karya lets you define how your HR operations work instead of forcing
              your processes into fixed workflows.
            </p>
            <p className="mt-6 rounded-2xl border border-border bg-card px-5 py-4 font-semibold text-ink shadow-soft">
              Your organization defines the rules. Karya provides the system.
            </p>
          </div>
          <div className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-lavender" />
            <div className="space-y-3">
              {items.map(([t, d, i], idx) => (
                <button
                  key={t}
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className={`relative flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left shadow-soft transition-all duration-500 ${active === idx ? "translate-x-1 border-lavender shadow-float" : "border-border"}`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-sm transition-colors duration-500 ${active === idx ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>{i}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{t}</span>
                    <span className="block text-sm text-muted-foreground">{d}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 why open source ---------- */

function WhyOpenSource() {
  const rows = [
    ["Pricing", "No per-seat fees", "Per employee, per month"],
    ["Data location", "Your servers", "Vendor cloud"],
    ["Customisation", "Roles, fields, flows, source code", "Limited to plan settings"],
    ["Lock-in", "Export anything, fork anytime", "Vendor-controlled"],
  ];
  return (
    <section id="open-source" className="relative px-4 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-lavender blur-3xl" />
      <div className="relative">
        <SectionHead
          step="07"
          eyebrow="OPEN SOURCE · AGPL-3.0"
          title="Why open source and self-hosted?"
          sub="Karya gives organizations control over where their HR data lives, how the platform is configured, and how the software evolves."
        />
        <div className="reveal mx-auto mt-14 max-w-4xl overflow-x-auto">
          <div className="min-w-[560px] overflow-hidden rounded-3xl border border-border bg-card shadow-float">
            <div className="grid grid-cols-[1fr_1.3fr_1.3fr] text-sm">
              <div className="p-5" />
              <div className="bg-accent p-5 font-semibold text-ink">
                <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-md bg-ink text-xs text-primary-foreground">K</span>
                Karya
              </div>
              <div className="p-5 font-semibold text-muted-foreground">Typical SaaS HRMS</div>
              {rows.map(([k, a, b]) => (
                <div key={k} className="contents">
                  <div className="border-t border-border p-5 font-medium text-ink">{k}</div>
                  <div className="border-t border-border bg-accent/60 p-5 font-semibold text-ink">
                    <span className="mr-2 text-success">✓</span>{a}
                  </div>
                  <div className="border-t border-border p-5 text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 developers ---------- */

function Developers() {
  const stack = ["Node.js", "Express 5", "Prisma 7", "MySQL 8", "React 19", "Vite", "Tailwind CSS 4"];
  const card = "reveal rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float";
  return (
    <section id="developers" className="px-4 py-24">
      <SectionHead
        step="09"
        eyebrow="DEVELOPERS"
        title="Built for teams who want control."
        sub="The technical side of Karya: the stack, the architecture, and how to get it running."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-2">
        <div className="reveal overflow-hidden rounded-2xl border border-border bg-ink shadow-float lg:row-span-2">
          <div className="flex items-center gap-1.5 border-b border-primary-foreground/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground/20" />
            <span className="ml-3 font-mono text-xs text-primary-foreground/60">Quick start</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-primary-foreground/85">
            <span className="text-lavender">$</span> git clone {"<repository-url>"}{"\n"}
            <span className="text-lavender">$</span> cd karya{"\n"}
            <span className="text-lavender">$</span> docker-compose up -d{"\n"}
            <span className="text-success">✓ Karya is ready on your infrastructure</span>
          </pre>
          <div className="border-t border-primary-foreground/10 p-6">
            <div className="text-[11px] font-semibold tracking-[0.18em] text-lavender">TECHNOLOGY</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="rounded-full border border-primary-foreground/15 px-3 py-1 font-mono text-xs text-primary-foreground/85">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={card}>
          <span className="font-mono text-xs text-primary">ARCHITECTURE</span>
          <p className="mt-3 leading-relaxed text-ink">
            Multi-tenant architecture with separate instance administration and organization-level workspaces.
          </p>
          <a href="/docs/architecture" className="mt-4 inline-block text-sm font-semibold text-primary hover:text-ink">Read the architecture notes →</a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={card}>
            <span className="font-mono text-xs text-primary">API</span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The API reference is being written and will be published in the docs.</p>
            <a href="/docs/api-reference" className="mt-4 inline-block text-sm font-semibold text-primary hover:text-ink">API reference →</a>
          </div>
          <div className={card}>
            <span className="font-mono text-xs text-primary">CONTRIBUTING</span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Explore the repository, contribute improvements, report issues, and help shape Karya.</p>
            <a href={GITHUB} className="mt-4 inline-block text-sm font-semibold text-primary hover:text-ink">View on GitHub →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 docs summary ---------- */

function DocsSummary() {
  const cards = [
    ["Get Started", "Learn the basics and deploy your first Karya instance.", "/docs/what-is-karya"],
    ["Self-host Karya", "Requirements, installation, configuration, upgrades and backups.", "/docs/requirements"],
    ["Core Concepts", "Organizations, entities, roles, departments and access.", "/docs/organization-vs-legal-entity"],
    ["Developer Guide", "Architecture, APIs, data models and contribution guidelines.", "/docs/architecture"],
  ];
  return (
    <section className="px-4 py-24">
      <SectionHead step="10" eyebrow="DOCS" title="Where to learn more." sub="The Karya knowledge guide covers deployment, configuration, everyday use and contributing." />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([t, d, href]) => (
          <a key={t} href={href} className="reveal group gradient-border rounded-2xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
            <h3 className="font-semibold text-ink">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-primary"><span className="inline-flex gap-1">Open <Arrow /></span></span>
          </a>
        ))}
      </div>
      <div className="reveal mt-10 flex justify-center">
        <Btn href={DOCS} variant="ghost">Browse all docs <Arrow /></Btn>
      </div>
    </section>
  );
}

/* ---------- 12 faq ---------- */

const FAQS: [string, [string, string][]][] = [
  ["General", [
    ["What is Karya?", "Karya is an open-source, self-hostable HRMS. It brings employee records, attendance, leave, compensation, reimbursements, policies and exits into one system you run yourself."],
    ["Who is Karya built for? Is it suitable for small teams and large companies?", "Karya is built for organizations that want to own their HR system: IT and DevOps teams who run it, HR teams and founders who configure it, and employees who use it every day. Its roles, fields and multi-tenant setup are meant to adapt to different sizes and structures."],
    ["What does \"open source\" mean here, and which license do you use?", "The source code is public and licensed under AGPL-3.0. You can inspect it, run it, modify it and fork it under the terms of that license."],
    ["Is Karya really free? Are there any hidden costs?", "There are no license or per-seat fees. Your costs are the infrastructure you host it on and the time your team spends running it."],
    ["Is there a hosted or cloud version, or only self-hosting?", "Karya is currently self-hosted only. No hosted or cloud version is offered at this time."],
  ]],
  ["Self-hosting", [
    ["What do I need to self-host Karya?", "Karya is deployed with Docker. Detailed system requirements are being written and will be published in the Self-hosting docs."],
    ["How long does setup take?", "The quick start is three commands. Total setup time depends on your infrastructure and configuration, and a full installation guide is on the way."],
    ["How do I update to a new version?", "An upgrade guide is being prepared and will be published in the Self-hosting docs."],
    ["How do I back up and restore my data?", "Your data lives in your own database, so you stay in control of backups. A dedicated backup and restore guide is being prepared."],
    ["Do I need a technical team to run it?", "You need someone comfortable deploying and maintaining a Docker-based application. Day-to-day HR work does not require technical skills."],
  ]],
  ["Features", [
    ["Can I define my own roles and permissions?", "Yes. Karya uses role-based access control so you can match access to responsibilities."],
    ["Can I customize fields and forms to match my company?", "Yes. You can customize the fields captured for your people and organization."],
    ["Does it handle multiple legal entities or countries?", "Karya is multi-tenant, so one installation can run several organizations. Guidance on legal entities and multi-country setups will be covered in the Core Concepts docs."],
    ["How does the exit process work?", "Karya supports voluntary exits and offboarding through a defined workflow, so each step of an employee's exit is tracked."],
  ]],
  ["Security and data", [
    ["Where is my data stored, and who can see it?", "Your data is stored on servers you control. Inside Karya, who can see what is decided by the roles you configure, and sensitive fields such as salary can be masked."],
    ["How is access controlled and audited?", "Access is controlled through roles, and audit logs keep a record of actions for accountability and review."],
    ["Is Karya compliant with data-protection laws like GDPR or India's DPDP?", "Karya does not claim any formal certification or compliance. Because you host it, you control where data lives and who can access it, which can support your own compliance work. Please assess it against your legal requirements."],
    ["How do I report a security vulnerability?", "Please report it privately to the maintainers through the GitHub repository or the contact form rather than opening a public issue. A formal security policy will be published."],
  ]],
  ["Support and community", [
    ["What support is available if I get stuck?", "Start with the docs, then use GitHub issues and discussions to ask questions and report problems. Karya is community-supported."],
  ]],
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border bg-card px-6 shadow-soft transition-colors duration-300 ${open ? "border-lavender" : "border-border"}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-ink">
        {q}
        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="pb-5 leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [cat, setCat] = useState(0);
  return (
    <section id="faqs" className="px-4 py-24">
      <SectionHead step="12" eyebrow="FAQS" title="Frequently asked questions." />
      <div className="reveal mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
        {FAQS.map(([c], i) => (
          <button
            key={c}
            onClick={() => setCat(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${i === cat ? "bg-ink text-primary-foreground" : "border border-border bg-card text-ink hover:border-lavender"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div key={cat} className="mx-auto mt-8 max-w-3xl space-y-3 animate-fade-up">
        {FAQS[cat][1].map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
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
          Self-host Karya today.
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-primary-foreground/80">
          Take control of your HR infrastructure, explore the source, and build your people operations around the way
          your organization works.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <Btn href={GITHUB} variant="light">View on GitHub <Arrow /></Btn>
          <Btn href={DOCS} variant="outline-light">Read the Docs</Btn>
        </div>
      </div>
    </section>
  );
}

function MultiTenant() {
  const node = "rounded-2xl border border-border bg-card px-5 py-4 text-center shadow-soft";
  return (
    <section className="px-4 py-24">
      <div className="reveal mx-auto grid max-w-6xl items-center gap-12 rounded-3xl border border-border bg-surface p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <Eyebrow>06 · ARCHITECTURE</Eyebrow>
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

function Audience() {
  const items = [
    ["IT & DevOps", "Deploy with Docker, maintain the instance, and keep employee data within your infrastructure.", "</>"],
    ["HR & Founders", "Set up employee structures, policies, access, and organization-level operations.", "▦"],
    ["Employees", "Check in, request leave, view pay slips, and submit reimbursements through one workspace.", "◉"],
  ];
  return (
    <section className="relative px-4 py-24">
      <SectionHead step="08" eyebrow="WHO IT'S FOR" title="One system, clear paths for every team." />
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
          <Eyebrow>11 · ABOUT KARYA</Eyebrow>
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

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted-foreground focus:border-lavender focus:ring-4 focus:ring-ring/20";
  return (
    <section id="contact" className="relative px-4 py-24">
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full glow-violet blur-2xl" />
      <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="reveal">
          <Eyebrow>13 · CONTACT US</Eyebrow>
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
            {sent ? "Thanks, we'll be in touch." : <>Send message <span className="transition-transform group-hover:translate-x-1">→</span></>}
          </button>
        </form>
      </div>
    </section>
  );
}
