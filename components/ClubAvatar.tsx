type ClubAvatarProps = {
    logo: string;
    name: string;
    size?: number;
    border?: boolean;
}

function getClubInitials(name: string) {
    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)

    if (words.length === 0) {
        return "C"
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase()
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase()
}

export default function ClubAvatar(props: ClubAvatarProps) {
    const { logo, name, size = 20, border = true } = props;
    const initials = getClubInitials(name);
    const px = size * 4;
    const fontSize = size >= 20 ? 18 : Math.max(10, px * 0.35);

    return (
        <div
            className={`
            overflow-hidden rounded-full 
            ${border ? 'border-4 border-card' : ''}
            bg-muted shadow-md
        `}
            style={{ width: px, height: px }}
        >
            {logo ? (
                <img
                    src={logo}
                    alt={`${name} logo`}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-sidebar-primary/5">
                    <div
                        className="absolute rounded-full bg-sidebar-primary/20 blur-md"
                        style={{
                            width: px * 0.6,
                            height: px * 0.6,
                            right: -px * 0.25,
                            top: -px * 0.25,
                        }}
                    />
                    <div
                        className="absolute rounded-full bg-sidebar-primary/15 blur-md"
                        style={{
                            width: px * 0.7,
                            height: px * 0.7,
                            left: -px * 0.2,
                            bottom: -px * 0.3,
                        }}
                    />

                    <span
                        className="relative font-bold tracking-tight text-sidebar-primary"
                        style={{ fontSize }}
                    >
                        {initials}
                    </span>
                </div>
            )}
        </div>
    )
}