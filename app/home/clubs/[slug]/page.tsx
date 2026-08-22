'use client'

import {
    CalendarDays,
    MapPin,
    MoreHorizontal,
    Share2,
    UsersRound,
} from 'lucide-react'
import { use } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BadmintonCourtSvg from '@/components/BadmintonCourtSvg'

type Club = {
    id: string
    slug: string
    name: string
    description: string | null
    province: string | null
    country: string | null
    tags: string[]
    visibility: 'PUBLIC' | 'PRIVATE'
    logo: string | null
    ownerId: string
    createdAt: string
    updatedAt: string
    members: string[] | null
}

async function getClub(slug: string): Promise<{ data: Club }> {
    const res = await fetch(
        `http://localhost:3000/api/clubs/${encodeURIComponent(slug)}`,
        {
            method: 'GET',
            credentials: 'include',
        },
    )

    const json = await res.json()
    console.log(json)

    if (!res.ok) {
        const message =
            typeof json === 'string'
                ? json
                : json?.message || 'Failed to fetch club'

        throw new Error(message)
    }

    return json
}

function getInitials(name: string) {
    return name
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
    }).format(new Date(date))
}

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params)

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['club', slug],
        queryFn: () => getClub(slug),
        retry: false,
    })

    const background = data?.data?.logo || null

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Spinner className="size-8" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Failed to load club: {error.message}
                </p>
            </div>
        )
    }

    const club = data?.data

    if (!club) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Club not found.
                </p>
            </div>
        )
    }

    const location = [club.province, club.country]
        .filter(Boolean)
        .join(', ')

    function Profile() {
        if (!club) return null

        return (
            <div className="border-b bg-background">
                <div className="mx-auto max-w-7xl px-6 md:px-8">
                    <div className="relative">
                        {/* Main identity row */}
                        <div className="flex flex-col gap-5 pb-5 pt-0 sm:flex-row sm:items-end sm:justify-between">
                            {/* Left side */}
                            <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-end">
                                {/* Avatar */}
                                <Avatar className="-mt-16 size-32 shrink-0 border-4 border-background bg-muted shadow-md sm:-mt-20 sm:size-40">
                                    <AvatarImage
                                        src={club.logo ?? undefined}
                                        alt={`${club.name} logo`}
                                    />

                                    <AvatarFallback className="overflow-hidden text-3xl font-semibold sm:text-4xl">
                                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-sidebar-primary/5">
                                            <div className="absolute -right-5 -top-5 size-12 rounded-full bg-sidebar-primary/20 blur-md" />
                                            <div className="absolute -bottom-6 -left-4 size-14 rounded-full bg-sidebar-primary/15 blur-md" />

                                            <span className="relative text-[4rem] font-bold tracking-tight text-sidebar-primary">
                                                {getInitials(club.name)}
                                            </span>
                                        </div>
                                    </AvatarFallback>
                                </Avatar>

                                {/* Text */}
                                <div className="flex flex-col min-w-0 pt-4 sm:ml-5 sm:pb-3 sm:pt-0">
                                    {/* Name */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="truncate text-3xl font-bold tracking-tight md:text-4xl">
                                            {club.name}
                                        </h1>

                                        <Badge
                                            variant="secondary"
                                            className="rounded-full"
                                        >
                                            {club.visibility === 'PUBLIC'
                                                ? 'Public'
                                                : 'Private'}
                                        </Badge>
                                    </div>

                                    {/* Username */}
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        @{club.slug}
                                    </p>

                                    {/* Metadata */}
                                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                        {location && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPin className="size-4 shrink-0" />
                                                <span>{location}</span>
                                            </span>
                                        )}

                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays className="size-4 shrink-0" />
                                            <span>
                                                Joined {formatDate(club.createdAt)}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="flex shrink-0 sm:pb-3">
                                <Button className="ml-auto gap-2">
                                    <UsersRound className="size-4" />
                                    Join club
                                </Button>
                            </div>
                        </div>

                        {/* Description */}
                        {club.description && (
                            <div className="max-w-3xl pb-5 sm:ml-[calc(theme(width.40)+theme(space.5))]">
                                <p className="text-sm leading-6 text-muted-foreground">
                                    {club.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="bg-background max-w-7xl w-full overflow-hidden">
            {/* Cover */}
            <div className="relative h-64 overflow-hidden bg-muted md:h-80 sm:rounded-lg ">
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

                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-4 size-9 rounded-full bg-background/90"
                >
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">More options</span>
                </Button>
            </div>

            {/* Profile section */}
            {/* <Profile /> */}
            <div className='border-b w-full flex justify-center md:px-8 p-2 '>
                <div className="flex w-full max-w-7xl flex-wrap">
                    <Avatar className='shrink-0 size-32 lg:size-40 border-4 border-background bg-muted shadow-md transform lg:-translate-y-[30%] mr-4'>
                        <AvatarImage
                            src={club.logo ?? undefined}
                            alt={club.name}
                        />
                        <AvatarFallback className='overflow-hidden'>
                            <div className='relative flex items-center justify-center w-full h-full bg-linear-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-sidebar-primary/5'>
                                <div className="absolute -right-5 -top-5 size-12 rounded-full bg-sidebar-primary/20 blur-md" />
                                <div className="absolute -bottom-6 -left-4 size-14 rounded-full bg-sidebar-primary/15 blur-md" />
                                <span className="relative text-[4rem] font-bold tracking-tight text-sidebar-primary">
                                    {getInitials(club.name)}
                                </span>
                            </div>
                        </AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col flex-wrap justify-center lg:justify-start'>
                        <h1 className="truncate text-2xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
                            {club.name}

                            <Badge
                                variant="secondary"
                                className="rounded-full"
                            >
                                {club.visibility === 'PUBLIC'
                                    ? 'Public'
                                    : 'Private'}
                            </Badge>
                        </h1>

                        <p className="text-sm text-muted-foreground mb-4">
                            @{club.slug}
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            {location && (
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="size-4 shrink-0" />
                                    <span>{location}</span>
                                </span>
                            )}

                            <span className="inline-flex items-center gap-1.5">
                                <UsersRound className="size-4 shrink-0" />
                                <span>
                                    {club.members?.length ?? 0} members
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full lg:h-min lg:w-min items-center justify-center gap-2 ml-auto p-6 lg:p-0 lg:pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <Share2 className="size-4" />
                            <span className="inline">
                                Share
                            </span>
                        </Button>

                        <Button size="sm" className="gap-2 hover:-rotate-2">
                            <UsersRound className="size-4" />
                            Join club
                        </Button>


                    </div>
                </div>

            </div>
        </section>
    )
}