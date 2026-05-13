# Permit Tracker

> SaaS for contractors who track permits across multiple jurisdictions.
> Color-coded dashboard, calendar view, smart 30/14/7-day expiration
> alerts, and audit-ready compliance reports — so you never pay another
> $4,200 expired-permit fine.

```mermaid
flowchart LR
    USER[("👤 contractor")]
    LANDING["🌐 / · landing"]
    AUTH{{"🔐 /signup · /login<br/>Supabase Auth"}}
    DASH["📊 /dashboard<br/>permits at a glance"]
    PERMITS["📋 /permits<br/>add · edit · status"]
    CAL["📅 calendar view"]
    NOTIFY["🔔 email + SMS alerts<br/>30 · 14 · 7 days"]
    REPORTS[/"📄 reports · CSV export"/]
    DB[("🗄 Supabase<br/>Postgres")]

    USER --> LANDING --> AUTH --> DASH
    DASH --> PERMITS --> DB
    DASH --> CAL
    DB --> NOTIFY
    DASH --> REPORTS

    classDef io fill:#0e1116,stroke:#2f81f7,stroke-width:1.5px,color:#e6edf3;
    classDef tool fill:#161b22,stroke:#3fb950,stroke-width:1.5px,color:#e6edf3;
    classDef brain fill:#161b22,stroke:#d29922,stroke-width:1.5px,color:#e6edf3;
    classDef out fill:#0e1116,stroke:#a371f7,stroke-width:1.5px,color:#e6edf3;
    class USER,DB io;
    class PERMITS,CAL,NOTIFY,LANDING tool;
    class AUTH,DASH brain;
    class REPORTS out;
```

## Table of contents

- [Stack](#stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)

## Stack

- Next.js 16 + React 19 + Tailwind CSS 4
- Supabase (auth + database)
- Vercel deployment
- TypeScript strict mode

## Architecture

- `/` — Landing page
- `/signup`, `/login` — Auth flows (Supabase)
- `/dashboard` — Color-coded permit dashboard
- `/permits` — Permit list + create/edit
- API routes under `/src/app/api/` for notifications + exports

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
