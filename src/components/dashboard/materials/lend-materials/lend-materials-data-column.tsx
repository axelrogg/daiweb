"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MaterialReservation } from "@/types/actions";
import { dateToDMY } from "@/lib/utils/date";
import { makeMaterialLoanAction } from "@/lib/actions/makeMaterialLoan";

export const columns: ColumnDef<MaterialReservation>[] = [
    {
        accessorKey: "material",
        header: "Material",
    },
    {
        accessorKey: "createdAt",
        header: "Reservado en",
        cell: ({ row }) => {
            return <div>{dateToDMY(row.getValue("createdAt"))}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const material = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                makeMaterialLoanAction(
                                    material.id,
                                    material.userId,
                                    material.material
                                )
                            }
                        >
                            Realizar préstamo
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];