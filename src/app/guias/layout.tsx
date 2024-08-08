import { GuidesLayout } from "@/layouts/guides-layout";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuidesLayout>{children}</GuidesLayout>
    )
}
