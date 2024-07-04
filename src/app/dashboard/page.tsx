import React from "react";
import { DashboardOverview } from "@/components/dashboard-overview/dashboard-overview";

export default function DashboardPage() {
    // const userInfo = useUserInfo();
    const isAdmin = true;

    return (
        <div>
            <h1 className="mb-5 text-4xl font-bold">Panel de control</h1>
            {isAdmin && (
                <div className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-1 text-slate-50">
                    <p>Admin</p>
                </div>
            )}
            <h2 className="my-5 text-3xl font-bold">Resumen</h2>
            <DashboardOverview
                printingMaxValue={20}
                printingCount={12}
                borrowingMaxValue={5}
                borrowingCount={2}
            />
        </div>
    );
}
