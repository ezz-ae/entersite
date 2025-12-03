import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/firebase';

export interface JobStep {
  name: string;
  status: 'pending' | 'running' | 'done' | 'error';
  result?: string;
  error?: string;
  timestamp: number;
}

export interface Job {
  id: string;
  userId: string;
  type: 'site_generation' | 'ad_campaign' | 'seo_audit';
  status: 'queued' | 'running' | 'done' | 'error';
  plan: {
    flowId: string;
    steps: string[];
    params: Record<string, any>;
  };
  steps: JobStep[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const JOBS_COLLECTION = 'jobs';

export const createJob = async (userId: string, type: Job['type'], params: any) => {
  // Define the steps based on the job type
  let planSteps = ['init'];
  if (type === 'site_generation') {
    planSteps = ['renderBlocks', 'seoGenerate', 'adsGenerate', 'deploy'];
  } else if (type === 'ad_campaign') {
    planSteps = ['analyzeContent', 'generateKeywords', 'createHeadlines', 'budgetOptimization'];
  }

  const jobData = {
    userId,
    type,
    status: 'queued',
    plan: {
      flowId: `${type}-flow`,
      steps: planSteps,
      params
    },
    steps: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, JOBS_COLLECTION), jobData);
    return { id: docRef.id, ...jobData };
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const getJobs = async () => {
  try {
    const q = query(collection(db, JOBS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

// Mock function to simulate backend processing
export const processJob = async (jobId: string) => {
  // In a real app, this would be a Cloud Function trigger
  console.log(`Processing job ${jobId}...`);
  
  try {
    const jobRef = doc(db, JOBS_COLLECTION, jobId);
    
    // 1. Set to Running
    await updateDoc(jobRef, { 
      status: 'running',
      updatedAt: serverTimestamp() 
    });

    // 2. Simulate Steps
    // We would loop through plan.steps here. For the prototype, we'll just add a mock step.
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await updateDoc(jobRef, {
      steps: [{
        name: 'renderBlocks',
        status: 'done',
        result: 'Blocks rendered successfully',
        timestamp: Date.now()
      }],
      updatedAt: serverTimestamp()
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Set to Done
    await updateDoc(jobRef, { 
      status: 'done', 
      updatedAt: serverTimestamp() 
    });

  } catch (error) {
    console.error("Error processing job:", error);
  }
};
