import { DefaultLayout } from "@/layouts/DefaultLayout";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DefaultLayout>{children}</DefaultLayout>;
}
