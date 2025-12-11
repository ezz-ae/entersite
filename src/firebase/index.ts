'use client';

import { getSdks } from '@/firebase/get-sdks';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // getSdks handles the initialization logic.
  // We just re-export its return value.
  return getSdks();
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export { getSdks }; // Export getSdks for direct use if needed.
