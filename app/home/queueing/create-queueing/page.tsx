"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { ChevronLeftIcon } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { fetchApi } from "@/lib/fetchApi"

import { SessionVisibility } from "./SessionVisibility"
import { BasicInfo } from "./BasicInfo"
import { Configuration } from "./Configuration"
import { SessionSuccess } from "./SessionSuccess"


// ---------------------------------------------
// Types
// ---------------------------------------------

export type OwnedClub = {
    id: string
    name: string
    logo?: string
}

type UserResponse = {
    data?: {
        ownedClubs?: OwnedClub[]
    }
}

// type CreateSessionResponse = {
//     data?: {
//         name?: string
//     }
// }


// ---------------------------------------------
// Validation
// ---------------------------------------------

const formSchema = z
    .object({
        name: z.string().min(1, "Please enter a name"),
        location: z.string().min(1, "Please enter a location"),
        startsAt: z.string().min(1, "Please enter a start date"),
        endsAt: z.string().min(1, "Please enter an end date"),
        scope: z.enum(["CLUB", "PRIVATE"]),
        clubId: z.string().optional(),
        maxPlayers: z
            .number()
            .int("Maximum players must be a whole number")
            .min(2, "Maximum players must be at least 2")
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (data.scope === "CLUB" && !data.clubId) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["clubId"],
                message: "Select a club",
            })
        }
    })

export type FormData = z.infer<typeof formSchema>


// ---------------------------------------------
// Component
// ---------------------------------------------

export default function CreateSession() {

    // Current step
    const [page, setPage] = useState(0)

    // Form data
    const [form, setForm] = useState<FormData>({
        name: "",
        location: "",
        startsAt: "",
        endsAt: "",
        scope: "PRIVATE",
        clubId: undefined,
        maxPlayers: undefined,
    })

    // Created session name
    const [success, setSuccess] = useState<string | null>(null)

    // Created session code
    const [code, setCode] = useState<string | null>(null)

    // ---------------------------------------------
    // Fetch clubs
    // ---------------------------------------------

    const {
        data: clubs = [],
        isLoading: loadingClubs,
        isError: clubsError,
    } = useQuery({
        queryKey: ["user", "me"],
        queryFn: async (): Promise<OwnedClub[]> => {
            const response = await fetchApi("api/user/me", {
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Failed to fetch user")
            }

            const data: UserResponse = await response.json()

            return data.data?.ownedClubs ?? []
        },
    })


    // ---------------------------------------------
    // Create session
    // ---------------------------------------------

    const createSessionMutation = useMutation({
        mutationFn: async (data: FormData): Promise<any> => {
            const response = await fetchApi("api/session/create-session", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const json: any = await response.json()

            console.log(
                "[create-session] response:",
                json
            )

            if (!response.ok) {
                throw new Error("Failed to create session")
            }

            return json
        },

        onSuccess: (data) => {
            setSuccess(
                data.data?.name ??
                form.name
            )

            setCode(
                data.data?.joinCode ?? ""
            )
        },

        onError: (error) => {
            console.error("Failed to create session:", error)
        },
    })


    // ---------------------------------------------
    // Update form
    // ---------------------------------------------

    function updateForm<K extends keyof FormData>(
        field: K,
        value: FormData[K]
    ) {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))
    }


    // ---------------------------------------------
    // Navigation
    // ---------------------------------------------

    function nextPage() {
        setPage((previous) => previous + 1)
    }

    function previousPage() {
        setPage((previous) => previous - 1)
    }


    // ---------------------------------------------
    // Check if current page is valid
    // ---------------------------------------------

    function canContinue() {

        if (page === 0) {
            return (
                form.scope === "PRIVATE" ||
                !!form.clubId
            )
        }

        if (page === 1) {
            return (
                form.name.trim().length > 0 &&
                form.location.trim().length > 0 &&
                form.startsAt.trim().length > 0 &&
                form.endsAt.trim().length > 0
            )
        }

        return true
    }


    // ---------------------------------------------
    // Submit
    // ---------------------------------------------

    function submit() {
        const result = formSchema.safeParse(form)

        if (!result.success) {
            console.error(result.error)
            return
        }

        createSessionMutation.mutate(result.data)
    }


    // ---------------------------------------------
    // Render
    // ---------------------------------------------

    return (
        <div className="w-full flex flex-col max-w-2xl gap-6 h-full">

            {success ? (

                <SessionSuccess
                    sessionName={success}
                    viewHref={`/home/queueing/${code}`}
                />

            ) : (

                <>

                    {/* Header */}

                    <div className="flex items-center gap-2">

                        <Link href="/home/queueing">
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
                                Start your session
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Customize your queueing experience.
                            </p>
                        </div>

                    </div>


                    {/* Progress */}

                    <div className="flex gap-4">

                        {[0, 1, 2].map((step) => (
                            <div
                                key={step}
                                className={`
                                    flex-1
                                    h-1
                                    shadow-xs
                                    ${step === page
                                        ? "bg-primary"
                                        : "bg-muted"
                                    }
                                `}
                            />
                        ))}

                    </div>


                    {/* Pages */}

                    {page === 0 && (
                        <SessionVisibility
                            form={form}
                            clubs={clubs}
                            loadingClubs={loadingClubs}
                            updateForm={updateForm}
                        />
                    )}

                    {page === 1 && (
                        <BasicInfo
                            form={form}
                            updateForm={updateForm}
                        />
                    )}

                    {page === 2 && (
                        <Configuration
                            form={form}
                            updateForm={updateForm}
                        />
                    )}


                    {/* Controls */}

                    <div className="grid grid-cols-2 gap-4 mt-auto">

                        <Button
                            variant="secondary"
                            disabled={
                                page === 0 ||
                                createSessionMutation.isPending
                            }
                            onClick={previousPage}
                        >
                            Previous
                        </Button>


                        {page < 2 ? (

                            <Button
                                disabled={
                                    !canContinue() ||
                                    clubsError
                                }
                                onClick={nextPage}
                            >
                                Next
                            </Button>

                        ) : (

                            <Button
                                disabled={createSessionMutation.isPending}
                                onClick={submit}
                            >
                                {createSessionMutation.isPending
                                    ? "Creating..."
                                    : "Submit"
                                }
                            </Button>

                        )}

                    </div>

                </>

            )}

        </div>
    )
}
