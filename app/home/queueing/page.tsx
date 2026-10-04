'use client'

import { Dot, PlusIcon, Search } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import SessionCard, { SessionCardProps } from "./SessionCard"
import SessionCardSkeleton from "@/components/SessionCardSkeleton"
import Link from "next/link"
import { fetchApi } from "@/lib/fetchApi"

const sortItems = ["All", "Live", "Upcoming", "Completed"]

export default function Page() {
    const [selectedSort, setSelectedSort] = useState("All");
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<SessionCardProps[]>([])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        try {
            async function fetchData() {
                setLoading(true);

                const response = await fetchApi('api/session/', {
                    method: 'GET'
                });
                const json = await response.json()
                console.log('[getSessions]', json)

                setSessions(json.data)
            }
            fetchData()
        } catch (err) {
            console.error("Error fetching sessions:", err)
        } finally {
            setLoading(false);
        }
    }, [])

    const dummySessions: SessionCardProps[] = [
        {
            id: '1',
            name: "Friday Night Smash",
            location: "D'Racketeers Court, Bulacan",
            startsAt: "2026-09-05T18:00:00",
            endsAt: "2026-09-05T21:00:00",
            players: 8,
            maxPlayers: 16,
            status: "upcoming",
            visibility: "PUBLIC",
            host: "Juan Dela Cruz",
            club: {
                name: "D'Racketeers",
                logo: "/images/D'Racketeers Logo.jfif",
                slug: "d-racketeers-testing"
            },
            joinCode: "friday-night-smash"
        },
    ]

    return (
        <main className="w-full flex flex-col max-w-8xl xs:p-2 md:px-4 md:py-6">
            {/* Header */}
            <div className="flex justify-between gap-4 w-full">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Join Sessions
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Explore live queueing sessions, and join open plays around you.
                    </p>
                </div>

                <div className="lg:ml-auto">
                    <Link href="queueing/create-queueing">
                        <Button className="hover:-rotate-2"><PlusIcon />Create Session</Button>
                    </Link>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search sessions..."
                        className="pl-9"
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-1">
                    {
                        sortItems.map((sort) => (
                            <Button
                                key={sort}
                                size="sm"
                                variant={
                                    selectedSort === sort
                                        ? "secondary"
                                        : "ghost"
                                }
                                onClick={() => setSelectedSort(sort)}
                            >
                                {sort}
                            </Button>
                        ))
                    }
                </div>
            </div>

            <Separator className="my-6" />

            {/* Sessions */}
            <section className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        Sessions
                        <Dot className="size-4" />
                        {/* {dummySessions.length + sessions.length} */}
                    </span>
                </div>

                <div className="grid md:grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4 grid-cols-1 shrink-0">
                    {
                        loading && (
                            <>
                                <SessionCardSkeleton />
                                <SessionCardSkeleton />
                                <SessionCardSkeleton />
                            </>
                        )
                    }

                    {
                        !loading && (
                            dummySessions.map((session) => (
                                <div key={session.id}>
                                    <SessionCard
                                        {...session}
                                    />
                                </div>
                            ))
                        )
                    }

                    {
                        !loading && (
                            sessions.map((session) => (
                                <div key={session.id}>
                                    <SessionCard
                                        {...session}
                                        players={session.players + 1}
                                    />
                                </div>
                            ))
                        )
                    }
                </div>
            </section>
        </main>
    )
}
