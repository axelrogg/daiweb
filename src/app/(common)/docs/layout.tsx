import Link from "next/link";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <div className="w-1/4 overflow-y-auto border-r border-white p-8">
                <h2 className="mb-4 font-bold">Servicios DAI</h2>
                <ul>
                    <Link
                        className="cursor-pointer hover:text-black"
                        href="/docs/prestamo-de-materiales"
                    >
                        Préstamo de materiales
                    </Link>
                </ul>
            </div>
            <div className="p-8">{children}</div>
        </div>
    );
}
