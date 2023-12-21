import Link from "next/link";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex mx-40">
            <div className="w-1/5 max-w-1/5 h-screen border-r border-grey py-8 pr-8">
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
            <div className="pl-8 w-4/5 max-w-4/5">{children}</div>
        </div>
    );
}
