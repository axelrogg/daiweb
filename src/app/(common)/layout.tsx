import Image from "next/image";
import Link from "next/link";

export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav className="flex mx-40 mb-10 items-center justify-between border-b border-grey">
                <ul className="flex items-center">
                    <Link href="/">
                        <Image
                            className="my-5 mr-5"
                            src="/logo-dai-blanco.svg"
                            alt="DAI logo"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>
                    <Link
                        href="/docs"
                        className="flex m-2 p-1 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Docs
                    </Link>
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
                </ul>
                <ul className="flex">
                    <Link
                        href="/auth/sign-in"
                        className="flex m-2 p-2 rounded-lg bg-[#1b1b1b] hover:bg-[#4f4f4f]"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/auth/sign-up"
                        className="flex items-center my-2 ml-2 p-2 rounded-lg bg-[#db4646] hover:bg-[#872b2b]"
                    >
                        Crear cuenta
                    </Link>
                </ul>
            </nav>
            {children}
        </div>
    );
}
