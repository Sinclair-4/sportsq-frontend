"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Asterisk, CheckIcon, ChevronLeftIcon, ImageIcon, LockIcon, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import provinces from "@/lib/philippinesPronvinces"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import BadmintonCourtSvg from "@/components/BadmintonCourtSvg"
import { fetchApi } from "@/lib/fetchApi"

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
    const formRef = useRef<HTMLFormElement>(null)

    const [province, setProvince] = useState("")
    const [country, setCountry] = useState("Philippines")
    const [visibility, setVisibility] = useState("PUBLIC")
    const [tags, setTags] = useState<string[]>([])

    const [openDialog, setOpenDialog] = useState(false);

    const [data, setData] = useState<any>({});

    const toggleMetadata = (item: string) => {
        setTags((current) => {
            if (current.includes(item)) {
                return current.filter((value) => value !== item)
            }

            if (current.length >= 2) {
                return current
            }

            return [...current, item]
        })
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const form = new FormData(event.currentTarget)

            const name = form.get("name") as string
            const description = form.get("description") as string
            const province = form.get("province") as string

            const formData = {
                name,
                description,
                province,
                country,
                visibility: visibility.toUpperCase(),
                tags,
            }

            const response = await fetchApi("api/clubs/create-club", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const json = await response.json()

            console.log("[handleSubmit][create-club] json:", json)

            if (response.ok) {
                // Save data for the success dialog
                setData(json.data)

                // Open dialog
                setOpenDialog(true)

                // Reset form
                formRef.current?.reset()
                setProvince("")
                setCountry("Philippines")
                setVisibility("publicPUBLIC")
                setTags([])
            } else {
                console.log("Failed to create club", json)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container max-w-2xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Link href="/home/clubs">
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

            <form className="space-y-8" onSubmit={handleSubmit} ref={formRef}>
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

                            <Select
                                name="province"
                                value={province}
                                onValueChange={(value) => setProvince(value ?? "")}
                            >
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
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
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
                            {tags.length}/2
                        </Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {metadataOptions.map((item) => {
                            const checked = tags.includes(item)
                            const disabled =
                                tags.length >= 2 && !checked

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
                        className="gap-3 grid grid-cols-2"
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
                                    Anyone can discover your club and view its
                                    information.
                                </p>
                            </div>
                        </label>

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
                        <Link href="/home/clubs">
                            Cancel
                        </Link>
                    </Button>

                    <Button type="submit">
                        Create club
                    </Button>
                </div>
            </form>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent showCloseButton={false} className="sm:max-w-sm p-0 overflow-hidden">
                    <div className="flex flex-col items-center text-center">
                        {/* Header with Icon */}
                        <DialogHeader className="relative flex w-full min-h-10 items-center justify-center overflow-hidden bg-gradient-to-br from-green-400 via-emerald-500 to-green-400 py-5 dark">
                            {/* Decorative glow */}
                            <div className="absolute -top-10 left-1/2 size-32 -translate-x-1/2 rounded-full bg-white/20 blur-2xl" />

                            <BadmintonCourtSvg
                                color="white"
                                opacity={100}
                            />

                            <div className="relative z-[2] flex size-12 items-center justify-center rounded-full bg-white text-green-600 shadow-lg shadow-green-900/50">
                                <CheckIcon className="size-6" strokeWidth={3} color="green" />
                            </div>
                        </DialogHeader>

                        {/* Main Body Content */}
                        <div className="flex flex-col items-center p-4 w-full">
                            <DialogTitle className="text-xl font-semibold">
                                SUCCESS
                            </DialogTitle>

                            <DialogDescription className="mt-1 px-11">
                                <span className="font-medium text-foreground">
                                    {data.name}
                                </span>{" "}
                                was successfully created and ready to go
                            </DialogDescription>

                            {/* Action Buttons */}
                            <DialogFooter className="mt-4 grid grid-cols-2 w-full gap-2">
                                <Link href="/home/clubs">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Close
                                    </Button>
                                </Link>

                                <Link href={`/home/clubs/${data.slug}`}>
                                    <Button className="hover:-rotate-2 w-full">
                                        View club
                                    </Button>
                                </Link>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default Page