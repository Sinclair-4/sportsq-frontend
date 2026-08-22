"use client"

import { useState } from "react"
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppHeader } from "../../components/app-header"
import { Gamepad2, Home, UsersRound } from "lucide-react"

export const menuItems = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Clubs",
        url: "/home/clubs",
        icon: UsersRound,
    },
    {
        title: "Session",
        url: "/home/session",
        icon: Gamepad2,
    },
]

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(
        () => new QueryClient()
    )

    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                <AppSidebar />

                <SidebarInset>
                    <AppHeader />

                    <main className="flex flex-1 flex-col items-center sm:p-4 md:p-6">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </QueryClientProvider>
    )
}