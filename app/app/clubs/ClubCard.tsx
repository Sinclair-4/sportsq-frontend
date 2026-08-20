import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"

export type ClubCardProps = {
    name?: string
    description?: string
    members?: number
    logo?: string
    background?: string
    province?: string
    country?: string
    sports?: string[]
    metadata?: string[]
}

function getClubInitials(name: string) {
    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)

    if (words.length === 0) {
        return "C"
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase()
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase()
}

export function BadmintonCourtSvg() {
    return (
        <div className="absolute inset-0 flex items-center justify-center [perspective:800px]">
            <div className="h-[150%] w-[150%] translate-y-[2%] opacity-30 [transform:rotateX(62deg)_rotateZ(-22deg)]">
                <svg
                    viewBox="0 0 1340 610"
                    className="h-full w-full max-w-none"
                    fill="none"
                    stroke="var(--sidebar-primary)"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Court boundary */}
                    <rect
                        x="0"
                        y="0"
                        width="1340"
                        height="610"
                    />

                    {/* Doubles sidelines */}
                    <line
                        x1="0"
                        y1="46"
                        x2="1340"
                        y2="46"
                    />
                    <line
                        x1="0"
                        y1="564"
                        x2="1340"
                        y2="564"
                    />

                    {/* Net */}
                    <line
                        x1="670"
                        y1="0"
                        x2="670"
                        y2="610"
                        strokeWidth="5"
                    />

                    {/* Singles sidelines */}
                    <line
                        x1="472"
                        y1="0"
                        x2="472"
                        y2="610"
                    />
                    <line
                        x1="868"
                        y1="0"
                        x2="868"
                        y2="610"
                    />

                    {/* Short service lines */}
                    <line
                        x1="76"
                        y1="0"
                        x2="76"
                        y2="610"
                    />
                    <line
                        x1="1264"
                        y1="0"
                        x2="1264"
                        y2="610"
                    />

                    {/* Center service lines */}
                    <line
                        x1="0"
                        y1="305"
                        x2="472"
                        y2="305"
                    />
                    <line
                        x1="868"
                        y1="305"
                        x2="1340"
                        y2="305"
                    />
                </svg>
            </div>
        </div>
    )
}

export default function ClubCard({
    name = "D'Racketeers",
    description = "Badminton club for everyone in all levels",
    members = 120,
    logo,
    background,
    province,
    country,
    sports = [],
    metadata: adjectives = [],
}: ClubCardProps) {
    const initials = getClubInitials(name)

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:cursor-pointer h-full">
            {/* Cover */}
            <div className="relative h-28 w-full overflow-hidden bg-muted">
                {background ? (
                    <>
                        <img
                            src={background}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/10" />
                    </>
                ) : (
                    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-muted">
                        {/* Badminton court */}
                        <BadmintonCourtSvg />

                        {/* Soft overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
                    </div>
                )}

                {country?.toLowerCase() === "philippines" && (
                    <div className="absolute right-3 top-3 z-10 w-8 overflow-hidden rounded-sm shadow-sm">
                        <img
                            src="/images/philippines.png"
                            alt="Philippines"
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
                {/* Header */}
                <div className="relative flex items-start justify-between gap-3">
                    {/* Logo */}
                    <div className="absolute -top-8">
                        <div className="size-20 overflow-hidden rounded-full border-4 border-card bg-muted shadow-md">
                            {logo ? (
                                <img
                                    src={logo}
                                    alt={`${name} logo`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-sidebar-primary/5">
                                    <div className="absolute -right-5 -top-5 size-12 rounded-full bg-sidebar-primary/20 blur-md" />
                                    <div className="absolute -bottom-6 -left-4 size-14 rounded-full bg-sidebar-primary/15 blur-md" />

                                    <span className="relative text-lg font-bold tracking-tight text-sidebar-primary">
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ml-23 flex w-full min-w-0">
                        <div className="flex w-2/3 min-w-0 flex-col">
                            <Link
                                href={`/app/clubs/${encodeURIComponent(name)}`}
                                className="min-w-0"
                            >
                                <h3 className="truncate text-base font-semibold hover:underline">
                                    {name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="size-4 shrink-0" />
                                <span>{members.toLocaleString()}</span>
                            </div>
                        </div>

                        {(province || country) && (
                            <div className="flex w-1/3 items-center justify-end">
                                <span className="text-end text-xs text-muted-foreground">
                                    {province && country
                                        ? `${province}, ${country}`
                                        : province || country}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pills */}
                {
                    (sports.length || adjectives.length) > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {sports?.map((sport) => (
                                <Badge variant="secondary">{sport}</Badge>
                            ))}
                            {adjectives?.map((adjective) => (
                                <Badge variant="secondary">{adjective}</Badge>
                            ))}
                        </div>
                    )}

                {/* Description */}
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {description}
                </p>

                {/* Actions */}
                <div className="mt-auto flex w-full justify-between">
                    <Button variant="ghost">
                        View
                    </Button>

                    <Button
                        variant="default"
                        className="transition-transform duration-200 hover:-rotate-5"
                    >
                        Join
                    </Button>
                </div>
            </div>
        </div>
    )
}