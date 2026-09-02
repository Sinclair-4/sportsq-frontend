import {
    Asterisk,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { FormData } from "./page"


type Props = {
    form: FormData
    updateForm: <K extends keyof FormData>(
        field: K,
        value: FormData[K]
    ) => void
}


export function BasicInfo({
    form,
    updateForm,
}: Props) {

    return (
        <section className="space-y-6">

            <div className="space-y-1">

                <h2 className="font-medium">
                    Basic Information
                </h2>

                <p className="text-sm text-muted-foreground">
                    This will help people find your session.
                </p>

            </div>


            {/* Name */}

            <div className="space-y-2">

                <Label
                    htmlFor="name"
                    className="gap-0! items-center"
                >

                    <Asterisk className="text-destructive" />

                    Session Name

                </Label>

                <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                        updateForm(
                            "name",
                            e.target.value
                        )
                    }
                    placeholder="e.g. Queueing night"
                />

            </div>


            {/* Location */}

            <div className="space-y-2">

                <Label
                    htmlFor="location"
                    className="gap-0! items-center"
                >

                    <Asterisk className="text-destructive" />

                    Location

                </Label>

                <Input
                    id="location"
                    value={form.location}
                    onChange={(e) =>
                        updateForm(
                            "location",
                            e.target.value
                        )
                    }
                    placeholder="e.g. 123 Main St"
                />

            </div>


            {/* Start date */}

            <div className="space-y-2">

                <Label
                    htmlFor="startAt"
                    className="gap-0! items-center"
                >

                    <Asterisk className="text-destructive" />

                    Start Date

                </Label>

                <Input
                    id="startsAt"
                    type="datetime-local"
                    value={form.startsAt}
                    onChange={(e) =>
                        updateForm(
                            "startsAt",
                            e.target.value
                        )
                    }
                />

            </div>


            {/* End date */}

            <div className="space-y-2">

                <Label
                    htmlFor="endsAt"
                    className="gap-0! items-center"
                >

                    <Asterisk className="text-destructive" />

                    End Date

                </Label>

                <Input
                    id="endsAt"
                    type="datetime-local"
                    value={form.endsAt}
                    onChange={(e) =>
                        updateForm(
                            "endsAt",
                            e.target.value
                        )
                    }
                />

            </div>

        </section>
    )
}
