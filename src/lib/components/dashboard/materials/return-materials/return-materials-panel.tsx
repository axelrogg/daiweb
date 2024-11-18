"use client";

import { useEffect, useState } from "react";
import { MulticodeScanner } from "@components/multicode-scanner";
import { Button } from "@components/ui/button";
import { MaterialLoans } from "@/types/actions";
import { activeLoans } from "@/lib/actions/materials/active-loans";
import { DataTable } from "../lend-materials/lend-materials-data-table";
import { columns } from "./return-materials-data-column";
import { userInfo } from "@/lib/actions/user/user-info";

export const ReturnMaterialsPanel = () => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [materialLoans, setMaterialLoans] = useState<MaterialLoans>([]);

    useEffect(() => {
        const userActiveLoans = async () => {
            const userId = decodeUserId(code);
            if (!userId) {
                return;
            }
            setLoading(true);
            const loans = await activeLoans(userId);
            const user = await userInfo(userId);
            if (loans) {
                setMaterialLoans((old) => [...old, ...loans]);
            }
            if (user) {
                setFullName(user.name);
            }
            setLoading(false);
        };

        userActiveLoans();
    }, [code]);

    function decodeUserId(code: string | null) {
        if (!code) return null;
        const decoded = atob(code);
        const userId = Number(decoded[0]);
        if (Number.isNaN(userId)) return null;
        return userId;
    }

    return (
        <>
            <div>
                {fullName && (
                    <p className="mb-3">
                        Nombre y apellidos:{" "}
                        <span className="font-bold">{fullName}</span>
                    </p>
                )}
                <DataTable
                    columns={columns}
                    data={materialLoans}
                    loading={loading}
                />
            </div>
            <MulticodeScanner setScannedCode={setCode}>
                <Button className="w-full">Escanear código QR</Button>
            </MulticodeScanner>
        </>
    );
};
