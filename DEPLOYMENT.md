# Deployment Guide: EntreSite OS

This guide outlines the steps to deploy the EntreSite platform to a production environment using Firebase App Hosting and Cloud Firestore.

## Prerequisites

1.  **Firebase CLI:** Installed and authenticated (`firebase login`).
2.  **Project ID:** Ensure you have an active Firebase project.
3.  **Service Account:** Download a service account JSON for administrative scripts (ingestion, workers).

## Step 1: Database Setup

### 1.1 Deploy Security Rules and Indexes
Apply the hardened security rules and performance indexes:
```bash
firebase deploy --only firestore
```

### 1.2 Ingest Initial Inventory
Populate the global inventory collection used by the discovery engine:
```bash
npm run ingest
```

### 1.3 Backfill Existing Sites (If upgrading)
If you have existing sites, ensure they have the latest metadata schema:
```bash
npm run migrate:metadata
```

## Step 2: Environment Configuration

Ensure the following environment variables are set in your deployment environment (e.g., Firebase App Hosting dashboard or Vercel):

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_CONFIG` | Stringified JSON of your Firebase Client Config |
| `SENDGRID_API_KEY` | For transactional and marketing emails |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID for SMS |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token for SMS |
| `TWILIO_PHONE_NUMBER` | Your Twilio sender number |
| `PAYPAL_CLIENT_ID` | PayPal REST API Client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal REST API Secret |

## Step 3: Application Deployment

### 3.1 Build & Deploy to Firebase
EntreSite is optimized for Firebase App Hosting.

```bash
# Build the project locally to check for errors
npm run build

# Deploy via Firebase CLI
firebase deploy --only hosting
```

## Step 4: Background Workers

The AI Refiner requires a persistent worker to process jobs. You can run this on Cloud Run or a dedicated VM.

```bash
# Set credentials
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"

# Start the refiner worker
npm run worker:refiner
```

## Step 5: Post-Deployment Verification

1.  **Run Smoke Test:** Verify the job pipeline is functional.
    ```bash
    npm run smoke:refiner
    ```
2.  **Verify Public Routes:** Visit `/p/smoke-test-site` (if created) or any live project to ensure SSR is working.
3.  **Check Analytics:** Confirm lead submissions reach the `tenants/{id}/leads` collection.
