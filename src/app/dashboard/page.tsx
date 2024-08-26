import React from "react";
import { BadgeCheckIcon } from "lucide-react";
import { userInfo } from "@/lib/actions/user/user-info";
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
import { MyLoans } from "@/components/dashboard/cards/my-loans";
import { MyLocker } from "@/components/dashboard/cards/my-locker";
import { UnverifiedCard } from "@/components/dashboard/cards/unverified-card";

export default async function DashboardPage() {
    const user = await userInfo();
    if (!user) {
        return <NoUserInfo />;
    }

    if (!user.isVerified) {
        return (
            <div className="flex h-[80svh] w-full flex-col items-start items-center">
                <h1 className="self-start text-3xl font-bold">Dashboard</h1>
                <UnverifiedCard />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
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
            <div className="mt-5 flex w-full flex-col items-center justify-center">
                <div className="w-full space-y-4 lg:flex lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="lg:w-1/2">
                        <MyLocker />
                    </div>
                    <div className="lg:w-1/2">
                        <MyLoans />
                    </div>
                </div>
            </div>
        </div>
    );
}
