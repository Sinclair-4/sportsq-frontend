'use client'

import { Dot, PlusIcon, Search } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import ClubCard from "./ClubCard"
import ClubCardSkeleton from "@/components/ClubCardSkeleton"
import Link from "next/link"

const sortItems = ["All", "Popular", "New", "Nearby"]

export default function Page() {
    const [selectedSort, setSelectedSort] = useState("All");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const clubs = [
        {
            name: "D'Racketeers",
            description: 'Badminton club for everyone in all levels. Weekly queueing sessions during weekends.',
            members: 133,
            logo: '/images/D\'Racketeers Logo.jfif',
            background: '/images/D\'Racketeers @J&J.jfif',
            province: 'Bulacan',
            country: 'Philippines',
            metadata: ['Beginer Friendly', 'Weekly Sessions'],
        },
        {
            name: "Alley Smash",
            description: "Smash. Play. Community. C'mon now gather your friends and family!",
            members: 1000,
            province: 'Maguindanao del Norte',
            country: 'Philippines',
        },
        {
            name: "Shuttle Squad",
            description: "A friendly community for badminton players of all skill levels.",
            members: 342,
        },
        {
            name: "Angeles Badminton Club",
            description: "Competitive games, casual sessions, and good vibes.",
            members: 856,
        },
        {
            name: "Smash Bros",
            description: "Looking for people to play, improve, and have fun with.",
            members: 128,
        },
        {
            name: "Court Kings",
            description: "For players who want regular games and friendly competition.",
            members: 521,
        },
        {
            name: "Rally Point",
            description: "Meet local players, join games, and build your badminton circle.",
            members: 267,
        },
        {
            name: "Birdie Club",
            description: "Casual badminton for everyone. No experience required.",
            members: 74,
        },
        {
            name: "Net Warriors",
            description: "Train hard, play harder. Weekly badminton sessions and events.",
            members: 694,
        },
    ]

    return (
        <main className="w-full flex flex-col max-w-7xl px-4 py-6">
            {/* Header */}
            <div className="flex justify-between gap-4 w-full">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Explore Communities
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Discover badminton communities, clubs, and groups near you.
                    </p>
                </div>

                <div className="lg:ml-auto">
                    <Link href="clubs/create-club">
                        <Button className="hover:-rotate-2"><PlusIcon />Create Club</Button>
                    </Link>
                </div>
            </div >

            {/* Controls */}
            < div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" >
                {/* Search */}
                <div className="relative w-full sm:max-w-xs" >
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search communities..."
                        className="pl-9"
                    />
                </div >

                {/* Sort */}
                <div className="flex items-center gap-1" >
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
                </div >
            </div >

            <Separator className="my-6" />

            {/* Communities */}
            <section className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        Communities
                        <Dot className="size-4" />
                        {clubs.length}
                    </span>

                    {/* <Button><PlusIcon />Create</Button> */}
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 ">
                    {
                        loading && (
                            <>
                                <ClubCardSkeleton />
                                <ClubCardSkeleton />
                                <ClubCardSkeleton />
                            </>
                        )
                    }

                    {
                        !loading && (
                            clubs.map((club) => (
                                <div key={club.name}>
                                    <ClubCard
                                        {...club}
                                    />
                                </div>
                            ))
                        )
                    }
                </div>
            </section>
        </main >
    )
}