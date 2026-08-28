import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Gamepad2Icon, GamepadIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div
            className="w-full flex flex-col max-w-7xl px-4 py-6 space-y-6"
        >
            <div className="flex justify-between w-full">
                <div className='space-y-1'>
                    <h1 className="text-2xl font-bold tracking-tight flex gap-2 items-center">
                        {/* <Gamepad2Icon /> */}
                        Join sessions
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Explore live queueing sessions, and join open plays around you
                    </p>
                </div>

                <div>
                    <Link href="queueing/create-queueing">
                        <Button className="hover:-rotate-2"><Plus />Create session</Button>
                    </Link>
                </div>
            </div>

            <Separator />

            {/* Session list */}
            <div>

            </div>
        </div>
    )
}

export default page