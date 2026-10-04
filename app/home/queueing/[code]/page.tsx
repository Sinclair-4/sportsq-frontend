'use client'

import { Button } from "@/components/ui/button"
import { fetchApi } from "@/lib/fetchApi"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { use } from "react"

export default function Session({ params }: { params: Promise<any> }) {
    const { code } = use(params)

    async function getSession() {
        const res = await fetchApi(
            `api/session/${encodeURIComponent(code)}`,
            {
                method: 'GET',
                credentials: 'include',
            },
        )

        const json = await res.json()
        console.log('[getSession]', json)

        if (!res.ok) { return null }

        return json.data
    }

    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["session", code],
        queryFn: getSession,
        staleTime: 30_000
    })

    return (
        <div className="flex items-center justify-center h-full">
            <Link href={`/home/sys/${code}`}>
                <Button>Open Session</Button>
            </Link>
        </div>
    )
}