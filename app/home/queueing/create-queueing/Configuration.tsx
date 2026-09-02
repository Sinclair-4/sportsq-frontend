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


export function Configuration({
    form,
    updateForm,
}: Props) {

    return (
        <section className="space-y-6">

            <div className="space-y-1">

                <h2 className="font-medium">
                    Configuration
                </h2>

                <p className="text-sm text-muted-foreground">
                    Set a limit on how many players can join.
                </p>

            </div>


            {/* Maximum players */}

            <div className="space-y-2">

                <Label
                    htmlFor="maxPlayers"
                    className="gap-0! items-center"
                >

                    Maximum players

                    <span className="ml-1 font-normal text-muted-foreground">
                        (optional)
                    </span>

                </Label>

                <Input
                    id="maxPlayers"
                    type="number"
                    min={2}
                    value={form.maxPlayers ?? ""}
                    onChange={(e) => {

                        const value = e.target.value

                        updateForm(
                            "maxPlayers",
                            value === ""
                                ? undefined
                                : Number(value)
                        )

                    }}
                    placeholder="e.g. 12"
                />

                <p className="text-sm text-muted-foreground">
                    Leave empty for unlimited slots.
                </p>

            </div>

        </section>
    )
}