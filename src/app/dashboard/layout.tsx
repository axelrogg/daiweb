import { NoUserInfo } from "@/components/dashboard/materials/no-user-info";
import { DashboardContentMenu } from "@/components/navbar/dashboard-content-menu";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { userInfo } from "@/lib/actions/user/user-info";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await userInfo();
    if (!user) {
        return <NoUserInfo />;
    }

    return (
        <DashboardLayout>
            <div className="flex lg:flex-row">
                <div className="hidden flex-col overflow-y-auto lg:flex lg:w-1/4">
                    <DashboardContentMenu isStaff={user.isStaff} />
                </div>
                <div className="min-h-[80svh] flex-1 lg:ml-10">{children}</div>
            </div>
        </DashboardLayout>
    );
}
