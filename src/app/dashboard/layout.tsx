import { MainLogo } from "@/components/main-logo";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-5 flex min-h-dvh flex-col lg:mx-80">
            <nav className="mb-2 py-5">
                <MainLogo />
            </nav>
            {children}
        </div>
    );
}
