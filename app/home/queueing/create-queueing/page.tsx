'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Asterisk, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import z from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Please enter a name"),
    location: z.string().min(1, "Please enter a location"),
})

type FormData = z.infer<typeof formSchema>

export default function CreateSession() {
    const [page, setPage] = useState(0)

    const pages = [
        <BasicInfo />,
        "asdfa",
        "asdasa",
        "asdfa"
    ]

    const form = useForm({
        defaultValues: {
            name: "",
            location: ""
        } as FormData,

        onSubmit: ({ value }) => {
            const result = formSchema.safeParse(value)

            if (!result.success) {
                console.log(result.error)
                return
            }

            console.log('submitted:', result.data)
        }
    })

    function BasicInfo() {
        return (
            <section className="space-y-6">
                <div className="space-y-1">
                    <h2 className="font-medium">Basic Information</h2>
                    <p className="text-sm text-muted-foreground">
                        This will help people find your session.
                    </p>
                </div>

                <form.Field name='name'>
                    {(field) => (
                        <div className="space-y-2">
                            <Label className="gap-0! items-center">
                                <Asterisk className="text-destructive" />
                                Session Name
                            </Label>
                            <Input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="e.g. Queueing night"
                            />
                        </div>
                    )}
                </form.Field>

                <form.Field name='location'>
                    {(field) => (
                        <div className="space-y-2">
                            <Label className="gap-0! items-center">
                                <Asterisk className="text-destructive" />
                                Location
                            </Label>
                            <Input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="e.g. 123 Main St"
                            />
                        </div>
                    )}
                </form.Field>
            </section>
        )
    }

    return (
        <div className="w-full flex flex-col max-w-2xl gap-6 h-full">
            <div className="flex items-center gap-2">
                <Link href="/home/queueing">
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
                        Start your session
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Customize your queueing experience.
                    </p>
                </div>
            </div >

            {/* Navigation chu chu */}
            {/* <div className="mx-auto flex">
                {
                    pages.map((pageEl, index) => (
                        <div className="flex items-center">
                            <button
                                className={`
                                        w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-400
                                        ${index === page ? 'bg-primary text-muted' : 'bg-muted  text-muted-foreground'}
                                    `}
                            >
                                {index + 1}
                            </button>
                            <div className={`
                                w-12 h-1 
                                ${index === page
                                    ? 'bg-primary'
                                    : 'bg-muted'
                                }    
                            `} />
                        </div>
                    ))
                }
            </div> */}

            <div className="flex gap-4">
                {
                    pages.map((pageEl, index) => (
                        <div className={`
                            flex-1 h-1
                            ${index === page
                                ? 'bg-primary'
                                : 'bg-muted'
                            }    
                            shadow-xs
                        `}></div>
                    ))
                }
            </div>

            {/* Multi-stage form */}
            <div className='flex-1'>
                {pages[page]}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="secondary"
                    className={`

                    `}
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >Previous</Button>

                <Button
                    className={`
                        hidden
                        ${page === pages.length - 1 ? '' : 'block'}
                    `}
                    disabled={page === pages.length - 1}
                    onClick={() => setPage(page + 1)}
                >Next</Button>

                <Button
                    type="submit"
                    className={`
                        hidden
                        ${page === pages.length - 1 ? 'block' : ''}
                    `}
                    disabled={page !== pages.length - 1}
                >Submit</Button>
            </div>
        </div>
    )
}