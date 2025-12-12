export default function manifest() {
    return {
        name: 'VapeFlow',
        short_name: 'VapeFlow',
        description: 'Premium Vaporizers & Accessories',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#8A2BE2',
        icons: [
            {
                src: '/icon',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
