import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/dashboard/cards/dashboard-card";
import { LendMaterialsPanel } from "@/components/dashboard/materials/lend-materials/lend-materials-panel";
import { MaterialLoansOverviewPanel } from "@/components/dashboard/materials/materials-loans-overview-panel";
import { useUserInfo } from "@/lib/actions/user-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleHelpIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default async function DashboardPage() {
    const userInfo = await useUserInfo();
    if (!userInfo) {
        return null;
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            {userInfo.isStaff && (
                <div
                    className="line-flex mt-1 items-center justify-center
                                rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 px-4
                                py-1 text-sm text-slate-50"
                >
                    <p className="text-black">Staff</p>
                </div>
            )}
            <Button
                asChild
                className="mb-5 mt-5 w-full rounded-xl lg:max-w-24 lg:rounded-lg"
            >
                <Link href="/dashboard/mi-codigo-qr">Ver mi QR</Link>
            </Button>
            <div className="flex w-full items-center justify-center">
                <Tabs defaultValue="resumen" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="resumen" className="w-full">
                            Resumen
                        </TabsTrigger>
                        <TabsTrigger value="staff-panel" className="w-full">
                            Panel de staff
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="resumen" className="w-full">
                        <div className="group w-full">
                            <Card className="flex flex-col justify-between">
                                <CardHeader className="flex items-start pb-3">
                                    <Popover>
                                        <div className="mb-5 flex flex-row">
                                            <CardTitle className="mr-3">
                                                Mis préstamos
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
                                                    En este panel los préstamos
                                                    activos a tu nombre.
                                                </p>
                                                <p>
                                                    Si quieres pedir algún
                                                    material, haz click en el
                                                    botón{" "}
                                                    <span className="font-bold">
                                                        Pedir materiales
                                                    </span>
                                                    .
                                                </p>
                                                <p>
                                                    Recuerda que solo puedes
                                                    tener 5 préstamos activos en
                                                    un mismo momento.
                                                </p>
                                                <p>
                                                    Si quieres ver los detalles
                                                    de los materiales que
                                                    tienes, haz click en el
                                                    botón{" "}
                                                    <span className="font-bold">
                                                        Ver detalles
                                                    </span>
                                                    .
                                                </p>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </CardHeader>
                                <CardContent className="pt-3">
                                    <MaterialLoansOverviewPanel />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="staff-panel">
                        <div className="group w-full">
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
                                                    materiales a cualquier
                                                    estudiante.
                                                </p>
                                                <p>
                                                    Si no tienes claro qué hacer
                                                    revisa la{" "}
                                                    <Link
                                                        href="/guias/staff/como-realizar-prestamos"
                                                        className="hover:underline"
                                                    >
                                                        guía sobre préstamos
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
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
