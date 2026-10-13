import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/demo-form";
import { emptyDemoRequest, type DemoRequest } from "@/lib/demo-request";
import { Arrow, Btn, Eyebrow, Footer, GITHUB, Nav, SectionHead, useReveal } from "@/components/site";
import { CalendarDays, ClipboardCheck, Receipt, Server, Settings2, ShieldCheck, UserCheck, UserPlus, Users, Wallet, type LucideIcon } from "lucide-react";

const DOCS = "/docs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaarya | The Open-Source HRMS for Modern Teams" },
      {
        name: "description",
        content:
          "Kaarya is an open-source, self-hostable HRMS. Manage employees, attendance, leave, compensation and exits while keeping full control of your data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Kaarya | The Open-Source HRMS for Modern Teams" },
      {
        property: "og:description",
        content: "Self-host your HR infrastructure and keep complete control of your data.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  const [details, setDetails] = useState<DemoRequest>(emptyDemoRequest);
  const [continued, setContinued] = useState(false);
  const continueDemo = (request: DemoRequest) => {
    setDetails(request);
    setContinued(true);
    window.location.hash = "contact";
    document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.getElementById("contact-title")?.focus({ preventScroll: true });
  };
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero details={details} onChange={setDetails} onContinue={continueDemo} />
      <Product />
      <HowItWorks />
      <Configured />
      <MultiTenant />
      <WhyOpenSource />
      <DocsSummary />
      <About />
      <Faq />
      <Contact details={details} onChange={setDetails} continued={continued} />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------- hero ---------- */

function Hero({ details, onChange, onContinue }: { details: DemoRequest; onChange: (details: DemoRequest) => void; onContinue: (details: DemoRequest) => void }) {
  return (
    <section className="hero-atmosphere relative px-4 pb-14 pt-28 sm:pt-32 lg:pb-16">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div className="animate-fade-up">
        <Eyebrow>OPEN-SOURCE HRMS</Eyebrow>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl">
          HR management that <span className="font-display italic text-gradient">works your way.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Manage employee information, attendance, leave, compensation, and everyday HR operations with an open-source
          HRMS you can host on your own infrastructure.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Btn href="#contact">Request a Demo <Arrow /></Btn>
        </div>
        <p className="mt-8 text-sm font-medium text-muted-foreground">
          Self-hosted · Multi-tenant · Docker-ready · Open source
        </p>
      </div>
      <div className="demo-entrance rounded-2xl border border-border bg-card p-6 shadow-float sm:p-8">
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><Users className="h-5 w-5" aria-hidden /></span>
        <h2 className="text-2xl font-bold text-ink">Let's explore Karya for your team.</h2>
        <p className="mb-6 mt-2 text-sm leading-relaxed text-muted-foreground">Tell us about your organization and what you’re looking for in your HR system.</p>
        <DemoForm hero details={details} onChange={onChange} onContinue={onContinue} />
      </div>
      </div>
    </section>
  );
}

/* ---------- 01 product ---------- */

function Product() {
  const mods: [string, string, LucideIcon][] = [
    ["Employee Management", "Keep employee profiles, job details, and organizational information organized in one place.", Users],
    ["Attendance and Leave", "Track attendance, manage leave balances, and configure leave types and holiday calendars.", CalendarDays],
    ["Compensation", "Organize salary structures, levels, and compensation components around your organization's requirements.", Wallet],
    ["Reimbursements", "Let employees submit expense claims and track their reimbursement status.", Receipt],
    ["Onboarding and Offboarding", "Manage employee joining, onboarding progress, and exit processes in a structured way.", UserCheck],
    ["Policies and Access", "Manage organizational policies, access roles, permissions, and audit records.", ShieldCheck],
  ];
  return (
    <section id="product" className="relative scroll-mt-24 px-4 py-24">
      <SectionHead
        title="Everything you need to manage your people."
        sub="Kaarya brings essential HR operations together in one place, from employee records and attendance to compensation and employee exits."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mods.map(([t, d, Icon]) => (
          <div key={t} className="reveal group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-lavender hover:shadow-float">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="mt-5 font-bold text-ink">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 04 how it works ---------- */

function HowItWorks() {
  const steps: [string, string, LucideIcon][] = [
    ["Set up Kaarya", "Deploy Kaarya on infrastructure your organization controls.", Server],
    ["Configure your workspace", "Add your organization details and set up the roles, policies, and settings that fit your needs.", Settings2],
    ["Add your people", "Invite employees, managers, and administrators to their workspace.", UserPlus],
    ["Manage everyday HR", "Keep employee information, attendance, leave, compensation, and other essential HR operations organized.", ClipboardCheck],
  ];
  return (
    <section id="how-it-works" className="relative scroll-mt-24 px-4 py-24">
      <SectionHead
        title="Get started with Kaarya in four simple steps."
        sub="Set up Kaarya around your organization, bring your people on board, and start managing everyday HR operations."
      />
      <div className="relative mx-auto mt-14 max-w-6xl">
        <div className="pointer-events-none absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-lavender to-transparent lg:block" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d, Icon], i) => (
            <div
              key={t}
              style={{ transitionDelay: `${i * 120}ms` }}
              className="reveal group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-lavender hover:shadow-float"
            >
              <div className="flex items-center justify-between">
                <span className="workflow-icon grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{t}</h3>
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
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Built to be configured, <span className="font-display font-normal italic text-primary">not hardcoded.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Every organization works differently. Kaarya lets you define how your HR operations work instead of forcing
              your processes into fixed workflows.
            </p>
            <p className="mt-6 rounded-2xl border border-border bg-card px-5 py-4 font-semibold text-ink shadow-soft">
              Your organization defines the rules. Kaarya provides the system.
            </p>
          </div>
          <div className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-lavender" />
            <div className="space-y-3">
              {items.map(([t, d, i], idx) => (
                <Button variant="ghost"
                  key={t}
                  onClick={() => setActive(idx)}
                  aria-pressed={active === idx}
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className={`relative flex h-auto w-full items-center justify-start gap-4 whitespace-normal rounded-2xl border bg-card p-4 text-left shadow-soft transition-all duration-500 ${active === idx ? "translate-x-1 border-lavender shadow-float" : "border-border"}`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-sm transition-colors duration-500 ${active === idx ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>{i}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{t}</span>
                    <span className="block text-sm text-muted-foreground">{d}</span>
                  </span>
                </Button>
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
    ["Pricing model", "No per-seat license fees", "Usually priced per employee"],
    ["Data location and control", "Infrastructure you control", "The vendor's cloud"],
    ["Customization", "Configure roles, fields and policies, or change the source", "Limited to what the vendor offers"],
    ["Vendor lock-in", "Open source code you can run and fork", "Tied to the vendor"],
  ];
  return (
    <section id="open-source" className="relative px-4 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-lavender blur-3xl" />
      <div className="relative">
        <SectionHead
          title="Why open source and self-hosted?"
          sub="Kaarya gives organizations control over where their HR data lives, how the platform is configured, and how the software evolves."
        />
        <div className="reveal mx-auto mt-14 max-w-4xl overflow-x-auto">
          <div className="min-w-[560px] overflow-hidden rounded-3xl border border-border bg-card shadow-float">
            <div className="grid grid-cols-[1fr_1.3fr_1.3fr] text-sm">
              <div className="p-5" />
              <div className="bg-accent p-5 font-semibold text-ink">
                <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-md bg-ink text-xs text-primary-foreground">K</span>
                Kaarya
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

/* ---------- 10 docs summary ---------- */

function DocsSummary() {
  const cards = [
    ["Get Started", "Learn the basics and deploy your first Kaarya instance.", "/docs/what-is-kaarya"],
    ["Self-host Kaarya", "Requirements, installation, configuration, upgrades and backups.", "/docs/requirements"],
    ["Core Concepts", "Organizations, entities, roles, departments and access.", "/docs/organization-vs-legal-entity"],
    ["Developer Guide", "Architecture, APIs, data models and contribution guidelines.", "/docs/architecture"],
  ];
  return (
    <section id="docs" className="px-4 py-24 scroll-mt-24">
      <SectionHead title="Where to learn more." sub="The Kaarya knowledge guide covers deployment, configuration, everyday use and contributing." />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([t, d, href]) => (
          <a key={t} href={href} className="reveal group gradient-border rounded-2xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-float">
            <h3 className="font-bold text-ink">{t}</h3>
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
    ["What is Kaarya?", "Kaarya is an open-source, self-hostable HRMS. It brings employee records, attendance, leave, compensation, reimbursements, policies and exits into one system you run yourself."],
    ["Who is Kaarya built for? Is it suitable for small teams and large companies?", "Kaarya is built for organizations that want to own their HR system: IT and DevOps teams who run it, HR and operations teams who configure it, and employees who use it every day. Its roles, fields and multi-tenant setup are meant to adapt to different sizes and structures."],
    ["What does \"open source\" mean here?", "The source code is public. You can inspect it, run it, modify it and fork it under the terms of its open-source license."],
    ["Is Kaarya really free? Are there any hidden costs?", "Yes, Kaarya is free and open source, with no hidden costs. If you need help with deployment, setup, or other technical support, additional charges may apply. [Contact us] to learn more."],
    ["Is there a hosted or cloud version, or only self-hosting?", "Kaarya is currently self-hosted only. No hosted or cloud version is offered at this time."],
  ]],
  ["Self-hosting", [
    ["What do I need to self-host Kaarya?", "Kaarya is deployed with Docker. Detailed system requirements are being written and will be published in the Self-hosting docs."],
    ["How long does setup take?", "The quick start is three commands. Total setup time depends on your infrastructure and configuration, and a full installation guide is on the way."],
    ["How do I update to a new version?", "An upgrade guide is being prepared and will be published in the Self-hosting docs."],
    ["How do I back up and restore my data?", "Your data lives in your own database, so you stay in control of backups. A dedicated backup and restore guide is being prepared."],
    ["Do I need a technical team to run it?", "You need someone comfortable deploying and maintaining a Docker-based application. Day-to-day HR work does not require technical skills."],
  ]],
  ["Features", [
    ["Can I customize fields and forms to match my company?", "Yes. You can customize the fields captured for your people and organization."],
    ["Does it handle multiple legal entities or countries?", "Kaarya is multi-tenant, so one installation can run several entities. Guidance on legal entities and multi-country setups will be covered in the Core Concepts docs."],
  ]],
  ["Security and data", [
    ["Where is my data stored, and who can see it?", "Your data is stored on servers you control. Inside Kaarya, who can see what is decided by the roles you configure, and sensitive fields such as salary can be masked."],
    ["How is access controlled and audited?", "Access is controlled through roles, and audit logs keep a record of actions for accountability and review."],
    ["Is Kaarya compliant with data-protection laws like GDPR or India's DPDP?", "Kaarya does not claim any formal certification or compliance. Because you host it, you control where data lives and who can access it, which can support your own compliance work. Please assess it against your legal requirements."],
    ["How do I report a security vulnerability?", "Please report it privately to the maintainers through the GitHub repository or the contact form rather than opening a public issue. A formal security policy will be published."],
  ]],
  ["Support", [
    ["What support is available if I get stuck?", "Start with the docs, then use GitHub Issues and Discussions to ask questions, report problems, or share feedback. If you need additional help, [contact us]."],
  ]],
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border bg-card px-6 shadow-soft transition-colors duration-300 ${open ? "border-lavender" : "border-border"}`}>
      <Button variant="ghost" onClick={() => setOpen(!open)} aria-expanded={open} className="flex h-auto w-full items-center justify-between gap-4 whitespace-normal py-5 text-left font-medium text-ink hover:bg-transparent">
        {q}
        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </Button>
      <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden" inert={!open}>
          <p className="pb-5 leading-relaxed text-muted-foreground">
            {a.split(/\[([^\]]+)\]/).map((part, i) =>
              i % 2 ? <a key={i} href="#contact" className="font-semibold text-primary underline-offset-4 hover:underline">{part}</a> : part,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [cat, setCat] = useState(0);
  return (
    <section id="faqs" className="px-4 py-24">
      <SectionHead title="Frequently asked questions." />
      <div className="reveal mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
        {FAQS.map(([c], i) => (
          <Button variant="ghost"
            key={c}
            onClick={() => setCat(i)}
            aria-pressed={i === cat}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${i === cat ? "bg-primary text-primary-foreground" : "border border-border bg-card text-ink hover:border-lavender"}`}
          >
            {c}
          </Button>
        ))}
      </div>
      <div key={cat} className="mx-auto mt-8 max-w-3xl space-y-3 animate-fade-up">
        {(FAQS[cat]?.[1] ?? []).map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
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
        <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
          Self-host Kaarya today.
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
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            One installation. <span className="font-display font-normal italic text-primary">Distinct entities.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Kaarya separates organization-level administration from each entity's workspace, making one deployment useful for
            a single business, agency, or holding company.
          </p>
        </div>
        <div className="architecture-flow flex flex-col items-center">
          <div className={`${node} w-full max-w-xs`}>
            <div className="font-semibold text-ink">Instance Admin</div>
            <div className="text-xs text-muted-foreground">Organization</div>
            <div className="mt-1 font-mono text-xs text-primary">/superadmin</div>
          </div>
          <div className="h-8 w-px bg-lavender" />
          <div className="h-px w-1/2 bg-lavender" />
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            {[["Entity A", "/entity-a"], ["Entity B", "/entity-b"]].map(([o, u]) => (
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

/* ---------- 07 about ---------- */

function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="reveal mx-auto grid max-w-6xl gap-10 rounded-3xl border border-border bg-surface p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            HR software that <span className="font-display font-normal italic text-primary">stays yours.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Kaarya is an <span className="font-semibold text-ink">open-source</span> HRMS for organizations that
            prefer transparency, adaptability, and ownership over proprietary lock-in.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            ["Data sovereignty", "Host your employee data inside infrastructure your organization controls."],
            ["Operational breadth", "Bring employee profiles, time, leave, compensation, expenses, and exits together."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-bold text-ink">{t}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ details, onChange, continued }: { details: DemoRequest; onChange: (details: DemoRequest) => void; continued: boolean }) {
  return (
    <section id="contact" className="relative scroll-mt-24 px-4 py-24">
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full glow-violet blur-2xl" />
      <div className="relative mx-auto grid max-w-4xl items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="reveal">
          <h2 id="contact-title" tabIndex={-1} className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Let's talk about Kaarya.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Have a question about deploying Kaarya, using it for your organization, or contributing to the project? Get
            in touch.
          </p>
        </div>
        <div className="reveal rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">Online sending isn't set up yet. For now, contact the maintainers through <a href={GITHUB} className="font-semibold text-primary underline underline-offset-4">GitHub</a>.</p>
          {continued && <p role="status" className="mb-3 text-[13px] font-medium text-primary">Your demo details are here. Nothing has been sent.</p>}
          <DemoForm compact details={details} onChange={onChange} />
        </div>
      </div>
    </section>
  );
}
