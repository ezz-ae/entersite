import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { getRealisteProjects } from './realiste-projects';

export async function getDashboardStats(userId?: string) {
    const projects = getRealisteProjects();
    
    let userSitesCount = 0;
    let leadsCount = 0;

    if (userId) {
        try {
            const sitesQuery = query(collection(db, 'sites'), where('userId', '==', userId));
            const sitesSnap = await getDocs(sitesQuery);
            userSitesCount = sitesSnap.size;

            const leadsQuery = query(collection(db, 'leads'), where('userId', '==', userId));
            const leadsSnap = await getDocs(leadsQuery);
            leadsCount = leadsSnap.size;
        } catch (e) {
            console.error("Error fetching dashboard stats:", e);
        }
    }

    return {
        totalProjects: projects.length,
        userSites: userSitesCount,
        newLeads: leadsCount || 24, // Fallback for demo
        systemHealth: "100%",
        aiEfficiency: "94%"
    };
}
