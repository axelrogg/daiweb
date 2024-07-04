import Link from "next/link";
import { DashboardOverviewRingChart } from "./dashboard-overview-ring-chart";
import { DashboardOverviewCard } from "./dashboard-overview-card";
import { Button } from "../ui/button";

export const DashboardOverview = ({
    borrowingCount,
    borrowingMaxValue,
    printingCount,
    printingMaxValue,
}: DashboardOverviewProps) => {
    return (
        <div className="mb-5 flex flex-col space-y-5">
            <DashboardOverviewCard title="Mis préstamos">
                <DashboardOverviewRingChart
                    label="Préstamos activos"
                    currentValue={borrowingCount}
                    maxValue={borrowingMaxValue}
                />
                <p className="mb-5 text-center">
                    Préstamos hechos: {borrowingCount} de {borrowingMaxValue}
                </p>
                <div className="flex flex-row items-center justify-between">
                    <Link href="/dashboard/mis-prestamos">
                        <Button>Ver historial</Button>
                    </Link>
                    <Link href="/dashboard/pedir-material">
                        <Button>Pedir material</Button>
                    </Link>
                </div>
            </DashboardOverviewCard>
            <DashboardOverviewCard title="Impresiones del mes">
                <DashboardOverviewRingChart
                    label="Impresiones hechas este mes"
                    currentValue={printingCount}
                    maxValue={printingMaxValue}
                />
                <p className="mb-5">
                    Impresiones del mes: {printingCount} de {printingMaxValue}
                </p>
                <div className="flex flex-row items-center justify-between">
                    <Link href="/dashboard/mis-impresiones">
                        <Button>Ver historial</Button>
                    </Link>
                    <Link href="/dashboard/impresiones">
                        <Button>Imprimir archivos</Button>
                    </Link>
                </div>
            </DashboardOverviewCard>
        </div>
    );
};

interface DashboardOverviewProps {
    borrowingCount: number;
    borrowingMaxValue: number;
    printingCount: number;
    printingMaxValue: number;
}
