// This service acts as the "Asset Purification Agent"
// In production, this would be a cloud function running Python/Playwright

export interface ProjectAssets {
    heroImages: string[];
    galleryImages: string[];
    floorPlans: string[];
    brochureUrl?: string;
    videoUrl?: string;
    logoUrl?: string;
    developerName?: string; // Normalized developer name
}

const PORTAL_DOMAINS = ['bayut.com', 'propertyfinder.ae', 'dubizzle.com'];

// Clean placeholders for demo purposes (representing the "Official Developer Assets")
const CLEAN_ASSETS: Record<string, ProjectAssets> = {
    'emaar': {
        heroImages: ['https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=2000'], 
        galleryImages: [
            'https://images.unsplash.com/photo-1582407947304-fd86f028f3a6?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800'
        ],
        floorPlans: ['https://images.adsttc.com/media/images/5e5e/34c7/6ee6/7e3b/0900/017c/large_jpg/02_Floor_Plan.jpg'],
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Emaar_Properties_logo.svg/2560px-Emaar_Properties_logo.svg.png',
        developerName: 'Emaar Properties'
    },
    'damac': {
        heroImages: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000'],
        galleryImages: ['https://images.unsplash.com/photo-1600596542815-275084988866?auto=format&fit=crop&q=80&w=800'],
        floorPlans: [],
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Damac_Properties_Logo.jpg/1200px-Damac_Properties_Logo.jpg',
        developerName: 'Damac Properties'
    }
};

export const verifyAndFetchAssets = async (projectName: string, currentImages: string[] = []): Promise<ProjectAssets> => {
    // 1. Check for Watermarks / Portal Links
    const hasWatermark = currentImages.some(url => PORTAL_DOMAINS.some(domain => url.includes(domain)));
    
    // 2. Extract Developer Name from Project Title if missing
    let developer = "Unknown Developer";
    const lowerName = projectName.toLowerCase();
    
    if (lowerName.includes('emaar')) developer = 'emaar';
    else if (lowerName.includes('damac')) developer = 'damac';
    else if (lowerName.includes('sobha')) developer = 'sobha';

    // 3. If watermarked or known developer, fetch "Official" assets
    if (hasWatermark || CLEAN_ASSETS[developer]) {
        // console.log(`Purifying assets for ${projectName}...`);
        // Simulate fetching from official source
        return CLEAN_ASSETS[developer] || CLEAN_ASSETS['emaar']; // Fallback to Emaar for demo
    }

    // 4. If no issues, return existing (or generic if empty)
    if (currentImages.length > 0) {
        return {
            heroImages: [currentImages[0]],
            galleryImages: currentImages.slice(1),
            floorPlans: [],
            developerName: developer
        };
    }

    // Default fallback
    return {
        heroImages: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000'],
        galleryImages: [],
        floorPlans: [],
        developerName: developer
    };
};
