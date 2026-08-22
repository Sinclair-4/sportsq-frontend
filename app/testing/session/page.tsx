"use client"

import { useState } from "react"
import Link from "next/link"
import { Asterisk, CalendarDays, ChevronLeftIcon, Lock, LockIcon, MapPin, User, Users } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const createSessionSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Session name is required")
        .max(100, "Session name must be 100 characters or less"),

    location: z
        .string()
        .trim()
        .min(1, "Location is required")
        .max(200, "Location must be 200 characters or less"),

    startsAt: z
        .string()
        .min(1, "Start time is required"),

    maxPlayers: z
        .string()
        .transform((value) => {
            if (value.trim() === "") {
                return undefined
            }

            return Number(value)
        })
        .pipe(
            z
                .number()
                .int("Maximum players must be a whole number")
                .min(2, "Maximum players must be at least 2")
                .optional()
        ),

    visibility: z.enum(["PUBLIC", "PRIVATE"]),
})

type CreateSessionData = z.infer<typeof createSessionSchema>

type FormErrors = Partial<
    Record<keyof CreateSessionData, string>
>


const Page = () => {
    const [visibility, setVisibility] = useState<
        "PUBLIC" | "PRIVATE"
    >("PUBLIC")

    const [errors, setErrors] = useState<FormErrors>({})

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const result = createSessionSchema.safeParse({
            name: formData.get("name"),
            location: formData.get("location"),
            startsAt: formData.get("startsAt"),
            maxPlayers: formData.get("maxPlayers"),
            visibility,
        })

        if (!result.success) {
            const fieldErrors: FormErrors = {}

            for (const issue of result.error.issues) {
                const field = issue.path[0]

                if (
                    typeof field === "string" &&
                    !(field in fieldErrors)
                ) {
                    fieldErrors[
                        field as keyof CreateSessionData
                    ] = issue.message
                }
            }

            setErrors(fieldErrors)
            return
        }

        setErrors({})

        const session: CreateSessionData = result.data

        console.log("Valid session:", session)

        // API call will go here later.
    }

    return (
        <div className="w-full flex justify-center ">
            <div className="container max-w-2xl space-y-6 py-6">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <Link href="/home/sessions">
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <ChevronLeftIcon />
                            <span className="sr-only">
                                Back
                            </span>
                        </Button>
                    </Link>

                    <div>
                        <h1 className="text-xl font-semibold">
                            Create a session
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Set up a badminton session for your club.
                        </p>
                    </div>
                </div>

                <form
                    className="space-y-8"
                    onSubmit={handleSubmit}
                >

                    {/* Basic information */}
                    <section className="space-y-5">
                        <div className="space-y-1">
                            <h2 className="font-medium">
                                Basic information
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Give players the essential details about your session.
                            </p>
                        </div>

                        {/* Session name */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="gap-0!"
                            >
                                <Asterisk className="text-destructive" />
                                Session name
                            </Label>

                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Friday Night Badminton"
                                aria-invalid={!!errors.name}
                            />

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="location"
                                className="gap-0!"
                            >
                                <Asterisk className="text-destructive" />
                                Location
                            </Label>

                            <div className="relative">
                                <MapPin
                                    className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    size-4
                                    -translate-y-1/2
                                    text-muted-foreground
                                "
                                />

                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="e.g. ABC Badminton Court"
                                    className="pl-9"
                                    aria-invalid={!!errors.location}
                                />
                            </div>

                            {errors.location && (
                                <p className="text-sm text-destructive">
                                    {errors.location}
                                </p>
                            )}
                        </div>
                    </section>


                    {/* Schedule */}
                    <section className="space-y-5">
                        <div className="space-y-1">
                            <h2 className="font-medium">
                                Schedule
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Choose when the session will start.
                            </p>
                        </div>

                        {/* Start time */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="startsAt"
                                className="gap-0!"
                            >
                                <Asterisk className="text-destructive" />
                                Start time
                            </Label>

                            <div className="relative">
                                <CalendarDays
                                    className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    size-4
                                    -translate-y-1/2
                                    text-muted-foreground
                                "
                                />

                                <Input
                                    id="startsAt"
                                    name="startsAt"
                                    type="datetime-local"
                                    className="pl-9"
                                    aria-invalid={!!errors.startsAt}
                                />
                            </div>

                            {errors.startsAt && (
                                <p className="text-sm text-destructive">
                                    {errors.startsAt}
                                </p>
                            )}
                        </div>
                    </section>


                    {/* Players */}
                    <section className="space-y-5">
                        <div className="space-y-1">
                            <h2 className="font-medium">
                                Players
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Optionally limit how many players can join.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxPlayers">
                                Maximum players
                                <span className="ml-1 font-normal text-muted-foreground">
                                    (optional)
                                </span>
                            </Label>

                            <div className="relative">
                                <Users
                                    className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    size-4
                                    -translate-y-1/2
                                    text-muted-foreground
                                "
                                />

                                <Input
                                    id="maxPlayers"
                                    name="maxPlayers"
                                    type="number"
                                    min={2}
                                    placeholder="No limit"
                                    className="pl-9"
                                    aria-invalid={!!errors.maxPlayers}
                                />
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Leave empty if there is no player limit.
                            </p>

                            {errors.maxPlayers && (
                                <p className="text-sm text-destructive">
                                    {errors.maxPlayers}
                                </p>
                            )}
                        </div>
                    </section>


                    {/* Visibility */}
                    <section className="space-y-5">
                        <div className="space-y-1">
                            <h2 className="font-medium">
                                Visibility
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Choose who can discover and join this session.
                            </p>
                        </div>

                        <RadioGroup
                            value={visibility}
                            onValueChange={(value) =>
                                setVisibility(
                                    value as "PUBLIC" | "PRIVATE"
                                )
                            }
                            className="gap-3 grid-cols-2"
                        >

                            {/* Public */}
                            <label
                                htmlFor="public"
                                className={[
                                    "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                                    visibility === "PUBLIC"
                                        ? "border-primary bg-primary/5"
                                        : "hover:bg-muted/50",
                                ].join(" ")}
                            >
                                <RadioGroupItem
                                    id="public"
                                    value="PUBLIC"
                                    className="mt-0.5"
                                />

                                <div className="space-y-1">
                                    <p className="text-sm font-medium flex gap-1">
                                        <User className="size-4" />
                                        Public
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Members can discover this session and join it.
                                    </p>
                                </div>
                            </label>


                            {/* Private */}
                            <label
                                htmlFor="private"
                                className={[
                                    "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                                    visibility === "PRIVATE"
                                        ? "border-primary bg-primary/5"
                                        : "hover:bg-muted/50",
                                ].join(" ")}
                            >
                                <RadioGroupItem
                                    id="private"
                                    value="PRIVATE"
                                    className="mt-0.5"
                                />

                                <div className="space-y-1">
                                    <p className="text-sm font-medium flex gap-1">
                                        <LockIcon className="size-4" />
                                        Private
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Players need a join code to enter the session.
                                    </p>
                                </div>
                            </label>

                        </RadioGroup>
                    </section>


                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t pt-6">
                        <Button
                            type="button"
                            variant="ghost"
                        >
                            <Link href="/home/sessions">
                                Cancel
                            </Link>
                        </Button>

                        <Button type="submit">
                            Create session
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Page