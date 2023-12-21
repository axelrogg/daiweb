import Image from "next/image";
import Link from "next/link";

export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav className="flex w-full items-center justify-around p-8">
                <Link href="/">
                    <Image
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <ul className="flex ml-4">
                    <Link
                        href="/"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Inicio
                    </Link>
                    <div className="relative group flex-col m-4 items-center justify-center rounded hover:bg-[#cfd1d3] hover:text-black">
                        <Link href="/docs" className="flex p-2 justify-center">
                            Docs
                        </Link>
                    </div>
                    {/*
                    <Link
                        href="/blog"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Blog
                    </Link>
                    */}
                    {/*
                    <Link
                        href="/contacto"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Contacto
                    </Link>
                    */}
                    <Link
                        href="/auth/sign-in"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/auth/sign-up"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Crear cuenta
                    </Link>
                </ul>
            </nav>
            {children}
        </div>
    );
}
