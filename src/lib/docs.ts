/** One block of documentation content. Text supports `code` and **bold** inline. */
export type DocBlock =
  | { p: string }
  | { h: string }
  | { h3: string }
  | { code: string; title?: string }
  | { list: string[] }
  | { steps: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string; tone?: "info" | "tip" | "warning" };

/** How much of a documented capability is reachable in the product today. */
export type DocAvailability = "available" | "partial" | "unavailable";

export type DocPage = {
  slug: string;
  title: string;
  summary?: string | undefined;
  availability?: DocAvailability;
  /** Paragraphs or code blocks. Absent = documentation pending. */
  body?: DocBlock[];
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

const LOCAL_SETUP = `git clone https://github.com/mittarv/hrms.git
cd hrms
pnpm install
docker compose up -d
cp apps/api/.env.example apps/api/.env
# edit apps/api/.env: set DATABASE_URL and JWT_SECRET (16+ characters)
pnpm db:migrate
pnpm dev`;

const SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    pages: [
      {
        ...s("What is Karya?", "An overview of the open-source, self-hosted HRMS."),
        body: [
          {
            p: "Karya is an open-source, self-hostable Human Resource Management System. It brings employee records, attendance, leave, compensation, reimbursements, policies and offboarding into one system that runs on infrastructure you control.",
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
          { h: "How a Karya installation is organized" },
          {
            p: "Inside the product, the whole installation is called the **organization**. It is administered from the **Superadmin** app at `/superadmin`. Each company or business unit that runs its HR on the installation is an **entity**, with its own workspace at `/{entity-slug}`, its own people and its own settings.",
          },
          {
            table: {
              head: ["Application", "URL", "Used by", "Purpose"],
              rows: [
                [
                  "Superadmin",
                  "`/superadmin`",
                  "Organization superadmins",
                  "First-run setup, entities, branding, organization structure, holiday calendars, default policies, sign-in and email settings",
                ],
                [
                  "Entity workspace",
                  "`/` (sign-in) and `/{entity-slug}`",
                  "Entity admins, HR, managers and employees",
                  "Day-to-day HR: people, leave, attendance, salary structure, reimbursements, policies",
                ],
              ],
            },
          },
          { h: "Current scope" },
          {
            p: "Karya is under active development. The documentation describes what the current code does and marks topics that are only partially available.",
          },
          {
            table: {
              head: ["Capability", "Status"],
              rows: [
                ["People, onboarding invites, profiles and documents", "Available"],
                ["Leave, holiday calendars, approvals", "Available"],
                ["Attendance check-in and check-out", "Available"],
                ["Salary components, templates and employee CTC", "Available"],
                ["Reimbursement claims, review and payout tracking", "Available"],
                ["Exit and offboarding", "Partially available"],
                ["Statutory compliance and filing", "API only; the screen is turned off"],
              ],
            },
          },
        ],
      },
      {
        ...s("Concepts and terminology", "Key terms used across Karya."),
        body: [
          {
            p: "Karya uses a small set of terms consistently across the Superadmin app, the entity workspace and the API. Some terms differ from what other HR systems use, so read this page before configuring an installation.",
          },
          { h: "Tenancy" },
          {
            table: {
              head: ["Term", "Meaning"],
              rows: [
                [
                  "Organization",
                  "The whole Karya installation. There is exactly one per deployment, administered from Superadmin.",
                ],
                [
                  "Superadmin",
                  "A person who administers the organization. The first person to sign in becomes the **Superadmin owner**; the owner can add other superadmins and choose which panels each can use.",
                ],
                [
                  "Entity",
                  "A company or business unit inside the organization, with its own workspace, people and settings. Called `Organization` in the database and API.",
                ],
                [
                  "Entity admin",
                  "The single administrator of an entity, assigned from Superadmin. Has every permission inside that entity.",
                ],
                [
                  "Legal entity",
                  "A statutory registration inside an entity, used for compliance. Not the same as an entity.",
                ],
              ],
            },
          },
          { h: "People and structure" },
          {
            table: {
              head: ["Term", "Meaning"],
              rows: [
                [
                  "Department",
                  "A group of job titles. Defined once in Superadmin and copied to every entity.",
                ],
                [
                  "Job title",
                  "A position inside a department. Access permissions are attached to job titles.",
                ],
                ["Level", "A seniority level such as L1 or L2, with a rank for ordering."],
                ["Employee type", "Full-time, Part-time, Contract, Intern, or your own types."],
                ["Shift", "Working hours, working days and break time used by attendance."],
                [
                  "Reporting manager",
                  "The person an employee reports to. Must hold leave or attendance approval permission.",
                ],
              ],
            },
          },
          { h: "Access" },
          {
            table: {
              head: ["Term", "Meaning"],
              rows: [
                ["Permission", "A single capability such as `leave.approve` or `people.edit`."],
                [
                  "Access scope",
                  "How far a permission reaches: self, team (reporting line), department or the whole entity.",
                ],
                [
                  "Sensitive field",
                  "A profile or salary value that is masked until a permitted user reveals it, optionally with a reason.",
                ],
              ],
            },
          },
          { h: "Compensation" },
          {
            table: {
              head: ["Term", "Meaning"],
              rows: [
                [
                  "CTC",
                  "Cost to company: the yearly total of earnings and employer contributions.",
                ],
                ["Salary component", "One line of pay, such as Basic, HRA or Employer PF."],
                ["Salary template", "A reusable rule set that splits a CTC into components."],
                [
                  "Reimbursement category",
                  "An expense type with optional limits and receipt rules.",
                ],
              ],
            },
          },
        ],
      },
      {
        ...s("Quick start", "Run Karya locally with Docker."),
        body: [
          {
            p: "The supported deployment path is based on Docker. Clone the repository, then start the services.",
          },
          { code: "git clone <repository-url>\ncd karya\ndocker-compose up -d" },
          {
            p: "Detailed steps for creating the instance administrator and first organization will be added here.",
          },
          { h: "Local development setup" },
          {
            note: "The Docker Compose file starts the infrastructure only: MySQL 8.4 on port 3306 and Mailpit (a local mail catcher) on ports 1025 and 8025. The Karya API and web apps run from source with pnpm.",
            tone: "warning",
          },
          { p: "You need Node.js 22 or later, pnpm 11 or later, Docker, and Git." },
          { code: LOCAL_SETUP, title: "Terminal" },
          {
            p: "`pnpm dev` starts the API on port 4000, the entity workspace on port 3000 and the Superadmin app on port 3001. Open the Superadmin app through the workspace dev server at `http://localhost:3000/superadmin`.",
          },
          { h: "Create the organization superadmin" },
          {
            steps: [
              "Open `http://localhost:3000/superadmin`. A fresh installation shows the setup page.",
              "Sign in with Google. The first Google account to complete sign-in becomes the **Superadmin owner**. Later sign-ins must belong to existing superadmins.",
              "Name your organization when prompted.",
            ],
          },
          { h: "Configure email" },
          {
            p: "Karya sends one-time sign-in codes and invitations by email, so SMTP must be configured before you can add an entity. For local development, point SMTP at Mailpit (host `localhost`, port `1025`) and read the messages at `http://localhost:8025`.",
          },
          { h: "Create your first entity" },
          {
            steps: [
              "In Superadmin, open **Workforce setup → Organization structure** and add at least one department and one job title.",
              "Open **Entities** and choose **Add entity**.",
              "Enter the entity name, optionally upload a logo and attach holiday calendars.",
              "Choose the entity administrator and the sign-in methods, then create the entity. The administrator receives an invitation email.",
            ],
          },
          { h: "Sign in to the entity workspace" },
          {
            p: "Accept the invitation from the email, then sign in at `http://localhost:3000`. Entity users sign in with a one-time code sent by email, or with Google if the entity allows it.",
          },
        ],
      },
    ],
  },
  {
    title: "Self-hosting",
    pages: [
      {
        ...s("Requirements", "What you need to run Karya in production."),
        body: [
          { h: "Software" },
          {
            table: {
              head: ["Component", "Requirement", "Notes"],
              rows: [
                [
                  "Node.js",
                  "22 or later",
                  "Only needed when running from source. The official images use Node.js 22.",
                ],
                ["pnpm", "11 or later", "Only needed when building from source."],
                [
                  "MySQL",
                  "8.4 (8.x)",
                  "Use `utf8mb4` with `utf8mb4_0900_ai_ci` and `STRICT_TRANS_TABLES`, as in the bundled Compose file.",
                ],
                [
                  "SMTP server",
                  "Required",
                  "Sign-in codes and invitations are sent by email. You cannot add an entity until SMTP is configured.",
                ],
                [
                  "Reverse proxy",
                  "Required in production",
                  "Terminates HTTPS and routes `/api` and `/uploads` to the API on the same host as the web apps.",
                ],
                [
                  "File storage",
                  "Local disk or S3-compatible bucket",
                  "Holds logos and employee documents. See File storage.",
                ],
                [
                  "Google OAuth",
                  "Optional",
                  "Superadmins sign in with Google. A shared sign-in relay is used by default; you can register your own OAuth client instead.",
                ],
                [
                  "Docker",
                  "Optional",
                  "For the production images and the local development database.",
                ],
              ],
            },
          },
          { h: "Sizing" },
          {
            p: "There is no official sizing guidance. The API is a single Node.js process that sends email from an in-process queue, so a small virtual machine with a managed MySQL database is enough to start. If you store files on local disk, run a single API replica unless your volume supports attaching to several nodes.",
          },
        ],
      },
      {
        ...s("Installation", "Choose how to deploy Karya."),
        body: [
          {
            p: "A production installation has four parts: a MySQL database, the API, the two web apps (entity workspace and Superadmin) served as static files, and a reverse proxy in front of them.",
          },
          {
            table: {
              head: ["Method", "Best for", "Guide"],
              rows: [
                ["Docker images", "Most production installations", "Docker installation"],
                ["From source", "Hosts without Docker, or custom builds", "Manual installation"],
                ["pnpm dev", "Local development and evaluation", "Quick start"],
              ],
            },
          },
          { h: "Routing" },
          { p: "Serve everything from one origin so the apps and API share a host name." },
          {
            table: {
              head: ["Path", "Serves"],
              rows: [
                ["`/`", "Entity workspace sign-in"],
                ["`/{entity-slug}`", "Entity workspace"],
                ["`/superadmin`", "Superadmin app"],
                ["`/api`", "API"],
                ["`/uploads`", "Uploaded files (local storage only)"],
              ],
            },
          },
          { h: "After installing" },
          {
            steps: [
              "Run the database migrations before the first API start.",
              "Open `/superadmin` and complete first-run setup with Google.",
              "Configure SMTP under **Emails & notifications**, unless it is set through environment variables.",
              "Create departments and job titles, then add your first entity.",
            ],
          },
        ],
      },
      {
        ...s("Docker installation"),
        body: [
          { p: "Karya ships with a Docker Compose setup." },
          { code: "git clone <repository-url>\ncd karya\ndocker-compose up -d" },
          { p: "Configuration options and production guidance are still being documented." },
          { h: "Production images" },
          {
            note: "The Compose file in the repository is for local development. It runs MySQL and Mailpit only. Production deployments use the Dockerfiles in `docker/`.",
            tone: "warning",
          },
          { p: "Build the images from the repository root:" },
          {
            code: `docker build -f docker/api.Dockerfile --target api -t hrms-api .
docker build -f docker/api.Dockerfile --target migrate -t hrms-api-migrate .
docker build -f docker/frontend.Dockerfile -t hrms-frontend .`,
            title: "Build",
          },
          {
            table: {
              head: ["Image", "Runs", "Port"],
              rows: [
                [
                  "`hrms-api`",
                  "The API (`node dist/main.js`) as the unprivileged `node` user",
                  "4000",
                ],
                ["`hrms-api-migrate`", "`prisma migrate deploy`, then exits", "—"],
                [
                  "`hrms-frontend`",
                  "nginx serving the entity workspace at `/` and Superadmin at `/superadmin/`",
                  "8080",
                ],
              ],
            },
          },
          { h: "Run migrations" },
          { p: "Run the migrate image before the first start and after every upgrade:" },
          { code: 'docker run --rm -e DATABASE_URL="$DATABASE_URL" hrms-api-migrate' },
          { h: "Start the containers" },
          {
            p: "Start the API with at least `DATABASE_URL`, `JWT_SECRET`, `WEB_APP_URL` and `SUPERADMIN_APP_URL`. Use the same origin for both URLs, for example `https://hr.example.com` and `https://hr.example.com/superadmin`. See Environment configuration for every option.",
          },
          {
            p: "Route `/api` and `/uploads` to the API container and everything else to the frontend container.",
          },
          { h: "Health checks" },
          {
            table: {
              head: ["Endpoint", "Use"],
              rows: [
                ["`GET /health`", "Liveness"],
                ["`GET /api/v1/health`", "Liveness through the API prefix"],
                [
                  "`GET /api/v1/health/ready`",
                  "Readiness. Runs a database query and returns 503 if MySQL is unreachable.",
                ],
              ],
            },
          },
        ],
      },
      {
        ...s("Manual installation", "Build and run Karya from source without Docker."),
        body: [
          { p: "Use this method on hosts where you run Node.js directly." },
          {
            code: `git clone https://github.com/mittarv/hrms.git
cd hrms
cp apps/api/.env.example apps/api/.env   # then edit the values
pnpm install --frozen-lockfile
pnpm build
pnpm db:deploy
pnpm --filter @hrms/api start`,
            title: "Terminal",
          },
          {
            note: "`pnpm install` runs `prisma generate`, which reads `DATABASE_URL`. Create `apps/api/.env` before installing.",
          },
          { h: "Serve the web apps" },
          {
            p: "`pnpm build` writes static files to `apps/web/dist` and `apps/superadmin/dist`. Serve the first at `/` and the second at `/superadmin/`, each with a fallback to its `index.html` so client-side routes work. The nginx configuration in `docker/nginx/spa.conf` is a working reference.",
          },
          { h: "Keep the API running" },
          {
            p: "Run the API under a process manager such as systemd so it restarts after failures and reboots. Set `NODE_ENV=production`.",
          },
        ],
      },
      {
        ...s("Environment configuration", "Every setting the API reads from its environment."),
        body: [
          {
            p: "The API validates its environment at startup and refuses to start with “Invalid environment configuration” if a value is missing or malformed. The template is `apps/api/.env.example`.",
          },
          { h: "Core" },
          {
            table: {
              head: ["Variable", "Required", "Description"],
              rows: [
                [
                  "`NODE_ENV`",
                  "No",
                  "`development`, `test` or `production`. Default `development`.",
                ],
                ["`PORT`", "No", "API port. Default `4000`."],
                [
                  "`DATABASE_URL`",
                  "Yes",
                  "MySQL connection string. Alternatively set `DATABASE_HRMS_USER`, `DATABASE_HRMS_PASSWORD`, `DATABASE_HRMS_HOST`, `DATABASE_HRMS_PORT` and `DATABASE_HRMS_NAME`.",
                ],
                [
                  "`JWT_SECRET`",
                  "Yes",
                  "At least 16 characters. Signs sessions and protects stored secrets. See the warning below.",
                ],
              ],
            },
          },
          {
            note: "`JWT_SECRET` also derives the key that encrypts stored Google client secrets. Changing it signs everyone out and makes those stored secrets unreadable; Karya then falls back to the shared sign-in relay. Store it with your other secrets and back it up.",
            tone: "warning",
          },
          { h: "Public URLs" },
          {
            table: {
              head: ["Variable", "Default", "Description"],
              rows: [
                [
                  "`WEB_APP_URL`",
                  "`http://localhost:3000`",
                  "Entity workspace URL. Allowed for CORS.",
                ],
                [
                  "`SUPERADMIN_APP_URL`",
                  "`http://localhost:3000/superadmin`",
                  "Superadmin URL. Allowed for CORS and used for Google sign-in callbacks.",
                ],
                [
                  "`APP_URL`",
                  "Same as `WEB_APP_URL`",
                  "Base for invitation links (`/invite/{token}`).",
                ],
              ],
            },
          },
          { h: "Email (SMTP)" },
          {
            table: {
              head: ["Variable", "Default", "Description"],
              rows: [
                ["`SMTP_HOST`", "`smtp.gmail.com`", "SMTP server."],
                ["`SMTP_PORT`", "`587`", "Port `465` uses implicit TLS."],
                ["`SMTP_USERNAME` or `SMTP_USER`", "—", "SMTP user name."],
                ["`SMTP_PASSWORD` or `SMTP_PASS`", "—", "SMTP password."],
                ["`SMTP_FROM_EMAIL`", "SMTP user", "Sender address."],
                ["`SMTP_FROM_NAME`", "`Karya`", "Sender name."],
              ],
            },
          },
          {
            p: "SMTP set in the environment takes precedence over the Superadmin email panel, and the panel becomes read-only. Environment values are never written to the database.",
          },
          { h: "Google sign-in" },
          {
            table: {
              head: ["Variable", "Description"],
              rows: [
                [
                  "`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`",
                  "Your own Google OAuth client. Optional.",
                ],
                [
                  "`GOOGLE_AUTH_RELAY_URL`, `GOOGLE_AUTH_RELAY_ISSUER_URL`",
                  "The Google sign-in relay used when you do not configure your own client. The issuer defaults to the relay URL.",
                ],
              ],
            },
          },
          { h: "File storage" },
          {
            table: {
              head: ["Variable", "Description"],
              rows: [
                ["`STORAGE_DRIVER`", "`local` (default) or `s3`."],
                ["`UPLOAD_ROOT`", "Directory for local storage. Default `uploads`."],
                [
                  "`S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL_BASE`",
                  "Required when `STORAGE_DRIVER=s3`. `S3_PUBLIC_URL_BASE` must be an absolute URL.",
                ],
                [
                  "`S3_ENDPOINT`, `S3_FORCE_PATH_STYLE`",
                  "Optional, for S3-compatible services such as MinIO, Cloudflare R2 or Google Cloud Storage.",
                ],
              ],
            },
          },
          { h: "Development only" },
          {
            p: "`WEB_PORT` (default 3000), `SUPERADMIN_PORT` (default 3001) and `API_PORT` (default 4000) control the Vite dev servers. They are not used in production builds.",
          },
        ],
      },
      {
        ...s("File storage", "Where Karya keeps logos and employee documents."),
        body: [
          {
            p: "Karya stores entity logos, employee documents and reimbursement receipts. Choose a storage driver with `STORAGE_DRIVER`.",
          },
          {
            table: {
              head: ["Driver", "How files are served", "Use when"],
              rows: [
                [
                  "`local` (default)",
                  "Logos at `/uploads/...`; documents through authenticated API routes",
                  "Single-server installations. Run one API replica unless the volume supports multi-node attach.",
                ],
                [
                  "`s3`",
                  "Logos from `S3_PUBLIC_URL_BASE`; documents as private objects downloaded through the API",
                  "Multiple API replicas, or managed object storage",
                ],
              ],
            },
          },
          { h: "Limits" },
          {
            list: [
              "Logos: PNG, JPEG, WebP or SVG, up to 1.5 MB.",
              "Employee documents: PDF, DOCX, JPG or PNG, between 1 KB and 10 MB.",
              "Reimbursement receipts: PDF, JPG or PNG, up to 10 MB.",
            ],
          },
          {
            p: "Objects are stored under `orgs/{entityId}/...`, so each entity's files stay separate. The repository's `docs/storage.md` describes how to move existing local files to a bucket.",
          },
        ],
      },
      {
        ...s("Email and SMTP", "Configure outgoing email for sign-in codes and notifications."),
        body: [
          {
            p: "Email is required. Karya emails one-time sign-in codes, invitations and workflow notifications, and Superadmin blocks adding an entity until SMTP is configured.",
          },
          { h: "Two ways to configure SMTP" },
          {
            table: {
              head: ["Source", "How", "Precedence"],
              rows: [
                [
                  "Environment",
                  "Set `SMTP_*` variables on the API",
                  "Wins. The Superadmin panel shows “Configured from environment variables” and is read-only.",
                ],
                [
                  "Superadmin",
                  "**Security and access → Emails & notifications**: server, sender and authentication, then **Test SMTP**",
                  "Used when the environment does not configure SMTP",
                ],
              ],
            },
          },
          {
            note: "Prefer environment variables in production so the SMTP password lives in your secret store rather than in the database.",
            tone: "tip",
          },
          { h: "Delivery" },
          {
            p: "Emails are queued in the database and sent by the API every few seconds. Failed sends are retried after 1, 5, 30 and 120 minutes. Sent messages are purged after 30 days. If SMTP is not configured, messages are marked skipped instead of failing.",
          },
          { h: "What is sent" },
          {
            list: [
              "Sign-in codes and invitations (employees and entity admins).",
              "Welcome emails for new superadmins, entity admins and employees.",
              "Leave, attendance, exit and reimbursement updates to the employee, approvers and managers.",
              "Policy publications that require acknowledgement.",
              "Profile change requests and decisions.",
            ],
          },
          {
            p: "Announcements and department-wide notices appear in the in-app notification bell only.",
          },
          { h: "Local development" },
          {
            p: "The Compose file runs Mailpit. Use host `localhost` and port `1025` with no authentication, and read messages at `http://localhost:8025`.",
          },
        ],
      },
      {
        ...s("Google sign-in", "How superadmins and employees sign in with Google."),
        body: [
          { h: "Superadmins" },
          {
            p: "Superadmins always sign in with Google. By default Karya uses a shared Google sign-in relay, so you do not need to register an OAuth client. The relay returns a short-lived signed token that the API verifies; each token can be used once.",
          },
          {
            p: "To use your own Google OAuth client instead, set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, or enter them under **Security and access → Google Sign-in**. Register `{SUPERADMIN_APP_URL}/auth/complete` as an authorized redirect URI.",
          },
          { h: "Entity users" },
          {
            p: "Employees and entity admins sign in with a one-time code by email. Each entity can also allow Google sign-in, or require it. Entity Google sign-in uses `{WEB_APP_URL}/login/google/callback` as the redirect URI and does not use the relay.",
          },
          {
            p: "Karya looks for Google credentials in this order: the entity's own client, then environment variables, then the client saved in Superadmin.",
          },
          {
            note: "For how the shared relay works and what it can and cannot see, read **Google sign-in relay**.",
            tone: "info",
          },
        ],
      },
      {
        ...s(
          "Google sign-in relay",
          "How the shared relay signs superadmins in without your own OAuth client.",
        ),
        body: [
          {
            p: "Google only sends a user back to web addresses registered on an OAuth client. Without help, every Karya installation would need its own Google Cloud project and client before anyone could sign in to Superadmin. The **Google sign-in relay** removes that step: it is a small, separate service run by MittArv that holds one shared Google OAuth client for every installation.",
          },
          {
            p: "The relay is used only for **superadmin** sign-in. Employees and entity admins never pass through it; entity Google sign-in goes straight to Google with a Google client configured in your installation.",
          },
          { h: "How a sign-in works" },
          {
            steps: [
              "A superadmin opens `/superadmin` and chooses **Sign in with Google**.",
              "Karya sends the browser to the relay with two things: the installation's ID and the address to return to, `{SUPERADMIN_APP_URL}/auth/complete`.",
              "The relay checks that this installation is allowed to use that return address, then sends the browser on to Google.",
              "The superadmin signs in on Google's own page. Karya and the relay never see the Google password.",
              "Google returns to the relay, which confirms the Google account and its verified email address.",
              "The relay sends the browser back to your Superadmin with a signed sign-in token that is valid for about 90 seconds.",
              "Your Karya API checks the token's signature against the relay's public keys, confirms it was issued for your Superadmin address, and accepts each token only once. It then signs the superadmin in.",
            ],
          },
          { h: "First sign-in on a new installation" },
          {
            p: "On an installation with no superadmin yet, the first Google account to complete sign-in becomes the **Superadmin owner**. After that, Google sign-in only works for people who are already superadmins. Signing in never grants extra access; permissions come from **Superadmin staff access**.",
          },
          { h: "The return address is locked on first use" },
          {
            p: "The first time an installation signs in through the relay, the relay remembers that installation's return address. Later sign-ins must use exactly the same address: same scheme, host and path. This stops anyone else from using your installation's ID to send sign-ins to a different site.",
          },
          {
            note: "If you move Superadmin to a new address, for example from a test domain to production, sign-in through the relay stops until the old lock is cleared. Ask the relay operator to clear it, or switch to your own Google OAuth client.",
            tone: "warning",
          },
          { h: "What the relay can and cannot see" },
          {
            table: {
              head: ["", "Details"],
              rows: [
                [
                  "Sees",
                  "The Google account's ID, email address, verified status, display name and Google Workspace domain, for the moment it takes to issue the token.",
                ],
                [
                  "Stores",
                  "Only each installation's ID and its locked return address, plus sign-in event logs that record the email address and whether the sign-in succeeded.",
                ],
                [
                  "Never sees",
                  "Google passwords, your database, employee records, or anything inside Karya after sign-in.",
                ],
              ],
            },
          },
          { h: "Built-in protections" },
          {
            list: [
              "Return addresses must use `https://`. Plain `http://` is accepted only for `localhost` during local development.",
              "The request that starts a sign-in expires after 5 minutes.",
              "Sign-in tokens expire after about 90 seconds and are accepted only once.",
              "Each token names the Superadmin address it was issued for, so a token issued for one installation is rejected by every other.",
              "Tokens are signed with the relay's private key. Karya checks them with the public keys the relay publishes, so no shared secret is ever copied into your installation.",
              "Both relay endpoints are rate-limited per IP address.",
            ],
          },
          { h: "Using your own Google client instead" },
          {
            p: "You do not have to use the relay. Register your own Google OAuth client and enter it under **Security and access → Google Sign-in**, or set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. Superadmin sign-in then goes straight to Google and the relay is not involved. If your own client's settings ever become unreadable, Karya falls back to the relay so you are not locked out.",
          },
          {
            p: "To point an installation at a different relay, set `GOOGLE_AUTH_RELAY_URL`, and `GOOGLE_AUTH_RELAY_ISSUER_URL` if the token issuer differs. See **Environment configuration**.",
          },
        ],
      },
      {
        ...s("Upgrading", "Move an installation to a newer version safely."),
        body: [
          {
            note: "Karya does not publish versioned releases or upgrade notes. Upgrades follow the repository's default branch. Read the commit history before upgrading and test on a staging copy first.",
            tone: "warning",
          },
          { h: "Upgrade steps" },
          {
            steps: [
              "Back up the database, uploaded files and environment configuration. See Backups.",
              "Fetch the new code, or pull the new images.",
              "Rebuild: `pnpm install --frozen-lockfile && pnpm build`, or rebuild the Docker images.",
              "Apply migrations: `pnpm db:deploy`, or run the `hrms-api-migrate` image.",
              "Restart the API and reload the web apps.",
              "Check `GET /api/v1/health/ready` and sign in to Superadmin and one entity.",
            ],
          },
          { h: "About migrations" },
          {
            p: "Migrations are managed with Prisma and run forward only. Use `pnpm db:deploy` (`prisma migrate deploy`) in production; `pnpm db:migrate` is for development and needs a shadow database. If the API starts before migrations are applied, it pauses email delivery and logs a message asking you to migrate and restart.",
          },
        ],
      },
      {
        ...s("Backups", "Protect and restore your Karya data."),
        body: [
          {
            p: "Karya has no built-in backup tool. Back up these three things on a schedule and keep copies off the server.",
          },
          {
            table: {
              head: ["What", "Why", "How"],
              rows: [
                [
                  "MySQL database",
                  "All HR records, settings and audit logs",
                  "`mysqldump` or your database service's snapshots",
                ],
                [
                  "Uploaded files",
                  "Logos, employee documents and receipts",
                  "Copy `UPLOAD_ROOT`, or enable versioning on your bucket",
                ],
                [
                  "Environment secrets",
                  "Especially `JWT_SECRET`, which stored secrets depend on",
                  "Your secret manager",
                ],
              ],
            },
          },
          {
            code: `mysqldump --single-transaction --routines --triggers \\
  -h <host> -u <user> -p <database> > karya-$(date +%F).sql`,
            title: "Example database backup",
          },
          { h: "Restore" },
          {
            steps: [
              "Stop the API.",
              "Restore the database dump into an empty database.",
              "Restore uploaded files to the same path or bucket.",
              "Start the API with the same `JWT_SECRET` as when the backup was taken.",
              "Run `pnpm db:deploy` if you restored into a newer version of Karya.",
            ],
          },
          { h: "Data that Karya removes on its own" },
          {
            list: [
              "Audit log entries older than the entity's retention setting (1, 2 or 3 years).",
              "Sent email records after 30 days, and read in-app notifications after 180 days.",
              "Everything belonging to an entity when a superadmin deletes the entity. This cannot be undone.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Core Concepts",
    pages: [
      {
        ...s(
          "Organization vs legal entity",
          "How Karya models the organization, entities and legal entities.",
        ),
        body: [
          {
            p: "Karya separates three ideas that other systems often merge into one.",
          },
          {
            table: {
              head: ["Concept", "What it is", "Managed in"],
              rows: [
                [
                  "Organization",
                  "The whole installation, with shared branding, structure, holiday calendars and default policies",
                  "Superadmin",
                ],
                [
                  "Entity",
                  "A company or business unit with its own workspace, people, leave, salary and reimbursement settings",
                  "Created in Superadmin, run from the entity workspace",
                ],
                [
                  "Legal entity",
                  "A statutory registration inside an entity, assigned to employees with an effective date",
                  "Entity workspace (employee profile)",
                ],
              ],
            },
          },
          { h: "Entities" },
          {
            p: "Superadmins add entities from **Entities → Add entity**. Each entity has a name, optional logo, attached holiday calendars, allowed sign-in methods and exactly one entity admin. An entity can be suspended, which blocks sign-in while keeping its data, or deleted permanently after typing its name to confirm.",
          },
          {
            p: "Inside the workspace, **Admin → Entity** holds the entity profile: legal name, addresses (registered office, headquarters, corporate address), industry, website, time zone, currency, tax identifiers and fiscal year start.",
          },
          { h: "Legal entities" },
          {
            p: "An entity can have several legal entities, for example one per registered company. Employees are assigned to a legal entity with an effective date from the **Legal entity** field on their profile.",
          },
          {
            note: "The Compliance screen that manages legal entities, statutory schemes and filings is turned off in the current release. These records can be managed through the API.",
          },
        ],
      },
      {
        ...s("Superadmin", "Administer the whole installation."),
        body: [
          {
            p: "The Superadmin app at `/superadmin` manages everything shared by the entities in an installation. Superadmins always sign in with Google.",
          },
          {
            table: {
              head: ["Group", "Panel", "Purpose"],
              rows: [
                ["Organization", "Overview", "Summary of the installation"],
                [
                  "Organization",
                  "Entities",
                  "Add, edit, suspend or delete entities and assign their admins",
                ],
                ["Organization", "Brand & appearance", "Organization name and brand colors"],
                [
                  "Workforce setup",
                  "Organization structure",
                  "Departments, job titles, levels and employee types for every entity",
                ],
                [
                  "Workforce setup",
                  "Holiday calendars",
                  "Country holiday calendars attached to entities",
                ],
                ["Workforce setup", "Policies", "Default handbook policies"],
                [
                  "Security and access",
                  "Google Sign-in",
                  "Shared relay or your own Google OAuth client",
                ],
                [
                  "Security and access",
                  "Emails & notifications",
                  "SMTP server, sender and test email",
                ],
                [
                  "Security and access",
                  "Access & permissions",
                  "Superadmin staff and the panels each can use",
                ],
              ],
            },
          },
          { h: "Superadmin staff" },
          {
            p: "The first person to complete setup becomes the **Superadmin owner** and sees every panel. The owner can add administrators from **Access & permissions** and choose the panels each one can use.",
          },
          { h: "Direct sign-in" },
          {
            p: "The owner, and staff with the **Access & permissions** panel, can open any entity with full access using **Direct sign-in** on the Entities page. They act as “Organization Superadmin”, are not added to the employee roster, and their actions are recorded in the entity's Activity Log.",
          },
        ],
      },
      {
        ...s("Departments", "Group job titles and employees."),
        body: [
          {
            p: "Departments are defined once for the whole organization and copied into every entity, including entities added later.",
          },
          { h: "Manage departments" },
          {
            steps: [
              "In Superadmin, open **Workforce setup → Organization structure → Departments**.",
              "Choose **Add department**, enter the department name and status, and save.",
              "Use **Edit**, **Deactivate** or **Delete** on an existing department.",
            ],
          },
          {
            table: {
              head: ["Action", "Effect"],
              rows: [
                [
                  "Deactivate",
                  "Hides the department from new onboarding. Existing records are unchanged.",
                ],
                [
                  "Delete",
                  "Removes the department permanently. Blocked while any current employee or job title uses it.",
                ],
              ],
            },
          },
          {
            p: "Inside an entity, departments are read-only. People with `structure.view` can see them; changes are made in Superadmin.",
          },
        ],
      },
      {
        ...s("Job titles", "Positions that carry access permissions."),
        body: [
          {
            p: "A job title belongs to one department and is copied into every entity. Job titles do two jobs: they describe a person's position, and they carry the permissions that person receives.",
          },
          { h: "Manage job titles" },
          {
            steps: [
              "In Superadmin, open **Workforce setup → Organization structure → Job titles**.",
              "Add a job title with a name (at least 2 characters), a department, an optional description and a status.",
              "Grant permissions to the title inside each entity, from **Admin → Access & Permissions**.",
            ],
          },
          {
            list: [
              "Names must be unique within a department.",
              "A title's department cannot be changed later. Delete the title and add it again in the other department.",
              "A title cannot be deleted while any employee uses it, including former employees.",
              "New titles start with no extra permissions.",
            ],
          },
          {
            note: "A job title whose name contains “HR Admin” automatically receives the HR access set. See Access roles.",
            tone: "warning",
          },
        ],
      },
      {
        ...s("Levels and bands", "Seniority levels for employees."),
        body: [
          {
            p: "Levels describe seniority, for example L1 to L5. They are defined in Superadmin under **Organization structure → Levels** and copied into every entity.",
          },
          {
            table: {
              head: ["Field", "Description"],
              rows: [
                ["Name", "Display name. Must be unique."],
                ["Code", "Short code shown next to the name, for example `L3`. Must be unique."],
                ["Rank", "Ordering from junior to senior."],
                ["Description, Status", "Optional notes and active or inactive."],
              ],
            },
          },
          {
            p: "Employees are given a level when they are onboarded, or later from their profile. A level cannot be deleted while employees use it. Levels are treated as sensitive and are masked by default.",
          },
        ],
      },
      {
        ...s("Employment types", "Full-time, part-time, contract and more."),
        body: [
          {
            p: "Employment types are defined in Superadmin under **Organization structure → Employee types** and copied into every entity. New installations include:",
          },
          {
            table: {
              head: ["Type", "Code"],
              rows: [
                ["Full-time (default)", "FT"],
                ["Part-time", "PT"],
                ["Contract", "CT"],
                ["Intern", "IN"],
              ],
            },
          },
          {
            p: "Each type has a name, code, description and a default flag. The type is chosen when onboarding an employee, and exit notice periods can be overridden per type.",
          },
          {
            note: "Deleting a type does not change employees who already have it; their records keep the type name.",
          },
        ],
      },
      {
        ...s("Access roles", "How Karya decides what each person can do."),
        body: [
          {
            p: "Karya grants access through **job titles**, not through a long list of roles. Every person's access is built from four layers.",
          },
          {
            steps: [
              "**Baseline.** Everyone can use the self-service features: their dashboard, profile, documents, own compensation, own reimbursements, the people directory, policies and announcements.",
              "**Job title.** The permissions granted to the person's job title in **Access & Permissions**.",
              "**HR Admin.** A job title whose name contains “HR Admin” also receives the HR access set, which covers people, structure, leave, attendance, policies, announcements and exit. It never includes the dashboard, audit log, settings, permission management or the entity profile.",
              "**Entity admin.** The entity admin has every permission.",
            ],
          },
          { h: "Roles you will see" },
          {
            table: {
              head: ["Role", "How it is assigned", "Access"],
              rows: [
                [
                  "Entity admin",
                  "Chosen in Superadmin when adding or editing an entity. One per entity.",
                  "Everything in the entity",
                ],
                ["Employee", "Everyone else", "Baseline plus their job title's permissions"],
                [
                  "Organization superadmin",
                  "Superadmin owner, or staff with the **Access & permissions** panel, using **Direct sign-in** on an entity",
                  "Everything in the entity, recorded in the audit log as “Organization Superadmin”",
                ],
              ],
            },
          },
          { h: "Access scope" },
          {
            p: "Each permission applies within a scope: the person's own records, their team (everyone in their reporting line), their department, or the whole entity. Approval and team attendance permissions apply to the person's team; most others apply to the whole entity. Entity admins and HR Admins always see the whole entity.",
          },
        ],
      },
      {
        ...s("Features per role", "What each kind of user sees in the entity workspace."),
        body: [
          {
            p: "The sidebar is built from each person's permissions, so two people with different job titles can see different menus. The table shows typical configurations.",
          },
          {
            table: {
              head: ["Persona", "Sidebar"],
              rows: [
                [
                  "Employee",
                  "Dashboard · Time & Attendance (Attendance & Leave, Holiday Calendar) · Entity & Policies (People, Policies) · Pay & benefits (My Compensation, My Reimbursement)",
                ],
                [
                  "Manager (job title with leave approval)",
                  "Employee items · Management (Leave & Attendance, Approvals)",
                ],
                ["HR Admin", "Employee items · Management (People, Leave & Attendance, Approvals)"],
                [
                  "Finance (job title with salary and reimbursement permissions)",
                  "Employee items · Finance (Salary Structure, Reimbursement) · Admin (Entity)",
                ],
                [
                  "Entity admin",
                  "Overview · Management (People, Leave & Attendance, Approvals) · Finance (Salary Structure, Reimbursement) · Admin (Entity, Access & Permissions, Activity Log, Settings) · Entity & Policies (Policies)",
                ],
              ],
            },
          },
          {
            list: [
              "**My Reimbursement** appears once the entity has at least one reimbursement category.",
              "Personal items such as Time & Attendance and My Compensation only appear for people on the employee roster, so an organization superadmin who signs in directly does not see them.",
              "Every user has **Profile** and **Sign out** in the account menu, and a notification bell.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Guides by Persona",
    pages: [
      {
        ...s("Employee", "Everyday tasks for employees."),
        body: [
          { h: "Sign in" },
          {
            steps: [
              "Open your company's Karya address and choose your entity if asked.",
              "Enter your work email and choose **Continue**.",
              "Enter the 6-digit one-time code from your email. Codes expire after 10 minutes. If your entity uses Google sign-in, use that instead.",
            ],
          },
          { h: "Check in and out" },
          {
            p: "Use **Check In** and **Check Out** on the Dashboard or under **Time & Attendance → Attendance & Leave**. You can check in and out several times a day.",
          },
          { h: "Apply for leave" },
          {
            steps: [
              "Open **Time & Attendance → Attendance & Leave** and choose **Apply for a leave**.",
              "Pick the leave type, start and end dates and duration (full day or half day).",
              "Enter a reason (required, up to 300 characters) and choose **Submit for Approval**.",
            ],
          },
          {
            p: "Weekends and holidays are not counted. You can withdraw a request until its start date. Your balances, leave history, the team leave calendar and comp-off credits are on the same page.",
          },
          { h: "Other tasks" },
          {
            table: {
              head: ["Task", "Where"],
              rows: [
                ["See public and company holidays", "Time & Attendance → Holiday Calendar"],
                ["Read and acknowledge policies", "Entity & Policies → Policies"],
                ["See your CTC and salary breakup", "Pay & benefits → My Compensation"],
                ["Claim an expense", "Pay & benefits → My Reimbursement → New Claim"],
                ["Update personal details, photo and documents", "Account menu → Profile"],
              ],
            },
          },
          {
            note: "Once your profile is complete, changes to personal and statutory details are sent to HR for approval before they take effect.",
          },
        ],
      },
      {
        ...s("Manager", "Approving leave and following your team."),
        body: [
          {
            p: "In Karya, anyone whose job title includes leave or attendance approval can approve requests and can be chosen as a reporting manager.",
          },
          { h: "Approve leave" },
          {
            steps: [
              "Open **Management → Approvals**.",
              "Search by employee name, ID or leave type.",
              "Choose **Approve**, or **Reject** and enter a reason. A reason is required to reject.",
            ],
          },
          {
            p: "The employee is notified either way. Requests outside your access scope cannot be approved.",
          },
          { h: "Follow your team" },
          {
            p: "**Management → Leave & Attendance** shows leave and attendance for the people within your scope. If your job title includes reimbursement review, claims from your team appear under **Finance → Reimbursement**.",
          },
          {
            note: "Approval permissions granted from Access & Permissions apply to the whole entity by default, not only to your direct reports.",
            tone: "warning",
          },
        ],
      },
      {
        ...s("HR", "Running people operations in an entity."),
        body: [
          {
            p: "HR staff usually hold a job title named “HR Admin”, which grants the HR access set automatically. Entity admins can also grant individual HR permissions to other job titles.",
          },
          { h: "Common tasks" },
          {
            table: {
              head: ["Task", "Where"],
              rows: [
                ["Onboard an employee", "Management → People → Onboard Employee"],
                ["Resend or cancel an invitation", "People → Onboarding in progress"],
                ["Edit profiles and verify documents", "People → View → Edit"],
                [
                  "Configure leave types and shifts",
                  "Management → Leave & Attendance → Configuration",
                ],
                [
                  "Record leave on someone's behalf",
                  "Management → Leave & Attendance → Record Leave",
                ],
                ["Adjust leave balances", "Management → Leave & Attendance → Adjust Leave Balance"],
                ["Publish policies and announcements", "Entity & Policies → Policies"],
              ],
            },
          },
          {
            p: "Departments, job titles, levels and employee types are maintained by superadmins. Ask them to add any that are missing.",
          },
        ],
      },
      {
        ...s("Finance", "Salary structures and expense payouts."),
        body: [
          {
            p: "Finance access comes from permissions granted to a job title, typically the salary structure permissions and the reimbursement review, finance approval and disbursement permissions.",
          },
          { h: "Salary structure" },
          {
            p: "Under **Finance → Salary Structure** you maintain salary components, build salary templates and assign or revise each employee's CTC. See the Payroll guide.",
          },
          { h: "Reimbursements" },
          {
            p: "Under **Finance → Reimbursement** you define expense categories and limits, review claims, give second-level finance approval above the threshold, and track payouts until they are marked paid. See the Reimbursements guide.",
          },
        ],
      },
      {
        ...s("Admin", "Setting up and governing an entity."),
        body: [
          {
            p: "Each entity has one entity admin, chosen by a superadmin. The entity admin has every permission in that entity.",
          },
          { h: "First-time setup" },
          {
            steps: [
              "Open **Overview** and follow the **Complete Entity setup** card.",
              "Fill in the entity profile under **Admin → Entity**.",
              "Grant permissions to job titles under **Admin → Access & Permissions**.",
              "Choose which fields are sensitive and add custom employee fields under **Admin → Settings**.",
              "Configure leave types and shifts, then onboard your people.",
            ],
          },
          { h: "Governance" },
          {
            list: [
              "**Activity Log** shows who changed what, with filters by module, feature, action and status. Export up to 5,000 rows as CSV.",
              "Set how long audit entries are kept (1, 2 or 3 years) from the Activity Log retention card.",
              "Sensitive values such as bank account numbers stay masked; revealing one can require a reason and is always logged.",
            ],
          },
          { h: "Superadmin tasks" },
          {
            p: "Organization-wide settings live in Superadmin: entities, branding, departments, job titles, levels, employee types, holiday calendars, default policies, Google sign-in, email, and superadmin staff access.",
          },
        ],
      },
    ],
  },
  {
    title: "Module Guides",
    pages: [
      {
        ...s("People and documents", "The employee directory, profiles and documents."),
        body: [
          { h: "Directory" },
          {
            p: "**People** lists everyone in the entity, with tabs for onboarded employees, onboarding in progress, and exit and offboarding. People without people-management permissions see a read-only directory.",
          },
          { h: "Profiles" },
          {
            p: "An employee profile has Job Details, Personal details (addresses and emergency contact), Identity, Bank details, Statutory details (PAN, UAN, PF and ESIC numbers) and Custom fields, plus a profile completion score.",
          },
          { h: "Sensitive fields" },
          {
            p: "Fields such as tax identifiers, bank account numbers, identity numbers, date of birth and salary amounts are masked by default. People with `people.reveal_sensitive` can reveal them; each field can require a reason, and every reveal is recorded in the Activity Log. Employees can always see their own values.",
          },
          { h: "Cost and revenue centers" },
          {
            p: "Each employee can be assigned one cost center and one revenue center from **Job Details** on their profile, which requires the `centers.assign` permission. Earlier assignments are kept as history.",
          },
          {
            note: "The centers themselves are created and edited through the API (`/api/org/cost-centers` and `/api/org/revenue-centers`).",
            tone: "warning",
          },
          { h: "Documents" },
          {
            table: {
              head: ["Rule", "Detail"],
              rows: [
                [
                  "Types",
                  "Offer letter, Employment contract, ID proof, Address proof, Resume / CV, Education certificate, Experience letter, Salary slip, Tax form, Other",
                ],
                ["Required", "ID proof (with expiry date) and Education certificate"],
                ["Files", "PDF, DOCX, JPG or PNG, 1 KB to 10 MB"],
                ["Statuses", "Pending, Verified, Rejected"],
              ],
            },
          },
          {
            p: "Documents uploaded by employees start as pending until someone with `people.edit` approves or rejects them. Employees can delete only documents they uploaded.",
          },
        ],
      },
      {
        ...s("Onboarding and offboarding", "Bring people in and manage their exit."),
        availability: "partial",
        body: [
          { h: "Onboarding" },
          {
            steps: [
              "Open **Management → People** and choose **Onboard Employee**.",
              "Enter first and last name, employee ID, work email, department and job title. The job title decides the person's access.",
              "Optionally choose a reporting manager, employee type, level and shift. Only people whose job title can approve leave or attendance can be reporting managers.",
              "Choose **Add employee**. The person is added to the roster immediately and receives an invitation by email.",
            ],
          },
          {
            p: "Invitations expire after 7 days and can be resent or cancelled from **Onboarding in progress**. The employee accepts by confirming their name, then signs in with a one-time code.",
          },
          { h: "Offboarding" },
          {
            p: "Exit cases move through a fixed pipeline. HR starts an offboarding, or acknowledges a resignation, and advances the case step by step.",
          },
          {
            table: {
              head: ["Stage", "What happens"],
              rows: [
                [
                  "Acknowledged",
                  "The exit is confirmed and the last working day is calculated from the notice policy.",
                ],
                [
                  "Notice",
                  "The employee serves the notice period. Skipped when no notice applies.",
                ],
                ["Clearance", "Checklist items are completed or waived with a reason."],
                [
                  "Settlement",
                  "Full and final settlement: severance, gratuity, pending salary, leave encashment and deductions.",
                ],
                ["Closed", "The employee is marked exited and can no longer sign in."],
              ],
            },
          },
          {
            note: "Exit management is partially available. Employee self-service resignation and the exit permissions in Access & Permissions are hidden in the current release, and a case cannot be closed while the person still has direct reports, heads a department or is the only admin.",
          },
        ],
      },
      {
        ...s("Attendance and leave", "Check-ins, leave types, approvals and holidays."),
        body: [
          { h: "Attendance" },
          {
            p: "Employees check in and out from the Dashboard or **Attendance & Leave**. Several sessions per day are allowed. Each day gets a status: present, late, half day, on leave, weekly off or holiday.",
          },
          {
            p: "Shifts define start and end times, working days and break minutes, and are configured under **Leave & Attendance → Configuration → Shifts**. Payroll locks freeze attendance for a closed period.",
          },
          { h: "Leave types" },
          {
            table: {
              head: ["Setting", "Description"],
              rows: [
                ["Name, code, description", "How the type appears to employees"],
                ["Paid", "Whether the leave is paid"],
                [
                  "Annual allowance",
                  "0 to 366 days a year, with optional monthly, quarterly or annual accrual",
                ],
                ["Minimum notice", "Days of notice required before the start date"],
                ["Carry forward", "Whether unused days carry over, with an optional maximum"],
                ["Negative balance", "Whether requests may exceed the balance"],
                ["Half day", "Whether half-day requests are allowed"],
              ],
            },
          },
          { h: "Requests and approvals" },
          {
            list: [
              "A reason is required. Requests cannot start in the past or overlap another request.",
              "Weekends and holidays are excluded from the day count.",
              "Approvers act from **Approvals**; rejecting requires a reason.",
              "HR can **Record Leave** on an employee's behalf (approved immediately) and **Adjust Leave Balance** with a note.",
            ],
          },
          { h: "Holiday calendars" },
          {
            p: "Superadmins maintain one calendar per country and year under **Holiday calendars** and attach calendars to each entity. Employees see them under **Holiday Calendar**.",
          },
        ],
      },
      {
        ...s("Payroll", "Salary components, templates and employee CTC."),
        availability: "partial",
        body: [
          { h: "Salary components" },
          {
            p: "Open **Finance → Salary Structure → Components** and choose **Add component**. Each component has a type, a default calculation method and an optional default value.",
          },
          {
            table: {
              head: ["Type", "Meaning"],
              rows: [
                ["Earning", "Paid to the employee. Counts towards CTC."],
                [
                  "Employer contribution",
                  "Paid by the company on the employee's behalf, for example Employer PF. Counts towards CTC.",
                ],
                [
                  "Deduction",
                  "Taken out of pay, for example Professional tax. Does not change CTC.",
                ],
              ],
            },
          },
          {
            table: {
              head: ["Calculation method", "Example"],
              rows: [
                ["Percentage of CTC", "Basic is 50% of CTC"],
                ["Percentage of another component", "HRA is 40% of Basic"],
                ["Fixed amount per year", "Professional tax is 2,400 a year"],
                [
                  "Balance of CTC",
                  "Special allowance receives whatever is left (earnings only, one per template)",
                ],
              ],
            },
          },
          { h: "Salary templates" },
          {
            p: "A template combines components into a reusable breakup. Templates start as drafts. To activate one, its earnings and employer contributions must add up to exactly the CTC. The builder previews the monthly split for any CTC as you edit. A template made only of fixed amounts always produces the same CTC.",
          },
          { h: "Assign or revise CTC" },
          {
            steps: [
              "Open **Employee CTC** and choose **Assign CTC**, or **Revise** on an employee.",
              "Choose an active template and enter the yearly CTC.",
              "Pick the date the CTC starts and, optionally, a reason.",
              "Review the breakup and save. Earlier CTCs stay in the employee's history.",
            ],
          },
          {
            p: "CTC and component amounts are masked for everyone except the employee and people allowed to reveal sensitive data. Employees see their own CTC under **My Compensation**.",
          },
        ],
      },
      {
        ...s("Reimbursements", "Expense claims from submission to payout."),
        body: [
          { h: "Set up categories" },
          {
            p: "Under **Finance → Reimbursement → Categories**, create categories with a policy limit (per claim or per month), whether a receipt is required, whether the amount is taxable, and how to handle claims over the limit: block them or allow them with a flag. You can also set a second-level approval threshold.",
          },
          { h: "Submit a claim" },
          {
            steps: [
              "Open **Pay & benefits → My Reimbursement** and choose **New Claim**.",
              "Pick the category and expense date, enter the amount and a description (3 to 500 characters).",
              "Attach a receipt (PDF, JPG or PNG, up to 10 MB) if the category requires one, and save.",
            ],
          },
          { h: "Review and payout" },
          {
            table: {
              head: ["Step", "Who", "Outcome"],
              rows: [
                [
                  "Review",
                  "Reviewer (`reimbursement.claims.review`)",
                  "Approve, partially approve or reject",
                ],
                [
                  "Finance approval",
                  "Finance (`reimbursement.claims.finance_approve`)",
                  "Required only above the second-level threshold",
                ],
                [
                  "Disbursement",
                  "Payout team (`reimbursement.disbursement.manage`)",
                  "Queue, mark paid or mark failed",
                ],
              ],
            },
          },
          {
            p: "Only draft or submitted claims can be edited, only submitted claims can be withdrawn, and rejected claims can be resubmitted. Duplicate open claims with the same category, date and amount are refused.",
          },
        ],
      },
      {
        ...s("Compliance and filing", "Legal entities, statutory schemes and filing records."),
        availability: "partial",
        body: [
          {
            note: "The Compliance screen is turned off in the current release. The records below exist in the API, and the only visible part is the **Legal entity** field on employee profiles.",
          },
          {
            table: {
              head: ["Record", "Purpose"],
              rows: [
                [
                  "Legal entity",
                  "A registered company inside an entity, assigned to employees with an effective date",
                ],
                [
                  "Statutory scheme",
                  "A contribution, threshold contribution, withholding tax or filing-only obligation, with versioned rates. You create schemes such as EPF, ESI or Professional Tax yourself.",
                ],
                ["Filing requirement", "A recurring filing (monthly, quarterly or annual)"],
                ["Filing record", "The status of one filing: pending, filed, overdue or revised"],
              ],
            },
          },
          {
            p: "Statutory identifiers for employees (PAN, UAN, PF and ESIC numbers) are kept on the employee profile and masked by default.",
          },
        ],
      },
      {
        ...s("Requests and helpdesk", "Employee requests and support tickets."),
        availability: "unavailable",
        body: [
          {
            p: "A helpdesk with tickets is not available yet.",
          },
          {
            p: "The only employee request in the current release is a **profile change request**: once a profile is complete, changes to personal or statutory details wait for approval. Approvals are made through the API by people with `people.edit`; there is no approval screen yet.",
          },
        ],
      },
      {
        ...s("Policies", "Handbook policies, acknowledgements and announcements."),
        body: [
          {
            p: "Policies are managed at two levels. Superadmins maintain default handbook policies for the organization under **Workforce setup → Policies**; these are attached to entities and cannot be deleted from inside an entity. Each entity can add its own policies or override a default.",
          },
          { h: "In the entity workspace" },
          {
            table: {
              head: ["Tab", "What you can do"],
              rows: [
                [
                  "Policies",
                  "Add entity policies, mark a policy as an entity override, delete a policy (history is kept)",
                ],
                [
                  "Policy Acknowledgement",
                  "Track who has acknowledged policies and send reminders",
                ],
                [
                  "Announcements",
                  "Publish announcements to everyone or a targeted audience, optionally scheduled",
                ],
              ],
            },
          },
          {
            p: "Employees read policies and announcements under **Entity & Policies → Policies**. Policies that require acknowledgement are also sent by email.",
          },
        ],
      },
      {
        ...s("Recognition", "Kudos, nominations and awards."),
        availability: "unavailable",
        body: [
          {
            p: "Recognition is not available yet. A rewards module for nominations, voting and winners is planned but not included in the current release.",
          },
        ],
      },
    ],
  },
  {
    title: "Customization",
    pages: [
      {
        ...s("Custom fields", "Capture extra information on employee profiles."),
        body: [
          {
            steps: [
              "Open **Admin → Settings** and find **Custom employee fields**.",
              "Choose **Add custom field**.",
              "Enter a field key (a stable identifier) and a label, and choose whether the field is sensitive by default.",
              "Choose **Create field**. The field appears in the Custom fields section of every profile in the entity.",
            ],
          },
          {
            list: [
              "Custom fields hold free text.",
              "Creating and deleting fields requires `sensitivity.manage`; editing values on a profile requires `people.edit`.",
              "Sensitive custom fields follow the same masking and reveal rules as built-in sensitive fields.",
            ],
          },
        ],
      },
      {
        ...s("Page customization", "Branding and appearance."),
        availability: "partial",
        body: [
          {
            p: "You can change the organization's branding and each entity's logo.",
          },
          { h: "Branding" },
          {
            p: "In Superadmin, **Brand & appearance** sets the organization name and brand colors: choose a theme preset or customize the primary, secondary, accent and surface colors, with a live preview. The colors apply to every entity.",
          },
          { h: "Entity logo" },
          {
            p: "Upload a logo when adding an entity in Superadmin, or later from the entity profile. The sidebar shows the logo, or the entity's initials when there is none.",
          },
        ],
      },
      {
        ...s("Roles and permissions", "Grant permissions to job titles."),
        body: [
          { h: "Grant permissions" },
          {
            steps: [
              "Open **Admin → Access & Permissions**. You need `roles.manage`.",
              "Search for a job title and select it.",
              "Turn permissions on or off. Use **Copy permissions from…** to start from another title, or **Select all** and **Clear all**.",
              "Choose **Save changes**. The change applies to everyone with that title and is recorded in the Activity Log.",
            ],
          },
          { h: "Permission reference" },
          {
            table: {
              head: ["Area", "Permissions"],
              rows: [
                [
                  "People",
                  "View Directory, Invite & Add Staff, Edit Profiles, View Sensitive Info, View / Upload / Delete Documents",
                ],
                ["Structure", "View Structure, Manage Structure"],
                [
                  "Centers",
                  "Manage Cost Centers, Manage Revenue Centers, Assign Centers, Cost Center Reports, Revenue Reports",
                ],
                [
                  "Leave",
                  "View Leave Records, Apply for Team, Edit Leave Requests, Cancel Leave, Approve / Reject Leave, Adjust Leave Quota, Export Leave Data, Override Payroll Lock, Configure Leave Policies",
                ],
                [
                  "Policies",
                  "View Policy Handbook, Publish Policies, Configure Policy Rules, Archive Policies, Track Compliance, Send Sign-off Reminders, Export Compliance Logs",
                ],
                [
                  "Announcements",
                  "View, Create, Target Audience, Schedule Posts, Edit, Recall / Delete, View Reach Analytics",
                ],
                [
                  "Salary structure",
                  "View Salary Slabs, Assign Salary to Staff, Manage Salary Components, Manage Salary Templates",
                ],
                [
                  "Reimbursement",
                  "Manage Expense Policies, Review Claims (Level 1), Finance Payout Approval, Process Disbursements, View Expense Reports",
                ],
                [
                  "Administration",
                  "View / Edit Entity Profile, Manage Permissions (UAM), View Activity Log, Export Audit Log, Entity Settings",
                ],
              ],
            },
          },
          {
            p: "Self-service permissions (own profile, documents, compensation, reimbursements) are always on and cannot be removed. Attendance permissions appear only for entities with the attendance module enabled.",
          },
          { h: "Sensitive field settings" },
          {
            p: "Under **Admin → Settings**, choose each field's sensitivity (standard, sensitive or highly sensitive), how it is masked (fully, last four characters, phone, email or first N characters) and whether revealing it requires a reason.",
          },
        ],
      },
    ],
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
            list: [
              "Node.js",
              "Express 5",
              "Prisma 7",
              "MySQL 8",
              "React 19",
              "Vite",
              "Tailwind CSS 4",
            ],
          },
          { p: "A deeper walkthrough of services and modules will be added here." },
          { h: "Repository layout" },
          {
            table: {
              head: ["Path", "Contents"],
              rows: [
                ["`apps/api`", "Express 5 API with Prisma 7 and MySQL, written as ESM TypeScript"],
                ["`apps/web`", "Entity workspace (React 19, Vite, Tailwind CSS 4)"],
                ["`apps/superadmin`", "Superadmin app, built with base path `/superadmin/`"],
                ["`packages/types`", "Wire types shared by the API and both apps"],
                ["`packages/services`", "Shared API client"],
                ["`packages/config`", "Shared TypeScript and Tailwind presets"],
              ],
            },
          },
          { h: "Tenancy" },
          {
            p: "One installation has one `Instance` row (the organization) and many `Organization` rows (entities). Entity-scoped requests carry the entity in the `x-organization-id` header. Middleware loads the caller's membership in that entity, rejects suspended entities and deactivated memberships, and resolves permissions from the role and job title. Every tenant query filters on the entity ID from this context, never from request input.",
          },
          { h: "Request pipeline" },
          {
            steps: [
              "Security headers (helmet) and CORS for the two app origins.",
              "JSON body parsing (3 MB limit) and structured request logging with pino.",
              "Authentication: a bearer JWT (HS256, 7-day lifetime) revocable per user.",
              "Authorization guards such as `requirePermission` and `requireAnyPermission`.",
              "Module routers, whose serializers decide which fields leave the API.",
              "Error handling that hides internal error details from 5xx responses.",
            ],
          },
          { h: "Cross-cutting services" },
          {
            list: [
              "**Audit log**: actor, action, module, before and after values, with sensitive keys redacted.",
              "**Field sensitivity**: per-entity masking rules and audited reveals.",
              "**Notifications**: an in-process outbox that sends email every 10 seconds with retries, safe to run on several replicas.",
              "**Storage**: a driver for local disk or S3-compatible buckets.",
              "**Logging**: secrets, tokens and one-time codes are redacted from logs.",
            ],
          },
        ],
      },
      {
        ...s("API reference", "Conventions and endpoints of the Karya HTTP API."),
        body: [
          {
            note: "There is no published OpenAPI specification. The API serves Karya's own apps and may change between versions.",
          },
          { h: "Conventions" },
          {
            list: [
              "Authenticate with `Authorization: Bearer <token>`.",
              "Send `x-organization-id: <entity id>` on entity-scoped requests.",
              'Successful responses use `{ "success": true, "data": ... }`; errors use `{ "success": false, "message": "..." }` with a matching HTTP status.',
              "Request bodies are JSON (up to 3 MB) except file uploads, which use multipart form data.",
            ],
          },
          { h: "Base paths" },
          {
            table: {
              head: ["Area", "Paths"],
              rows: [
                ["Health", "`/health`, `/api/v1/health`, `/api/v1/health/ready`"],
                ["Setup and sign-in", "`/api/setup`, `/api/auth`, `/api/invites`, `/api/catalog`"],
                [
                  "Superadmin",
                  "`/api/platform`, `/api/platform/organizations`, `/api/platform/staff`, `/api/platform/departments`, `/api/platform/structure`, `/api/platform/holiday-calendars`, `/api/platform/handbook-policies`",
                ],
                [
                  "People and structure",
                  "`/api/org/employees`, `/api/org/departments`, `/api/org/companies`, `/api/org/job-roles`, `/api/org/access-roles`, `/api/org/employee-types`, `/api/org/org-chart`, `/api/org/cost-centers`, `/api/org/revenue-centers`",
                ],
                [
                  "Time and leave",
                  "`/api/org/leave`, `/api/org/attendance`, `/api/org/approvals`, `/api/org/policies`, `/api/org/holiday-calendars`",
                ],
                [
                  "Pay",
                  "`/api/org/payroll/salary-components`, `/salary-templates`, `/compensations`, `/reimbursement-categories`, `/reimbursement-claims`, `/api/org/me/compensation`, `/api/org/me/reimbursement-claims`",
                ],
                [
                  "Governance",
                  "`/api/org/audit-logs`, `/api/org/field-sensitivity`, `/api/org/company-policies`, `/api/org/announcements`, `/api/org/notifications`, `/api/org/exit`",
                ],
                [
                  "Compliance",
                  "`/api/org/legal-entities`, `/api/org/statutory-schemes`, `/api/org/filings`",
                ],
              ],
            },
          },
          { h: "Rate limits" },
          {
            p: "One-time sign-in codes are limited to 5 requests and 10 verification attempts per 15 minutes per IP address, with a 60-second resend cooldown.",
          },
        ],
      },
      {
        ...s("Data model", "How Karya stores its data."),
        body: [
          {
            p: "The schema lives in `apps/api/prisma/schema.prisma`. Every table uses the `hrms_ce_` prefix.",
          },
          {
            table: {
              head: ["Domain", "Main models"],
              rows: [
                [
                  "Installation",
                  "Instance, SetupState, SmtpSettings, GoogleOAuthSettings, InstanceBranding, InstanceStaff",
                ],
                [
                  "Identity and tenancy",
                  "User, Organization (entity), Membership, OrgRole, Invite, LoginOtp",
                ],
                [
                  "Structure",
                  "Department, Designation (job title), SalaryGrade (level), EmployeeType, ShiftType, CostCenter, RevenueCenter, Company",
                ],
                [
                  "People",
                  "EmployeeProfile, EmployeeDocument, EmployeeCustomFieldDefinition, ProfileChangeRequest",
                ],
                [
                  "Time",
                  "LeaveType, LeaveRequest, LeaveBalanceLedger, AttendanceRecord, CompOffCredit, PayrollPeriodLock, HolidayCalendar",
                ],
                [
                  "Pay",
                  "SalaryComponent, SalaryTemplate, EmployeeCompensation, ReimbursementCategory, ReimbursementClaim",
                ],
                ["Compliance", "LegalEntity, StatutoryScheme, FilingRequirement, FilingRecord"],
                ["Exit", "ExitCase, ExitClearanceRun, ExitSettlementCase, ExitNoticePolicy"],
                [
                  "Policies and communication",
                  "CompanyPolicy, HandbookPolicyTemplate, Announcement, Notification, AuditLog",
                ],
              ],
            },
          },
          { h: "Conventions" },
          {
            list: [
              "Primary keys are UUID strings; the audit log uses an auto-increment integer.",
              "Records that others point at, such as job titles, are soft-deleted and reads filter on `deletedAt: null`.",
              "MySQL has no partial unique indexes, so uniqueness among live rows uses a scope column that is rewritten on delete (for example `parentKey` on job titles).",
              "Single-row settings tables use a constant column with a unique index so only one row can exist.",
            ],
          },
        ],
      },
      {
        ...s("Contributing", "Report issues and contribute changes."),
        body: [
          {
            steps: [
              "Read `CONTRIBUTING.md` and the code of conduct in the repository.",
              "Open an issue using the bug report or feature request template, or pick an existing one.",
              "Create a branch, make your change and add tests where they help.",
              "Run `pnpm check`, `pnpm test` and `pnpm build` locally.",
              "Open a pull request with a summary, a test plan (screenshots for UI changes) and notes for reviewers.",
            ],
          },
          {
            p: "Continuous integration checks formatting, linting, types, tests and the production build on every pull request.",
          },
          {
            note: "Report security vulnerabilities privately as described in the repository's `SECURITY.md`, not in a public issue.",
            tone: "warning",
          },
        ],
      },
      {
        ...s("Coding standards", "Conventions every change follows."),
        body: [
          { h: "Rules" },
          {
            list: [
              "Guard every route with a permission check (`requirePermission`). Never branch on a role name, because roles are editable per entity.",
              "Add new permissions to the access catalog in `apps/api/src/lib`.",
              "Return data through the module's serializer, never a raw database record, so field-level rules are applied.",
              "Scope every tenant query by the entity ID from the authenticated context.",
              "Never log or return a secret. Check the logger's redaction list when adding a field that holds one.",
              "Configuration precedence is entity setting, then environment, then installation setting. Environment values are never written to the database.",
              "Avoid nullable columns in unique indexes; MySQL treats NULLs as distinct.",
            ],
          },
          { h: "Tooling" },
          {
            table: {
              head: ["Tool", "Purpose"],
              rows: [
                ["Prettier", "Formatting (100 columns, double quotes, trailing commas)"],
                ["oxlint", "Linting"],
                [
                  "TypeScript 7",
                  "Type checking. Do not add tools that import the compiler as a library.",
                ],
                ["Vitest", "API tests"],
                ["Node test runner (`tsx --test`)", "Web and Superadmin tests"],
              ],
            },
          },
          {
            p: "The API is ESM, so relative imports use `.js` extensions that resolve to `.ts` files. Run `pnpm check` before every commit.",
          },
        ],
      },
    ],
  },
  {
    title: "Reference",
    pages: [
      {
        ...s("Glossary", "Definitions of terms used in Karya."),
        body: [
          {
            table: {
              head: ["Term", "Definition"],
              rows: [
                ["Access scope", "How far a permission reaches: self, team, department or entity."],
                [
                  "Balance of CTC",
                  "A calculation method that gives a component whatever remains of the CTC.",
                ],
                ["Comp-off", "Leave credited for working on a day off."],
                ["CTC", "Cost to company: earnings plus employer contributions, per year."],
                [
                  "Direct sign-in",
                  "A superadmin entering an entity with full access, recorded as Organization Superadmin.",
                ],
                [
                  "Entity",
                  "A company or business unit with its own workspace inside the installation.",
                ],
                ["Entity admin", "The single administrator of an entity."],
                ["Exit case", "The record that tracks one employee's offboarding."],
                ["Job title", "A position in a department; carries access permissions."],
                ["Level", "A seniority level with a code and rank."],
                ["Organization", "The whole Karya installation."],
                ["Payroll lock", "A closed period in which attendance and leave cannot change."],
                [
                  "Reporting manager",
                  "The person an employee reports to; must hold approval permission.",
                ],
                ["Salary template", "Rules that split a CTC into components."],
                ["Sensitive field", "A value that is masked until a permitted user reveals it."],
                ["Superadmin", "An administrator of the whole installation."],
              ],
            },
          },
        ],
      },
      {
        ...s("Changelog", "Release history."),
        body: [
          {
            p: "Karya does not publish versioned releases. Changes land continuously on the repository's default branch, and the commit history is the authoritative record until releases begin.",
          },
          {
            p: "When releases start, this page will follow the Keep a Changelog format: each release lists Added, Changed, Deprecated, Removed, Fixed and Security changes, with upgrade notes for any required migrations.",
          },
        ],
      },
      {
        ...s("Troubleshooting", "Fixes for common problems."),
        body: [
          {
            table: {
              head: ["Problem", "Cause and fix"],
              rows: [
                [
                  "API exits with “Invalid environment configuration”",
                  "A required variable is missing or invalid. Check `DATABASE_URL` and that `JWT_SECRET` has at least 16 characters.",
                ],
                [
                  "`pnpm install` fails while generating the Prisma client",
                  "`apps/api/.env` does not exist yet. Copy `.env.example` first.",
                ],
                [
                  "A dev server will not start",
                  "Its port is in use; the dev servers do not move to another port. Free the port or set `WEB_PORT`, `SUPERADMIN_PORT` or `API_PORT`.",
                ],
                [
                  "`pnpm db:migrate` fails with a shadow database permission error",
                  "The database user needs rights on the Prisma shadow database. The bundled Compose file grants them; for other servers, use `pnpm db:deploy` or grant the rights.",
                ],
                [
                  "“Add entity” is blocked",
                  "SMTP is not configured. Set it in **Emails & notifications** or through environment variables.",
                ],
                [
                  "No sign-in code arrives",
                  "Check SMTP with **Test SMTP**. In development, open Mailpit at `http://localhost:8025`.",
                ],
                [
                  "Too many sign-in attempts",
                  "Code requests and verifications are rate-limited per IP for 15 minutes. Wait and try again.",
                ],
                [
                  "Google sign-in stopped working after a change",
                  "`JWT_SECRET` changed, so the stored Google client secret can no longer be decrypted. Re-enter the client secret or restore the previous `JWT_SECRET`.",
                ],
                [
                  "Emails are not sent and the log asks you to migrate",
                  "Migrations are missing. Run `pnpm db:deploy` and restart the API.",
                ],
                [
                  "A person is missing from the reporting manager list",
                  "Only people whose job title can approve leave or attendance are listed. Grant the permission to their job title.",
                ],
                [
                  "A salary template cannot be activated",
                  "Its earnings and employer contributions must add up to exactly the CTC. Adjust the percentages or amounts, or add a Balance of CTC component.",
                ],
                [
                  "A former employee cannot sign in",
                  "Access ends when their exit case closes. HR can reactivate the employee if needed.",
                ],
              ],
            },
          },
        ],
      },
    ],
  },
];

export const DOC_SECTIONS: DocSection[] = SECTIONS.map((sec) => ({
  ...sec,
  pages: sec.pages.filter((p) => p.availability !== "unavailable"),
})).filter((sec) => sec.pages.length > 0);

export const ALL_DOCS = DOC_SECTIONS.flatMap((sec) =>
  sec.pages.map((p) => ({ ...p, section: sec.title })),
);
export const findDoc = (slug: string) => ALL_DOCS.find((d) => d.slug === slug);
