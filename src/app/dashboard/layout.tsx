import { DashboardContentBar } from "@/components/layouts/complements/dashboard-content-bar";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>
            <div className="flex lg:flex-row">
                <div className="hidden flex-col overflow-y-auto lg:flex lg:w-1/4">
                    <DashboardContentBar />
                </div>
                <div className="min-h-[80svh] flex-1 lg:ml-10">{children}</div>
            </div>
        </DashboardLayout>
    );
}
