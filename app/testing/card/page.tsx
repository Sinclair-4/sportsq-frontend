'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required.')
        .max(16, 'Username must be at most 16 characters.'),

    fullname: z.string().max(100),

    skillLevel: z.string(),
})

const Page = () => {
    const [open, setOpen] = React.useState(true)

    const form = useForm({
        defaultValues: {
            username: '',
            fullname: '',
            skillLevel: '',
        },

        validators: {
            onSubmit: formSchema,
        },

        onSubmit: async ({ value }) => {
            const player = {
                username: value.username,
                fullname: value.fullname.trim() || value.username,
                skillLevel: value.skillLevel || 'intermediate',
            }

            console.log(player)

            setOpen(false)
            form.reset()
        }
    })

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                    render={
                        <Button variant="outline">
                            Add Player
                        </Button>
                    }
                />

                <DialogContent>
                    <form
                        id="add-player-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <DialogHeader>
                            <DialogTitle>Add Player</DialogTitle>
                            <DialogDescription>
                                Add a new player to the club.
                            </DialogDescription>
                        </DialogHeader>

                        <FieldGroup className="py-4">
                            <form.Field
                                name="username"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Username
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    Max of 16 characters
                                                </span>
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                placeholder="Username"
                                                autoComplete="off"
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    )
                                }}
                            />

                            <form.Field
                                name="fullname"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Fullname
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                placeholder="Fullname"
                                                autoComplete="off"
                                            />

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    )
                                }}
                            />

                            <form.Field
                                name="skillLevel"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Skill level
                                            </FieldLabel>

                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value) => field.handleChange(value ?? '')}
                                            >
                                                <SelectTrigger
                                                    id={field.name}
                                                    aria-invalid={isInvalid}
                                                >
                                                    <SelectValue placeholder="Select skill level" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="beginner">
                                                        Beginner
                                                    </SelectItem>

                                                    <SelectItem value="intermediate">
                                                        Intermediate
                                                    </SelectItem>

                                                    <SelectItem value="advanced">
                                                        Advanced
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                        </FieldGroup>

                        <DialogFooter className="grid grid-cols-2 mt-4">
                            <DialogClose
                                render={
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                }
                            />

                            <Button type="submit">
                                Add Player
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page