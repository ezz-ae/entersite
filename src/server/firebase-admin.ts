import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

function resolveCredential() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (privateKey && clientEmail && projectId) {
    return cert({
      clientEmail,
      privateKey,
      projectId,
    });
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      return cert(parsed);
    } catch (error) {
      console.warn('[firebase-admin] Invalid FIREBASE_SERVICE_ACCOUNT_JSON', error);
    }
  }

  return applicationDefault();
}

function initAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: resolveCredential(),
    });
  }
}

export function getAdminDb() {
  initAdmin();
  return getFirestore();
}

export function getAdminAuth() {
  initAdmin();
  return getAuth();
}
