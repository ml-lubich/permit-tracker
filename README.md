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
- [Permit lifecycle (state)](#permit-lifecycle-state)
- [Notification scheduler (algorithm)](#notification-scheduler-algorithm)
- [Getting Started](#getting-started)

## Permit lifecycle (state)

```mermaid
stateDiagram-v2
    [*] --> ACTIVE: permit added
    ACTIVE --> EXPIRING_30: 30 days out
    EXPIRING_30 --> EXPIRING_14: 14 days out
    EXPIRING_14 --> EXPIRING_7: 7 days out
    EXPIRING_7 --> EXPIRED: deadline passed
    EXPIRING_30 --> RENEWED: renewal filed
    EXPIRING_14 --> RENEWED
    EXPIRING_7 --> RENEWED
    EXPIRED --> RENEWED: late renewal
    RENEWED --> ACTIVE
    EXPIRED --> [*]
```

## Notification scheduler (algorithm)

```mermaid
flowchart LR
    A([cron tick / hourly])
    B["SELECT permits<br/>WHERE expiry within window"]
    C{"30 / 14 / 7 day?"}
    D["build email body"]
    E["build SMS body"]
    F["send email"]
    G["send SMS"]
    H["insert notifications row"]
    I{"expired now?"}
    J["mark EXPIRED"]
    Z([end tick])
    A --> B --> C
    C -- match --> D --> F --> H
    C -- match --> E --> G --> H
    C -- none --> I
    H --> I
    I -- yes --> J --> Z
    I -- no  --> Z
```

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
