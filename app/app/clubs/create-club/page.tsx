"use client"

import { useState } from "react"
import Link from "next/link"
import { Asterisk, ChevronLeftIcon, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import provinces from "@/lib/philippinesPronvinces"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const metadataOptions = [
    "Beginner friendly",
    "Weekly queuing",
    "Casual play",
    "Competitive play",
    "All skill levels",
    "Singles available",
    "Doubles available",
    "Mixed doubles",
    "Open to new players",
    "Equipment available",
    "Coaching available",
    "Tournament focused",
]

const Page = () => {
    const [visibility, setVisibility] = useState("public")
    const [metadata, setMetadata] = useState<string[]>([])

    const toggleMetadata = (item: string) => {
        setMetadata((current) => {
            if (current.includes(item)) {
                return current.filter((value) => value !== item)
            }

            if (current.length >= 2) {
                return current
            }

            return [...current, item]
        })
    }

    return (
        <div className="container max-w-2xl space-y-6 py-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Link href="/app/clubs">
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <ChevronLeftIcon />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>


                <div>
                    <h1 className="text-xl font-semibold">
                        Start your community
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Create a club for badminton players.
                    </p>
                </div>
            </div >

            <form className="space-y-8">
                {/* Basic information */}
                <section className="space-y-5">
                    <div className="space-y-1">
                        <h2 className="font-medium">
                            Basic information
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Tell players a little about your club.
                        </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="gap-0!">
                            <Asterisk className="text-destructive" />
                            Club name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g. D'Racketeers"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="gap-0!">
                            <Asterisk className="text-destructive" />
                            Description
                        </Label>

                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell players what your club is about..."
                            className="min-h-28 resize-none"
                            required
                        />
                    </div>

                    {/* Logo */}
                    {/* <div className="space-y-2 opacity-50 cursor-not-allowed">
                        <Label htmlFor="logo">
                            Club logo
                        </Label>

                        <div className="flex items-center gap-4">
                            <div className="flex size-20 shrink-0 items-center justify-center rounded-lg border border-dashed bg-muted">
                                <ImageIcon className="size-6 text-muted-foreground" />
                            </div>

                            <div className="space-y-1">
                                <Input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    className="max-w-xs"
                                />

                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, or WEBP. Optional.
                                </p>
                            </div>
                        </div>
                    </div> */}
                </section>

                {/* Location */}
                <section className="space-y-5">
                    <div className="space-y-1">
                        <h2 className="font-medium">
                            Location
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Help players find where your club is based.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="province" className="gap-0!">
                                <Asterisk className="text-destructive" />
                                Province
                            </Label>

                            <Select name="province">
                                <SelectTrigger id="province" className="w-full">
                                    <SelectValue placeholder="Select a province" />
                                </SelectTrigger>

                                <SelectContent>
                                    {provinces.map((province) => (
                                        <SelectItem
                                            key={province}
                                            value={province}
                                        >
                                            {province}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country" className="gap-0!">
                                <Asterisk className="text-destructive" />
                                Country
                            </Label>

                            <Input
                                disabled
                                id="country"
                                name="country"
                                placeholder="Philippines"
                            />
                        </div>
                    </div>
                </section>

                {/* Club characteristics */}
                <section className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="font-medium">
                                Club characteristics
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Choose up to 2 tags that best describe your club.
                            </p>
                        </div>

                        <Badge variant="secondary" className="shrink-0">
                            {metadata.length}/2
                        </Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {metadataOptions.map((item) => {
                            const checked = metadata.includes(item)
                            const disabled =
                                metadata.length >= 2 && !checked

                            return (
                                <label
                                    key={item}
                                    className={[
                                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                                        checked
                                            ? "border-primary bg-primary/5"
                                            : "hover:bg-muted/50",
                                        disabled
                                            ? "cursor-not-allowed opacity-50"
                                            : "",
                                    ].join(" ")}
                                >
                                    <Checkbox
                                        checked={checked}
                                        disabled={disabled}
                                        onCheckedChange={() =>
                                            toggleMetadata(item)
                                        }
                                    />

                                    <span className="text-sm">
                                        {item}
                                    </span>
                                </label>
                            )
                        })}
                    </div>
                </section>

                {/* Visibility */}
                <section className="space-y-5">
                    <div className="space-y-1">
                        <h2 className="font-medium">
                            Visibility
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Choose who can discover and join your club.
                        </p>
                    </div>

                    <RadioGroup
                        value={visibility}
                        onValueChange={setVisibility}
                        className="gap-3"
                    >
                        <label
                            htmlFor="public"
                            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-muted/50"
                        >
                            <RadioGroupItem
                                id="public"
                                value="public"
                                className="mt-0.5"
                            />

                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Public
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Anyone can discover your club and view its
                                    information.
                                </p>
                            </div>
                        </label>

                        <label
                            htmlFor="private"
                            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-muted/50"
                        >
                            <RadioGroupItem
                                id="private"
                                value="private"
                                className="mt-0.5"
                            />

                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Private
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Only invited or approved members can join
                                    your club.
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
                        <Link href="/clubs">
                            Cancel
                        </Link>
                    </Button>

                    <Button type="submit">
                        Create club
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default Page