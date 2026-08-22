import { ThemeToggle } from "@/components/theme-toggle"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <main className="w-full h-vh relative">
            <div className='absolute top-4 right-4'>
                <ThemeToggle />
            </div>
            {children}
        </main>
    )
}