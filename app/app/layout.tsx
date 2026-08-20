import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Gamepad2, Home, UsersRound } from "lucide-react"
import { AppHeader } from "../../components/app-header"

export const menuItems = [
    {
        title: "Home",
        url: "/app",
        icon: Home,
    },
    {
        title: "Clubs",
        url: "/app/clubs",
        icon: UsersRound,
    },
    {
        title: "Session",
        url: "/app/session",
        icon: Gamepad2,
    },
]

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <AppHeader />

                <main className="flex flex-1 flex-col items-center p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}