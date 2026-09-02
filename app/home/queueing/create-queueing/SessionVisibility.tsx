import {
    Building2,
    User,
} from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

import type { FormData, OwnedClub } from "./page"


type Props = {
    form: FormData
    clubs: OwnedClub[]
    loadingClubs: boolean
    updateForm: <K extends keyof FormData>(
        field: K,
        value: FormData[K]
    ) => void
}


export function SessionVisibility({
    form,
    clubs,
    loadingClubs,
    updateForm,
}: Props) {

    return (
        <section className="space-y-6">

            <div className="space-y-1">

                <h2 className="font-medium">
                    Session Visibility
                </h2>

                <p className="text-sm text-muted-foreground">
                    Choose who can see your session.
                </p>

            </div>


            {/* Scope */}

            <RadioGroup
                value={form.scope}
                onValueChange={(value) => {
                    const scope = value as
                        | "CLUB"
                        | "PRIVATE"

                    updateForm("scope", scope)

                    if (scope === "PRIVATE") {
                        updateForm("clubId", undefined)
                    }
                }}
                className="gap-3"
            >

                {/* Club */}

                <label
                    htmlFor="visibility-club"
                    className={[
                        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                        form.scope === "CLUB"
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50",
                    ].join(" ")}
                >

                    <RadioGroupItem
                        id="visibility-club"
                        value="CLUB"
                        className="mt-0.5"
                    />

                    <div className="space-y-1">

                        <p className="flex gap-1 text-sm font-medium">

                            <Building2 className="size-4" />

                            Club session

                        </p>

                        <p className="text-sm text-muted-foreground">
                            Appears on the queueing page for
                            your club. Associate it with a
                            club you own.
                        </p>

                    </div>

                </label>


                {/* Personal */}

                <label
                    htmlFor="visibility-personal"
                    className={[
                        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                        form.scope === "PRIVATE"
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50",
                    ].join(" ")}
                >

                    <RadioGroupItem
                        id="visibility-personal"
                        value="PRIVATE"
                        className="mt-0.5"
                    />

                    <div className="space-y-1">

                        <p className="flex gap-1 text-sm font-medium">

                            <User className="size-4" />

                            Personal / Private

                        </p>

                        <p className="text-sm text-muted-foreground">
                            Only you can see this session.
                            It won&apos;t show on the
                            queueing page.
                        </p>

                    </div>

                </label>

            </RadioGroup>


            {/* Club selector */}

            {form.scope === "CLUB" && (
                <div className="space-y-2">

                    <Label htmlFor="clubId">

                        Club

                        <span className="ml-1 font-normal text-muted-foreground">
                            (select one of your clubs)
                        </span>

                    </Label>


                    {loadingClubs ? (

                        <Skeleton className="h-9 w-full" />

                    ) : clubs.length === 0 ? (

                        <p className="text-sm text-muted-foreground">
                            You don&apos;t own any clubs yet.
                            Switch to a personal session to
                            continue.
                        </p>

                    ) : (

                        <Select
                            value={form.clubId ?? ""}
                            onValueChange={(value) =>
                                updateForm("clubId", value || undefined)
                            }
                        >
                            <SelectTrigger
                                id="clubId"
                                className="w-full"
                            >
                                <SelectValue placeholder="Select a club">
                                    {clubs.find((club) => club.id === form.clubId)?.name}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {clubs.map((club) => (
                                    <SelectItem
                                        key={club.id}
                                        value={club.id}
                                    >
                                        {club.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    )}


                    {!form.clubId && clubs.length > 0 && (
                        <p className="text-sm text-destructive">
                            Select a club to associate this
                            session with.
                        </p>
                    )}

                </div>
            )}

        </section>
    )
}
