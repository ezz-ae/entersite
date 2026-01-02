# Launch Hardening Checklist

Use this list as the final gate before promoting EntreSite to production.

## 1. Data Ingestion & Migration
- [x] **Initial Data Sync:** Run `npm run ingest` to populate the `inventory_projects` collection. This provides the base listings for the Discovery engine.
- [ ] **Metadata Backfill:** Run `npm run migrate:metadata`. Confirm every `site` doc now has `tenantId`, `title`, and `refinerStatus/lastRefinerJobId`.
- [ ] **Smoke Test:** Run `npm run smoke:refiner` against the target Firebase project. Verify the job transitions to `done` and the site reflects `refiner*` metadata.

## 2. Infrastructure & Security
- [x] **Firestore Rules:** `firestore.rules` updated with ownership and tenant-isolation logic.
- [x] **Firestore Indexes:** `firestore.indexes.json` populated with required composite and collection-group indexes.
- [ ] **Deployment:** Run `firebase deploy --only firestore` to apply security rules and performance indexes.

## 3. Worker Deployment
- [ ] **Refiner Worker:** Deploy the background worker to handle `site_refiner` jobs (e.g., Cloud Run or a persistent VM). 
  ```bash
  # Run the worker
  npm run worker:refiner
  ```
- [ ] **IAM Permissions:** Ensure the service account running the worker has `Cloud Datastore User` and `Firebase Admin` roles.

## 4. Credentials & Environment
- [ ] **Production Env:** Populate `.env.production` or CI/CD secrets (Vercel/App Hosting):
    - `NEXT_PUBLIC_FIREBASE_CONFIG`: Client SDK config.
    - `SENDGRID_API_KEY`: For email notifications.
    - `TWILIO_ACCOUNT_SID/AUTH_TOKEN/NUMBER`: For SMS marketing.
    - `PAYPAL_CLIENT_ID/SECRET`: For billing and subscriptions.
    - `GOOGLE_APPLICATION_CREDENTIALS`: Path to the production Service Account JSON.

## 5. End-to-End QA
1. **Site creation:** Create a site → save → publish → open `/p/{id}` → submit a lead form → confirm the lead appears in the dashboard.
2. **Refiner flow:** Run Refiner → watch status changes → open `/builder?...&variant=refined` → apply draft → confirm metadata updates.
3. **Messaging:** Send a test email + SMS from the dashboards → confirm provider delivery.

Sign off each item before the public launch.
