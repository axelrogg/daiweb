import { ActiveLoansTable } from "@components/dashboard/materials/active-loans-table";
import { activeLoans } from "@/lib/actions/materials/active-loans";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import { CircleHelpIcon } from "lucide-react";
import { userInfo } from "@/lib/actions/user/user-info";
import { UnverifiedCard } from "@components/dashboard/cards/unverified-card";

export default async function Page() {
    const user = await userInfo();
    const loans = await activeLoans();

    if (!user?.isVerified) {
        return (
            <div className="flex h-[80svh] w-full flex-col items-start items-center">
                <h1 className="self-start text-3xl font-bold">Mis préstamos</h1>
                <UnverifiedCard />
            </div>
        );
    }

    return (
        <>
            <Popover>
                <div className="mb-5 flex flex-row">
                    <h1 className="mr-3 text-3xl font-bold">Mis préstamos</h1>
                    <PopoverTrigger>
                        <CircleHelpIcon className="h-6 w-6 text-primary" />
                    </PopoverTrigger>
                </div>
                <PopoverContent
                    className="z-50 w-64 rounded-lg bg-white p-6 drop-shadow-2xl lg:w-3/5"
                    sideOffset={10}
                    align="start"
                >
                    <div className="flex flex-col space-y-2">
                        <p className="mb-3 text-xl font-bold">Tip</p>
                        <p>Aquí podrás revisar tus préstamos activos.</p>
                        <p>
                            Recuerda que, con la excepción de los portátiles,
                            solo puedes tener un material por 5 días
                            consecutivos.
                        </p>
                        <p>
                            Para devolver un material puedes acercarte a
                            cualquier sede de la DAI.
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
            <ActiveLoansTable materialDetails={loans} />
        </>
    );
}
