# Launch Hardening Checklist

Use this list as the final gate before promoting EntreSite to production.

## 1. Data + Credentials
- [ ] Run `ts-node scripts/migrations/backfill-site-metadata.ts` with `GOOGLE_APPLICATION_CREDENTIALS` pointing at the production service account. Confirm every `site` doc now has `tenantId`, `title`, and `refinerStatus/lastRefinerJobId`.
- [ ] Run `ts-node scripts/smoke/refiner-job-smoke.ts` against the live Firebase project. Verify the smoke job transitions to `done` and the generated site reflects `refiner*` metadata.
- [ ] Populate `.env.production` (and Vercel env vars) with live credentials: Firebase config, SendGrid API key + verified sender, Twilio account/token/number, PayPal live keys + webhook IDs, Ziina keys (if enabled), Vercel token scoped to the correct team/project.

## 2. Worker Deployment
- [ ] Deploy a background worker (Cloud Run, Cloud Functions, etc.) that watches the `jobs` collection and processes `site_refiner` jobs. A reference implementation lives at `scripts/workers/refiner-worker.ts`:
  ```bash
  GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
  TS_NODE_PROJECT=tsconfig.json \
  npx ts-node scripts/workers/refiner-worker.ts
  ```
  - Generates refined content via the AI provider.
  - Writes `steps`, `status`, and `result.artifacts` back to the job doc.
  - Updates the corresponding `sites/{id}` document with `refinerDraftSnapshot`, `refinerDraftHtml`, `lastRefinedAt`, etc.
- [ ] Confirm the worker has IAM access only to the needed collections.

## 3. Firestore Indexes & Rules
- [ ] Create composite indexes for the queries now in use: inventory search, `leads` filtered by `siteId` + tenant, `jobs` ordered by `createdAt`, ads campaigns, etc.
- [ ] Re-run a security regression: an authenticated tenant can only read/write their docs; anonymous users only read public data.

## 4. Monitoring & Rate Limiting
- [ ] Verify structured logging reaches your log store (each `/api/*` route now emits JSON logs with request id, tenant, and provider status).
- [ ] Enable alerting for spikes on leads, AI/Refiner, and payment/webhook endpoints.
- [ ] Ensure rate limiting stays enabled in production (remove/avoid `RATE_LIMIT_DISABLED`).

## 5. End-to-End QA
1. **Site creation:** create a site → save → publish → open `/p/{id}` → submit a lead form with campaign params → confirm the lead appears in the dashboard and campaign conversions increment.
2. **Refiner flow:** run Refiner → watch status changes → open `/builder?...&variant=refined` → apply draft → confirm metadata updates and `/p/{id}?variant=refined` shows the new version.
3. **Messaging:** send a test email + SMS from the dashboards → confirm provider delivery + dashboard status.

Sign off each item (screenshot/log link) before the public launch.
