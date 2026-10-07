import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center' >
            <div className={`
                    w-full max-w-lg
                    min-h-20
                    max-h-30
                    overflow-y-auto
                    bg-muted
                    border
                    shadow
                    rounded-md    
                `}>

                <div
                    className="
                        w-full
                        p-4
                        grid
                        grid-cols-[repeat(auto-fill,76px)]
                        justify-between
                        gap-2
                    "
                >
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />
                    <div className="w-full h-full aspect-square bg-blue-300" />

                </div>
            </div>
        </div>
    )
}

export default page     