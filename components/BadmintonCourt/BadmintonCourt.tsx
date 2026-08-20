import { useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { Play, Plus, RotateCcw, Timer, TimerIcon } from "lucide-react";
import { Button } from "../ui/button";

type BadmintonCourtProps = {
    courtData?: any;
}

export default function BadmintonCourt(props: BadmintonCourtProps) {
    const { courtData } = props;
    const { courtNum, } = courtData;

    const borderColor = 'border-muted-foreground/40 dark:border-muted-foreground/30';

    const [time, setTime] = useState('00:00');
    const [mode, setMode] = useState('');

    const courtRef = useRef<HTMLDivElement>(null);

    function handleClickStart() {
        if (mode === 'available') {
            setMode('ingame');
        }
        else {
            setMode('available');
        }
    }

    const CourtNumber = () => (
        <div className="flex-col gap-1 items-center w-20 absolute right-full mr-5 hidden md:flex select-none">
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

                {/* In-Game Badge */}
                {/* {
                    mode === 'ingame' && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-8 py-4 bg-destructive opacity-20"></div>
                    )
                } */}

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
            flex h-16 w-16
            items-center justify-center
            rounded-full
            border-2 border-dashed 
            bg-background/50
            text-muted-foreground
            transition-all

            hover:border-primary!
            hover:dark:border-green-400!
            hover:bg-primary/10!
            hover:text-primary
            hover:dark:text-green-400
            hover:scale-110
            hover:-rotate-25


            focus-visible:outline-none
            focus-visible:border-primary!
            focus-visible:dark:border-green-400!
            focus-visible:bg-primary/5
            focus-visible:text-primary
            focus-visible:dark:text-green-400
            focus-visible:scale-110
            focus-visible:-rotate-25

            active:scale-100
            
            border-muted-foreground/80
            dark:border-muted-foreground/60

            ${mode === 'ingame' ? 'hidden' : 'flex'}
        `}
            data-add-player
            disabled={mode === 'ingame'}
        >
            <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                <Plus
                    className="
                    h-4 w-4
                    transition-colors
                "
                />
            </div>
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
                    ${borderColor}
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
                    ${borderColor}
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
                    ${borderColor}
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
                    ${borderColor}
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
                ${borderColor}
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
            <Badge className="">
                <TimerIcon />
                {time}
            </Badge>
        </div>
    )

    const TeamLabel = ({ name }: { name: string }) => (
        <div className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
            rounded-full border ${borderColor} 
            bg-muted px-2 py-0.5
            text-xs uppercase tracking-wider
            text-muted-foreground
            select-none
            shrink-0
            text-nowrap
            hidden 
            xs:flex
        `}>
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
                border 
                bg-muted/40
                dark:bg-muted-foreground/5

                ${mode === 'ingame'
                    ? 'border-destructive dark:border-destructive/50' : 'border-muted-foreground/30'
                }


                transition-all
                duration-300

                shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.06)]

                gap-[20%]
                select-none
            `}
            data-mode={mode}
        >
            {/* Left Column */}
            <div className="w-1/2 h-full flex flex-col">
                <div className={`relative w-full h-1/2 flex items-center justify-center border-b border-r ${borderColor} pt-2 md:pt-4`}>
                    <span className="absolute bottom-[4%] right-[5%] text-muted-foreground text-xs md:text-sm">A1</span>
                    <AddPlayerButton />
                    <TeamLabel name="team a" />
                </div>
                <div className={`relative w-full h-1/2 flex items-center justify-center border-r ${borderColor} pb-2 md:pb-4`}>
                    <span className="absolute bottom-[25%] right-[5%] text-muted-foreground text-xs md:text-sm">A2</span>
                    <AddPlayerButton />
                </div>
            </div>

            {/* Right Column */}
            <div className="w-1/2 h-full flex flex-col">
                <div className={`relative w-full h-1/2 flex items-center justify-center border-b border-l ${borderColor} pt-2 md:pt-4`}>
                    <span className="absolute bottom-[4%] left-[5%] text-muted-foreground text-xs md:text-sm">B1</span>
                    <AddPlayerButton />
                    <TeamLabel name="team b" />
                </div>
                <div className={`relative w-full h-1/2 flex items-center justify-center border-l ${borderColor} pb-2 md:pb-4`}>
                    <span className="absolute bottom-[25%] left-[5%] text-muted-foreground text-xs md:text-sm">B2</span>
                    <AddPlayerButton />
                </div>
            </div>

            {/* These are absolute elements */}
            <CourtLines />
            <CenterLine />
            <Timer />
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

            <div className="relative group flex flex-col items-center justify-center w-full gap-4">
                <CourtInterface />
                <CourtNumber />
            </div>
            <CourtControls />
        </div>
    )
}