import Link from "next/link";
import QRCode from "react-qr-code";
import { userInfo } from "@/lib/actions/user-info";

export default async function Page() {
    const user = await userInfo();

    if (!user) {
        return (
            <div className="flex flex-col justify-center">
                <h1 className="mb-4 flex justify-center text-3xl font-bold lg:mb-24">
                    Mi código QR
                </h1>
                <p className="text-center">
                    Si lees esto es porque estamos experimentando algunos
                    problemas por el momento.
                </p>
                <br />
                <p className="text-center">
                    Si luego de actualizar esta página sigues viendo este
                    mensage, por favor contacta con algún miembro de la DAI.
                </p>
                <br />
                <p className="text-center">
                    Sentimos cualquier inconveniente que este problema pueda
                    causar.
                </p>
            </div>
        );
    }

    const userIdsConcat = user.id.toString() + "." + user.externalId;

    return (
        <div className="flex flex-col justify-center">
            <h1 className="mb-4 flex justify-center text-3xl font-bold lg:mb-24">
                Mi código QR
            </h1>
            {user.isVerified && (
                <div className="flex justify-center">
                    <p className="mb-5 text-center lg:w-2/5">
                        Muestra este código en cualquier sede de la DAI para
                        acceder a préstamos de materiales.
                    </p>
                </div>
            )}
            <div
                className="flex h-[25rem] flex-col items-center justify-center
                           rounded-lg bg-gradient-to-b from-blue-500
                           to-cyan-500 drop-shadow-2xl lg:w-2/5 lg:self-center"
            >
                {user.isVerified ? (
                    <div
                        className="flex h-60 w-60 items-center justify-center
                                rounded-lg bg-white drop-shadow-2xl"
                    >
                        <QRCode
                            size={200}
                            style={{ height: "auto" }}
                            viewBox={`0 0 1000 1000`}
                            level="H"
                            value={Buffer.from(userIdsConcat).toString(
                                "base64"
                            )}
                        />
                    </div>
                ) : (
                    <div
                        className="align-center flex flex h-60 w-3/5 flex-col justify-center
                                rounded-lg"
                    >
                        <p className="mb-3 text-center text-xl font-bold text-white">
                            Todavía no tienes un QR
                        </p>
                        <p className="text-center text-white">
                            Para obtener tu propio QR y poder acceder a todos
                            los servicios de la DAI,{" "}
                            <Link
                                href="/guias/como-verificar-mi-cuenta"
                                className="underline"
                            >
                                verifica tu cuenta
                            </Link>
                            .
                        </p>
                        <br />
                        <p className="text-center text-white">
                            Si crees que esto es un error, contacta con algun
                            miembro de la DAI.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
