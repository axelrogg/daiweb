import { MainLogo } from "@/components/main-logo";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh flex-col px-5">
            <nav className="mb-2 py-5">
                <MainLogo />
            </nav>
            {children}
        </div>
    );
}
