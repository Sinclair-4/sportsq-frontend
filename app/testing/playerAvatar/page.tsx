import { TimerIcon } from "lucide-react";

type PlayerQueueBadgeProps = {
    name: string;
    gameCount: number;
    waitingTime: string;
};

export default function PlayerQueueBadge({
    name,
    gameCount,
    waitingTime,
}: PlayerQueueBadgeProps) {
    return (
        <div
            className="relative flex aspect-square w-[5rem] items-center justify-center rounded-full border border-zinc-500/30 bg-white shadow-xs"
            aria-label={`${name}, ${gameCount} games, waiting ${waitingTime}`}
        >
            <div className="absolute inset-[6%] flex items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-400/90">
                <span className="text-center text-sm uppercase leading-[1.1] text-black">
                    {name}
                </span>
            </div>

            <div className="absolute right-0 top-0 flex aspect-square w-[1.5rem] items-center justify-center rounded-full border-2 border-zinc-100 bg-red-500 text-sm font-bold leading-tight !text-white shadow-md">
                {gameCount}
            </div>

            <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-100 bg-zinc-100/50 px-2 text-sm text-black shadow-md backdrop-blur-xs">
                <TimerIcon size={12} />
                <span>{waitingTime}</span>
            </div>
        </div>
    );
}