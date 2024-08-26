import { GuidesContentBar } from "@/components/layouts/complements/guides-content-bar";
import { DefaultLayout } from "@/components/layouts/default-layout";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DefaultLayout>
            <div className="flex min-h-[80svh] lg:flex-row">
                <div className="hidden flex-col overflow-y-auto lg:flex lg:w-1/4">
                    <GuidesContentBar />
                </div>
                <div className="min-h-[80svh] flex-1 lg:ml-10">{children}</div>
            </div>
        </DefaultLayout>
    );
}
