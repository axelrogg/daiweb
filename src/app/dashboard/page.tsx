import React from "react";
import Link from "next/link";
import { DashboardOverview } from "@/components/dashboard-overview/dashboard-overview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
    // const userInfo = useUserInfo();
    const isStaff = true;

    return (
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            {isStaff && (
                <div
                    className="mt-1 inline-flex items-center justify-center
                                rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 px-4
                                py-1 text-sm text-slate-50"
                >
                    <p className="text-black">Staff</p>
                </div>
            )}
            <Button asChild className="mb-5 mt-5 w-full rounded-xl">
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
                        <DashboardOverview
                            printingMaxValue={20}
                            printingCount={12}
                            borrowingMaxValue={5}
                            borrowingCount={2}
                        />
                    </TabsContent>
                    <TabsContent value="staff-panel">
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
