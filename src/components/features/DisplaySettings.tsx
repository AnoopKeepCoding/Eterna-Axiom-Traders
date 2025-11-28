import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { List, Check, Monitor, Eye, Volume2 } from "lucide-react";

export function DisplaySettings() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="rounded-full h-8 px-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground border border-border/20">
          <List size={14} className="mr-2" /> Display
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-[#0f0f0f] border-border/40" align="end">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5">View Options</div>
          <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 text-xs font-normal hover:bg-accent/50">
            <Monitor size={14} className="mr-2 text-muted-foreground" /> Compact Mode
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 text-xs font-normal hover:bg-accent/50">
            <Eye size={14} className="mr-2 text-muted-foreground" /> Show Hidden
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 text-xs font-normal hover:bg-accent/50">
            <Volume2 size={14} className="mr-2 text-muted-foreground" /> Sound Effects
            <Check size={14} className="ml-auto text-green-500" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
