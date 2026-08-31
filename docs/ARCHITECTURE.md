# Pakistan Solar Business Platform — Architecture (Phase 1)

## 1. Purpose

Production lead-generation and operations platform for a Pakistani solar
installation company: public marketing site + solar calculator + lead capture,
plus an internal CRM/ops back office (leads → quotations → installations)
behind role-based access control.

This document covers **Phase 1: Project Architecture** only. Phase 2 (MySQL +
Prisma schema) is delivered alongside it in `prisma/schema.prisma` and
`docs/DATABASE.md`, since the two are tightly coupled. Phases 3–14 (auth,
design system, public pages, calculator logic, CRM UI, CMS, SEO, testing,
perf, security audit) are **not** built yet — this is the foundation they sit on.

## 2. Tech stack (as specified)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| UI | React, Tailwind CSS, shadcn/ui, Lucide React |
| Forms/validation | React Hook Form + Zod |
| Motion | Framer Motion (used sparingly — see Phase 4) |
| Charts | Recharts (admin dashboard only) |
| Backend | Next.js Route Handlers (`app/api/**`), TypeScript |
| ORM | Prisma |
| Database | MySQL 8+, InnoDB, utf8mb4 |
| Auth | Session/JWT-based auth + server-enforced RBAC (see §5) |
| Storage | Object storage (S3-compatible) for project images / datasheets, referenced via a `media` table |
| Hosting target | Vercel-style frontend host + managed MySQL + CDN |

## 3. Repository layout
