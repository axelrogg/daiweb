import Image from "next/image";
import Link from "next/link";
import {
    IoIosCalendar,
    IoIosConstruct,
    IoIosKey,
    IoIosLaptop,
} from "react-icons/io";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
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
                        <Link href="/" className="flex p-2 justify-center">
                            Servicios
                        </Link>
                    </div>
                    <Link
                        href="/blog"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/contacto"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Contacto
                    </Link>
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
            <div className="flex justify-around items-center">
                <div className="w-fit px-5">
                    <h1 className="text-6xl font-bold">
                        Delegación do <br />
                        Alumnado da <br />
                        Escola de <br />
                        Enxeñaría <br />
                        Industrial
                    </h1>
                </div>
                <div className="flex border w-64 h-64 justify-center items-center">
                    <p>some fun illustration here</p>
                </div>
            </div>

            <div className="my-10 flex flex-col items-center">
                <h2 className="text-4xl font-bold my-10">Servicios</h2>
                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link
                            className="flex flex-col items-center justify-center"
                            href="/reserva-de-taquillas"
                        >
                            <IoIosKey color={"#1B669A"} size={30} />
                            <p className="text-[#1B669A]">
                                Reserva de taquillas
                            </p>
                        </Link>
                    </div>
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link
                            className="flex flex-col items-center justify-center"
                            href="/prestamo-de-portatiles"
                        >
                            <IoIosLaptop color={"#1B669A"} size={30} />
                            <p className="text-[#1B669A]">
                                Préstamo de portátiles
                            </p>
                        </Link>
                    </div>
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link
                            className="flex flex-col items-center justify-center"
                            href="/prestamo-de-material"
                        >
                            <IoIosConstruct color={"#1B669A"} size={30} />
                            <p className="text-[#1B669A]">
                                Préstamo de material
                            </p>
                        </Link>
                    </div>
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link
                            className="flex flex-col items-center justify-center"
                            href="/reserva-de-espacios"
                        >
                            <IoIosCalendar color={"#1B669A"} size={30} />
                            <p className="text-[#1B669A]">
                                Reserva de espacios
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
