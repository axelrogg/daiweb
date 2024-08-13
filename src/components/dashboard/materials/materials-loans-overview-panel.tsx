import { DashboardOverviewRingChart } from "@/components/dashboard-overview/dashboard-overview-ring-chart";
import { Button } from "@/components/ui/button";
import { userActiveLoansCount } from "@/lib/actions/user-active-loans-count";
import Link from "next/link";

export const MaterialLoansOverviewPanel = async () => {
    const activeLoansCount = await userActiveLoansCount();
    console.log(activeLoansCount);
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
                <Button asChild>
                    <Link href="/dashboard/mis-prestamos">Ver detalles</Link>
                </Button>

                {activeLoansCount === 5 ? (
                    <Button disabled>Pedir materiales</Button>
                ) : (
                    <Button asChild>
                        <Link href="/dashboard/pedir-material">
                            Pedir materiales
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
};
