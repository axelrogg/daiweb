import { DefaultLayout } from "@/components/layouts/default-layout";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    );
}
