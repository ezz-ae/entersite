import type { ProjectData } from '@/lib/types';
import rawProjects from '../../realiste_buildings_raw.json';

function transformUrlPath(segment: string) {
    if (!segment) return 'dubai'; // Default city
    const parts = segment.split('_');
    if (parts.length > 1 && parts[0].includes('-')) {
        return parts[0].split('-')[1];
    }
    return 'dubai'; // Fallback
}

function getCityFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        // URL format: /cities/uae-dubai/projects/...
        if (pathParts.length > 2 && pathParts[1] === 'cities') {
            const citySlug = pathParts[2];
            // Convert 'uae-dubai' to 'Dubai'
            const city = citySlug.split('-').pop() || citySlug;
            return city.charAt(0).toUpperCase() + city.slice(1);
        }
    } catch (e) {
        // Invalid URL
    }
    return 'Dubai'; // Default
}

// A simple function to extract a developer name from the project name if it exists
// This is a placeholder for a more sophisticated NLP model or rule engine.
function extractDeveloper(projectName: string): string {
    const developers = ['Emaar', 'Damac', 'Sobha', 'Nakheel', 'Meraas', 'Azizi', 'Aldar', 'Reportage', 'Tiger'];
    const lowerProjectName = projectName.toLowerCase();
    for (const dev of developers) {
        if (lowerProjectName.includes(dev.toLowerCase())) {
            return dev;
        }
    }
    return 'Unknown Developer';
}

export const realisteProjects: ProjectData[] = rawProjects.map((raw: any) => ({
    id: raw.urlPathSegment || raw.name.toLowerCase().replace(/ /g, '-'),
    name: raw.name,
    developer: extractDeveloper(raw.name),
    location: {
        city: getCityFromUrl(raw.publicUrl),
        area: raw.name, // The raw data doesn't have a clear 'area', so using name as a placeholder
        mapQuery: `${raw.name}, ${getCityFromUrl(raw.publicUrl)}`
    },
    launchYear: 2024, // Placeholder
    deliveryYear: raw.unitsStockUpdatedAt ? new Date(raw.unitsStockUpdatedAt).getFullYear() : 2026,
    description: {
        short: `A premier development named ${raw.name}.`,
        full: `Discover ${raw.name}, a leading project offering unique living experiences. With its modern design and strategic location, it represents a prime investment opportunity.`
    },
    features: ['Modern Architecture', 'Prime Location'], // Placeholder
    price: {
        from: 500000 + Math.random() * 5000000, // Placeholder price
        label: 'AED ' + (500000 + Math.random() * 5000000).toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })
    },
    availability: raw.tags?.some((t: any) => t.code === 'sold_out') ? 'Sold Out' : 'Available',
    images: [] // To be populated by media-scraper
}));
