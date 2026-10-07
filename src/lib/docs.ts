export type DocPage = {
  slug: string;
  title: string;
  summary?: string;
  /** Paragraphs or code blocks. Absent = documentation pending. */
  body?: ({ p: string } | { code: string } | { list: string[] })[];
};
export type DocSection = { title: string; pages: DocPage[] };

const s = (title: string, summary?: string) => ({
  slug: title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  title,
  summary,
});

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    pages: [
      {
        ...s("What is Karya?", "An overview of the open-source, self-hosted HRMS."),
        body: [
          {
            p: "Karya is an open-source, self-hostable Human Resource Management System licensed under AGPL-3.0. It brings employee records, attendance, leave, compensation, reimbursements, policies and offboarding into one system that runs on infrastructure you control.",
          },
          {
            p: "Karya is multi-tenant. Instance administration is kept separate from organization-level workspaces, so one installation can serve a single business or several organizations.",
          },
          {
            list: [
              "Employee directory and profiles",
              "Time and attendance",
              "Leave operations and holiday calendars",
              "Compensation structures",
              "Reimbursements",
              "Exit management",
              "Role-based access, audit logs and sensitive-field masking",
            ],
          },
        ],
      },
      s("Concepts and terminology", "Key terms used across Karya."),
      {
        ...s("Quick start", "Run Karya locally with Docker."),
        body: [
          { p: "The supported deployment path is based on Docker. Clone the repository, then start the services." },
          { code: "git clone <repository-url>\ncd karya\ndocker-compose up -d" },
          { p: "Detailed steps for creating the instance administrator and first organization will be added here." },
        ],
      },
    ],
  },
  {
    title: "Self-hosting",
    pages: [
      s("Requirements"),
      s("Installation"),
      {
        ...s("Docker installation"),
        body: [
          { p: "Karya ships with a Docker Compose setup." },
          { code: "git clone <repository-url>\ncd karya\ndocker-compose up -d" },
          { p: "Configuration options and production guidance are still being documented." },
        ],
      },
      s("Manual installation"),
      s("Environment configuration"),
      s("Upgrading"),
      s("Backups"),
    ],
  },
  {
    title: "Core Concepts",
    pages: [
      s("Organization vs legal entity"),
      s("Departments"),
      s("Job titles"),
      s("Levels and bands"),
      s("Employment types"),
      s("Access roles"),
      s("Features per role"),
    ],
  },
  {
    title: "Guides by Persona",
    pages: [s("Employee"), s("Manager"), s("HR"), s("Finance"), s("Admin")],
  },
  {
    title: "Module Guides",
    pages: [
      s("Onboarding and offboarding"),
      s("Attendance and leave"),
      s("Payroll"),
      s("Compliance and filing"),
      s("Requests and helpdesk"),
      s("Policies"),
      s("Recognition"),
    ],
  },
  {
    title: "Customization",
    pages: [s("Custom fields"), s("Page customization"), s("Roles and permissions")],
  },
  {
    title: "Developers",
    pages: [
      {
        ...s("Architecture"),
        body: [
          {
            p: "Karya uses a multi-tenant architecture with separate instance administration and organization-level workspaces.",
          },
          {
            list: ["Node.js", "Express 5", "Prisma 7", "MySQL 8", "React 19", "Vite", "Tailwind CSS 4"],
          },
          { p: "A deeper walkthrough of services and modules will be added here." },
        ],
      },
      s("API reference"),
      s("Data model"),
      s("Contributing"),
      s("Coding standards"),
    ],
  },
  {
    title: "Reference",
    pages: [s("Glossary"), s("Changelog"), s("Troubleshooting")],
  },
];

export const ALL_DOCS = DOC_SECTIONS.flatMap((sec) => sec.pages.map((p) => ({ ...p, section: sec.title })));
export const findDoc = (slug: string) => ALL_DOCS.find((d) => d.slug === slug);
