import { userInfo } from "@/lib/actions/user/user-info";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import { GhostIcon, UserIcon } from "lucide-react";
import { Separator } from "@components/ui/separator";
import { signOut } from "@/auth";
import { Button } from "@components/ui/button";
import Link from "next/link";

export const UserButton = async () => {
    const user = await userInfo();

    if (!user) {
        return null;
    }

    return (
        <Popover>
            <PopoverTrigger>
                <div
                    className="flex h-10 w-10 items-center justify-center
                                rounded-full bg-gradient-to-b
                                from-blue-500 to-cyan-500 drop-shadow-lg"
                >
                    <div
                        className="flex h-9 w-9 items-center justify-center
                                    rounded-full bg-white"
                    >
                        <div
                            className="relative h-8 w-8 items-center justify-center
                                        rounded-full"
                        >
                            {user.pictureUri ? (
                                <Image
                                    src={user.pictureUri}
                                    className="h-8 w-8 rounded-full"
                                    alt="Foto de perfil. Haz click para acceder a tu perfil"
                                    fill
                                    priority
                                    quality={60}
                                    sizes="12vw"
                                />
                            ) : (
                                <div
                                    className="flex h-8 w-8 items-center
                                justify-center rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"
                                >
                                    <GhostIcon className="h-5 w-5 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent align="end" collisionPadding={10} sideOffset={10}>
                <div className="">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard/mi-perfil">
                            <div className="flex flex-row items-center">
                                <UserIcon className="mr-3 h-5 w-5" />
                                <h4 className="text-sm font-medium">
                                    Mi perfil
                                </h4>
                            </div>
                        </Link>
                    </Button>

                    <Separator className="my-2" />
                </div>
                <form
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/auth/sign-in" });
                    }}
                >
                    <Button
                        variant="destructive"
                        type="submit"
                        className="w-full"
                    >
                        Cerrar sesión
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
};
