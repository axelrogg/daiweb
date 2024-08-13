import { DefaultLayout } from "@/layouts/default-layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DefaultLayout>{children}</DefaultLayout>;
}
