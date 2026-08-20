import { Skeleton } from "@/components/ui/skeleton"

export default function ClubCardSkeleton() {
    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
            {/* Cover */}
            <div className="relative h-28 w-full overflow-hidden bg-muted">
                <Skeleton className="h-full w-full rounded-none" />

                {/* Optional decorative court-like skeleton */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="h-[150%] w-[150%] [perspective:800px]">
                        <div className="h-full w-full translate-y-[2%] [transform:rotateX(62deg)_rotateZ(-22deg)]">
                            <div className="relative h-full w-full rounded-sm border-2 border-primary/30">
                                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary/30" />
                                <div className="absolute inset-x-0 top-[8%] h-px bg-primary/30" />
                                <div className="absolute inset-x-0 bottom-[8%] h-px bg-primary/30" />
                                <div className="absolute inset-y-0 left-[35%] w-px bg-primary/30" />
                                <div className="absolute inset-y-0 right-[35%] w-px bg-primary/30" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Country flag */}
                <Skeleton className="absolute right-3 top-3 z-10 h-6 w-8 rounded-sm" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
                {/* Header */}
                <div className="relative flex items-start justify-between gap-3">
                    {/* Logo */}
                    <div className="absolute -top-8">
                        <Skeleton className="size-20 rounded-full border-4 border-card shadow-md" />
                    </div>

                    <div className="ml-23 flex w-full min-w-0">
                        <div className="flex w-2/3 min-w-0 flex-col gap-1">
                            {/* Club name */}
                            <Skeleton className="h-5 w-32 rounded-md" />

                            {/* Members */}
                            <div className="flex items-center gap-1">
                                <Skeleton className="size-4 rounded-full" />
                                <Skeleton className="h-4 w-12 rounded-md" />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex w-1/3 items-center justify-end">
                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                    </div>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-14 rounded-md" />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>

                {/* Actions */}
                <div className="mt-auto flex w-full justify-between">
                    <Skeleton className="h-9 w-16 rounded-md" />
                    <Skeleton className="h-9 w-16 rounded-md" />
                </div>
            </div>
        </div>
    )
}