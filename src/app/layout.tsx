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
                <nav className="flex w-screen items-center justify-around p-8">
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
                    <ul className="flex m1-4">
                        <div className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            <li>Inicio</li>
                        </div>
                        <div className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            <li>Servizos</li>
                        </div>
                        <div className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            <li>Noticias</li>
                        </div>
                        <div className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black">
                            <li>Contacto</li>
                        </div>
                        <li className="flex m-4 items-center">
                            <IoIosSearch size={20}/>
                        </li>
                    </ul>
                </nav>
                {children}
            </body>
        </html>
    );
}
