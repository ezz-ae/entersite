import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '@/firebase';
import type { SitePage } from './types';

// --- Types ---

export interface Job {
  id?: string;
  userId: string;
  type: 'site_build' | 'ad_campaign' | 'seo_audit' | 'listing_sync';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  data: any;
  result?: any;
  createdAt: any;
  updatedAt: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'developer' | 'agent' | 'admin';
  credits: number;
}

// --- Site Operations ---

export const saveSite = async (userId: string, site: SitePage) => {
  const siteRef = doc(collection(db, 'sites'));
  const siteId = site.id || siteRef.id;
  
  await setDoc(doc(db, 'sites', siteId), {
    ...site,
    userId,
    id: siteId,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return siteId;
};

export const getUserSites = async (userId: string) => {
  const q = query(collection(db, 'sites'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => d.data() as SitePage);
};

// --- Job System (The Engine) ---

/**
 * Creates a job that your Python/Cloud Run workers will pick up.
 * This is the "Fire and Forget" trigger for AI agents.
 */
export const createJob = async (userId: string, type: Job['type'], data: any) => {
  const jobData = {
    userId,
    type,
    status: 'queued',
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  const docRef = await addDoc(collection(db, 'jobs'), jobData);
  return docRef.id;
};

/**
 * Real-time listener for job status updates.
 * Use this in the UI to show progress bars / "AI Thinking" states.
 */
export const subscribeToJob = (jobId: string, callback: (job: Job) => void) => {
  return onSnapshot(doc(db, 'jobs', jobId), (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() } as Job);
    }
  });
};
