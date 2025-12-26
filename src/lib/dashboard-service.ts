import { getRealisteProjects } from './realiste-projects';

export function getDashboardStats() {
    const projects = getRealisteProjects();
    return {
        totalProjects: projects.length,
        newLeads: 12, // Placeholder
    };
}