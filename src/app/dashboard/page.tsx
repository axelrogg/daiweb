import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/dashboard/cards/dashboard-card";
import { LendMaterialsPanel } from "@/components/dashboard/materials/lend-materials/lend-materials-panel";
import { MaterialLoansOverviewPanel } from "@/components/dashboard/materials/materials-loans-overview-panel";
import { useUserInfo } from "@/lib/actions/useUserInfo";

export default async function DashboardPage() {
    const userInfo = await useUserInfo();
    if (!userInfo) {
        return null;
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            {userInfo.isStaff && (
                <div
                    className="line-flex mt-1 items-center justify-center
                                rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 px-4
                                py-1 text-sm text-slate-50"
                >
                    <p className="text-black">Staff</p>
                </div>
            )}
            <Button
                asChild
                className="mb-5 mt-5 w-full rounded-xl lg:max-w-24 lg:rounded-lg"
            >
                <Link href="/dashboard/mi-codigo-qr">Ver mi QR</Link>
            </Button>
            <div className="flex w-full items-center justify-center">
                <Tabs defaultValue="resumen" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="resumen" className="w-full">
                            Resumen
                        </TabsTrigger>
                        <TabsTrigger value="staff-panel" className="w-full">
                            Panel de staff
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="resumen" className="w-full">
                        <DashboardCard title="Mis préstamos">
                            <MaterialLoansOverviewPanel />
                        </DashboardCard>
                    </TabsContent>
                    <TabsContent value="staff-panel">
                        <DashboardCard title="Prestar materiales">
                            <LendMaterialsPanel />
                        </DashboardCard>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
