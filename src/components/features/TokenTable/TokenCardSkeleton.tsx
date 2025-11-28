import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TokenCardSkeleton() {
  return (
    <Card className="mb-2 bg-[#0f0f0f] border-border/40 overflow-hidden">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            {/* Token Image Skeleton */}
            <Skeleton className="w-12 h-12 rounded-md bg-muted/20" />

            {/* Token Info Skeleton */}
            <div className="flex flex-col justify-between py-0.5 w-24">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-12 bg-muted/20" />
                <Skeleton className="h-3 w-20 bg-muted/20" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="h-2 w-8 bg-muted/20" />
                <div className="flex gap-1">
                  <Skeleton className="h-2 w-2 rounded-full bg-muted/20" />
                  <Skeleton className="h-2 w-2 rounded-full bg-muted/20" />
                  <Skeleton className="h-2 w-2 rounded-full bg-muted/20" />
                </div>
              </div>
            </div>
          </div>

          {/* MC & Vol Skeleton */}
          <div className="flex flex-col justify-between h-12 py-0.5 items-end">
            <Skeleton className="h-4 w-16 bg-muted/20" />
            <Skeleton className="h-3 w-12 bg-muted/20" />
          </div>
        </div>

        {/* Price Changes Grid Skeleton */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <Skeleton className="h-6 w-full rounded-full bg-muted/10" />
          <Skeleton className="h-6 w-full rounded-full bg-muted/10" />
          <Skeleton className="h-6 w-full rounded-full bg-muted/10" />
          <Skeleton className="h-6 w-full rounded-full bg-muted/10" />
        </div>

        {/* Footer Stats Skeleton */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex gap-3">
             <Skeleton className="h-3 w-8 bg-muted/20" />
             <Skeleton className="h-3 w-10 bg-muted/20" />
             <Skeleton className="h-3 w-12 bg-muted/20" />
          </div>
          <Skeleton className="h-4 w-10 rounded-sm bg-muted/20" />
        </div>
      </CardContent>
    </Card>
  );
}
