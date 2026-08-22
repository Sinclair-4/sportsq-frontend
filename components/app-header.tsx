"use client"

import { usePathname } from "next/navigation"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { menuItems } from "@/app/home/layout"

export function AppHeader() {
    const pathname = usePathname()
    const title =
        pathname
            .split("/")
            .filter(Boolean)
            .pop()
            ?.replace(/-/g, " ")
            .replace(/^./, (char) => char.toUpperCase()) ?? "Sportsq"

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-3 px-4 w-full">
                <SidebarTrigger />
                <Separator
                    orientation="vertical"
                    className="bg-muted-foreground/30"
                />

                <h1 className="font-semibold">
                    {title}
                </h1>

                <div className="ml-auto">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}