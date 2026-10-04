import { Skeleton } from "@/components/ui/skeleton"

export default function SessionCardSkeleton() {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-11 rounded-full" />
                    <div className="min-w-0 space-y-1">
                        <Skeleton className="h-3 w-20 rounded-md" />
                        <Skeleton className="h-4 w-28 rounded-md" />
                    </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-5">
                {/* Title */}
                <Skeleton className="h-6 w-3/4 rounded-md" />

                {/* Details */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-4 shrink-0 rounded-md" />
                        <Skeleton className="h-4 w-32 rounded-md" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-4 shrink-0 rounded-md" />
                        <Skeleton className="h-4 w-40 rounded-md" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-4 shrink-0 rounded-md" />
                        <Skeleton className="h-4 w-28 rounded-md" />
                    </div>
                </div>

                {/* Players */}
                <div className="mt-auto space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-4 rounded-md" />
                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                        <Skeleton className="h-4 w-14 rounded-md" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                    <Skeleton className="h-9 flex-1 rounded-md" />
                    <Skeleton className="h-9 flex-1 rounded-md" />
                </div>
            </div>
        </div>
    )
}
