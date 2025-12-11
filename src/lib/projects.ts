import { realisteProjects } from '@/lib/realiste-projects';
import type { ProjectData } from './types';

// The new Realiste data is now the single source of truth for all projects.
export const allProjects: ProjectData[] = realisteProjects;
