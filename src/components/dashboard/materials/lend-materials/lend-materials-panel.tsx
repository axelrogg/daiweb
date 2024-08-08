"use client";

import { useEffect, useState } from "react";
import { MulticodeScanner } from "@/components/multicode-scanner";
import { Button } from "@/components/ui/button";
import { extUserActiveReservations } from "@/lib/actions/userActiveReservations";
import { getUserFullNameFromUserId } from "@/lib/actions/getUserFullNameFromUserId";
import { MaterialReservations } from "@/types/actions";
import { DataTable } from "./lend-materials-data-table";
import { columns } from "./lend-materials-data-column";

export const LendMaterialsPanel = () => {
    const [code, setCode] = useState<string | null>(null);
    const [userFullName, setUserFullName] = useState<string | null>(null);
    const [material, setMaterial] = useState<string | null>(null);
    const [showTable, setShowTable] = useState(false);
    const [materialReservations, setMaterialReservations] =
        useState<MaterialReservations>([]);

    useEffect(() => {
        async function hello() {
            const userId = Number(atob(code!));
            const reservations = await extUserActiveReservations(userId);

            setMaterialReservations((old) => [...old!, ...reservations!]);
            setShowTable(true);
        }

        if (typeof code === "string") {
            hello();
        }
        console.log(materialReservations);
    }, [code]);

    useEffect(() => {
        async function getUserFullName() {
            const userId = Number(atob(code!));
            const fullName = await getUserFullNameFromUserId(userId);
            setUserFullName(fullName!);
        }

        if (typeof code === "string") {
            getUserFullName();
        }
    }, [code]);

    return (
        <>
            {!showTable && (
                <div className="mb-5 flex items-center justify-center">
                    <p className="text-center text-sm text-gray-500">
                        Para empezar, escanea el QR de un alumno
                    </p>
                </div>
            )}
            {
                <div>
                    {userFullName && (
                        <p className="mb-3">
                            Alumno/a:{" "}
                            <span className="font-bold">{userFullName}</span>
                        </p>
                    )}
                    <DataTable columns={columns} data={materialReservations} />
                </div>
            }
            <MulticodeScanner setScannedCode={setCode}>
                <Button className="w-full">Escanear código QR</Button>
            </MulticodeScanner>
        </>
    );
};
