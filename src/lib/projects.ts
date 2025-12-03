import { abuDhabiProjects } from '@/data/abudhabi';
import { dubaiProjects } from '@/data/dubai';
import { rasAlKhaimahProjects } from '@/data/rasalkhaimah';
import { sharjahProjects } from '@/data/sharjah';
import type { ProjectData } from './types';

export const allProjects: ProjectData[] = [
  ...dubaiProjects,
  ...abuDhabiProjects,
  ...rasAlKhaimahProjects,
  ...sharjahProjects,
];
