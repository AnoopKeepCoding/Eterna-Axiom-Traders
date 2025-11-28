import { Token } from '@/types/token';
import { TokenCard } from './TokenCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setColumnFilter } from '@/store/slices/tableSlice';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Zap, Filter, SlidersHorizontal, LayoutGrid, Volume2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface TokenColumnProps {
  title: string;
  columnId: string;
  tokens: Token[];
}

export function TokenColumn({ title, columnId, tokens }: TokenColumnProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.table.filters[columnId]);

  const handleSort = () => {
    const newDirection = filter?.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setColumnFilter({ columnId, filter: { direction: newDirection } }));
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    if (!filter) return 0;
    const { sort, direction } = filter;
    
    let valA = a[sort as keyof Token];
    let valB = b[sort as keyof Token];

    if (sort === 'priceChange') {
       valA = a.priceChange[filter.timeRange];
       valB = b.priceChange[filter.timeRange];
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full border-r border-border/40 last:border-r-0 min-w-[320px] flex-1 bg-background/50">
      {/* Column Header */}
      <div className="px-3 py-2 border-b border-border/40 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10 h-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-foreground">{title}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
             <Zap size={12} className="text-muted-foreground/70" />
             <span className="text-xs font-medium">0</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
           <div className="flex items-center gap-0.5 mr-2">
              <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-border/50 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer rounded-sm">P1</Badge>
              <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-border/50 text-muted-foreground hover:text-foreground cursor-pointer rounded-sm">P2</Badge>
              <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-border/50 text-muted-foreground hover:text-foreground cursor-pointer rounded-sm">P3</Badge>
           </div>
           
           <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent/50 text-muted-foreground" onClick={handleSort}>
             <SlidersHorizontal size={12} />
           </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 w-full h-full">
        <div className="p-2 space-y-2 pb-4">
          {sortedTokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
