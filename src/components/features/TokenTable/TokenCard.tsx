import { memo, useEffect, useRef, useState } from 'react';
import { Token } from '@/types/token';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatTimeAgo } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Twitter, Globe, MessageCircle, Copy, User, Lock, ChefHat, Crosshair, Ghost, Blocks } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TokenCardProps {
  token: Token;
}

export const TokenCard = memo(({ token }: TokenCardProps) => {
  const prevPriceRef = useRef(token.price);
  const [flash, setFlash] = useState<'green' | 'red' | null>(null);

  useEffect(() => {
    if (token.price > prevPriceRef.current) {
      setFlash('green');
    } else if (token.price < prevPriceRef.current) {
      setFlash('red');
    }
    prevPriceRef.current = token.price;

    const timeout = setTimeout(() => setFlash(null), 300); // 300ms flash duration
    return () => clearTimeout(timeout);
  }, [token.price]);

  return (
    <Card 
      className={cn(
        "mb-2 bg-[#0f0f0f] border-border/40 hover:border-primary/50 transition-all duration-200 cursor-pointer overflow-hidden group relative",
        flash === 'green' && "bg-green-500/10 border-green-500/30",
        flash === 'red' && "bg-red-500/10 border-red-500/30"
      )}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            {/* Token Image */}
            <div className="relative w-12 h-12 shrink-0">
              <div className="w-full h-full bg-muted rounded-md flex items-center justify-center text-xl font-bold text-muted-foreground overflow-hidden">
                {token.image ? (
                  <img src={token.image} alt={token.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="uppercase">{token.symbol[0]}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-border">
                 {/* Chain Icon Placeholder - assuming SOL based on context */}
                 <div className="w-3 h-3 bg-black rounded-full" /> 
              </div>
            </div>

            {/* Token Info */}
            <div className="flex flex-col justify-between py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-foreground tracking-tight">{token.symbol}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[80px]">{token.name}</span>
                <Copy size={10} className="text-muted-foreground/50 hover:text-foreground cursor-pointer transition-colors" />
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                <span className="text-green-400">{formatTimeAgo(token.createdAt)}</span>
                <div className="flex items-center gap-1.5">
                  <User size={10} />
                  <Lock size={10} />
                  <div className="flex gap-1 ml-1">
                    {token.socials.twitter && <Twitter size={10} className="hover:text-[#1DA1F2] transition-colors" />}
                    {token.socials.website && <Globe size={10} className="hover:text-blue-400 transition-colors" />}
                    {token.socials.telegram && <MessageCircle size={10} className="hover:text-[#0088cc] transition-colors" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MC & Vol */}
          <div className="text-right flex flex-col justify-between h-12 py-0.5">
            <div className="flex items-center justify-end gap-1">
               <span className="text-[10px] text-muted-foreground font-semibold">MC</span>
               <span className={cn(
                 "text-sm font-bold tracking-tight transition-colors duration-300",
                 flash === 'green' ? "text-green-400" : flash === 'red' ? "text-red-400" : "text-foreground"
               )}>
                 {formatCurrency(token.marketCap)}
               </span>
            </div>
            <div className="flex items-center justify-end gap-1">
               <span className="text-[10px] text-muted-foreground font-semibold">V</span>
               <span className="text-xs font-medium text-foreground/80">{formatCurrency(token.volume)}</span>
            </div>
          </div>
        </div>

        {/* Price Changes Grid */}
        <div className="grid grid-cols-4 gap-2 text-xs mb-3">
          <div className={cn("flex items-center justify-center gap-1 rounded-full py-1 px-2 bg-black/40 border border-border/20 font-medium", token.priceChange.m5 >= 0 ? "text-green-500" : "text-red-500")}>
            <User size={12} />
            {token.priceChange.m5.toFixed(0)}%
          </div>
          <div className={cn("flex items-center justify-center gap-1 rounded-full py-1 px-2 bg-black/40 border border-border/20 font-medium", token.priceChange.h1 >= 0 ? "text-green-500" : "text-red-500")}>
            <ChefHat size={12} />
            {token.priceChange.h1.toFixed(0)}%
          </div>
          <div className={cn("flex items-center justify-center gap-1 rounded-full py-1 px-2 bg-black/40 border border-border/20 font-medium", token.priceChange.h6 >= 0 ? "text-green-500" : "text-red-500")}>
            <Crosshair size={12} />
            {token.priceChange.h6.toFixed(0)}%
          </div>
          <div className={cn("flex items-center justify-center gap-1 rounded-full py-1 px-2 bg-black/40 border border-border/20 font-medium", token.priceChange.h24 >= 0 ? "text-green-500" : "text-red-500")}>
            <Ghost size={12} />
            {token.priceChange.h24.toFixed(0)}%
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex justify-between items-center text-[10px] text-muted-foreground/80 font-medium">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1">
                <User size={10} />
                <span>{token.holders}</span>
             </div>
             <div className="flex items-center gap-1">
                <span>TX</span>
                <span>{token.transactions}</span>
             </div>
             <div className="flex items-center gap-1">
                <span>Vol</span>
                <span>{formatCurrency(token.volume)}</span>
             </div>
          </div>
          
          <div className="flex gap-1.5">
             <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-[#1f1f1f] hover:bg-[#2a2a2a] text-muted-foreground border border-border/20 rounded-sm font-normal">
               0 SOL
             </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

TokenCard.displayName = 'TokenCard';
