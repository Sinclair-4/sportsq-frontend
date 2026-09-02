"use client"

import Link from "next/link"
import { CircleCheck } from "lucide-react"

import { Button } from "@/components/ui/button"


type SessionSuccessProps = {
    sessionName?: string
    viewHref?: string
}


export function SessionSuccess({
    sessionName,
    viewHref,
}: SessionSuccessProps) {

    return (
        <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
            <div className="flex max-w-md flex-col items-center gap-8 text-center">

                {/* Success icon */}

                <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CircleCheck className="size-10" />
                </div>

                {/* Heading */}

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Session created!
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        {sessionName ? (
                            <>
                                <span className="font-medium text-foreground">
                                    {sessionName}
                                </span>{" "}
                                is ready. You can now invite
                                players and start playing.
                            </>
                        ) : (
                            "Your session is ready. You can now invite players and start playing."
                        )}
                    </p>
                </div>

                {/* Actions */}

                <div className="flex w-full max-w-xs flex-col items-stretch gap-2">
                    <Link href={viewHref ?? "/home/queueing"}>
                        <Button size="lg" className="w-full">
                            View Session
                        </Button>
                    </Link>

                    <Link href="/home">
                        <Button
                            variant="ghost"
                            className="w-full"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}