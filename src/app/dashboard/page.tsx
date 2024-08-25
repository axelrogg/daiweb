import React from "react";
import Link from "next/link";
import { BadgeCheckIcon } from "lucide-react";
import { userInfo } from "@/lib/actions/user/user-info";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { NoUserInfo } from "@/components/dashboard/materials/no-user-info";
import { Callout, CalloutDescription } from "@/components/ui/callout";
import { MyLoans } from "@/components/dashboard/cards/my-loans";
import { MyLocker } from "@/components/dashboard/cards/my-locker";

export default async function DashboardPage() {
    const user = await userInfo();
    if (!user) {
        return <NoUserInfo />;
    }

    if (!user.isVerified) {
        return (
            <div className="flex h-[80svh] w-full flex-col items-start items-center">
                <h1 className="self-start text-4xl font-bold">Dashboard</h1>
                <Callout variant="warning" className="max-w-lg">
                    <CalloutDescription>
                        Parece que no has verificado tu cuenta todavía. Para
                        poder acceder a todos los beneficios de la DAI,
                        necesitas{" "}
                        <Link
                            className="font-bold underline"
                            href="/dashboard/verificar-mi-cuenta"
                        >
                            verificar tu cuenta
                        </Link>
                        .
                    </CalloutDescription>
                </Callout>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <div className="group flex h-10 flex-row items-center space-x-3">
                {user.isVerified && (
                    <Popover>
                        <HoverCard>
                            <HoverCardTrigger>
                                <PopoverTrigger className="flex items-center">
                                    <BadgeCheckIcon className="text-primary" />
                                </PopoverTrigger>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                Tu cuenta ha sido verificada.
                            </HoverCardContent>
                        </HoverCard>
                        <PopoverContent
                            className="lg:hidden"
                            align="start"
                            collisionPadding={10}
                        >
                            <p className="lg:hidden">
                                Tu cuenta ha sido verificada.
                            </p>
                        </PopoverContent>
                    </Popover>
                )}
                {user.isStaff && (
                    <Popover>
                        <HoverCard>
                            <HoverCardTrigger>
                                <PopoverTrigger className="flex items-center">
                                    <div
                                        className="line-flex items-center justify-center
                                                    rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 px-4
                                                    py-1 text-sm text-slate-50"
                                    >
                                        <p className="text-black">Staff</p>
                                    </div>
                                </PopoverTrigger>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                Eres miembro de la DAI.
                            </HoverCardContent>
                        </HoverCard>
                        <PopoverContent
                            className="lg:hidden"
                            align="start"
                            collisionPadding={10}
                        >
                            <p className="lg:hidden">Eres miembro de la DAI.</p>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
            <div className="group my-5 w-full space-y-5 lg:space-x-5">
                {user.isStaff && (
                    <Button
                        asChild
                        className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 text-black lg:max-w-40 lg:rounded-lg"
                    >
                        <Link href="/dashboard/staff-panel">
                            Ir al panel de staff
                        </Link>
                    </Button>
                )}
                <Button
                    asChild
                    className="w-full rounded-xl lg:max-w-24 lg:rounded-lg"
                >
                    <Link href="/dashboard/mi-codigo-qr">Ver mi QR</Link>
                </Button>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
                <div className="group w-full space-y-4">
                    <MyLocker />
                    <MyLoans />
                </div>
            </div>
        </div>
    );
}
