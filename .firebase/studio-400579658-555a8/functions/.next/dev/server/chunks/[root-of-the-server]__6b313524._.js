module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/server/firebase-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getAdminAuth",
    ()=>getAdminAuth,
    "getAdminDb",
    ()=>getAdminDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/auth [external] (firebase-admin/auth, esm_import, [project]/node_modules/firebase-admin)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function resolveCredential() {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (privateKey && clientEmail && projectId) {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
            clientEmail,
            privateKey,
            projectId
        });
    }
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        try {
            const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
            return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])(parsed);
        } catch (error) {
            console.warn('[firebase-admin] Invalid FIREBASE_SERVICE_ACCOUNT_JSON', error);
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["applicationDefault"])();
}
function initAdmin() {
    if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])().length) {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
            credential: resolveCredential()
        });
    }
}
function getAdminDb() {
    initAdmin();
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])();
}
function getAdminAuth() {
    initAdmin();
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getAuth"])();
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/data/entrestate-inventory.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENTRESTATE_INVENTORY",
    ()=>ENTRESTATE_INVENTORY
]);
const ENTRESTATE_INVENTORY = [
    {
        id: 'marina-horizon',
        name: 'Marina Horizon',
        developer: 'Entrestate Studio',
        location: {
            city: 'Dubai',
            area: 'Dubai Marina',
            mapQuery: 'Marina Horizon, Dubai Marina, Dubai'
        },
        handover: {
            quarter: 4,
            year: 2026
        },
        description: {
            full: 'Marina Horizon delivers curated waterfront residences with uninterrupted skyline views, hotel-grade amenities, and an on-site concierge.',
            short: 'Waterfront residences with skyline views.'
        },
        features: [
            'Infinity Pool',
            'Residents Club',
            '24/7 Concierge',
            'Smart Home'
        ],
        price: {
            from: 2750000,
            label: 'AED 2.75M',
            sqftAvg: 2100
        },
        performance: {
            roi: 8.2,
            capitalAppreciation: 13.5,
            rentalYield: 6.8,
            marketTrend: 'up',
            priceHistory: [
                {
                    year: 2022,
                    avgPrice: 2200000
                },
                {
                    year: 2023,
                    avgPrice: 2450000
                },
                {
                    year: 2024,
                    avgPrice: 2750000
                }
            ]
        },
        availability: 'Available',
        images: [
            'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1600&q=80'
        ],
        bedrooms: {
            min: 1,
            max: 4,
            label: '1-4'
        },
        areaSqft: {
            min: 980,
            max: 3200,
            label: '980-3,200 sqft'
        },
        tags: [
            'waterfront',
            'luxury'
        ],
        publicUrl: 'https://entrestate.com/projects/marina-horizon',
        unitsStockUpdatedAt: '2024-05-01T00:00:00.000Z'
    },
    {
        id: 'emerald-vista',
        name: 'Emerald Vista',
        developer: 'North Crescent',
        location: {
            city: 'Abu Dhabi',
            area: 'Saadiyat Island',
            mapQuery: 'Emerald Vista, Saadiyat Island, Abu Dhabi'
        },
        handover: {
            quarter: 2,
            year: 2025
        },
        description: {
            full: 'Emerald Vista anchors Saadiyat’s cultural district with gallery-inspired lobbies, duplex lofts, and curated retail.',
            short: 'Gallery-inspired residences on Saadiyat.'
        },
        features: [
            'Gallery Lobby',
            'Duplex Lofts',
            'Wellness Pavilion',
            'Retail Promenade'
        ],
        price: {
            from: 3200000,
            label: 'AED 3.2M',
            sqftAvg: 2300
        },
        performance: {
            roi: 7.4,
            capitalAppreciation: 11.2,
            rentalYield: 6.1,
            marketTrend: 'up',
            priceHistory: [
                {
                    year: 2022,
                    avgPrice: 2600000
                },
                {
                    year: 2023,
                    avgPrice: 2920000
                },
                {
                    year: 2024,
                    avgPrice: 3200000
                }
            ]
        },
        availability: 'Available',
        images: [
            'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80'
        ],
        bedrooms: {
            min: 2,
            max: 5,
            label: '2-5'
        },
        areaSqft: {
            min: 1400,
            max: 4200,
            label: '1,400-4,200 sqft'
        },
        tags: [
            'island',
            'culture'
        ],
        publicUrl: 'https://entrestate.com/projects/emerald-vista',
        unitsStockUpdatedAt: '2024-04-10T00:00:00.000Z'
    },
    {
        id: 'skypark-residences',
        name: 'Skypark Residences',
        developer: 'Meraas Entrestate',
        location: {
            city: 'Dubai',
            area: 'City Walk',
            mapQuery: 'Skypark Residences, City Walk, Dubai'
        },
        handover: {
            quarter: 1,
            year: 2027
        },
        description: {
            full: 'Skypark Residences offer biophilic city living with podium parks, shared studios, and penthouses overlooking Burj Khalifa.',
            short: 'Biophilic city living at City Walk.'
        },
        features: [
            'Podium Park',
            'Creative Studios',
            'Lap Pool',
            'Retail Plaza'
        ],
        price: {
            from: 2100000,
            label: 'AED 2.1M',
            sqftAvg: 1950
        },
        performance: {
            roi: 7.9,
            capitalAppreciation: 12.4,
            rentalYield: 6.4,
            marketTrend: 'up',
            priceHistory: [
                {
                    year: 2022,
                    avgPrice: 1800000
                },
                {
                    year: 2023,
                    avgPrice: 1950000
                },
                {
                    year: 2024,
                    avgPrice: 2100000
                }
            ]
        },
        availability: 'Coming Soon',
        images: [
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80'
        ],
        bedrooms: {
            min: 1,
            max: 3,
            label: '1-3'
        },
        areaSqft: {
            min: 850,
            max: 2200,
            label: '850-2,200 sqft'
        },
        tags: [
            'urban',
            'park'
        ],
        publicUrl: 'https://entrestate.com/projects/skypark-residences',
        unitsStockUpdatedAt: '2024-06-15T00:00:00.000Z'
    },
    {
        id: 'laguna-bay',
        name: 'Laguna Bay',
        developer: 'Entrestate Waterfronts',
        location: {
            city: 'Ras Al Khaimah',
            area: 'Al Marjan Island',
            mapQuery: 'Laguna Bay, Al Marjan Island, Ras Al Khaimah'
        },
        handover: {
            quarter: 3,
            year: 2025
        },
        description: {
            full: 'Laguna Bay is a resort-style community with branded residences, private beach cabanas, and a panoramic sky lounge.',
            short: 'Resort residences with private beach cabanas.'
        },
        features: [
            'Private Beach',
            'Sky Lounge',
            'Spa Suites',
            'Kids Club'
        ],
        price: {
            from: 1800000,
            label: 'AED 1.8M',
            sqftAvg: 1700
        },
        performance: {
            roi: 8.5,
            capitalAppreciation: 14.0,
            rentalYield: 7.1,
            marketTrend: 'up',
            priceHistory: [
                {
                    year: 2022,
                    avgPrice: 1450000
                },
                {
                    year: 2023,
                    avgPrice: 1620000
                },
                {
                    year: 2024,
                    avgPrice: 1800000
                }
            ]
        },
        availability: 'Available',
        images: [
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
        ],
        bedrooms: {
            min: 1,
            max: 4,
            label: '1-4'
        },
        areaSqft: {
            min: 900,
            max: 3100,
            label: '900-3,100 sqft'
        },
        tags: [
            'resort',
            'island'
        ],
        publicUrl: 'https://entrestate.com/projects/laguna-bay',
        unitsStockUpdatedAt: '2024-05-22T00:00:00.000Z'
    },
    {
        id: 'terrace-gardens',
        name: 'Terrace Gardens',
        developer: 'Avant Grove',
        location: {
            city: 'Sharjah',
            area: 'Aljada',
            mapQuery: 'Terrace Gardens, Aljada, Sharjah'
        },
        handover: {
            quarter: 2,
            year: 2026
        },
        description: {
            full: 'Terrace Gardens introduces duplex garden homes with shared maker spaces, green roofs, and community farming plots.',
            short: 'Garden duplexes with maker spaces.'
        },
        features: [
            'Maker Studio',
            'Green Roofs',
            'Community Farm',
            'Fitness Pavilion'
        ],
        price: {
            from: 1400000,
            label: 'AED 1.4M',
            sqftAvg: 1500
        },
        performance: {
            roi: 7.1,
            capitalAppreciation: 10.8,
            rentalYield: 5.9,
            marketTrend: 'stable',
            priceHistory: [
                {
                    year: 2022,
                    avgPrice: 1150000
                },
                {
                    year: 2023,
                    avgPrice: 1280000
                },
                {
                    year: 2024,
                    avgPrice: 1400000
                }
            ]
        },
        availability: 'Available',
        images: [
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80'
        ],
        bedrooms: {
            min: 2,
            max: 4,
            label: '2-4'
        },
        areaSqft: {
            min: 1250,
            max: 2800,
            label: '1,250-2,800 sqft'
        },
        tags: [
            'community',
            'green'
        ],
        publicUrl: 'https://entrestate.com/projects/terrace-gardens',
        unitsStockUpdatedAt: '2024-04-28T00:00:00.000Z'
    },
    {
        id: 'summit-lofts',
        name: 'Summit Lofts',
        developer: 'Entrestate Labs',
        location: {
            city: 'Dubai',
            area: 'Business Bay',
            mapQuery: 'Summit Lofts, Business Bay, Dubai'
        },
        handover: {
            quarter: 1,
            year: 2025
        },
        description: {
            full: 'Summit Lofts is a creative tower with double-height lofts, podcast studios, and business suites aimed at modern founders.',
            short: 'Creative loft tower in Business Bay.'
        },
        features: [
            'Double-height lofts',
            'Podcast Studio',
            'Business Lounge',
            'Rooftop Pool'
        ],
        price: {
            from: 1950000,
            label: 'AED 1.95M',
            sqftAvg: 1850
        },
        performance: {
            roi: 8.0,
            capitalAppreciation: 12.0,
            rentalYield: 6.7,
            marketTrend: 'up',
            priceHistory: [
                {
                    year: 2022,
                    avgPrice: 1600000
                },
                {
                    year: 2023,
                    avgPrice: 1780000
                },
                {
                    year: 2024,
                    avgPrice: 1950000
                }
            ]
        },
        availability: 'Available',
        images: [
            'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'
        ],
        bedrooms: {
            min: 1,
            max: 3,
            label: '1-3'
        },
        areaSqft: {
            min: 950,
            max: 2600,
            label: '950-2,600 sqft'
        },
        tags: [
            'loft',
            'business'
        ],
        publicUrl: 'https://entrestate.com/projects/summit-lofts',
        unitsStockUpdatedAt: '2024-05-18T00:00:00.000Z'
    }
];
}),
"[project]/src/lib/projects/filter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterProjects",
    ()=>filterProjects,
    "paginateProjects",
    ()=>paginateProjects
]);
function normalizeValue(value) {
    return (value ?? '').trim().toLowerCase();
}
function filterProjects(projects, filters) {
    const query = normalizeValue(filters.query);
    const city = normalizeValue(filters.city);
    const developer = normalizeValue(filters.developer);
    const status = normalizeValue(filters.status);
    const minPrice = filters.minPrice && filters.minPrice > 0 ? filters.minPrice : undefined;
    const maxPrice = filters.maxPrice && filters.maxPrice > 0 ? filters.maxPrice : undefined;
    return projects.filter((project)=>{
        if (query) {
            const matchesQuery = project.name.toLowerCase().includes(query) || project.developer.toLowerCase().includes(query) || project.location.city.toLowerCase().includes(query) || project.location.area.toLowerCase().includes(query);
            if (!matchesQuery) {
                return false;
            }
        }
        if (filters.city && city !== 'all' && project.location.city.toLowerCase() !== city) {
            return false;
        }
        if (developer && !project.developer.toLowerCase().includes(developer)) {
            return false;
        }
        if (status && status !== 'all' && project.availability.toLowerCase() !== status) {
            return false;
        }
        if (minPrice && (project.price?.from ?? 0) < minPrice) {
            return false;
        }
        if (maxPrice && (project.price?.from ?? 0) > maxPrice) {
            return false;
        }
        return true;
    });
}
function paginateProjects(projects, page, limit) {
    const safeLimit = Math.max(1, limit);
    const safePage = Math.max(1, page);
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;
    return {
        pageItems: projects.slice(start, end),
        meta: {
            total: projects.length,
            page: safePage,
            pageSize: safeLimit
        }
    };
}
}),
"[project]/src/app/api/projects/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/firebase-admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$entrestate$2d$inventory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/entrestate-inventory.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2f$filter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/projects/filter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const MAX_LIMIT = 24;
function parseFilters(searchParams) {
    return {
        query: searchParams.get('query')?.toLowerCase() ?? '',
        city: searchParams.get('city'),
        developer: searchParams.get('developer')?.toLowerCase(),
        status: searchParams.get('status'),
        minPrice: parseFloat(searchParams.get('minPrice') || '0') || undefined,
        maxPrice: parseFloat(searchParams.get('maxPrice') || '0') || undefined,
        page: Math.max(parseInt(searchParams.get('page') || '1', 10), 1),
        limit: Math.min(parseInt(searchParams.get('limit') || '12', 10), MAX_LIMIT)
    };
}
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const filters = parseFilters(searchParams);
    try {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminDb"])();
        const snapshot = await db.collection('inventory_projects').orderBy('name').get();
        const source = snapshot.empty ? [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$entrestate$2d$inventory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENTRESTATE_INVENTORY"]
        ] : snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
        const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2f$filter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filterProjects"])(source, filters);
        const { pageItems, meta } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2f$filter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateProjects"])(filtered, filters.page, filters.limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: pageItems,
            pagination: meta
        });
    } catch (error) {
        console.error('[projects/search] error', error);
        const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2f$filter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filterProjects"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$entrestate$2d$inventory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENTRESTATE_INVENTORY"], filters);
        const { pageItems, meta } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2f$filter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateProjects"])(filtered, filters.page, filters.limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: pageItems,
            pagination: meta
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b313524._.js.map