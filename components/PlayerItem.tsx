type PlayerLevel = 'beginner' | 'intermediate' | 'advanced'
type PlayerDisplayName = 'username' | 'fullName'

export type PlayerItem2Props = {
    playerUsername?: string | 'Sinclair';
    playerFullname?: string | 'Sinclair';
    playerDisplayName?: PlayerDisplayName | 'username';
    playerGameCount?: number | 0;
    playerLevel?: PlayerLevel | 'intermediate';
}

export default function PlayerItem(props: PlayerItem2Props) {
    const {
        playerLevel = 'intermediate',
        playerUsername,
        playerFullname,
        playerDisplayName,
        playerGameCount,
    } = props;

    const PLAYER_LEVELS = {
        beginner: {
            bg: 'bg-green-400/80',
            border: 'border-green-600',
        },
        intermediate: {
            bg: 'bg-yellow-400/80',
            border: 'border-yellow-600',
        },
        advanced: {
            bg: 'bg-red-400/80',
            border: 'border-red-500',
        },
    }

    return (
        <div className="relative">
            <div
                className={`
                player-item
                relative h-(--player-item-size) w-(--player-item-size)
                rounded-full flex items-center justify-center shrink-0
                border shadow-xs shadow-zinc-400 bg-zinc-100
                border-zinc-300 cursor-pointer 
                transition-all! duration-300!
                select-none
                focus:outline-1
                focus:outline-yellow-400
                z-11
            `}
            >
                <div className={`
                absolute inset-1 rounded-full border 
                ${PLAYER_LEVELS[playerLevel]?.bg}
                ${PLAYER_LEVELS[playerLevel]?.border}
            `} />

                <span className="absolute w-6 h-6 -right-0.5 -top-1 rounded-full bg-red-500 border-2 border-zinc-200 text-white! text-xs font-bold flex items-center justify-center shadow-sm">
                    {playerGameCount}
                </span>

                <span
                    className={`
                    tracking-wide text-center text-wrap font-bold text-xs z-10 dark:text-zinc-900!
                `}
                >
                    {playerDisplayName === "username"
                        ? playerUsername
                        : playerFullname
                    }
                </span>

                {/* {
                player?.isStudent ? (
                    <StudentBadge size={24} />
                ) : null
            } */}


            </div>

            {/* <div
                className={`
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2 -translate-y-1/2
                    px-10 py-5
                    z-1
                    opacity-30
                    rounded-full
                    border-1
                    ${PLAYER_LEVELS[playerLevel]?.border}
                    ${PLAYER_LEVELS[playerLevel]?.bg}    
                    rotate-90
                `}
            /> */}
        </div>
    );
}