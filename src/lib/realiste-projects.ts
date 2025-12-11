import type { ProjectData } from '@/lib/types';
import rawProjects from '../../realiste_buildings_raw.json';

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

function getAreaFromCity(city: string): string {
    // Simple mapping for demonstration. A real app might use a more complex geo-database.
    const cityAreaMap: { [key: string]: string } = {
        'Dubai': 'Downtown Dubai',
        'Abu-dhabi': 'Yas Island',
        'Sharjah': 'Aljada',
        'Umm-al-quwain': 'Al Maqta',
        'Ras-al-khaimah': 'Al Marjan Island'
    };
    return cityAreaMap[city] || city;
}

export const realisteProjects: ProjectData[] = rawProjects.map((raw: any) => {
    const city = getCityFromUrl(raw.publicUrl);
    const area = getAreaFromCity(city);
    return {
        id: raw.urlPathSegment || raw.name.toLowerCase().replace(/ /g, '-'),
        name: raw.name,
        developer: extractDeveloper(raw.name),
        location: {
            city: city,
            area: area,
            mapQuery: `${raw.name}, ${city}`
        },
        launchYear: 2024, // Placeholder
        deliveryYear: raw.unitsStockUpdatedAt ? new Date(raw.unitsStockUpdatedAt).getFullYear() : 2026,
        description: {
            short: `A premier development named ${raw.name}.`,
            full: `Discover ${raw.name}, a leading project offering unique living experiences in ${city}. With its modern design and strategic location, it represents a prime investment opportunity.`
        },
        features: ['Modern Architecture', 'Prime Location', 'High ROI'], // Placeholder
        price: {
            from: 500000 + Math.random() * 5000000, // Placeholder price
            label: 'AED ' + (500000 + Math.random() * 5000000).toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })
        },
        availability: raw.tags?.some((t: any) => t.code === 'sold_out') ? 'Sold Out' : 'Available',
        images: [] // To be populated by media-scraper
    };
});
