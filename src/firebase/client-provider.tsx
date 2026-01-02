'use client';

import React from 'react';
import { FirebaseProvider } from './provider';
import { firebaseApp, auth, db as firestore } from './client'; // Use the new client-side entry point

interface FirebaseClientProviderProps {
  children: React.ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
