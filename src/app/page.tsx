import Image from "next/image";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-screen items-center justify-around p-8">
                <a
                    // TODO: Hardcode the html
                    href=""
                    target="_self"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </a>
            <ul className="flex m1-4">
                <li className="flex m-4">inicio</li>
                <li className="flex m-4">servizos</li>
                <li className="flex m-4">noticias</li>
                <li className="flex m-4">contacto</li>
                <li className="flex m-4 items-center">
                    <IoIosSearch/>
                </li>
            </ul>
            </div>

            // TODO: Center horizontally DAI's name
            <div className="flex w-screen py-10">
                <div className="w-64">
                    <h1 className="text-4xl font-bold">
                        Delegación do Alumnado da Escola de Enxeñaría Industrial
                    </h1>
                </div>
            </div>

        </main>
    );
}
