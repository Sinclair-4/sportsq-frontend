'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import BadmintonCourt from '@/components/BadmintonCourt/BadmintonCourt'


function useFocusOnCourt() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!e.altKey) return

            // Only allow number keys 0-9
            if (!/^[0-9]$/.test(e.key)) return

            e.preventDefault()

            const courtNum = e.key

            const court = document.querySelector(
                `[data-court="${courtNum}"]`
            ) as HTMLElement | null

            if (!court) return
            if (court.dataset.mode === 'ingame') return

            // Find the first Add Player button inside the court
            const addPlayerButton = court.querySelector(
                '[data-add-player]'
            ) as HTMLButtonElement | null

            if (!addPlayerButton) {
                console.error(`Add Player button not found in court ${courtNum}`)
                return
            }

            addPlayerButton?.focus()

            console.log(`Focus on court ${courtNum}`)
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
}

const Page = () => {
    useFocusOnCourt()

    return (
        <div className="relative flex flex-col min-h-screen w-full items-center justify-center bg-background p-4 md:p-8 gap-10">

            <div className="absolute top-6 left-6">
                <ThemeToggle />
            </div>


            <BadmintonCourt
                courtData={{
                    courtNum: 1,
                    mode: '',
                }}
            />

            <BadmintonCourt
                courtData={{
                    courtNum: 2,
                    mode: '',
                }}
            />

        </div>
    )
}

export default Page