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
    const { logo, name, border = true } = props;
    const initials = getClubInitials(name);

    return (
        <div className={`
            ${props.size ? `size-${props.size || 20}` : 'size-20'}
            overflow-hidden rounded-full 
            ${props.border ? 'border-4 border-card' : ''}
            bg-muted shadow-md
        `}>
            {logo ? (
                <img
                    src={logo}
                    alt={`${name} logo`}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-sidebar-primary/5">
                    <div className="absolute -right-5 -top-5 size-12 rounded-full bg-sidebar-primary/20 blur-md" />
                    <div className="absolute -bottom-6 -left-4 size-14 rounded-full bg-sidebar-primary/15 blur-md" />

                    <span className="relative text-lg font-bold tracking-tight text-sidebar-primary">
                        {initials}
                    </span>
                </div>
            )}
        </div>
    )
}