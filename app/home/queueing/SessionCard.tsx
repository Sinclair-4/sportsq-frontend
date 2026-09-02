import ClubAvatar from "@/components/ClubAvatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

export type SessionCardProps = {
    id?: string
    name: string
    location: string
    startTime: string
    endTime?: string
    currentPlayers: number
    maxPlayers?: number
    status: "upcoming" | "live" | "completed"
    visibility: "PUBLIC" | "PRIVATE"
    host?: string
    club?: {
        name: string
        logo?: string
        slug?: string
    }
    slug: string
}

function formatDateTime(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })
}

function getStatusConfig(status: SessionCardProps["status"]) {
    switch (status) {
        case "live":
            return {
                label: "Live",
                pillClassName:
                    "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
                dotClassName: "bg-green-600 dark:bg-green-500 animate-pulse",
            }
        case "upcoming":
            return {
                label: "Upcoming",
                pillClassName:
                    "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
                dotClassName: "bg-blue-600 dark:bg-blue-500",
            }
        case "completed":
            return {
                label: "Completed",
                pillClassName:
                    "bg-muted text-foreground/60 dark:text-muted-foreground",
                dotClassName: "bg-muted-foreground/50",
            }
    }
}

export default function SessionCard({
    id,
    name,
    location,
    startTime,
    endTime,
    currentPlayers,
    maxPlayers,
    status,
    host,
    club,
    slug,
}: SessionCardProps) {
    const statusConfig = getStatusConfig(status)
    const href = `queueing/${slug}`
    const playerPercentage = maxPlayers
        ? Math.min((currentPlayers / maxPlayers) * 100, 100)
        : null
    const filled = maxPlayers ? currentPlayers >= maxPlayers : false

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:cursor-pointer h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6">
                {club ? (
                    <Link
                        href={club.slug ? `clubs/${club.slug}` : "#"}
                        className="group/club flex items-center gap-3"
                    >
                        <ClubAvatar
                            logo={club.logo ?? ""}
                            name={club.name}
                            size={11}
                            border={false}
                        />
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Organized by
                            </p>
                            <span className="truncate text-sm font-medium text-foreground/80 hover:underline">
                                {club.name}
                            </span>
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className={`size-2.5 rounded-full ${statusConfig.dotClassName}`} />
                        <span className="text-sm font-medium text-foreground/80">
                            {statusConfig.label}
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {club && (
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusConfig.pillClassName}`}
                        >
                            <span className={`size-1.5 rounded-full ${statusConfig.dotClassName}`} />
                            {statusConfig.label}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-5">
                {/* Title */}
                <Link href={href} className="min-w-0">
                    <h3 className="truncate text-lg font-semibold hover:underline">
                        {name}
                    </h3>
                </Link>

                {/* Details */}
                <div className="flex flex-col gap-3 text-sm text-foreground/80">
                    {/* Location */}
                    <div className="flex items-center gap-3">
                        <MapPin className="size-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{location}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <span className="flex flex-wrap items-center gap-x-1.5">
                            {formatDateTime(startTime)}
                            {endTime && (
                                <span className="text-muted-foreground">
                                    - {formatDateTime(endTime)}
                                </span>
                            )}
                        </span>
                    </div>

                    {/* Host */}
                    {host && (
                        <div className="flex items-center gap-3">
                            <Clock className="size-4 shrink-0 text-muted-foreground" />
                            <span>Hosted by {host}</span>
                        </div>
                    )}
                </div>

                {/* Players */}
                <div className="mt-auto space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="size-4" />
                            <span className="text-foreground/80">
                                {currentPlayers}
                                {maxPlayers && (
                                    <span className="text-muted-foreground">
                                        /{maxPlayers}
                                    </span>
                                )}
                                {" "}players
                            </span>
                        </div>

                        {playerPercentage !== null && (
                            <span className="text-xs text-foreground/60">
                                {filled ? "Full" : `${Math.round(playerPercentage)}% filled`}
                            </span>
                        )}
                    </div>

                    {maxPlayers && (
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-300"
                                style={{ width: `${playerPercentage}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                    <Button
                        variant="outline"
                        className="flex-1"
                    >
                        View details
                    </Button>

                    {status !== "completed" && (
                        <Link href={href} className="flex-1">
                            <Button
                                variant="default"
                                className="w-full transition-transform duration-200 hover:-rotate-2"
                            >
                                Join
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}