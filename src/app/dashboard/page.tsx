"use client";

import React from "react";
import { DashboardOverviewCard } from "@/components/dashboard-overview-card";
import { Button } from "@/components/ui/button";
import { DashboardOverviewRingChart } from "@/components/dashboard-overview-ring-chart";

export default function DashboardPage() {
    const [showQRCode, setShowQRCode] = React.useState(false);

    function onClickShowQRCodeButton() {
        setShowQRCode(!showQRCode);
        console.log(showQRCode);
    }

    return (
        <div>
            <h1 className="mb-5 text-4xl font-bold">Panel de control</h1>
            <Button onClick={onClickShowQRCodeButton}>Ver código QR</Button>
            <h2 className="my-5 text-3xl font-bold">Resumen</h2>
            <div className="space-y-5">
                <DashboardOverviewCard
                    title="Mis préstamos"
                    href="/dashboard/mis-prestamos"
                >
                    <DashboardOverviewRingChart
                        data={[
                            {
                                id: "1",
                                data: [{ x: "Prestamos activos", y: 2 }],
                            },
                        ]}
                        maxValue={5}
                    />
                </DashboardOverviewCard>
                <DashboardOverviewCard
                    title="Impresiones del mes"
                    href="/dashboard/mis-impresiones"
                >
                    <DashboardOverviewRingChart
                        data={[
                            {
                                id: "1",
                                data: [{ x: "Impresiones hechas", y: 10 }],
                            },
                        ]}
                        maxValue={20}
                    />
                </DashboardOverviewCard>
            </div>
        </div>
    );
}
