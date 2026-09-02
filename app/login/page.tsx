"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/components/ui/card"
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { fetchApi } from "@/lib/fetchApi"

const Page = () => {
    const router = useRouter()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        setError("")
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        try {
            const response = await fetchApi('api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.get("email") as string,
                    password: formData.get("password") as string,
                }),
            })
            const json = await response.json()

            console.log("response:", response);
            console.log("json:", json);

            if (!response.ok) {
                console.log(`[login] login failed: ${json.error}`);
                setError(json.message);
                return;
            }

            router.replace("/home");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-6">
            <form
                className="w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="uppercase">
                            Welcome back
                        </CardTitle>

                        <CardDescription>
                            Enter your email and password below to log in to your account.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <Field>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>

                            <Input
                                required
                                id="email"
                                name="email"
                                type="email"
                                placeholder="milesmorales@example.com"
                            />
                        </Field>

                        <Field>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password" className="flex items-center">
                                    Password
                                </FieldLabel>

                                <Link href="/forgot-password" className="text-xs text-muted-foreground ml-auto hover:underline cursor-pointer">
                                    Forgot password?
                                </Link>
                            </div>

                            <Input
                                required
                                id="password"
                                name="password"
                                type="password"
                                placeholder=""
                                minLength={8}
                            />
                        </Field>

                        {error && (
                            <pre className="text-sm text-destructive whitespace-pre-wrap text-center">
                                {error}
                            </pre>
                        )}
                    </CardContent>


                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2
                                    className="animate-spin"
                                    size={24}
                                />
                            ) : (
                                "Login"
                            )}
                        </Button>

                        <span className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-primary hover:underline"
                            >
                                Sign up
                            </Link>
                        </span>
                    </CardFooter>
                </Card>
            </form>

            {/* <Button
                onClick={async () => {
                    const response = await refreshToken()
                    console.log('response:', response);
                    console.log('response.json:', await response.json());
                }}
            >
                Refresh Token
            </Button> */}
        </div>
    )
}

export default Page