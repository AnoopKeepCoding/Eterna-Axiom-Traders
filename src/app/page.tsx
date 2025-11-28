import TokenTable from "@/components/features/TokenTable";
import { Button } from "@/components/ui/button";
import { Settings, LayoutGrid } from "lucide-react";
import { DisplaySettings } from "@/components/features/DisplaySettings";

export default function Home() {
  return (
    <main className="flex h-screen flex-col bg-background p-2 md:p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Pulse</h1>
          <div className="flex gap-2">
            <DisplaySettings />
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
             <Settings size={18} />
           </Button>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
             <LayoutGrid size={18} />
           </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden rounded-lg border border-border/40 bg-card/20 backdrop-blur-sm">
        <TokenTable />
      </div>
    </main>
  );
}
