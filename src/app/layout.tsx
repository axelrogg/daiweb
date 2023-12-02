import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Delegación de Alumnos de la Escuela de Ingeniería Industrial",
    // TODO: Add description
    // description: '',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={lexend.className}>
                <nav className="flex w-full items-center justify-around p-8">
                    <Link
                        href="/"
                    >
                        <Image
                            src="/logo-dai-blanco.svg"
                            alt="DAI logo"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>
                    <ul className="flex ml-4">
                        <Link href="/" className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            Inicio
                        </Link>
                        <div className="relative group flex-col m-4 items-center justify-center rounded hover:bg-[#cfd1d3] hover:text-black">
                            <Link href="/" className="flex p-2 justify-center">
                                Servicios
                            </Link>
                            <div className="absolute hidden rounded py-2 mb-4 group-hover:block shadow w-64">
                                {/* The negative bottom margin allows the triangle
                                    to be tucked below the dropdown menu */}
                                <div className="
                                    w-0 h-0
                                    ml-4 mb-[-3px]
                                    bg-transparent
                                    border-l-[10px] border-l-transparent rounded-l
                                    border-b-[15px] border-b-[#cfd1d3] rounded-b
                                    border-r-[10px] border-r-transparent rounded-r">
                                </div>
                                <div className="flex flex-col bg-[#cfd1d3] rounded">
                                    <Link
                                        className="pt-4 pb-2 px-4 rounded-t hover:bg-[#1b1b1b] hover:text-white"
                                        href="/reserva-de-taquillas"
                                    >
                                        Reserva de taquillas
                                    </Link>
                                    <Link
                                        className="py-2 px-4 hover:bg-[#1b1b1b] hover:text-white"
                                        href="/prestamo-de-portatiles"
                                    >
                                        Préstamo de portátiles
                                    </Link>
                                    <Link
                                        className="py-2 px-4 hover:bg-[#1b1b1b] hover:text-white"
                                        href="/prestamo-de-material"
                                    >
                                        Pŕestamo de material
                                    </Link>
                                    <Link
                                        className="py-2 px-4 hover:bg-[#1b1b1b] hover:text-white"
                                        href="/reserva-de-espacios"
                                    >
                                        Reserva de espacios
                                    </Link>
                                    <Link
                                        className="pb-4 pt-2 px-4 rounded-b hover:bg-[#1b1b1b] hover:text-white"
                                        href="/quejas-y-sugerencias"
                                    >
                                        Quejas y sugerencias
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/blog" className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            Blog
                        </Link>
                        <Link href="/contacto" className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            Contacto
                        </Link>
                        <li className="flex m-4 items-center">
                            <IoIosSearch size={20}/>
                        </li>
                    </ul>
                </nav>

                <div className="flex flex-col items-center">
                    {children}
                </div>
            </body>
        </html>
    );
}
