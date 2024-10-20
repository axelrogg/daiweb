import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { userLockerAction } from "@/lib/actions/lockers/user-locker";
import { CircleHelpIcon, KeyRoundIcon } from "lucide-react";
import Link from "next/link";

export const MyLocker = async () => {
    const locker = await userLockerAction();

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-start pb-3">
                <Popover>
                    <div className="mb-5 flex w-full flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                            <CardTitle className="mr-3">Mi taquilla</CardTitle>
                            <PopoverTrigger>
                                <CircleHelpIcon className="h-6 w-6 text-primary" />
                            </PopoverTrigger>
                        </div>
                        <KeyRoundIcon className="h-6 w-6 text-primary" />
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
                            <p>Este es el número de tu taquilla</p>
                        </div>
                    </PopoverContent>
                </Popover>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-3">
                {locker ? (
                    <div className="flex w-full flex-col items-center justify-center space-y-6">
                        <p className="text-5xl font-bold">{locker.number}</p>
                        <p className="text-2xl">
                            {locker.campus.toUpperCase()}
                        </p>
                        <p className="text-center">
                            Puedes encontrar tu taquilla en la sección &apos;
                            {locker.zone}&apos;
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="mb-8">No tienes una taquilla asignada</p>
                        <Button asChild>
                            <Link href="/dashboard/reserva-de-taquillas">
                                Reserva tu taquillas
                            </Link>
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
};
