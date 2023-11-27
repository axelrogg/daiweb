import Link from "next/link";
import {
    IoIosCalendar,
    IoIosChatboxes,
    IoIosConstruct,
    IoIosKey,
    IoIosLaptop,
} from "react-icons/io";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <div className="flex w-fit px-8 my-10 justify-around items-center">
                <div className="w-fit px-5">
                    <h1 className="text-6xl font-bold">
                        Delegación do <br/>
                        Alumnado da <br/>
                        Escola de <br/>
                        Enxeñaría <br/>
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
                            <IoIosKey color={"#1B669A"} size={30}/>
                            <p className="text-[#1B669A]">Reserva de taquillas</p>
                        </Link>
                    </div>
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link 
                            className="flex flex-col items-center justify-center"
                            href="/prestamo-de-portatiles"
                        >
                            <IoIosLaptop color={"#1B669A"} size={30}/>
                            <p  className="text-[#1B669A]">Préstamo de portátiles</p>
                        </Link>
                    </div>
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link
                            className="flex flex-col items-center justify-center"
                            href="/prestamo-de-material"
                        >
                            <IoIosConstruct color={"#1B669A"} size={30}/>
                            <p className="text-[#1B669A]">Préstamo de material</p>
                        </Link>
                    </div>
                    <div className="flex p-10 flex-col bg-white rounded-2xl">
                        <Link
                            className="flex flex-col items-center justify-center"
                            href="/reserva-de-espacios"
                        >
                            <IoIosCalendar color={"#1B669A"} size={30}/>
                            <p className="text-[#1B669A]">Reserva de espacios</p>
                        </Link>
                    </div>
                </div>
                <div className="my-4 flex p-10 flex-col bg-white rounded-2xl">
                    <Link
                        className="flex flex-col items-center justify-center"
                        href="/quejas-y-sugerencias"
                    >
                        <IoIosChatboxes color={"#1B669A"} size={30}/>
                        <p className="text-[#1B669A]">Quejas y sugerencias</p>
                    </Link>
                </div>
            </div>

        </div>
    );
}
