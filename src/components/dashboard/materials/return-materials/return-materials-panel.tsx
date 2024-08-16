"use client";

import { useEffect, useState } from "react";
import { MulticodeScanner } from "@/components/multicode-scanner";
import { Button } from "@/components/ui/button";
import { userInfoFromId } from "@/lib/actions/user/user-info-from-id";
import { MaterialLoans } from "@/types/actions";
import { extUserActiveLoans } from "@/lib/actions/materials/active-loans";
import { DataTable } from "../lend-materials/lend-materials-data-table";
import { columns } from "./return-materials-data-column";

export const ReturnMaterialsPanel = () => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [materialLoans, setMaterialLoans] = useState<MaterialLoans>([]);

    useEffect(() => {
        const activeLoans = async () => {
            const userId = decodeUserId(code);
            if (!userId) {
                return;
            }
            setLoading(true);
            const activeLoans = await extUserActiveLoans(userId);
            const userInfo = await userInfoFromId(userId);
            setMaterialLoans((old) => [...old, ...activeLoans]);
            setFullName(userInfo!.fullName);
            setLoading(false);
        };

        activeLoans();
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
