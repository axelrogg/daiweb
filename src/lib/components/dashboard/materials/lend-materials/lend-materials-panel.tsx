"use client";

import { useEffect, useState } from "react";
import { MulticodeScanner } from "@components/multicode-scanner";
import { Button } from "@components/ui/button";
import { MaterialReservations } from "@/types/actions";
import { DataTable } from "./lend-materials-data-table";
import { columns } from "./lend-materials-data-column";
import { userIdDecode } from "@/lib/utils/user-id-endec";
import { activeReservations } from "@/lib/actions/materials/active-reservations";
import { userInfo } from "@/lib/actions/user/user-info";

export const LendMaterialsPanel = () => {
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [materialReservations, setMaterialReservations] =
        useState<MaterialReservations>([]);

    useEffect(() => {
        const userActiveReservations = async () => {
            if (!code) {
                return;
            }

            const userId = userIdDecode(code);
            if (!userId) {
                return;
            }

            setDataIsLoading(true);
            const reservations = await activeReservations(userId);
            const user = await userInfo(userId);
            if (reservations) {
                setMaterialReservations((old) => [...old, ...reservations]);
            }
            if (user) {
                setFullName(user.name);
            }
            setDataIsLoading(false);
        };

        userActiveReservations();
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
