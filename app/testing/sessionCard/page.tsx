import SessionCard from "@/app/home/queueing/SessionCard"
import { Separator } from "@/components/ui/separator"

const sessions = [
    {
        name: "Friday Night Badminton",
        location: "ABC Badminton Court, Quezon City",
        startTime: "2026-09-04T19:00:00",
        endTime: "2026-09-04T22:00:00",
        currentPlayers: 12,
        maxPlayers: 16,
        status: "upcoming" as const,
        visibility: "PUBLIC" as const,
        host: "Juan Dela Cruz",
        club: {
            name: "Badminton PH",
            logo: "https://picsum.photos/seed/badmintonph/80",
            slug: "badminton-ph",
        },
        slug: "friday-night-badminton",
    },
    {
        name: "Weekend Open Play",
        location: "Makati Sports Club, Makati",
        startTime: "2026-09-05T14:00:00",
        endTime: "2026-09-05T17:00:00",
        currentPlayers: 8,
        status: "upcoming" as const,
        visibility: "PRIVATE" as const,
        host: "Maria Santos",
        club: {
            name: "Smash Society",
            slug: "smash-society",
        },
        slug: "weekend-open-play",
    },
    {
        name: "Morning Sharpen-up",
        location: "Silverdome Badminton Courts",
        startTime: "2026-09-06T08:00:00",
        currentPlayers: 6,
        maxPlayers: 8,
        status: "live" as const,
        visibility: "PUBLIC" as const,
        host: "Pedro Reyes",
        club: {
            name: "Shuttle Kings",
            logo: "https://picsum.photos/seed/shuttlekings/80",
            slug: "shuttle-kings",
        },
        slug: "morning-sharpen-up",
    },
    {
        name: "Doubles Practice",
        location: "Shuttlers Arena, Pasig",
        startTime: "2026-09-02T18:00:00",
        endTime: "2026-09-02T20:00:00",
        currentPlayers: 8,
        maxPlayers: 8,
        status: "completed" as const,
        visibility: "PUBLIC" as const,
        host: "Ana Lopez",
        club: {
            name: "Racket Rivals",
            slug: "racket-rivals",
        },
        slug: "doubles-practice",
    },
]

export default function TestPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-6">
            <div className="w-full max-w-7xl">
                <h1 className="text-2xl font-bold tracking-tight">
                    SessionCard Test
                </h1>

                <p className="text-sm text-muted-foreground">
                    Preview of the SessionCard component with sample data.
                </p>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {sessions.map((session, index) => (
                        <SessionCard
                            key={session.slug}
                            id={String(index + 1)}
                            {...session}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
