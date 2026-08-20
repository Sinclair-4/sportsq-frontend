import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CardDemoPage() {
    return (
        <main className="container mx-auto max-w-5xl px-6 py-12">
            <div className="space-y-12">

                {/* Page Header */}
                <section className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Cards
                    </h1>

                    <p className="text-xl text-muted-foreground">
                        Examples of different card layouts and compositions using shadcn/ui.
                    </p>
                </section>

                <Separator />

                {/* Basic Card */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Basic Card
                        </h2>
                        <p className="text-muted-foreground">
                            The basic building blocks of a shadcn Card.
                        </p>
                    </div>

                    <Card className="max-w-md rounded-none">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>
                                A short description explaining what this card contains.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm leading-7">
                                This is the main content area of the card. You can put
                                practically anything here.
                            </p>
                        </CardContent>

                        <CardFooter>
                            <Button>Continue</Button>
                        </CardFooter>
                    </Card>
                </section>

                {/* Simple Card */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Simple Card
                        </h2>
                        <p className="text-muted-foreground">
                            Cards don't always need every section.
                        </p>
                    </div>

                    <Card className="max-w-md">
                        <CardContent className="pt-6">
                            <p className="leading-7">
                                A card can contain only content when you don't need a header
                                or footer.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Grid */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Card Grid
                        </h2>
                        <p className="text-muted-foreground">
                            Useful for dashboards, features, products, or categories.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Players</CardTitle>
                                <CardDescription>
                                    Manage your players.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-3xl font-bold">128</p>
                                <p className="text-sm text-muted-foreground">
                                    Total registered players
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Games</CardTitle>
                                <CardDescription>
                                    Games played this month.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-3xl font-bold">1,284</p>
                                <p className="text-sm text-muted-foreground">
                                    +12.5% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue</CardTitle>
                                <CardDescription>
                                    Total court revenue.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-3xl font-bold">₱42,500</p>
                                <p className="text-sm text-muted-foreground">
                                    This month
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Badge Card */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Card with Badge
                        </h2>
                        <p className="text-muted-foreground">
                            Combine Cards with other shadcn components.
                        </p>
                    </div>

                    <Card className="max-w-md">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Premium Plan</CardTitle>
                                <Badge>Popular</Badge>
                            </div>

                            <CardDescription>
                                Everything you need for your club.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="text-3xl font-bold">
                                ₱299
                                <span className="text-sm font-normal text-muted-foreground">
                                    /month
                                </span>
                            </div>

                            <ul className="mt-6 space-y-3 text-sm">
                                <li>✓ Unlimited players</li>
                                <li>✓ Unlimited courts</li>
                                <li>✓ Advanced statistics</li>
                                <li>✓ Tournament management</li>
                            </ul>
                        </CardContent>

                        <CardFooter>
                            <Button className="w-full">
                                Upgrade
                            </Button>
                        </CardFooter>
                    </Card>
                </section>

                {/* Interactive-looking Cards */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Interactive Cards
                        </h2>
                        <p className="text-muted-foreground">
                            Cards can also act as clickable UI elements.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader>
                                <CardTitle>My Club</CardTitle>
                                <CardDescription>
                                    Open your badminton club.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    32 members · 4 courts
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader>
                                <CardTitle>Leaderboard</CardTitle>
                                <CardDescription>
                                    View player rankings.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Updated 5 minutes ago
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader>
                                <CardTitle>Tournaments</CardTitle>
                                <CardDescription>
                                    Browse upcoming tournaments.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    12 upcoming events
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Horizontal Card */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Horizontal Card
                        </h2>
                        <p className="text-muted-foreground">
                            Useful when you need more information in a compact space.
                        </p>
                    </div>

                    <Card>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1">
                                <CardHeader>
                                    <CardTitle>Badminton Session</CardTitle>
                                    <CardDescription>
                                        Saturday · 7:00 PM
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        16 players · 4 courts · ₱140 court fee
                                    </p>
                                </CardContent>
                            </div>

                            <CardFooter className="sm:items-center">
                                <Button>View Session</Button>
                            </CardFooter>
                        </div>
                    </Card>
                </section>

                {/* Composition Example */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Composition
                        </h2>
                        <p className="text-muted-foreground">
                            Cards are intentionally composable rather than being a single
                            rigid component.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Session Overview</CardTitle>
                            <CardDescription>
                                August 17, 2026
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Players
                                    </p>
                                    <p className="text-2xl font-bold">
                                        16
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Games
                                    </p>
                                    <p className="text-2xl font-bold">
                                        24
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Revenue
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ₱3,360
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-semibold">
                                    Notes
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Players are automatically rotated between games based on
                                    their queue position.
                                </p>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button variant="outline">
                                Cancel
                            </Button>

                            <Button>
                                Manage Session
                            </Button>
                        </CardFooter>
                    </Card>
                </section>

            </div>
        </main>
    )
}