import type { ProjectData } from '@/lib/types';
import rawProjects from '../../realiste_buildings_raw.json';

function getCityFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        if (pathParts.length > 2 && pathParts[1] === 'cities') {
            const citySlug = pathParts[2];
            const city = citySlug.split('-').pop() || citySlug;
            return city.charAt(0).toUpperCase() + city.slice(1);
        }
    } catch (e) { /* Invalid URL */ }
    return 'Dubai'; // Default
}

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
    const cityAreaMap: { [key: string]: string } = {
        'Dubai': 'Downtown Dubai', 'Abu-dhabi': 'Yas Island', 'Sharjah': 'Aljada',
        'Umm-al-quwain': 'Al Maqta', 'Ras-al-khaimah': 'Al Marjan Island'
    };
    return cityAreaMap[city.toLowerCase()] || city;
}

export const realisteProjects: ProjectData[] = (rawProjects as any[]).map((raw: any): ProjectData => {
    const city = getCityFromUrl(raw.publicUrl);
    const area = getAreaFromCity(city);
    const priceFrom = 500000 + Math.random() * 5000000;
    
    let availability: ProjectData['availability'] = 'Available';
    if (raw.tags?.some((t: any) => t.code === 'sold_out')) {
        availability = 'Sold Out';
    } else if (raw.tags?.some((t: any) => t.code === 'coming_soon' || t.code === 'prelaunch')) {
        availability = 'Coming Soon';
    }

    return {
        id: raw.urlPathSegment || raw.name.toLowerCase().replace(/\s+/g, '-'),
        name: raw.name,
        developer: extractDeveloper(raw.name),
        location: { city, area, mapQuery: `${raw.name}, ${city}` },
        handover: raw.unitsStockUpdatedAt ? { quarter: Math.ceil(new Date(raw.unitsStockUpdatedAt).getMonth() / 3), year: new Date(raw.unitsStockUpdatedAt).getFullYear() } : null,
        description: {
            short: `A premier development named ${raw.name}.`,
            full: `Discover ${raw.name}, a leading project offering unique living experiences in ${city}. With its modern design and strategic location, it represents a prime investment opportunity.`
        },
        features: raw.tags?.map((t: any) => t.name) || [],
        price: {
            from: priceFrom,
            label: `AED ${priceFrom.toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })}`
        },
        availability,
        images: [],
        tags: raw.tags?.map((t:any) => t.code),
        publicUrl: raw.publicUrl,
        unitsStockUpdatedAt: raw.unitsStockUpdatedAt,
    };
});
