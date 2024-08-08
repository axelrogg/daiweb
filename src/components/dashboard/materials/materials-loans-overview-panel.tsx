import { DashboardOverviewRingChart } from "@/components/dashboard-overview/dashboard-overview-ring-chart";
import { Button } from "@/components/ui/button";
import { userActiveLoansCount } from "@/lib/actions/userActiveLoansCount";
import Link from "next/link";

export const MaterialLoansOverviewPanel = async () => {
    const activeLoansCount = await userActiveLoansCount();
    if (!activeLoansCount) {
        return null;
    }

    return (
        <>
            <DashboardOverviewRingChart
                label="Préstamos activos"
                currentValue={activeLoansCount}
                maxValue={5}
            />
            <p className="mb-5 text-center">
                Préstamos activos: {activeLoansCount} de {5}
            </p>
            <div className="flex flex-row items-center justify-between">
                <Link href="/dashboard/mis-prestamos">
                    <Button>Ver detalles</Button>
                </Link>
                <Link href="/dashboard/pedir-material">
                    <Button>Pedir materiales</Button>
                </Link>
            </div>
        </>
    );
};
