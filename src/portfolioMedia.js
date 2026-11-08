/**
 * Portfolio media for the home page. Experiments canvas URLs live in `src/experiments/experimentsMedia.js`.
 *
 * Image tile:  { id, type: 'image',  src, date?, title?, caseStudy? }
 * Video tile: { id, type: 'video', videoSrc, thumbnail, date?, title?, caseStudy? }
 *
 * `id` stays with that project when the grid is reordered or a project is removed.
 * Modal images and text live on `caseStudy.sections`, in the order they should appear.
 * Each featured project has its own list.
 *
 *   { type: 'note', title, body }                 bordered block, e.g. Challenge
 *   { type: 'media', mediaType: 'image', src, caption? }
 *   { type: 'media', mediaType: 'video', src, poster, caption? }
 *   { type: 'pair', items: [{ src, caption? }, { src }] }
 *   { type: 'statement', heading?, body? }        large heading plus a paragraph
 *   { type: 'text', body }                        a paragraph on its own
 *
 * Omit caption, heading, or a text block when that spot has no copy.
 * Full-width images crop to 4:3. Pair images crop to 3:4.
 */

export const featuredProjectRows = [
    [
        {
            id: 1,
            type: 'video',
            videoSrc:
                'https://zone-multi.b-cdn.net/Motion%20Projects/jb_teaser_1.mp4',
            thumbnail:
                'https://zone-multi.b-cdn.net/Static/j_b_thumbnail.jpg',
            date: '2025.01',
            title: 'J+B | Motion + 3D Product Renders',
            caseStudy: {
                label: 'Motion',
                name: 'Joi and Blokes',
                sections: [
                    {
                        type: 'note',
                        title: 'Role',
                        body: '3D and Motion Design + Art Direction + Growth Designer',
                    },
                    {
                        type: 'statement',
                        heading: 'A product line built in 3D.',
                        body: 'No photography existed yet, so I modeled, lit and rendered every product from scratch. That gave the brand launch-ready visuals for the site, social and motion.',
                    },
                    {
                        type: 'media',
                        mediaType: 'video',
                        src: 'https://zone-multi.b-cdn.net/Motion%20Projects/jb_teaser_1.mp4',
                        poster: 'https://zone-multi.b-cdn.net/Static/j_b_thumbnail.jpg',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/two-brands.jpg',
                        caption: 'Joi for her, Blokes for him, one brand underneath.',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/vial-2.jpg',
                        // caption: 'St',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/focus-showcase.jpg',
                        caption: 'Round one: product imagery for the e-commerce launch',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/packaging.jpg',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/joi-blokes-social-4.jpg',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/joi-blokes-social-1.jpg',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/joi-blokes-social-2.jpg',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/gift%20cards.png',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/trt-1.jpg',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/Nasal%20Spray%20-%201.jpg',
                        // caption: 'hello',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Case%20Study%20Focus/Joi%20and%20Blokes/Smart%20Packaging%20-%201.jpg',
                        // caption: 'hello',
                    },
                    // {
                    //     type: 'note',
                    //     title: 'Solutions',
                    //     body: 'A looping 3D film built to sit beside the stills.',
                    // },
                ],
            },
        },
        {
            id: 2,
            type: 'video',
            videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/batterypack-b.mp4',
            thumbnail:
            'https://zone-multi.b-cdn.net/Static/thumbnail-battery.jpg',
            date: '2026.09',
            title: 'Nexcharge (Smart Battery Pack) | 3D Renders',
            comingSoon: true,
            caseStudy: {
                label: 'Product',
                name: 'Nexcharge',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'Making a battery pack feel considered before the hardware is finished.',
                    },
                    {
                        type: 'media',
                        mediaType: 'video',
                        src: 'https://zone-multi.b-cdn.net/Motion%20Projects/batterypack-b.mp4',
                        poster: 'https://zone-multi.b-cdn.net/Static/thumbnail-battery.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'Hardware, explained without a diagram',
                        body: 'Turns of the pack in light, so the form reads before any spec line does.',
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: 'A product film that carries the pack from object to object.',
                    },
                ],
            },
        },
        {
            id: 3,
            type: 'video',
            videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/subframe_featured_c.mp4',
            thumbnail:
            'https://zone-multi.b-cdn.net/Static/subframe_feature.jpg',
            date: '2026.09',
            title: 'Subframe (AI Tool) | Brand (3D + Motion)',
            comingSoon: true,
            caseStudy: {
                label: 'Brand',
                name: 'Subframe',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'Giving an interface tool a physical presence.',
                    },
                    {
                        type: 'media',
                        mediaType: 'video',
                        src: 'https://zone-multi.b-cdn.net/Motion%20Projects/subframe_featured_c.mp4',
                        poster: 'https://zone-multi.b-cdn.net/Static/subframe_feature.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'A brand you can turn over in your hand',
                        body: 'Devices, color, and motion used as the brand system, not a separate campaign.',
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: '3D devices and a motion pass built from the same palette.',
                    },
                ],
            },
        },
        {
            id: 4,
            type: 'video',
            thumbnail: 'https://zone-multi.b-cdn.net/Static/All%20Product%20Blokes.jpg',
            videoSrc:'https://zone-multi.b-cdn.net/Motion%20Projects/joi-blokes-c.mp4',
            date: '2023.02',
            title: 'J+B | E-Commerce 3D Renders',
            comingSoon: true,
            caseStudy: {
                label: 'Growth marketing',
                name: 'Joi and Blokes',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'Visualizing brand before it exists.',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Static/All%20Product%20Blokes.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'A clear path from first impression to lasting connection',
                        body: 'Still renders for the store: the product, the pack, and the light treated as one system.',
                    },
                    {
                        type: 'pair',
                        items: [
                            { src: 'https://zone-multi.b-cdn.net/Static/All%20Product%20Blokes.jpg' },
                            { src: 'https://zone-multi.b-cdn.net/Static/j_b_thumbnail.jpg' },
                        ],
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: 'Visualizing brand before it exists.',
                    },
                ],
            },
        },
    ],
    [
        {
            id: 5,
            type: 'video',
            thumbnail: 'https://zone-multi.b-cdn.net/Static/seedling-feature-thumb.jpg',
            videoSrc: 'https://zone-multi.b-cdn.net/Motion%20Projects/seedling-feature-row-compressed.mp4',
            date: '2026.04',
            title: 'Seedling | Interface + Brand Design',
            comingSoon: true,
            caseStudy: {
                label: 'Interface',
                name: 'Seedling',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'A product UI and a brand that feel like the same decision.',
                    },
                    {
                        type: 'media',
                        mediaType: 'video',
                        src: 'https://zone-multi.b-cdn.net/Motion%20Projects/seedling-feature-row-compressed.mp4',
                        poster: 'https://zone-multi.b-cdn.net/Static/seedling-feature-thumb.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'The interface is the brand surface',
                        body: 'Screens, type, and color designed together so the product explains itself.',
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: 'A brand system drawn directly out of the product UI.',
                    },
                ],
            },
        },
        {
            id: 6,
            type: 'image',
            src: 'https://zone-multi.b-cdn.net/Static/ring-neighbors.jpg',
            date: '2023.02',
            title: 'Ring | Product Design',
            comingSoon: true,
            caseStudy: {
                label: 'Product',
                name: 'Ring',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'Making a neighborhood product feel calm at the scale of a map.',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Static/ring-neighbors.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'A product you understand from the first frame',
                        body: 'Interface and map treated as one view, so the job of the product is obvious.',
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: 'A product frame built around the map, not a dashboard around it.',
                    },
                ],
            },
        },
        {
            id: 7,
            type: 'image',
            src: 'https://zone-multi.b-cdn.net/Static/landing-space.jpg',
            date: '2023.02',
            title: 'Landing | Product Design',
            comingSoon: true,
            caseStudy: {
                label: 'Product',
                name: 'Landing',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'Turning a complex workspace into a first screen people can enter.',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Static/landing-space.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'The workspace, reduced to what you do next',
                        body: 'Layout, density, and hierarchy for a product that has to stay usable as it fills up.',
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: 'A first view that keeps the work in front and the chrome quiet.',
                    },
                ],
            },
        },
        {
            id: 8,
            type: 'image',
            src: 'https://zone-multi.b-cdn.net/Static/aritzia.jpg',
            date: '2023.02',
            title: 'Aritzia | Experience Design',
            comingSoon: true,
            caseStudy: {
                label: 'Experience',
                name: 'Aritzia',
                sections: [
                    {
                        type: 'note',
                        title: 'Challenge',
                        body: 'Carrying a retail brand into a digital visit without flattening it.',
                    },
                    {
                        type: 'media',
                        mediaType: 'image',
                        src: 'https://zone-multi.b-cdn.net/Static/aritzia.jpg',
                    },
                    {
                        type: 'statement',
                        heading: 'The visit, paced like the floor',
                        body: 'Editorial frames and product views sequenced so browsing still feels like walking the store.',
                    },
                    {
                        type: 'note',
                        title: 'Solutions',
                        body: 'An experience built from the brand’s own pace, not a generic shop grid.',
                    },
                ],
            },
        },
    ],
]

export const row1Media = [
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/tapo-video.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/tapo-thumbnail.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/kalshi-motion-preview-c.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/kalshi-thumbnail.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/usb-showcase.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/usb-4.1.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/multi-pc-case.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/case-thumbnail.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/skn-showcase-a.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/rows/SKIN-GLASS_C.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/Handheld-Meditation%20-%20Compressed.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/rows/HandHeld%20-%20Preview.jpg',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/ISOKNOCK-1.png',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/octane-exp.jpg',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/multiple-view.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/EVA%20-%20WEBSITE%20SQUARE_c.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/rows/eva-background.png',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/Umbrella%20-%201.mp4',
        thumbnail: 'https://zone-multi.b-cdn.net/Static/Vial%20-%201.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/Miffy-Motion-2.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/rows/Miffy-Thumbnail.jpg',
    },

]

export const row2Media = [
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/zentha-concert-1.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/zentha-cover-image-2.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/joi-blokes-social-c.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/rows/ScreamCream.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/lattice-showcase.mp4',
        thumbnail: 'https://zone-multi.b-cdn.net/Static/lattice-1.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/metalheart-1-090c1bed25e0d082280f05a73a2ce4af.webm',
        thumbnail: 'https://zone-multi.b-cdn.net/Static/rows/delicate.png',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/ram-dass-syf-02ea4ecb748b32878e1fd68465717492.jpg',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/silence-mind-sticker-0cfa778762a90f1766c31961d6e27b6d.jpg',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/zest_a.jpg',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/Logo%20Presentation%20-%20Digital.jpg',
    },
    {
        type: 'image',
        src: 'https://zone-multi.b-cdn.net/Static/rows/version-u.jpg',
    },
    {
        type: 'video',
        videoSrc:
            'https://zone-multi.b-cdn.net/Motion%20Projects/rows/weekend-carti.mp4',
        thumbnail:
            'https://zone-multi.b-cdn.net/Static/rows/weekend-carti-frame.jpg',
    },
]

export const creativeAiCategories = [
    { id: 'brand', label: 'Brand', description: 'Finished imagery made for a brand.' },
    { id: 'concepts', label: 'Concepts', description: 'Directed ideas, still taking shape.' },
    { id: 'exploration', label: 'Exploration', description: 'Earlier studies and open directions.' },
]

export const creativeAiImages = [
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/product-image-8.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/product-image-9.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/product-image-5.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/product-image-7.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/experimental-2.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/experimental-3.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/product-image-4.jpg', category: 'brand' },




    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/lifestyle-image-2.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/lifestyle-image-3.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/product-image-3.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/lifestyle-image-1.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/human-image-3.jpg', category: 'brand' },




    

    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%2011.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%2012.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%2024.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%2025.jpg', category: 'brand' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%2021.jpg', category: 'concepts' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%202.jpg', category: 'concepts' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%204.jpg', category: 'concepts' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%205.jpg', category: 'concepts' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%203.jpg', category: 'exploration' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/image%2026.jpg', category: 'exploration' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/experimental-1.jpg', category: 'exploration' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/experimental-4.jpg', category: 'exploration' },
    { src: 'https://zone-multi.b-cdn.net/Ai%20Images/ai-sec-1/human-image-2.jpg', category: 'exploration' },


]

export const creativeProofOfLife = [
    'https://zone-multi.b-cdn.net/proof-of-life/photo-1.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-5.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/AYN%20THOR.mp4',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-2.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-3.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/Crimson%20Desert.mp4',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-4.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/Work%20Example%20-%201.mp4',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-7.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-8.jpg',
    'https://zone-multi.b-cdn.net/proof-of-life/photo-2.jpg',
]
