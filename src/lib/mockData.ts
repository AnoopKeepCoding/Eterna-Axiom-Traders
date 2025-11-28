import { Token } from '@/types/token';

const REALISTIC_TOKENS = [
    { symbol: 'Luxo Jr.', name: 'pixars mascot', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Luxo' },
    { symbol: 'NT', name: 'New Terminal', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=NT' },
    { symbol: 'FROGE', name: 'Worry Frog', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=FROGE' },
    { symbol: 'HuaweiAI', name: 'HuaweiAI', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Huawei' },
    { symbol: 'REDBULL', name: 'Red Bull', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=RedBull' },
    { symbol: 'REVERSE', name: 'REVERSE Token', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Reverse' },
    { symbol: 'PORNHUB', name: 'PORNHUB OFFICIAL', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Pornhub' },
    { symbol: 'RAIN', name: 'Rain', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Rain' },
    { symbol: 'TSLAx', name: 'Tesla xStock', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Tesla' },
    { symbol: 'NVIDIA', name: 'NVIDIA', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Nvidia' },
    { symbol: 'Nudaeng', name: 'Nudeung', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Nudaeng' },
    { symbol: 'FLOP', name: 'Lil Flop Token', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Flop' },
    { symbol: 'CUNT', name: 'CUNT', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Cunt' },
    { symbol: 'FAPGUY', name: 'Fap fap fap', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Fap' },
    { symbol: 'Olaf', name: 'Olaf', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Olaf' },
    { symbol: 'Apple', name: 'Apple', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Apple' },
    { symbol: 'GOLD', name: 'Gold', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Gold' },
    { symbol: 'PVE', name: 'President Vs Elon', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=PVE' },
    { symbol: 'BlackBall', name: 'Black Ball', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=BlackBall' },
    { symbol: 'VSN', name: 'Vision', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=Vision' },
];

export function generateMockTokens(count: number): Token[] {
    const tokens: Token[] = [];
    const statuses: ('new' | 'final' | 'migrated')[] = ['new', 'final', 'migrated'];

    for (let i = 0; i < count; i++) {
        const status = statuses[i % 3];
        const template = REALISTIC_TOKENS[i % REALISTIC_TOKENS.length];

        tokens.push({
            id: `token-${i}`,
            name: template.name,
            symbol: template.symbol,
            image: template.image, // Using DiceBear for consistent placeholder avatars
            marketCap: Math.random() * 1000000 + 5000,
            volume: Math.random() * 50000 + 1000,
            price: Math.random() * 10,
            priceChange: {
                m5: (Math.random() * 40) - 10,
                h1: (Math.random() * 60) - 20,
                h6: (Math.random() * 80) - 30,
                h24: (Math.random() * 100) - 40,
            },
            transactions: Math.floor(Math.random() * 1000) + 10,
            holders: Math.floor(Math.random() * 500) + 5,
            createdAt: Date.now() - Math.floor(Math.random() * 10000000),
            socials: {
                twitter: Math.random() > 0.3 ? 'https://twitter.com' : undefined,
                telegram: Math.random() > 0.3 ? 'https://t.me' : undefined,
                website: Math.random() > 0.5 ? 'https://example.com' : undefined,
            },
            audit: {
                scam: Math.random() < 0.1,
                verified: Math.random() > 0.8,
            },
            status,
        });
    }
    return tokens;
}
