import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userInfo } from "@/lib/actions/user/user-info";
import { readableDate } from "@/lib/utils/date";
import { GhostIcon } from "lucide-react";
import Image from "next/image";

export default async function MyProfilePage() {
    const user = await userInfo();

    return (
        <div className="min-h-[80svh] space-y-3">
            <h1 className="text-3xl font-bold">Mi perfil</h1>
            <div className="flex w-full justify-center">
                <div
                    className="relative h-40 w-40 items-center justify-center
                                        rounded-full"
                >
                    {user?.pictureUri ? (
                        <Image
                            src={user?.pictureUri}
                            className="h-40 w-40 rounded-full"
                            alt="Foto de perfil. Haz click para acceder a tu perfil"
                            fill
                            priority
                            quality={60}
                            sizes="12vw"
                        />
                    ) : (
                        <div
                            className="flex h-40 w-40 items-center
                                justify-center rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"
                        >
                            <GhostIcon className="h-24 w-24 text-white" />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder={user?.name}
                    readOnly
                />
            </div>
            <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder={user?.email}
                    readOnly
                    disabled
                />
            </div>
            <p>
                Eres miembro de la DAI desde{" "}
                <span className="font-bold">
                    {readableDate(user?.createdAt!)}
                </span>
            </p>
        </div>
    );
}
