import { Token, PriceUpdate } from '@/types/token';

type Listener = (update: PriceUpdate) => void;

export class WebSocketMock {
    private listeners: Listener[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private tokens: Token[] = [];

    constructor(initialTokens: Token[]) {
        this.tokens = initialTokens;
    }

    connect() {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            this.emitRandomUpdate();
        }, 1000); // Update every second
    }

    disconnect() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emitRandomUpdate() {
        if (this.tokens.length === 0) return;

        const randomToken = this.tokens[Math.floor(Math.random() * this.tokens.length)];
        const priceChangeFactor = 1 + (Math.random() * 0.02 - 0.01); // +/- 1%
        const newPrice = randomToken.price * priceChangeFactor;

        const update: PriceUpdate = {
            tokenId: randomToken.id,
            price: newPrice,
            marketCap: randomToken.marketCap * priceChangeFactor,
            volume: randomToken.volume + Math.random() * 1000,
            priceChange: {
                ...randomToken.priceChange,
                m5: randomToken.priceChange.m5 + (Math.random() * 0.5 - 0.25),
            },
        };

        this.listeners.forEach((listener) => listener(update));
    }
}

export const createMockService = (tokens: Token[]) => new WebSocketMock(tokens);
