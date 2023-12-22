import Link from "next/link";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex mx-40">
            <div className="w-1/5 max-w-1/5 h-screen border-r border-grey py-8 pr-8">
                <div className="mb-4">
                    <Link className="font-bold text-xl" href="/docs">
                        Documentación
                    </Link>
                </div>
                <ul className="flex flex-col">
                    <Link
                        className="cursor-pointer hover:text-black font-bold mb-2"
                        href="/docs/introduccion"
                    >
                        Introducción
                    </Link>
                    <Link
                        className="cursor-pointer hover:text-black font-bold"
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
