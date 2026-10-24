/**
 * Experiments infinite canvas — edit this list only. Home page media stays in `portfolioMedia.js`.
 *
 * Each item is either:
 * - A **string** URL → image vs video is inferred from the path (`.mp4`, `.webm`, `.ogg`, `.mov`).
 *   Hover tooltip text comes from the filename.
 * - `{ url: string, label?: string, date?: string, tags?: string[], description?: string }`
 *   → optional **`label` overrides the hover tooltip** (otherwise same as a plain string URL).
 *   `date`, `tags`, and `description` show in the detail panel.
 *
 * Tags: 3D · Motion · AI · Graphic · Code
 *
 * Duplicate URLs are skipped. Order is kept for first occurrence.
 */

/** Same length as the AYN Thor description (32 words). */
const DESCRIPTION_SOON =
    "I'll get to this description soon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud."

function media(url, { label, date, tags, description = DESCRIPTION_SOON } = {}) {
    return {
        url,
        ...(label ? { label } : {}),
        ...(date ? { date } : {}),
        ...(tags ? { tags } : {}),
        description,
    }
}

export const experimentsMedia = [

    media('https://zone-multi.b-cdn.net/Static/brat_c.jpg', {
        label: 'Charlie XCX (fan) | 3D renders',
        tags: ['3D'],
    }),



 

  
  
    media('https://zone-multi.b-cdn.net/Static/rows/SKIN-GLASS_C.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Static/rows/SKIN-MACRO-C.jpg', {
        tags: ['3D'],
    }),
    media(
        'https://zone-multi.b-cdn.net/Motion%20Projects/rows/Handheld-Meditation%20-%20Compressed.mp4',
        {
            label: 'Handheld meditation | Motion',
            tags: ['3D', 'Motion'],
        },
    ),
    media('https://zone-multi.b-cdn.net/Static/rows/octane-exp.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Static/rows/multiple-view.jpg', {
        tags: ['3D'],
    }),
    media(
        'https://zone-multi.b-cdn.net/Motion%20Projects/rows/EVA%20-%20WEBSITE%20SQUARE_c.mp4',
        {
            label: 'EVA | Website square',
            tags: ['Motion'],
        },
    ),
    media('https://zone-multi.b-cdn.net/Motion%20Projects/Umbrella%20-%201.mp4', {
        tags: ['Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Motion%20Projects/rows/Miffy-Motion-2.mp4', {
        tags: ['Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Static/rows/ISOKNOCK-1.png', {
        tags: ['3D'],
    }),
    media(
        'https://zone-multi.b-cdn.net/Motion%20Projects/rows/joi-blokes-social-c.mp4',
        {
            tags: ['3D', 'Motion'],
        },
    ),
    media(
        'https://zone-multi.b-cdn.net/Motion%20Projects/rows/metalheart-1-090c1bed25e0d082280f05a73a2ce4af.webm',
        {
            label: 'Metalheart | Motion (WebM)',
            tags: ['Motion'],
        },
    ),
    media(
        'https://zone-multi.b-cdn.net/Static/rows/ram-dass-syf-02ea4ecb748b32878e1fd68465717492.jpg',
        {
            tags: ['Graphic'],
        },
    ),
    media(
        'https://zone-multi.b-cdn.net/Static/rows/silence-mind-sticker-0cfa778762a90f1766c31961d6e27b6d.jpg',
        {
            tags: ['Graphic'],
        },
    ),
    media('https://zone-multi.b-cdn.net/Static/rows/zest_a.jpg', {
        tags: ['Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Static/rows/Logo%20Presentation%20-%20Digital.jpg', {
        tags: ['Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Static/rows/version-u.jpg', {
        tags: ['Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Motion%20Projects/rows/weekend-carti.mp4', {
        tags: ['Motion'],
    }),
    media(
        'https://zone-multi.b-cdn.net/Exploration%20Assets/images/amazon-workplace-management.png',
        { tags: ['3D', 'Graphic'] },
    ),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/glass-beverage.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/hyperlink-hearts.jpg', {
        tags: ['3D', 'Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/isoknock-1.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/max-hay-beeple-2.png', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/max-hay-beeple.png', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/onboarding-sheet.jpg', {
        tags: ['Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/quantum-rest-logo.jpg', {
        tags: ['Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/skyrim-room-1.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/skyrim-room-2.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/techbox-design.jpg', {
        tags: ['Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/vape-design.jpg', {
        tags: ['3D', 'Graphic'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/images/z-brush.jpg', {
        tags: ['3D'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/anime-face.mp4', {
        tags: ['Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/edm-artist.mp4', {
        tags: ['3D', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/extra_trip_tunnel.mp4', {
        tags: ['Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/fabric-practice.mp4', {
        tags: ['3D', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/holographic-will.mp4', {
        tags: ['Graphic', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/kh-water.mp4', {
        tags: ['3D', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/login-screen.mp4', {
        tags: ['3D', 'Graphic', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/metal-rotations-loop.mp4', {
        tags: ['3D', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/sword-animation.mp4', {
        tags: ['3D', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/trippy_tame-impala.mp4', {
        tags: ['Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/vending-machine.mp4', {
        tags: ['3D', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/vj_tunnel-2.mp4', {
        tags: ['Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/vv-square.mp4', {
        tags: ['Graphic', 'Motion'],
    }),
    media('https://zone-multi.b-cdn.net/Exploration%20Assets/videos/walk-glass.mp4', {
        tags: ['3D', 'Motion'],
    }),
]
