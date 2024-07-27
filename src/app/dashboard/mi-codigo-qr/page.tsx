import Image from "next/image";
import QRCode from "react-qr-code";
import { useUserInfo } from "@/lib/useUserInfo";

export default async function Page() {
    const userInfo = await useUserInfo();

    if (!userInfo) {
        return (
            <div className="">
                <h1 className="mb-5 text-4xl font-bold">Mi código QR</h1>
                <p>
                    Parece que todavía no tienes un código QR asignado. Si crees
                    que esto es un error, contacta con algun miembro de la DAI.
                </p>
            </div>
        );
    }

    return (
        <div className="align-center flex flex-col justify-center">
            <h1 className="mb-24 text-4xl font-bold">Mi código QR</h1>
            <div
                className="absolute top-40 h-32 w-32 self-center rounded-full
                            drop-shadow-md"
            >
                <Image
                    src={userInfo.profilePicUrl}
                    alt="Foto de perfil"
                    fill={true}
                    className="rounded-full"
                />
            </div>
            <div
                className="flex h-[30rem] flex-col items-center justify-end
                           space-y-6 rounded-lg bg-gradient-to-b from-blue-500
                           to-cyan-500 pb-10"
            >
                <h2 className="absolute top-80 text-2xl font-bold text-white">
                    {userInfo.fullName}
                </h2>
                <div
                    className="align-center flex h-60 w-60 justify-center
                                rounded-lg bg-white"
                >
                    <QRCode
                        size={200}
                        style={{ height: "auto" }}
                        viewBox={`0 0 256 256`}
                        level="H"
                        value={userInfo.id.toString()}
                    />
                </div>
            </div>
        </div>
    );
}
