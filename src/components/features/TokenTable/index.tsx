"use client"

import { useEffect, useState, useMemo } from 'react';
import { Token, PriceUpdate } from '@/types/token';
import { createMockService, WebSocketMock } from '@/services/websocketMock';
import { TokenColumn } from './TokenColumn';
import { generateMockTokens } from '@/lib/mockData';
import { TokenCardSkeleton } from './TokenCardSkeleton';

export default function TokenTable() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const initialTokens = generateMockTokens(30);
      setTokens(initialTokens);
      setIsLoading(false);

      const ws = createMockService(initialTokens);
      ws.connect();

      const unsubscribe = ws.subscribe((update: PriceUpdate) => {
        setTokens((prev) => 
          prev.map((t) => {
            if (t.id === update.tokenId) {
              return {
                ...t,
                price: update.price,
                marketCap: update.marketCap,
                volume: update.volume,
                priceChange: update.priceChange,
              };
            }
            return t;
          })
        );
      });

      return () => {
        unsubscribe();
        ws.disconnect();
      };
    }, 1500); // 1.5s loading simulation

    return () => clearTimeout(timer);
  }, []);

  const newPairs = useMemo(() => tokens.filter(t => t.status === 'new'), [tokens]);
  const finalStretch = useMemo(() => tokens.filter(t => t.status === 'final'), [tokens]);
  const migrated = useMemo(() => tokens.filter(t => t.status === 'migrated'), [tokens]);

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden bg-background">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col h-full border-r border-border/40 last:border-r-0 min-w-[320px] flex-1 bg-background/50">
             <div className="px-3 py-2 border-b border-border/40 h-10 bg-[#0a0a0a]" />
             <div className="p-2 space-y-2">
               {[1, 2, 3, 4, 5].map((j) => (
                 <TokenCardSkeleton key={j} />
               ))}
             </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-x-auto bg-background text-foreground">
      <TokenColumn title="New Pairs" columnId="new" tokens={newPairs} />
      <TokenColumn title="Final Stretch" columnId="final" tokens={finalStretch} />
      <TokenColumn title="Migrated" columnId="migrated" tokens={migrated} />
    </div>
  );
}
