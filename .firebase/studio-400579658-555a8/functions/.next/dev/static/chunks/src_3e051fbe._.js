(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/project-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDevelopers",
    ()=>getDevelopers,
    "getLocations",
    ()=>getLocations,
    "searchProjects",
    ()=>searchProjects
]);
const DEFAULT_LIMIT = 24;
const searchProjects = async (query, filters)=>{
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (filters?.city) params.set('city', filters.city);
    if (filters?.developer) params.set('developer', filters.developer);
    if (filters?.availability) params.set('status', filters.availability);
    if (filters?.minPrice) params.set('minPrice', String(filters.minPrice));
    if (filters?.maxPrice) params.set('maxPrice', String(filters.maxPrice));
    params.set('limit', String(DEFAULT_LIMIT));
    const res = await fetch(`/api/projects/search?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    if (!res.ok) {
        throw new Error('Failed to search projects');
    }
    const data = await res.json();
    return data.data || [];
};
const getDevelopers = async ()=>{
    const res = await fetch('/api/projects/meta', {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.developers || [];
};
const getLocations = async ()=>{
    const res = await fetch('/api/projects/meta', {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.locations || [];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/media-scraper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This service acts as the "Asset Purification Agent"
// In production, this would be a cloud function running Python/Playwright
__turbopack_context__.s([
    "verifyAndFetchAssets",
    ()=>verifyAndFetchAssets
]);
const PORTAL_DOMAINS = [
    'bayut.com',
    'propertyfinder.ae',
    'dubizzle.com'
];
// System assets representing "Official Developer Media"
const SYSTEM_ASSETS = {
    'emaar': {
        heroImages: [
            'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa'
        ],
        galleryImages: [
            'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa'
        ],
        floorPlans: [
            'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0'
        ],
        logoUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0',
        developerName: 'Emaar Properties'
    },
    'damac': {
        heroImages: [
            'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa'
        ],
        galleryImages: [
            'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa'
        ],
        floorPlans: [],
        logoUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0',
        developerName: 'Damac Properties'
    }
};
const verifyAndFetchAssets = async (projectName, currentImages = [])=>{
    // 1. Check for Watermarks / Portal Links
    const hasWatermark = currentImages.some((url)=>PORTAL_DOMAINS.some((domain)=>url.includes(domain)));
    // 2. Extract Developer Name from Project Title if missing
    let developer = "emaar";
    const lowerName = projectName.toLowerCase();
    if (lowerName.includes('emaar')) developer = 'emaar';
    else if (lowerName.includes('damac')) developer = 'damac';
    else if (lowerName.includes('sobha')) developer = 'sobha';
    // 3. If watermarked or known developer, fetch system-verified assets
    if (hasWatermark || SYSTEM_ASSETS[developer]) {
        return SYSTEM_ASSETS[developer] || SYSTEM_ASSETS['emaar'];
    }
    // 4. If no issues, return existing
    if (currentImages.length > 0) {
        return {
            heroImages: [
                currentImages[0]
            ],
            galleryImages: currentImages.slice(1),
            floorPlans: [],
            developerName: developer.toUpperCase()
        };
    }
    // Default system fallback
    return SYSTEM_ASSETS['emaar'];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/leads.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureLead",
    ()=>captureLead
]);
'use client';
async function captureLead(payload) {
    const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        throw new Error('Failed to capture lead');
    }
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/images.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Centralized registry of high-quality, stable Unsplash images for Real Estate
// These IDs are selected for their premium look and reliability.
__turbopack_context__.s([
    "SAFE_IMAGES",
    ()=>SAFE_IMAGES,
    "getRandomImage",
    ()=>getRandomImage
]);
const SAFE_IMAGES = {
    hero: [
        "https://images.unsplash.com/photo-1600596542815-275084988866?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
    ],
    interiors: [
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1556912173-3db9963f6f27?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200"
    ],
    commercial: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
    ],
    avatars: [
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    ],
    logos: {
        emaar: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Emaar_Properties_logo.svg/2560px-Emaar_Properties_logo.svg.png",
        damac: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Damac_Properties_Logo.jpg/1200px-Damac_Properties_Logo.jpg",
        nakheel: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Nakheel_Logo.svg/1200px-Nakheel_Logo.svg.png"
    },
    floorplans: [
        "https://images.adsttc.com/media/images/5e5e/34c7/6ee6/7e3b/0900/017c/large_jpg/02_Floor_Plan.jpg"
    ]
};
const getRandomImage = (category)=>{
    const images = SAFE_IMAGES[category];
    // @ts-ignore
    return images[Math.floor(Math.random() * images.length)];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth-fetch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorizedFetch",
    ()=>authorizedFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/firebase/index.ts [app-client] (ecmascript) <locals>");
;
async function authorizedFetch(input, init = {}) {
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["auth"].currentUser;
    if (!user) {
        throw new Error('Authentication required');
    }
    const token = await user.getIdToken();
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, {
        ...init,
        headers
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/publish-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPublishedSite",
    ()=>getPublishedSite,
    "publishSite",
    ()=>publishSite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/firebase/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>");
;
;
;
const publishSite = async (page, ownerUid)=>{
    const siteId = page.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(10);
    const siteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'sites', siteId);
    // Create a subdomain friendly slug from title
    const slug = page.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 30);
    const siteData = {
        ...page,
        id: siteId,
        ownerUid: ownerUid || page.ownerUid || 'anonymous',
        tenantId: page.tenantId || 'public',
        published: true,
        slug,
        updatedAt: new Date().toISOString()
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(siteRef, {
        ...siteData,
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    }, {
        merge: true
    });
    const isDev = ("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.hostname === 'localhost';
    const rootDomain = isDev ? 'localhost:3000' : 'entrestate.com';
    // Real subdomain logic would require wildcard DNS + middleware, 
    // for this prototype we'll use the [siteId] path but label it as subdomain in UI
    const publishedUrl = isDev ? `http://${slug}.site.${rootDomain}/p/${siteId}` : `https://${slug}.site.${rootDomain}/p/${siteId}`;
    return {
        siteId,
        publishedUrl: `https://${slug}.site.entrestate.com` // Final display URL
    };
};
const getPublishedSite = async (siteId)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'sites', siteId);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching published site:", error);
        return null;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firestore-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createJob",
    ()=>createJob,
    "getUserSites",
    ()=>getUserSites,
    "saveSite",
    ()=>saveSite,
    "subscribeToJob",
    ()=>subscribeToJob,
    "updateSiteMetadata",
    ()=>updateSiteMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/firebase/index.ts [app-client] (ecmascript) <locals>");
;
;
const saveSite = async (ownerUid, site)=>{
    const siteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'sites'));
    const siteId = site.id || siteRef.id;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'sites', siteId), {
        ...site,
        ownerUid,
        tenantId: site.tenantId || 'public',
        id: siteId,
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
        createdAt: site.createdAt || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    }, {
        merge: true
    });
    return siteId;
};
const updateSiteMetadata = async (siteId, data)=>{
    if (!siteId) {
        throw new Error('Site ID is required to update metadata.');
    }
    const updates = {};
    Object.entries(data).forEach(([key, value])=>{
        if (value !== undefined) {
            updates[key] = value;
        }
    });
    if (Object.keys(updates).length === 0) {
        return;
    }
    updates.updatedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'sites', siteId), updates, {
        merge: true
    });
};
const getUserSites = async (ownerUid)=>{
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'sites'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('ownerUid', '==', ownerUid));
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
    return snapshot.docs.map((d)=>d.data());
};
const createJob = async (ownerUid, type, data)=>{
    const jobData = {
        ownerUid,
        type,
        status: 'queued',
        data,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    };
    const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'jobs'), jobData);
    return docRef.id;
};
const subscribeToJob = (jobId, callback)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'jobs', jobId), (doc)=>{
        if (doc.exists()) {
            callback({
                id: doc.id,
                ...doc.data()
            });
        }
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/onboarding-blueprints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLUEPRINT_TEMPLATES",
    ()=>BLUEPRINT_TEMPLATES,
    "getBlueprintTemplate",
    ()=>getBlueprintTemplate
]);
const baseTimestamp = ()=>({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
const id = (prefix)=>`${prefix}-${Math.random().toString(36).slice(2, 8)}`;
const HERO_BLOCK = (title, subtitle)=>({
        blockId: id('hero'),
        type: 'hero',
        order: 0,
        data: {
            headline: title,
            subtext: subtitle,
            ctaText: 'Request Access'
        }
    });
_c = HERO_BLOCK;
const BLUEPRINT_TEMPLATES = {
    portfolio: {
        id: '',
        title: 'Agent Portfolio',
        blocks: [
            HERO_BLOCK('Your Dubai Real Estate Partner', 'Showcase experience, listings, and proof'),
            {
                blockId: id('stats'),
                type: 'stats',
                order: 1,
                data: {
                    headline: 'Trusted by investors globally.'
                }
            },
            {
                blockId: id('listing'),
                type: 'listing-grid',
                order: 2,
                data: {
                    headline: 'Featured Listings',
                    subtext: 'Curated opportunities.'
                }
            },
            {
                blockId: id('cta'),
                type: 'cta-form',
                order: 3,
                data: {
                    headline: 'Book a Consultation'
                }
            }
        ],
        canonicalListings: [],
        brochureUrl: '',
        seo: {
            title: 'Agent Portfolio',
            description: 'Personal agent site',
            keywords: []
        },
        ...baseTimestamp()
    },
    launch: {
        id: '',
        title: 'Launch Blueprint',
        blocks: [
            HERO_BLOCK('Project Launch', 'Countdown + offer summary'),
            {
                blockId: id('timeline'),
                type: 'launch',
                order: 1,
                data: {
                    headline: 'Launch Timeline'
                }
            },
            {
                blockId: id('payment'),
                type: 'payment-plan',
                order: 2,
                data: {
                    headline: 'Payment Plan'
                }
            },
            {
                blockId: id('floor'),
                type: 'floor-plan',
                order: 3,
                data: {
                    headline: 'Floor Plans'
                }
            },
            {
                blockId: id('cta'),
                type: 'cta-form',
                order: 4,
                data: {
                    headline: 'Download Brochure'
                }
            }
        ],
        canonicalListings: [],
        brochureUrl: '',
        seo: {
            title: 'Project Launch',
            description: 'Launch funnel',
            keywords: []
        },
        ...baseTimestamp()
    },
    advisory: {
        id: '',
        title: 'Advisory Blueprint',
        blocks: [
            HERO_BLOCK('Private Advisory', 'Services, proof, booking CTA'),
            {
                blockId: id('services'),
                type: 'split-content',
                order: 1,
                data: {
                    headline: 'Advisory Services'
                }
            },
            {
                blockId: id('proof'),
                type: 'testimonial',
                order: 2,
                data: {
                    headline: 'Client Testimonials'
                }
            },
            {
                blockId: id('newsletter'),
                type: 'newsletter',
                order: 3,
                data: {
                    headline: 'Join Investor Briefing'
                }
            }
        ],
        canonicalListings: [],
        brochureUrl: '',
        seo: {
            title: 'Advisory Site',
            description: 'Private advisory landing page',
            keywords: []
        },
        ...baseTimestamp()
    }
};
function getBlueprintTemplate(id) {
    const template = BLUEPRINT_TEMPLATES[id];
    if (!template) return null;
    return {
        ...template,
        id: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        blocks: template.blocks.map((block, index)=>({
                ...block,
                blockId: `${block.type}-${Date.now()}-${index}`,
                order: index
            }))
    };
}
var _c;
__turbopack_context__.k.register(_c, "HERO_BLOCK");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/jobs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createJob",
    ()=>createJob,
    "getJobs",
    ()=>getJobs,
    "processJob",
    ()=>processJob,
    "subscribeToJobs",
    ()=>subscribeToJobs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/firebase/index.ts [app-client] (ecmascript) <locals>");
;
;
const JOBS_COLLECTION = 'jobs';
const createJob = async (ownerUid, type, params)=>{
    let planSteps = [
        'init'
    ];
    if (type === 'site_generation') {
        planSteps = [
            'renderBlocks',
            'seoGenerate',
            'adsGenerate',
            'deploy'
        ];
    } else if (type === 'ad_campaign') {
        planSteps = [
            'analyzeContent',
            'generateKeywords',
            'createHeadlines',
            'budgetOptimization'
        ];
    } else if (type === 'site_refiner') {
        planSteps = [
            'analyzeStructure',
            'applyRefinements',
            'finalReview'
        ];
    }
    const jobData = {
        ownerUid,
        type,
        status: 'queued',
        plan: {
            flowId: `\${type}-flow`,
            steps: planSteps,
            params
        },
        steps: [],
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
    };
    const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], JOBS_COLLECTION), jobData);
    return {
        id: docRef.id,
        ...jobData
    };
};
const getJobs = async (ownerUid)=>{
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], JOBS_COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('ownerUid', '==', ownerUid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return querySnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
};
const subscribeToJobs = (ownerUid, callback)=>{
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], JOBS_COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('ownerUid', '==', ownerUid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
        const jobs = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
        callback(jobs);
    });
};
const processJob = async (jobId)=>{
    console.log(`Processing job \${jobId}...`);
    try {
        const jobRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], JOBS_COLLECTION, jobId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(jobRef, {
            status: 'running',
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(jobRef, {
            steps: [
                {
                    name: 'init',
                    status: 'done',
                    result: 'System initialized',
                    timestamp: Date.now()
                }
            ],
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(jobRef, {
            status: 'done',
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    } catch (error) {
        console.error("Error processing job:", error);
        const jobRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$firebase$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], JOBS_COLLECTION, jobId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(jobRef, {
            status: 'error',
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useCampaignAttribution.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCampaignAttribution",
    ()=>useCampaignAttribution
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const STORAGE_KEY = 'entrestate-campaign-attribution';
function parseStoredValue() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch  {
        return null;
    }
}
function persistAttribution(data) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        if (data) {
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } else {
            window.sessionStorage.removeItem(STORAGE_KEY);
        }
    } catch  {
    // no-op
    }
}
function normalizeAttribution(input) {
    const normalized = {};
    if (input.campaignDocId) normalized.campaignDocId = input.campaignDocId;
    if (input.campaignId) normalized.campaignId = input.campaignId;
    if (input.channel) normalized.channel = input.channel;
    if (input.value !== undefined && input.value !== null) {
        const numeric = typeof input.value === 'number' ? input.value : Number(input.value);
        if (!Number.isNaN(numeric)) {
            normalized.value = numeric;
        }
    }
    return Object.keys(normalized).length ? normalized : null;
}
function useCampaignAttribution() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [attribution, setAttribution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCampaignAttribution.useEffect": ()=>{
            const stored = parseStoredValue();
            if (!searchParams) {
                setAttribution(stored);
                return;
            }
            const campaignId = searchParams.get('campaignId') || searchParams.get('utm_campaign') || undefined;
            const campaignDocId = searchParams.get('campaignDocId') || undefined;
            const channel = searchParams.get('channel') || searchParams.get('utm_source') || undefined;
            const valueParam = searchParams.get('attributionValue') || searchParams.get('value') || undefined;
            const rawAttribution = {
                campaignId: campaignId ?? undefined,
                campaignDocId,
                channel
            };
            if (valueParam !== null && valueParam !== undefined) {
                rawAttribution.value = valueParam;
            }
            const fromQuery = normalizeAttribution(rawAttribution);
            if (fromQuery) {
                persistAttribution(fromQuery);
                setAttribution(fromQuery);
            } else {
                setAttribution(stored);
            }
        }
    }["useCampaignAttribution.useEffect"], [
        searchParams
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCampaignAttribution.useMemo": ()=>attribution
    }["useCampaignAttribution.useMemo"], [
        attribution
    ]);
}
_s(useCampaignAttribution, "FmJMVHXRxip8fqctiP/KKhEJERk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/ai/flows/data:a88927 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "suggestNextBlocks",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"404299809d1a730a80b97a843a966aafd5efcd4ca6":"suggestNextBlocks"},"src/ai/flows/suggest-next-blocks.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("404299809d1a730a80b97a843a966aafd5efcd4ca6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "suggestNextBlocks");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc3VnZ2VzdC1uZXh0LWJsb2Nrcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG4vKipcbiAqIEBmaWxlT3ZlcnZpZXcgQW4gQUkgYWdlbnQgdGhhdCBzdWdnZXN0cyB0aGUgbmV4dCBiZXN0IGJsb2NrcyB0byBhZGQgdG8gYSB3ZWJzaXRlIHBhZ2UuXG4gKlxuICogLSBzdWdnZXN0TmV4dEJsb2NrcyAtIEEgZnVuY3Rpb24gdGhhdCBzdWdnZXN0cyB0aGUgbmV4dCBiZXN0IGJsb2NrcyB0byBhZGQgdG8gYSB3ZWJzaXRlIHBhZ2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgYmxvY2tzIGFuZCB0aGUgb3ZlcmFsbCBzaXRlIHR5cGUuXG4gKiAtIFN1Z2dlc3ROZXh0QmxvY2tzSW5wdXQgLSBUaGUgaW5wdXQgdHlwZSBmb3IgdGhlIHN1Z2dlc3ROZXh0QmxvY2tzIGZ1bmN0aW9uLlxuICogLSBTdWdnZXN0TmV4dEJsb2Nrc091dHB1dCAtIFRoZSByZXR1cm4gdHlwZSBmb3IgdGhlIHN1Z2dlc3ROZXh0QmxvY2tzIGZ1bmN0aW9uLlxuICovXG5cbmltcG9ydCB7YWl9IGZyb20gJ0AvYWkvZ2Vua2l0JztcbmltcG9ydCB7en0gZnJvbSAnem9kJztcblxuY29uc3QgU3VnZ2VzdE5leHRCbG9ja3NJbnB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgY3VycmVudEJsb2Nrczogei5hcnJheSh6LnN0cmluZygpKS5kZXNjcmliZSgnVGhlIGxpc3Qgb2YgYmxvY2sgSURzIGN1cnJlbnRseSBvbiB0aGUgcGFnZS4nKSxcbiAgc2l0ZVR5cGU6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ1RoZSB0eXBlIG9mIHNpdGUgYmVpbmcgYnVpbHQgKGUuZy4sIGRldmVsb3BlciBsYXVuY2gsIHJvYWRzaG93KS4nKSxcbiAgYnJhbmQ6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ1RoZSBicmFuZCBvZiB0aGUgc2l0ZSAoZS5nLiwgTHV4dXJ5SG9tZXMpLicpLFxuICBwcmltYXJ5Q29sb3I6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ1RoZSBwcmltYXJ5IGNvbG9yIG9mIHRoZSBicmFuZCBpbiBoZXggZm9ybWF0IChlLmcuLCAjMDAyRjRCKS4nKSxcbn0pO1xuXG5leHBvcnQgdHlwZSBTdWdnZXN0TmV4dEJsb2Nrc0lucHV0ID0gei5pbmZlcjx0eXBlb2YgU3VnZ2VzdE5leHRCbG9ja3NJbnB1dFNjaGVtYT47XG5cbmNvbnN0IFN1Z2dlc3ROZXh0QmxvY2tzT3V0cHV0U2NoZW1hID0gei5hcnJheShcbiAgei5vYmplY3Qoe1xuICAgIGJsb2NrSWQ6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ1RoZSBJRCBvZiB0aGUgc3VnZ2VzdGVkIGJsb2NrLicpLFxuICAgIG9yZGVyOiB6Lm51bWJlcigpLmRlc2NyaWJlKCdUaGUgb3JkZXIgaW4gd2hpY2ggdGhlIGJsb2NrIHNob3VsZCBiZSBwbGFjZWQgb24gdGhlIHBhZ2UuJyksXG4gICAgZGVmYXVsdENvbnRlbnQ6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ0EgSlNPTiBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBkZWZhdWx0IGNvbnRlbnQgZm9yIHRoZSBibG9jaywgd2l0aCBwbGFjZWhvbGRlcnMgZm9yIGR5bmFtaWMgZGF0YS4nKSxcbiAgICByZWNvbW1lbmRlZFN0eWxlT3ZlcnJpZGVzOiB6LnN0cmluZygpLmRlc2NyaWJlKCdBIEpTT04gc3RyaW5nIHJlcHJlc2VudGluZyByZWNvbW1lbmRlZCBzdHlsZSBvdmVycmlkZXMgKGUuZy4sIHtcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDBcIiwgXCJ0ZXh0Q29sb3JcIjogXCIjRkZGXCJ9KS4nKSxcbiAgICBhZHNSZWFkeTogei5ib29sZWFuKCkuZGVzY3JpYmUoJ1doZXRoZXIgdGhlIGJsb2NrIGlzIHJlYWR5IGZvciBhZHMuJyksXG4gICAgc2VvUmVhZHk6IHouYm9vbGVhbigpLmRlc2NyaWJlKCdXaGV0aGVyIHRoZSBibG9jayBpcyByZWFkeSBmb3IgU0VPLicpLFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgU3VnZ2VzdE5leHRCbG9ja3NPdXRwdXQgPSB6LmluZmVyPHR5cGVvZiBTdWdnZXN0TmV4dEJsb2Nrc091dHB1dFNjaGVtYT47XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWdnZXN0TmV4dEJsb2NrcyhpbnB1dDogU3VnZ2VzdE5leHRCbG9ja3NJbnB1dCk6IFByb21pc2U8U3VnZ2VzdE5leHRCbG9ja3NPdXRwdXQ+IHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VnZ2VzdE5leHRCbG9ja3NGbG93KGlucHV0KTtcbiAgLy8gVGhlIEFJIG1vZGVsIHdpbGwgcmV0dXJuIEpTT04gc3RyaW5ncywgc28gd2UgbmVlZCB0byBwYXJzZSB0aGVtLlxuICByZXR1cm4gcmVzdWx0Lm1hcChpdGVtID0+ICh7XG4gICAgICAuLi5pdGVtLFxuICAgICAgZGVmYXVsdENvbnRlbnQ6IEpTT04ucGFyc2UoaXRlbS5kZWZhdWx0Q29udGVudCB8fCAne30nKSxcbiAgICAgIHJlY29tbWVuZGVkU3R5bGVPdmVycmlkZXM6IEpTT04ucGFyc2UoaXRlbS5yZWNvbW1lbmRlZFN0eWxlT3ZlcnJpZGVzIHx8ICd7fScpLFxuICB9KSk7XG59XG5cbmNvbnN0IHByb21wdCA9IGFpLmRlZmluZVByb21wdCh7XG4gIG5hbWU6ICdzdWdnZXN0TmV4dEJsb2Nrc1Byb21wdCcsXG4gIGlucHV0OiB7c2NoZW1hOiBTdWdnZXN0TmV4dEJsb2Nrc0lucHV0U2NoZW1hfSxcbiAgb3V0cHV0OiB7c2NoZW1hOiBTdWdnZXN0TmV4dEJsb2Nrc091dHB1dFNjaGVtYX0sXG4gIHByb21wdDogYFVzZXIgaGFzIGNyZWF0ZWQgYSBsYW5kaW5nIHBhZ2Ugd2l0aCB0aGUgZm9sbG93aW5nIGJsb2Nrczoge3t7Y3VycmVudEJsb2Nrc319fS5cXG5TaXRlIHR5cGU6IFwie3t7c2l0ZVR5cGV9fX1cIiwgYnJhbmQ6IFwie3t7YnJhbmR9fX1cIiwgcHJpbWFyeSBjb2xvcjogXCJ7e3twcmltYXJ5Q29sb3J9fX1cIi5cXG5TdWdnZXN0IDUgbmV4dCBibG9ja3MgdG8gbWFpbnRhaW4gaGlnaCBjb252ZXJzaW9uLiBGb3IgZWFjaCBzdWdnZXN0aW9uIHByb3ZpZGU6XFxuLSBibG9ja0lkXFxuLSBvcmRlclxcbi0gZGVmYXVsdENvbnRlbnQgYXMgYSBKU09OIHN0cmluZyB3aXRoIHBsYWNlaG9sZGVyczogJVBST0pFQ1RfTkFNRSUsICVDSVRZJSwgJVBSSUNFJSwgJURFVkVMT1BFUiVcXG4tIHJlY29tbWVuZGVkU3R5bGVPdmVycmlkZXMgYXMgYSBKU09OIHN0cmluZy4gRm9yIGV4YW1wbGUsIGZvciBhIGhlcm8gYmxvY2ssIHlvdSBjb3VsZCBzdWdnZXN0OiAne1wiYmFja2dyb3VuZEltYWdlXCI6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTI0NTM5Nzk3OTgtNWVhOTA0YWM2NmRlXCJ9J1xcbi0gYWRzUmVhZHkgYm9vbGVhblxcbi0gc2VvUmVhZHkgYm9vbGVhblxcbk91dHB1dCBzdHJpY3RseSBhcyBhIHZhbGlkIEpTT04gYXJyYXkuIEVuc3VyZSBhbGwgY29udGVudCBmaWVsZHMgYXJlIHByb3BlciBKU09OIHN0cmluZ3MuYCxcbn0pO1xuXG5jb25zdCBzdWdnZXN0TmV4dEJsb2Nrc0Zsb3cgPSBhaS5kZWZpbmVGbG93KFxuICB7XG4gICAgbmFtZTogJ3N1Z2dlc3ROZXh0QmxvY2tzRmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IFN1Z2dlc3ROZXh0QmxvY2tzSW5wdXRTY2hlbWEsXG4gICAgb3V0cHV0U2NoZW1hOiBTdWdnZXN0TmV4dEJsb2Nrc091dHB1dFNjaGVtYSxcbiAgfSxcbiAgYXN5bmMgaW5wdXQgPT4ge1xuICAgIGNvbnN0IHtvdXRwdXR9ID0gYXdhaXQgcHJvbXB0KGlucHV0KTtcbiAgICByZXR1cm4gb3V0cHV0ITtcbiAgfVxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVNBa0NzQiw4TEFBQSJ9
}),
"[project]/src/app/builder/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BuilderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$builder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/page-builder.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$header$2f$editor$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/header/editor-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$sidebar$2f$left$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/sidebar/left-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$sidebar$2f$right$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/sidebar/right-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$builder$2d$landing$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/builder-landing-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publish$2d$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/publish-success-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2d$settings$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seo-settings-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/page-renderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-client] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firestore-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$firebase$2d$hooks$2f$auth$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-firebase-hooks/auth/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$onboarding$2d$blueprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/onboarding-blueprints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/jobs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const INITIAL_PAGE_STATE = {
    id: '',
    title: 'Untitled Site',
    blocks: [],
    canonicalListings: [],
    brochureUrl: '',
    tenantId: 'public',
    seo: {
        title: '',
        description: '',
        keywords: []
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};
function BuilderContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const initialPrompt = searchParams.get('prompt');
    const templateId = searchParams.get('template');
    const blueprintId = searchParams.get('blueprint');
    const siteIdParam = searchParams.get('siteId');
    const variantParam = searchParams.get('variant');
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [user] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$firebase$2d$hooks$2f$auth$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])());
    const [isStarted, setIsStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_PAGE_STATE);
    const [selectedBlock, setSelectedBlock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPublishDialogOpen, setIsPublishDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSeoDialogOpen, setIsSeoDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingSite, setIsLoadingSite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPreviewMode, setIsPreviewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRefining, setIsRefining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeRefinerJobId, setActiveRefinerJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isApplyingRefinerDraft, setIsApplyingRefinerDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [refinerDraft, setRefinerDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refinerDraftHtml, setRefinerDraftHtml] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refinerPreviewUrl, setRefinerPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const refinerStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isRefinerReview = variantParam === 'refined';
    const previewModeEnabled = isRefinerReview || isPreviewMode;
    const loadSite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[loadSite]": async (id)=>{
            if (!user) return;
            setIsLoadingSite(true);
            setIsStarted(true);
            try {
                const sites = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserSites"])(user.uid);
                const found = sites.find({
                    "BuilderContent.useCallback[loadSite].found": (s)=>s.id === id
                }["BuilderContent.useCallback[loadSite].found"]);
                if (found) {
                    setPage(found);
                } else {
                    toast({
                        title: "Site not found",
                        description: "We couldn't find the requested project.",
                        variant: "destructive"
                    });
                }
            } catch (error) {
                console.error("Load failed:", error);
            } finally{
                setIsLoadingSite(false);
            }
        }
    }["BuilderContent.useCallback[loadSite]"], [
        toast,
        user
    ]);
    const handleStartWithAI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[handleStartWithAI]": async (prompt)=>{
            setIsStarted(true);
            setIsGenerating(true);
            try {
                const response = await fetch('/api/ai/generate-site', {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPage({
                        "BuilderContent.useCallback[handleStartWithAI]": (prev)=>({
                                ...prev,
                                title: data.pageTitle || data.title || 'AI Generated Site',
                                blocks: data.blocks.map({
                                    "BuilderContent.useCallback[handleStartWithAI]": (b, i)=>({
                                            ...b,
                                            blockId: `\${b.type}-\${i}-\${Date.now()}`,
                                            order: i
                                        })
                                }["BuilderContent.useCallback[handleStartWithAI]"]),
                                seo: data.seo || prev.seo
                            })
                    }["BuilderContent.useCallback[handleStartWithAI]"]);
                }
            } catch (error) {
                console.error("Failed to generate site:", error);
            } finally{
                setIsGenerating(false);
            }
        }
    }["BuilderContent.useCallback[handleStartWithAI]"], []);
    const applyBlueprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[applyBlueprint]": (id)=>{
            const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$onboarding$2d$blueprints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBlueprintTemplate"])(id);
            if (template) {
                setIsStarted(true);
                setPage(template);
            }
        }
    }["BuilderContent.useCallback[applyBlueprint]"], []);
    // Effect to handle loading an existing site
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderContent.useEffect": ()=>{
            if (siteIdParam && user) {
                loadSite(siteIdParam);
            } else if (initialPrompt) {
                handleStartWithAI(initialPrompt);
            } else if (blueprintId) {
                applyBlueprint(blueprintId);
            } else if (templateId) {
                setIsStarted(true);
            }
        }
    }["BuilderContent.useEffect"], [
        applyBlueprint,
        blueprintId,
        handleStartWithAI,
        initialPrompt,
        loadSite,
        siteIdParam,
        templateId,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderContent.useEffect": ()=>{
            if (user && (!page.tenantId || page.tenantId === 'public') && page.tenantId !== user.uid) {
                setPage({
                    "BuilderContent.useEffect": (prev)=>{
                        if (prev.tenantId && prev.tenantId !== 'public') {
                            return prev;
                        }
                        return {
                            ...prev,
                            tenantId: user.uid
                        };
                    }
                }["BuilderContent.useEffect"]);
            }
        }
    }["BuilderContent.useEffect"], [
        page.tenantId,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderContent.useEffect": ()=>{
            if (isRefinerReview) {
                setIsPreviewMode(true);
            }
        }
    }["BuilderContent.useEffect"], [
        isRefinerReview
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderContent.useEffect": ()=>{
            setRefinerDraft(page.refinerDraftSnapshot || null);
            setRefinerDraftHtml(page.refinerDraftHtml || null);
            setRefinerPreviewUrl(page.refinerPreviewUrl || null);
        }
    }["BuilderContent.useEffect"], [
        page.refinerDraftSnapshot,
        page.refinerDraftHtml,
        page.refinerPreviewUrl
    ]);
    const removeVariantFromUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[removeVariantFromUrl]": ()=>{
            const params = new URLSearchParams(searchParams.toString());
            params.delete('variant');
            const query = params.toString();
            router.replace(query ? `/builder?${query}` : '/builder');
        }
    }["BuilderContent.useCallback[removeVariantFromUrl]"], [
        router,
        searchParams
    ]);
    const persistRefinerMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[persistRefinerMetadata]": async (status, extra)=>{
            if (!page.id) return;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateSiteMetadata"])(page.id, {
                    refinerStatus: status,
                    ...extra
                });
            } catch (error) {
                console.error('Failed to persist refiner metadata', error);
            }
        }
    }["BuilderContent.useCallback[persistRefinerMetadata]"], [
        page.id
    ]);
    const handleSave = async ()=>{
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to save your progress.",
                variant: "destructive"
            });
            return;
        }
        try {
            const savedSiteId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveSite"])(user.uid, page);
            if (!page.id) {
                setPage((prev)=>({
                        ...prev,
                        id: savedSiteId
                    }));
                router.replace(`/builder?siteId=\${savedSiteId}`);
            }
            toast({
                title: "Site saved",
                description: "Your progress has been saved successfully."
            });
        } catch (error) {
            console.error("Save failed:", error);
            toast({
                title: "Save failed",
                description: "There was an error saving your site.",
                variant: "destructive"
            });
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderContent.useEffect": ()=>{
            if (!user) return;
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeToJobs"])(user.uid, {
                "BuilderContent.useEffect.unsubscribe": (jobList)=>{
                    const targetJob = jobList.find({
                        "BuilderContent.useEffect.unsubscribe.targetJob": (job)=>{
                            if (job.type !== 'site_refiner') return false;
                            if (activeRefinerJobId) {
                                return job.id === activeRefinerJobId;
                            }
                            if (page.lastRefinerJobId) {
                                return job.id === page.lastRefinerJobId;
                            }
                            return job.plan?.params?.siteId === page.id;
                        }
                    }["BuilderContent.useEffect.unsubscribe.targetJob"]);
                    if (!targetJob) return;
                    const artifacts = extractRefinerArtifacts(targetJob);
                    setRefinerDraft(artifacts.snapshot);
                    setRefinerDraftHtml(artifacts.html);
                    setRefinerPreviewUrl(artifacts.previewUrl);
                    const baseSnapshotFromJob = ensureSitePage(targetJob.plan?.params?.snapshot);
                    if (refinerStatusRef.current === targetJob.status) return;
                    refinerStatusRef.current = targetJob.status;
                    const siteId = targetJob.plan?.params?.siteId || page.id;
                    const siteTitle = targetJob.plan?.params?.siteTitle || page.title;
                    if (targetJob.status === 'queued') {
                        setIsRefining(true);
                        setRefinerDraft(null);
                        setRefinerDraftHtml(null);
                        setRefinerPreviewUrl(null);
                        setPage({
                            "BuilderContent.useEffect.unsubscribe": (prev)=>({
                                    ...prev,
                                    refinerStatus: 'queued',
                                    lastRefinerJobId: targetJob.id,
                                    refinerBaseSnapshot: baseSnapshotFromJob || prev.refinerBaseSnapshot
                                })
                        }["BuilderContent.useEffect.unsubscribe"]);
                        persistRefinerMetadata('queued', {
                            lastRefinerJobId: targetJob.id,
                            ...baseSnapshotFromJob ? {
                                refinerBaseSnapshot: baseSnapshotFromJob
                            } : {}
                        });
                    } else if (targetJob.status === 'running') {
                        setIsRefining(true);
                        setRefinerDraft(null);
                        setRefinerDraftHtml(null);
                        setRefinerPreviewUrl(null);
                        setPage({
                            "BuilderContent.useEffect.unsubscribe": (prev)=>({
                                    ...prev,
                                    refinerStatus: 'running',
                                    lastRefinerJobId: targetJob.id,
                                    refinerBaseSnapshot: baseSnapshotFromJob || prev.refinerBaseSnapshot
                                })
                        }["BuilderContent.useEffect.unsubscribe"]);
                        persistRefinerMetadata('running', {
                            lastRefinerJobId: targetJob.id,
                            ...baseSnapshotFromJob ? {
                                refinerBaseSnapshot: baseSnapshotFromJob
                            } : {}
                        });
                        toast({
                            title: 'Refiner AI running',
                            description: 'Analyzing structure and applying finishing touches.'
                        });
                    } else if (targetJob.status === 'done') {
                        setIsRefining(false);
                        setActiveRefinerJobId(null);
                        toast({
                            title: 'Refiner complete',
                            description: `Review the refined draft of ${siteTitle}.`,
                            action: siteId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastAction"], {
                                altText: "Open refined draft",
                                onClick: {
                                    "BuilderContent.useEffect.unsubscribe": ()=>router.push(`/builder?siteId=${siteId}&variant=refined`)
                                }["BuilderContent.useEffect.unsubscribe"],
                                children: "Open Draft"
                            }, void 0, false, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 285,
                                columnNumber: 25
                            }, this) : undefined
                        });
                        const completedAt = new Date().toISOString();
                        setPage({
                            "BuilderContent.useEffect.unsubscribe": (prev)=>({
                                    ...prev,
                                    refinerStatus: 'review',
                                    lastRefinedAt: completedAt,
                                    lastRefinerJobId: targetJob.id,
                                    refinerDraftSnapshot: artifacts.snapshot || prev.refinerDraftSnapshot,
                                    refinerDraftHtml: artifacts.html ?? prev.refinerDraftHtml,
                                    refinerPreviewUrl: artifacts.previewUrl ?? prev.refinerPreviewUrl
                                })
                        }["BuilderContent.useEffect.unsubscribe"]);
                        persistRefinerMetadata('review', {
                            lastRefinedAt: completedAt,
                            lastRefinerJobId: targetJob.id,
                            ...artifacts.snapshot ? {
                                refinerDraftSnapshot: artifacts.snapshot
                            } : {},
                            ...artifacts.html ? {
                                refinerDraftHtml: artifacts.html
                            } : {},
                            ...artifacts.previewUrl ? {
                                refinerPreviewUrl: artifacts.previewUrl
                            } : {}
                        });
                    } else if (targetJob.status === 'error') {
                        setIsRefining(false);
                        setRefinerDraft(null);
                        setRefinerDraftHtml(null);
                        setRefinerPreviewUrl(null);
                        setPage({
                            "BuilderContent.useEffect.unsubscribe": (prev)=>({
                                    ...prev,
                                    refinerStatus: 'error',
                                    lastRefinerJobId: targetJob.id
                                })
                        }["BuilderContent.useEffect.unsubscribe"]);
                        persistRefinerMetadata('error', {
                            lastRefinerJobId: targetJob.id
                        });
                        toast({
                            title: 'Refiner failed',
                            description: 'Save your site and try again.',
                            variant: 'destructive'
                        });
                    }
                }
            }["BuilderContent.useEffect.unsubscribe"]);
            return ({
                "BuilderContent.useEffect": ()=>unsubscribe()
            })["BuilderContent.useEffect"];
        }
    }["BuilderContent.useEffect"], [
        user,
        page.id,
        page.title,
        page.lastRefinerJobId,
        activeRefinerJobId,
        router,
        toast,
        persistRefinerMetadata
    ]);
    const handleRefinerRun = async ()=>{
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Sign in to run Refiner AI.",
                variant: "destructive"
            });
            return;
        }
        if (!page.id) {
            toast({
                title: "Save required",
                description: "Save your site before running Refiner AI.",
                variant: "destructive"
            });
            return;
        }
        setIsRefining(true);
        const baseSnapshot = cloneSitePage(page);
        try {
            const jobRecord = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJob"])(user.uid, 'site_refiner', {
                siteId: page.id,
                siteTitle: page.title,
                tenantId: page.tenantId || user.uid,
                snapshot: baseSnapshot
            });
            if (jobRecord?.id) {
                setActiveRefinerJobId(jobRecord.id);
                refinerStatusRef.current = 'queued';
                setRefinerDraft(null);
                setRefinerDraftHtml(null);
                setRefinerPreviewUrl(null);
                setPage((prev)=>({
                        ...prev,
                        refinerStatus: 'queued',
                        lastRefinerJobId: jobRecord.id,
                        refinerBaseSnapshot: baseSnapshot
                    }));
                persistRefinerMetadata('queued', {
                    lastRefinerJobId: jobRecord.id,
                    refinerBaseSnapshot: baseSnapshot
                });
            }
            toast({
                title: "Refiner queued",
                description: "Your design is running through Refiner AI. Check Jobs for status."
            });
        } catch (error) {
            console.error('Failed to queue refiner job', error);
            toast({
                title: "Refiner failed",
                description: "Could not start Refiner AI. Try saving and retry.",
                variant: "destructive"
            });
            setIsRefining(false);
            setActiveRefinerJobId(null);
        }
    };
    const handleExitRefinerReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[handleExitRefinerReview]": ()=>{
            removeVariantFromUrl();
            setIsPreviewMode(false);
        }
    }["BuilderContent.useCallback[handleExitRefinerReview]"], [
        removeVariantFromUrl
    ]);
    const handleApplyRefinerDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[handleApplyRefinerDraft]": async ()=>{
            if (!user) {
                toast({
                    title: 'Authentication Required',
                    description: 'Sign in before applying the Refiner draft.',
                    variant: 'destructive'
                });
                return;
            }
            if (!page.id) {
                toast({
                    title: 'Save required',
                    description: 'Save your site before applying Refiner changes.',
                    variant: 'destructive'
                });
                return;
            }
            setIsApplyingRefinerDraft(true);
            const previousPageState = page;
            const updatedPage = {
                ...page,
                refinerStatus: 'done',
                lastRefinedAt: new Date().toISOString()
            };
            try {
                setPage(updatedPage);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveSite"])(user.uid, updatedPage);
                setRefinerDraft(null);
                setRefinerDraftHtml(null);
                setRefinerPreviewUrl(null);
                toast({
                    title: 'Refiner applied',
                    description: 'Your site has been updated and marked as refined.'
                });
                removeVariantFromUrl();
                setIsPreviewMode(false);
            } catch (error) {
                console.error('Failed to apply refiner draft', error);
                setPage(previousPageState);
                toast({
                    title: 'Apply failed',
                    description: 'We could not save the Refiner draft. Please try again.',
                    variant: 'destructive'
                });
            } finally{
                setIsApplyingRefinerDraft(false);
            }
        }
    }["BuilderContent.useCallback[handleApplyRefinerDraft]"], [
        page,
        removeVariantFromUrl,
        toast,
        user
    ]);
    const handlePreviewToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderContent.useCallback[handlePreviewToggle]": ()=>{
            if (isRefinerReview) {
                handleExitRefinerReview();
                return;
            }
            setIsPreviewMode({
                "BuilderContent.useCallback[handlePreviewToggle]": (prev)=>!prev
            }["BuilderContent.useCallback[handlePreviewToggle]"]);
        }
    }["BuilderContent.useCallback[handlePreviewToggle]"], [
        handleExitRefinerReview,
        isRefinerReview
    ]);
    if (!isStarted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$builder$2d$landing$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderLandingPage"], {
            onStartWithAI: handleStartWithAI,
            onChooseTemplate: ()=>setIsStarted(true)
        }, void 0, false, {
            fileName: "[project]/src/app/builder/page.tsx",
            lineNumber: 456,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-screen flex flex-col bg-zinc-950 overflow-hidden text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$header$2f$editor$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorHeader"], {
                page: page,
                onSave: handleSave,
                onPublish: ()=>setIsPublishDialogOpen(true),
                onPreview: handlePreviewToggle,
                isPreviewMode: previewModeEnabled,
                onRefine: handleRefinerRun,
                isRefining: isRefining
            }, void 0, false, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 465,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    !previewModeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$sidebar$2f$left$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeftSidebar"], {
                        page: page,
                        onPageUpdate: setPage,
                        onOpenSeo: ()=>setIsSeoDialogOpen(true),
                        selectedBlockId: selectedBlock?.blockId,
                        onSelectBlock: setSelectedBlock
                    }, void 0, false, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 477,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 overflow-y-auto custom-scrollbar relative transition-all duration-500", previewModeEnabled ? "bg-white p-0" : "bg-zinc-900/50 p-8"),
                        children: [
                            isGenerating || isLoadingSite ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/builder/page.tsx",
                                                lineNumber: 493,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-16 w-16 text-blue-500 animate-spin mb-6 relative z-10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/builder/page.tsx",
                                                lineNumber: 494,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 492,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold tracking-tighter text-white mb-2",
                                        children: isGenerating ? "Architecting your vision..." : "Accessing system archives..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 496,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 491,
                                columnNumber: 25
                            }, this) : null,
                            previewModeEnabled ? isRefinerReview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RefinerReviewSplit, {
                                page: page,
                                tenantId: page.tenantId || user?.uid || 'public',
                                projectName: page.title,
                                onApply: handleApplyRefinerDraft,
                                onExit: handleExitRefinerReview,
                                isApplying: isApplyingRefinerDraft,
                                refinedPage: refinerDraft,
                                refinedHtml: refinerDraftHtml,
                                previewUrl: refinerPreviewUrl,
                                jobId: page.lastRefinerJobId
                            }, void 0, false, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 504,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white text-black min-h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRenderer"], {
                                    page: page,
                                    tenantId: page.tenantId || user?.uid || 'public',
                                    projectName: page.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 518,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 517,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-5xl mx-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$builder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageBuilder"], {
                                    page: page,
                                    onPageUpdate: setPage,
                                    selectedBlockId: selectedBlock?.blockId,
                                    onSelectBlock: setSelectedBlock
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 526,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 486,
                        columnNumber: 17
                    }, this),
                    !previewModeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$sidebar$2f$right$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RightSidebar"], {
                        selectedBlock: selectedBlock,
                        onUpdateBlock: (newData)=>{
                            if (selectedBlock) {
                                const updatedBlocks = page.blocks.map((b)=>b.blockId === selectedBlock.blockId ? {
                                        ...b,
                                        data: newData
                                    } : b);
                                setPage({
                                    ...page,
                                    blocks: updatedBlocks
                                });
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 538,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 475,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publish$2d$success$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublishSuccessDialog"], {
                open: isPublishDialogOpen,
                onOpenChange: setIsPublishDialogOpen,
                page: page
            }, void 0, false, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 552,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2d$settings$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeoSettingsDialog"], {
                open: isSeoDialogOpen,
                onOpenChange: setIsSeoDialogOpen,
                page: page,
                onSave: (seoData)=>{
                    setPage({
                        ...page,
                        seo: seoData
                    });
                    toast({
                        title: "SEO Settings Saved"
                    });
                }
            }, void 0, false, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 558,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/builder/page.tsx",
        lineNumber: 464,
        columnNumber: 9
    }, this);
}
_s(BuilderContent, "u7R1cqdqLPS8BP/6zowDUA3qbmA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$firebase$2d$hooks$2f$auth$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthState"]
    ];
});
_c = BuilderContent;
function RefinerReviewSplit({ page, tenantId, projectName, onApply, onExit, isApplying, refinedPage, refinedHtml, previewUrl, jobId }) {
    _s1();
    const [viewMode, setViewMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState('compare');
    const hasStructuredDraft = Boolean(refinedPage);
    const hasHtmlDraft = Boolean(refinedHtml) && !hasStructuredDraft;
    const baseSnapshot = page.refinerBaseSnapshot || page;
    const refinedTenantId = refinedPage?.tenantId || tenantId;
    const refinedProjectName = refinedPage?.title || projectName;
    const compareLayout = viewMode === 'compare';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-full bg-white text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white px-6 py-5 flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold uppercase tracking-[0.3em] text-amber-600",
                                        children: "Refiner Draft Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 598,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-amber-900/70",
                                        children: [
                                            "Compare the original build for ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-amber-900",
                                                children: projectName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/builder/page.tsx",
                                                lineNumber: 600,
                                                columnNumber: 60
                                            }, this),
                                            " with the Refiner AI draft."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 599,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 597,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 sm:flex-row sm:items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "rounded-full border-amber-200 text-amber-700 hover:bg-amber-50",
                                        onClick: onExit,
                                        children: "Exit Review"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 604,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: onApply,
                                        disabled: isApplying,
                                        className: "rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/30 gap-2",
                                        children: isApplying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-4 w-4 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 37
                                                }, this),
                                                "Applying..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 37
                                                }, this),
                                                "Apply Draft"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 607,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 603,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 596,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                            'compare',
                            'original',
                            'refined'
                        ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: viewMode === mode ? 'default' : 'outline',
                                size: "sm",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full text-xs uppercase tracking-[0.3em]", viewMode === mode ? 'bg-amber-600/90 hover:bg-amber-600/80' : 'border-amber-200 text-amber-800 hover:bg-amber-50'),
                                onClick: ()=>setViewMode(mode),
                                children: mode === 'compare' ? 'Split Compare' : mode === 'original' ? 'Original' : 'Refined'
                            }, mode, false, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 628,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 626,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 595,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid gap-6 p-6", compareLayout ? "lg:grid-cols-2" : "lg:grid-cols-1"),
                children: [
                    viewMode !== 'refined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[32px] border border-zinc-200 overflow-hidden bg-white shadow-2xl shadow-zinc-200/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-6 py-4 border-b border-zinc-200 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 652,
                                        columnNumber: 25
                                    }, this),
                                    "Current Build"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 651,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white text-black",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRenderer"], {
                                    page: baseSnapshot,
                                    tenantId: baseSnapshot.tenantId || tenantId,
                                    projectName: baseSnapshot.title || projectName
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 656,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/builder/page.tsx",
                                lineNumber: 655,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 650,
                        columnNumber: 17
                    }, this),
                    viewMode !== 'original' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-[32px] overflow-hidden flex flex-col", hasStructuredDraft || hasHtmlDraft ? "border border-blue-200 shadow-2xl shadow-blue-200/60 bg-white" : "border-2 border-dashed border-amber-200 bg-amber-50/80 text-center p-10 gap-4 shadow-[0_30px_80px_-40px_rgba(251,191,36,0.8)] items-center justify-center"),
                        children: hasStructuredDraft || hasHtmlDraft ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-sky-50 to-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-600 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/builder/page.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 41
                                                        }, this),
                                                        "Refiner Draft"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 37
                                                }, this),
                                                jobId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-mono text-blue-400",
                                                    children: [
                                                        "Job #",
                                                        jobId.slice(0, 8)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 41
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 671,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                className: "rounded-full border-blue-200 text-blue-700 hover:bg-blue-50",
                                                onClick: ()=>window.open(previewUrl, '_blank'),
                                                children: "Live Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/builder/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 41
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 680,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 670,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white text-black",
                                    children: hasStructuredDraft ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRenderer"], {
                                        page: refinedPage,
                                        tenantId: refinedTenantId,
                                        projectName: refinedProjectName
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 692,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-h-[400px] max-h-[1500px] overflow-auto custom-scrollbar px-8 py-6 text-left prose prose-slate",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            dangerouslySetInnerHTML: {
                                                __html: refinedHtml || ''
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 699,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 698,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 690,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-full bg-white/80 border border-amber-200 mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-6 w-6 text-amber-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/builder/page.tsx",
                                        lineNumber: 707,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 706,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs uppercase tracking-[0.4em] text-amber-600 font-semibold",
                                            children: "Refiner Draft"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 710,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold text-amber-900 mt-1",
                                            children: "AI polish is almost ready"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 711,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 709,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-amber-900/80 max-w-md mx-auto",
                                    children: "We captured your layout snapshot and are training the Refiner agent to improve copy hierarchy, layout spacing, and CTA clarity. This placeholder will be replaced with a live preview once the agent delivers the diff."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 713,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left text-sm text-amber-900/80 space-y-2 mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-amber-900 uppercase tracking-[0.3em] text-xs",
                                            children: "Incoming upgrades"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 718,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Harmonized typography scale for hero and CTA blocks."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 720,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Improved listing grid spacing on tablet/mobile."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 721,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Fresh CTA copy variations tailored for Entrestate funnels."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/builder/page.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/builder/page.tsx",
                                            lineNumber: 719,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 717,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-amber-800/70",
                                    children: "You can apply the Refiner draft now to mark this review complete, or exit and revisit later from Jobs."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/builder/page.tsx",
                                    lineNumber: 725,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/builder/page.tsx",
                        lineNumber: 662,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 645,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/builder/page.tsx",
        lineNumber: 594,
        columnNumber: 9
    }, this);
}
_s1(RefinerReviewSplit, "1+HMiTH+AX/GPVgbvtfgxzfUuWk=");
_c1 = RefinerReviewSplit;
const cloneSitePage = (value)=>JSON.parse(JSON.stringify(value));
const ensureSitePage = (value)=>{
    if (!value || typeof value !== 'object') return null;
    if (!Array.isArray(value.blocks)) return null;
    return value;
};
const extractRefinerArtifacts = (job)=>{
    if (!job || job.status !== 'done') {
        return {
            snapshot: null,
            html: null,
            previewUrl: null
        };
    }
    const root = job.result || job?.output || {};
    const source = root.artifacts || root;
    const snapshotCandidate = source?.refinedSnapshot || source?.refinedPage || source?.draftSnapshot || source?.proposal || source?.snapshot || source?.page;
    const htmlCandidate = source?.refinedHtml || source?.html || source?.rendered;
    const previewCandidate = source?.previewUrl || source?.refinedPreviewUrl || source?.draftUrl || source?.url;
    return {
        snapshot: ensureSitePage(snapshotCandidate),
        html: typeof htmlCandidate === 'string' ? htmlCandidate : null,
        previewUrl: typeof previewCandidate === 'string' ? previewCandidate : null
    };
};
function BuilderPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-screen flex items-center justify-center bg-zinc-950",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-8 w-8 text-blue-500 animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/app/builder/page.tsx",
                lineNumber: 781,
                columnNumber: 17
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/builder/page.tsx",
            lineNumber: 780,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BuilderContent, {}, void 0, false, {
            fileName: "[project]/src/app/builder/page.tsx",
            lineNumber: 784,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/builder/page.tsx",
        lineNumber: 779,
        columnNumber: 9
    }, this);
}
_c2 = BuilderPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BuilderContent");
__turbopack_context__.k.register(_c1, "RefinerReviewSplit");
__turbopack_context__.k.register(_c2, "BuilderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_3e051fbe._.js.map