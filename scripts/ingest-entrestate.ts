import 'dotenv/config';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ENTRESTATE_INVENTORY } from '../src/data/entrestate-inventory';

const app = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(app);

async function ingest() {
  console.log(`Syncing ${ENTRESTATE_INVENTORY.length} Entrestate inventory projects...`);

  const batch = db.batch();

  ENTRESTATE_INVENTORY.forEach((project) => {
    const docRef = db.collection('inventory_projects').doc(project.id);
    batch.set(docRef, {
      ...project,
      source: 'entrestate',
      ingestedAt: new Date().toISOString(),
    }, { merge: true });
  });

  await batch.commit();
  console.log('Inventory sync complete.');
}

if (require.main === module) {
  ingest().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
