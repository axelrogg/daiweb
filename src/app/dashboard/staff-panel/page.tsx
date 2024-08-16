import { LendMaterialsPanel } from "@/components/dashboard/materials/lend-materials/lend-materials-panel";
import { NoUserInfo } from "@/components/dashboard/materials/no-user-info";
import { ReturnMaterialsPanel } from "@/components/dashboard/materials/return-materials/return-materials-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { userInfo } from "@/lib/actions/user/user-info";
import { CircleHelpIcon } from "lucide-react";
import Link from "next/link";

export default async function StaffPanelPage() {
    const user = await userInfo();
    if (!user) {
        return <NoUserInfo />;
    }

    if (!user.isStaff) {
        return (
            <div className="flex h-[80svh] w-full flex-col items-center justify-center">
                <div className="max-w-screen-sm">
                    <h1 className="text-center text-xl font-bold">
                        No tienes autorización para ver esta página
                    </h1>
                    <br />
                    <p className="text-center">
                        Si eres parte de la DAI y todavía no puedes acceder al
                        panel de staff, por favor contacta con algún miembro de
                        la DAI para solucionar este problema.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-bold">Panel de staff</h1>
            <Button
                asChild
                className="mb-5 mt-5 w-full rounded-xl lg:max-w-24 lg:rounded-lg"
            >
                <Link href="/dashboard/mi-codigo-qr">Ver mi QR</Link>
            </Button>
            <div className="flex w-full flex-col items-center justify-center">
                <div className="group w-full space-y-4">
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex items-start pb-3">
                            <Popover>
                                <div className="mb-5 flex flex-row">
                                    <CardTitle className="mr-3">
                                        Prestar materiales
                                    </CardTitle>
                                    <PopoverTrigger>
                                        <CircleHelpIcon className="h-6 w-6 text-primary" />
                                    </PopoverTrigger>
                                </div>
                                <PopoverContent
                                    className="z-50 w-64 rounded-lg bg-white p-6 drop-shadow-2xl lg:w-3/5"
                                    sideOffset={10}
                                    align="start"
                                    collisionPadding={20}
                                >
                                    <div className="flex flex-col space-y-2">
                                        <p className="mb-3 text-xl font-bold text-primary">
                                            Tip
                                        </p>
                                        <p>
                                            En este panel podrás prestar
                                            materiales a cualquier estudiante.
                                        </p>
                                        <p>
                                            Si no tienes claro qué hacer revisa
                                            la{" "}
                                            <Link
                                                href="/guias/staff/como-realizar-prestamos"
                                                className="underline"
                                                target="_blank"
                                            >
                                                guía sobre préstamos y
                                                devoluciones
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </CardHeader>
                        <CardContent className="pt-3">
                            <LendMaterialsPanel />
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex items-start pb-3">
                            <Popover>
                                <div className="mb-5 flex flex-row">
                                    <CardTitle className="mr-3">
                                        Devolver materiales
                                    </CardTitle>
                                    <PopoverTrigger>
                                        <CircleHelpIcon className="h-6 w-6 text-primary" />
                                    </PopoverTrigger>
                                </div>
                                <PopoverContent
                                    className="z-50 w-64 rounded-lg bg-white p-6 drop-shadow-2xl lg:w-3/5"
                                    sideOffset={10}
                                    align="start"
                                    collisionPadding={20}
                                >
                                    <div className="flex flex-col space-y-2">
                                        <p className="mb-3 text-xl font-bold text-primary">
                                            Tip
                                        </p>
                                        <p>
                                            En este panel podrás gestionar
                                            devoluciones de materiales.
                                        </p>
                                        <p>
                                            Si no tienes claro qué hacer revisa
                                            la{" "}
                                            <Link
                                                href="/guias/staff/como-realizar-prestamos"
                                                className="underline"
                                                target="_blank"
                                            >
                                                guía sobre préstamos y
                                                devoluciones
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </CardHeader>
                        <CardContent className="pt-3">
                            <ReturnMaterialsPanel />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
