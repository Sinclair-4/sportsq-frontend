import BadmintonCourtSvg from "@/components/BadmintonCourtSvg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UUID } from "crypto"
import { Users } from "lucide-react"
import Link from "next/link"

export type ClubCardProps = {
    id?: string
    name: string
    description?: string
    members: string[]
    logo?: string
    background?: string
    province?: string
    country?: string
    sports?: string[]
    tags?: string[]
    slug: string
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

export default function ClubCard({
    id,
    name,
    description,
    members,
    logo,
    background,
    province,
    country,
    sports = [],
    tags = [],
    slug,
}: ClubCardProps) {
    const initials = getClubInitials(name)

    const href = 'clubs/' + slug

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
                            className="object-contain"
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
                                href={href}
                                className="min-w-0"
                            >
                                <h3 className="truncate text-base font-semibold hover:underline">
                                    {name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="size-4 shrink-0" />
                                <span>{members?.length?.toLocaleString()}</span>
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

                {/* Tags */}
                {
                    (sports.length || tags.length) > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {sports?.map((sport) => (
                                <Badge variant="secondary" key={sport}>{sport}</Badge>
                            ))}
                            {tags?.map((tag) => (
                                <Badge variant="secondary" key={tag}>{tag}</Badge>
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

                    <Link href={href}>
                        <Button
                            variant="default"
                            className="transition-transform duration-200 hover:-rotate-5"
                        >
                            Join
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}