"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    ChevronsUpDown,
    Gamepad2,
    Home,
    LogOut,
    Settings,
    User,
    UsersRound,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Skeleton } from "@/components/ui/skeleton"
import { menuItems } from "@/app/app/layout"

// const menuItems = [
//     {
//         title: "Home",
//         url: "/app",
//         icon: Home,
//     },
//     {
//         title: "Clubs",
//         url: "/app/clubs",
//         icon: UsersRound,
//     },
//     {
//         title: "Session",
//         url: "/app/session",
//         icon: Gamepad2,
//     },
// ]


export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const [userData, setUserData] = React.useState<any | null>(null)
    const [profileLoading, setProfileLoading] = React.useState(false)
    const [loggingOut, setLoggingOut] = React.useState(false)

    async function handleLogout() {
        setLoggingOut(true)

        try {
            await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            })
        } catch (error) {
            console.error("Logout request failed:", error)
        } finally {
            router.push("/login")
            router.refresh()
        }
    }

    return (
        <Sidebar collapsible="icon">
            {/* ==================== */}
            {/* Sidebar Header */}
            {/* ==================== */}

            <SidebarHeader className="mt-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="SportsQ"
                        >
                            {/* Logo */}
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/15 text-sidebar-primary border border-sidebar-primary">
                                S
                            </div>

                            {/* Name */}
                            <span className="truncate font-semibold">
                                SportsQ
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* ==================== */}
            {/* Navigation */}
            {/* ==================== */}

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Dashboard
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive =
                                    item.url === "/app"
                                        ? pathname === "/app"
                                        : pathname.startsWith(item.url)

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.title}
                                            render={
                                                <Link href={item.url} />
                                            }
                                        >
                                            <item.icon className="size-4 shrink-0" />

                                            <span>
                                                {item.title}
                                            </span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ==================== */}
                {/* Active Session */}
                {/* ==================== */}

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Active Session
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Add active session items here */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ==================== */}
            {/* Footer */}
            {/* ==================== */}

            <SidebarFooter>
                {profileLoading ? (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg">
                                <Skeleton className="size-8 shrink-0 rounded-full" />

                                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                    <Skeleton className="h-3.5 w-2/3" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <SidebarMenuButton
                                            size="lg"
                                            tooltip={
                                                userData?.username ??
                                                "Profile"
                                            }
                                        >
                                            {/* Avatar */}
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/15 text-sidebar-primary">
                                                <User className="size-4" />
                                            </div>

                                            {/* User Information */}
                                            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {userData?.username ??
                                                        "Guest User"}
                                                </span>

                                                <span className="truncate text-xs text-sidebar-foreground/60">
                                                    {userData?.email ??
                                                        "No email available"}
                                                </span>
                                            </div>

                                            <ChevronsUpDown className="ml-auto size-4 shrink-0" />
                                        </SidebarMenuButton>
                                    }
                                />

                                <DropdownMenuContent
                                    side="top"
                                    align="start"
                                    className="w-56"
                                >
                                    <DropdownMenuItem
                                        render={
                                            <Link href="/app/profile" />
                                        }
                                    >
                                        <User />
                                        Profile
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        render={
                                            <Link href="/app/settings" />
                                        }
                                    >
                                        <Settings />
                                        Settings
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        variant="destructive"
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className="cursor-pointer"
                                    >
                                        <LogOut />

                                        {loggingOut
                                            ? "Signing out..."
                                            : "Log out"}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}