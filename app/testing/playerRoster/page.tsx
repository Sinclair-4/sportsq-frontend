import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'

const rosterSlots = Array.from({ length: 12 })

const PlayerRosterPage = () => {
    return (
        <main className="min-h-screen w-full bg-muted/30 px-6 py-10">
            <div className="mx-auto w-full max-w-6xl">
                <Card className="overflow-hidden">
                    <CardHeader className="border-b bg-background px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Users className="h-6 w-6" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">
                                    Player Roster
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Manage and organize your team players
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {rosterSlots.map((_, index) => (
                                <Card
                                    key={index}
                                    className="flex min-h-40 items-center justify-center border-dashed bg-muted/20 transition-colors hover:bg-muted/40"
                                >
                                    <div className="text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-xl font-semibold text-muted-foreground">
                                            {index + 1}
                                        </div>

                                        <p className="text-sm font-medium text-muted-foreground">
                                            Empty Player Slot
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default PlayerRosterPage