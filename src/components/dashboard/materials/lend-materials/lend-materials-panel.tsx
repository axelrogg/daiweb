"use client";

import { useEffect, useState } from "react";
import { MulticodeScanner } from "@/components/multicode-scanner";
import { Button } from "@/components/ui/button";
import { extUserActiveReservations } from "@/lib/actions/user-active-reservations";
import { useUserInfoFromId } from "@/lib/actions/user-info-from-id";
import { MaterialReservations } from "@/types/actions";
import { DataTable } from "./lend-materials-data-table";
import { columns } from "./lend-materials-data-column";

export const LendMaterialsPanel = () => {
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [materialReservations, setMaterialReservations] =
        useState<MaterialReservations>([]);

    function decodeUserId(code: string | null) {
        if (!code) return null;
        const userId = Number(atob(code));
        if (Number.isNaN(userId)) return null;
        return userId;
    }

    useEffect(() => {
        async function activeReservations() {
            const userId = decodeUserId(code);
            if (!userId) {
                return;
            }
            setDataIsLoading(true);
            const reservations = await extUserActiveReservations(userId);
            const userInfo = await useUserInfoFromId(userId);
            setMaterialReservations((old) => [...old, ...reservations]);
            setFullName(userInfo!.fullName);
            setDataIsLoading(false);
        }

        activeReservations();
    }, [code]);

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
                    data={materialReservations}
                    loading={dataIsLoading}
                />
            </div>
            <MulticodeScanner setScannedCode={setCode}>
                <Button className="w-full">Escanear código QR</Button>
            </MulticodeScanner>
        </>
    );
};
