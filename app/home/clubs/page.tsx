'use client'

import { Dot, PlusIcon, Search } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import ClubCard, { ClubCardProps } from "./ClubCard"
import ClubCardSkeleton from "@/components/ClubCardSkeleton"
import Link from "next/link"
import { fetchApi } from "@/lib/fetchApi"

const sortItems = ["All", "Popular", "New", "Nearby"]

export default function Page() {
    const [selectedSort, setSelectedSort] = useState("All");
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState<ClubCardProps[]>([])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        try {
            async function fetchData() {
                setLoading(true);

                const response = await fetchApi('api/clubs/', {
                    method: 'GET'
                });
                const json = await response.json()
                console.log(json)

                setClubs(json.data)
            }
            fetchData()
        } catch (err) {
            console.error("Error fetching clubs:", err)
        } finally {
            setLoading(false);
        }
    }, [])

    const dummyClubs = [
        {
            id: 'b2012d3d-62da-4e58-b261-be1c9197344c',
            name: "D'Racketeers",
            description: 'Badminton club for everyone in all levels. Weekly queueing sessions during weekends.',
            members: [''],
            logo: '/images/D\'Racketeers Logo.jfif',
            background: '/images/D\'Racketeers @J&J.jfif',
            province: 'Bulacan',
            country: 'Philippines',
            tags: ['Beginer Friendly', 'Weekly Sessions'],
            slug: 'd-racketeers-testing',
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
                        {dummyClubs.length + clubs.length}
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
                            dummyClubs.map((club) => (
                                <div key={club.id}>
                                    <ClubCard
                                        {...club}
                                    />
                                </div>
                            ))
                        )
                    }

                    {
                        !loading && (
                            clubs.map((club) => (
                                <div key={club.id}>
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