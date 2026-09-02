"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import {
    ChevronsUpDown,
    LogOut,
    Settings,
    User,
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
import { menuItems } from "@/app/home/layout"
import { fetchApi } from "@/lib/fetchApi"
import ClubAvatar from "./ClubAvatar"

type UserData = {
    id: string
    username: string
    fullname: string
    email: string
}

async function getCurrentUser() {
    const response = await fetchApi(
        "api/user/me",
        {
            credentials: "include",
        }
    )

    if (!response.ok) {
        throw new Error("Failed to fetch user")
    }

    const data = await response.json()
    console.log(data);

    return data.data
}

export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const [loggingOut, setLoggingOut] = React.useState(false)

    const {
        data: userData,
        isLoading: profileLoading,
    } = useQuery({
        queryKey: ["user", "me"],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
    })

    async function handleLogout() {
        setLoggingOut(true)

        try {
            await fetch(
                "http://localhost:3000/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            )
        } catch (error) {
            console.error("Logout request failed:", error)
        } finally {
            router.push("/login")
            router.refresh()
        }
    }

    return (
        <Sidebar collapsible="icon">
            {/* Header */}
            <SidebarHeader className="mt-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="SportsQ"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-primary bg-sidebar-primary/15 text-sidebar-primary">
                                S
                            </div>

                            <span className="truncate font-semibold">
                                SportsQ
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Dashboard
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive =
                                    item.url === "/home"
                                        ? pathname === "/home"
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

                {
                    userData?.ownedClubs?.length > 0 && (
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                My Clubs
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {userData?.ownedClubs?.map((club: any) => (
                                        <SidebarMenuItem key={club.id}>
                                            <SidebarMenuButton className="">
                                                <div className="size-4 shrink-0 overflow-hidden rounded-md bg-green-400">
                                                    {/* logo */}
                                                </div>

                                                {club.name}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }
            </SidebarContent>

            {/* Footer */}
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
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/15 text-sidebar-primary">
                                                <User className="size-4" />
                                            </div>

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