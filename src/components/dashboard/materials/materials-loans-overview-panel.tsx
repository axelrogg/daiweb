import Link from "next/link";
import { activeLoansCount } from "@/lib/actions/materials/active-loans-count";
import { DashboardOverviewRingChart } from "@/components/dashboard-overview/dashboard-overview-ring-chart";
import { Button } from "@/components/ui/button";

export const MaterialLoansOverviewPanel = async () => {
    const loansNumber = await activeLoansCount();
    if (typeof loansNumber === "object" && !loansNumber) {
        return null;
    }

    return (
        <>
            <DashboardOverviewRingChart
                label="Préstamos activos"
                currentValue={loansNumber}
                maxValue={5}
            />
            <p className="mb-5 text-center">
                Préstamos activos: {loansNumber} de {5}
            </p>
            <div className="flex flex-row items-center justify-between">
                <Button asChild>
                    <Link href="/dashboard/materiales/mis-prestamos">
                        Ver detalles
                    </Link>
                </Button>

                {loansNumber === 5 ? (
                    <Button disabled>Pedir materiales</Button>
                ) : (
                    <Button asChild>
                        <Link href="/dashboard/materiales/pedir-material">
                            Pedir materiales
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
};
