import { useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { Play, Plus, RotateCcw, Square, Timer, TimerIcon } from "lucide-react";
import { Button } from "../ui/button";
import PlayerItem from "../PlayerItem";

type BadmintonCourtProps = {
    courtData?: any;
}

let playerItemSize = '70px'
let courtBgColor = 'bg-muted/40! dark:bg-muted-foreground/5!';
let courtLineColor = 'border-muted-foreground/40! dark:border-muted-foreground/30!';
let courtIconColor = ''

courtBgColor = 'bg-[#2F6B4F] dark:bg-[#2F6B4F]/50'
courtLineColor = 'border-[#D8E8D5] dark:border-[#C8E0C5]/90'
courtIconColor = 'text-[#D8E8D5] dark:text-[#D8E8D5]!'

export default function BadmintonCourt(props: BadmintonCourtProps) {
    const { courtData } = props;
    const { courtNum, } = courtData;

    const [time, setTime] = useState('00:00');
    const [mode, setMode] = useState('available');

    const courtRef = useRef<HTMLDivElement>(null);

    function handleClickStart() {
        setMode('ingame');
    }

    function handleClickEnd() {
        setMode('available');
    }

    const CourtNumber = () => (
        <div className="flex-col gap-1 items-center w-20 hidden md:flex select-none mb-[12%]">
            <span
                className={`
                    relative
                    text-7xl
                    text-muted-foreground

                    transition-all
                    duration-200

                    group-has-[button[data-add-player]:focus-visible]:text-primary!
                    group-has-[button[data-add-player]:focus-visible]:dark:text-green-400!
                    group-has-[button[data-add-player]:focus-visible]:opacity-100!

                    text-shadow-primary


                    ${mode === 'ingame'
                        ? 'text-destructive! opacity-100!'
                        : ''
                    }
                `}
            >
                {courtNum}

                {/* Focused Badge */}
                <div className={`
                    absolute bottom-1 left-1/2 -translate-x-1/2 px-8 py-4 scale-y-0 origin-bottom transition-all duration-200

                    group-has-[button[data-add-player]:focus-visible]:scale-y-100
                    group-has-[button[data-add-player]:focus-visible]:bg-green-400/20
                `} />

                {
                    mode === "ingame" && (
                        <div
                            className="
                                absolute bottom-1 left-1/2 -translate-x-1/2
                                bg-destructive/20
                                px-8 py-4 
                            "
                            style={{
                                animation: "grow-upwards 0.2s ease-in-out forwards",
                            }}
                        />
                    )
                }

            </span>

            {
                mode === 'ingame' && (
                    <Badge variant="destructive" className="origin-bottom" style={{ animation: 'popup 0.2s ease-in-out forwards' }}>In-Game</Badge>
                )
            }
        </div>
    )

    function handleClick() {
        console.log('click here at court:', courtNum);
    }

    const AddPlayerButton = () => (
        <button
            type="button"
            onClick={handleClick}
            className={`
            relative
            flex h-[] w-16
            items-center justify-center
            rounded-full
            
            border-3 border-dashed

            bg-muted/20
            dark:bg-muted/50
            transition-all

            hover:border-green-400!
            hover:dark:border-green-400!
            
            hover:bg-green-900!

            hover:text-green-100!
            hover:dark:text-green-400
            
            hover:scale-105
            hover:-rotate-25


            focus-visible:border-green-400!
            focus-visible:dark:border-green-400!
            
            focus-visible:bg-green-900!

            focus-visible:text-green-100!
            focus-visible:dark:text-green-400
            
            focus-visible:scale-105
            focus-visible:-rotate-25

            focus-visible:outline-none

            active:scale-100

            ${courtLineColor}

            ${mode === 'ingame' ? 'hidden' : 'flex'}

            shadow-md
            shadow-green-900
            dark:shadow-zinc-900

            group/button
        `}
            data-add-player
            disabled={mode === 'ingame'}
            style={{
                height: playerItemSize,
                width: playerItemSize,
            }}
        >
            <Plus
                className={`
                h-4 w-4
                transition-colors
                ${courtIconColor}

                group-hover/button:text-green-400!
                group-focus-visible/button:text-green-400!
            `}
            />
        </button>
    );

    const CourtLines = () => (
        <>
            {/* Court Lines */}
            <div
                className={`
                    pointer-events-none
                    absolute
                    top-[10%]
                    left-0
                    w-full
                    border-b
                    ${courtLineColor}
                `}
            />

            <div
                className={`
                    pointer-events-none
                    absolute
                    bottom-[10%]
                    left-0
                    w-full
                    border-t
                    ${courtLineColor}
                `}
            />

            <div
                className={`
                    pointer-events-none
                    absolute
                    top-0
                    left-[5%]
                    h-full
                    border-l
                    ${courtLineColor}
                `}
            />

            <div
                className={`
                    pointer-events-none
                    absolute
                    top-0
                    right-[5%]
                    h-full
                    border-r
                    ${courtLineColor}
                `}
            />
        </>
    )

    const CenterLine = () => (
        <div
            className={`
                absolute
                left-1/2
                top-0
                h-full
                -translate-x-1/2
                border-r-2
                border-dashed
                ${courtLineColor}
            `}
        />
    )

    const Timer = () => (
        <div
            className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-[2]
                scale-110
                md:scale-130
            "
        >
            <Badge className="outline-1 shadow-md flex items-center gap-1" variant="secondary">
                <TimerIcon className="mb-0.5" />
                <span>{time}</span>
            </Badge>
        </div>
    )

    const TeamLabel = ({ name }: { name: string }) => (
        <div
            className="
            absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
            rounded-full
            bg-muted
            px-2 py-0.5
            text-center text-xs uppercase tracking-wider
            select-none text-nowrap
            hidden xs:flex
            scale-90 lg:scale-100
        "
        >
            {name}
        </div>
    )

    const CourtInterface = () => (
        <div
            ref={courtRef}
            data-court={courtNum}
            className={`
                group relative
                flex w-full
                max-w-xl
                aspect-9/5
                rounded-lg
                border-3 
                ${courtBgColor}

                ${mode === 'ingame'
                    ? 'outline-destructive! dark:outline-destructive/50' : ''
                }

                ${courtLineColor}

                transition-all
                duration-300

                shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.06)]

                gap-[20%]
                select-none

                outline-5
                outline-zinc-800/50
                dark:outline-zinc-400/50

            `}
            data-mode={mode}
        >
            {/* Left Column */}
            <div className="w-1/2 h-full flex flex-col">
                <div className={`relative w-full h-1/2 flex items-center justify-center border-b border-r ${courtLineColor} pt-2 md:pt-4`}>
                    <span className={`absolute bottom-[4%] right-[5%] text-xs md:text-sm ${courtIconColor}`}>A1</span>
                    <AddPlayerButton />
                    <TeamLabel name="team a" />

                    {
                        mode === 'ingame' && (
                            <PlayerItem
                                playerUsername="sinclair"
                                playerGameCount={1}
                            />
                        )
                    }
                </div>
                <div className={`relative w-full h-1/2 flex items-center justify-center border-r ${courtLineColor} pb-2 md:pb-4`}>
                    <span className={`absolute bottom-[25%] right-[5%] text-xs md:text-sm ${courtIconColor}`}>A2</span>
                    <AddPlayerButton />
                </div>
            </div>

            {/* Right Column */}
            <div className="w-1/2 h-full flex flex-col">
                <div className={`relative w-full h-1/2 flex items-center justify-center border-b border-l ${courtLineColor} pt-2 md:pt-4`}>
                    <span className={`absolute bottom-[4%] left-[5%] text-xs md:text-sm ${courtIconColor}`}>B1</span>
                    <AddPlayerButton />
                    <TeamLabel name="team b" />
                </div>
                <div className={`relative w-full h-1/2 flex items-center justify-center border-l ${courtLineColor} pb-2 md:pb-4`}>
                    <span className={`absolute bottom-[25%] left-[5%] text-xs md:text-sm ${courtIconColor}`}>B2</span>
                    <AddPlayerButton />

                    {
                        mode === 'ingame' && (
                            <PlayerItem
                                playerUsername="sinply"
                                playerGameCount={1}
                                playerLevel="advanced"
                            />
                        )
                    }
                </div>
            </div>

            {/* These are absolute elements */}
            <CourtLines />
            <CenterLine />
            <Timer />

            {/* In-game overlay */}
            {
                mode === 'ingame' && (
                    <div className="absolute inset-0 bg-destructive/20">

                    </div>
                )
            }
        </div>
    )

    const CourtControls = () => (
        <div className="w-full flex items-center justify-between">
            <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
            >
                <RotateCcw className="size-4" />
                Clear
            </Button>


            {
                mode === 'available' && (
                    <Button
                        size="lg"
                        className={`
                        min-w-28 gap-1 shadow-lg
                        hover:-rotate-2
                    `}
                        onClick={handleClickStart}
                    >
                        <Play className="size-4 fill-current" />
                        Start Game
                    </Button>
                )
            }

            {
                mode === 'ingame' && (
                    <Button
                        size="lg"
                        className={`
                        min-w-28 gap-1 shadow-md
                        hover:-rotate-2
                        border-none
                    `}
                        variant='destructive'
                        onClick={handleClickEnd}
                    >
                        <Square className="size-4 fill-current" />
                        End Game
                    </Button>
                )
            }
        </div>
    )

    return (
        <div className="relative flex flex-col min-w-[300px] w-full max-w-xl items-center gap-3">
            <div className={`w-full md:hidden flex items-center justify-between`}>
                <span className={`
                        relative text-2xl text-foreground font-semibold
                        ${mode === 'ingame' ? 'text-destructive!' : ''}
                    `}>
                    Court {courtNum}
                </span>
                {
                    mode === 'ingame' && (
                        <Badge variant="destructive">In-Game</Badge>
                    )
                }
            </div>

            <div className="relative group flex items-center justify-center w-full gap-4">
                <CourtNumber />
                <div className='flex flex-col w-full gap-4'>
                    <CourtInterface />
                    <CourtControls />
                </div>
            </div>
        </div>
    )
}