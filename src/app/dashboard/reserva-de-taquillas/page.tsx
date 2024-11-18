import { UnverifiedCard } from "@components/dashboard/cards/unverified-card";
import { LockerReservationForm } from "@components/dashboard/lockers/locker-reservation-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import { userLockerAction } from "@/lib/actions/lockers/user-locker";
import { userInfo } from "@/lib/actions/user/user-info";
import { CircleHelpIcon } from "lucide-react";

export default async function Page() {
    const user = await userInfo();
    const locker = await userLockerAction();

    if (!user?.isVerified) {
        return (
            <div className="flex min-h-[80svh] w-full flex-col items-start items-center">
                <h1 className="self-start text-3xl font-bold">
                    Reserva de taquillas
                </h1>
                <UnverifiedCard />
            </div>
        );
    }

    return (
        <>
            <Popover>
                <div className="mb-5 flex flex-row">
                    <h1 className="mr-3 flex text-3xl font-bold">
                        Reserva de taquillas
                    </h1>
                    <PopoverTrigger>
                        <CircleHelpIcon className="h-6 w-6 text-primary" />
                    </PopoverTrigger>
                </div>
                <PopoverContent
                    className="z-50 w-64 rounded-lg bg-white p-6 drop-shadow-2xl lg:w-3/5"
                    sideOffset={10}
                    align="center"
                    collisionPadding={20}
                >
                    <div className="flex flex-col space-y-2">
                        <p className="mb-3 text-xl font-bold text-primary">
                            Tip
                        </p>
                        <p>
                            En este página puedes reservar una taquilla durante
                            el curso actual.
                        </p>
                        <p>
                            Puedes elegir la zona de la taquilla o el número de
                            taquilla específico que deseas.
                        </p>
                        <p>
                            Si no hay taquillas disponibles en la zona
                            solicitada o si la taquilla con el número pedido
                            está ocupada, se asignará una taquilla de forma
                            aleatoria.
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
            {!locker && <LockerReservationForm />}
            {locker && (
                <p className="text-center">
                    Ya tienes una taquilla asignada. Vuelve a tu dashboard para
                    verla.
                </p>
            )}
        </>
    );
}
