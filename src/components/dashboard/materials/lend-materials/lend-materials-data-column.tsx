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
import { readableDate } from "@/lib/utils/date";
import { newMaterialLoan } from "@/lib/actions/materials/new-material-loan";
import { toast } from "@/components/ui/use-toast";

export const columns: ColumnDef<MaterialReservation>[] = [
    {
        accessorKey: "material",
        header: "Material",
    },
    {
        accessorKey: "createdAt",
        header: "Fecha",
        cell: ({ row }) => {
            return <div>{readableDate(row.getValue("createdAt"))}</div>;
        },
    },
    {
        id: "actions",
        maxSize: 3,
        cell: ({ row }) => {
            function onClickDoLoan() {
                try {
                    newMaterialLoan(
                        row.original.id,
                        row.original.userId,
                        row.original.material
                    );
                } catch (error: any) {
                    console.error(error);
                    return;
                }
                row.toggleSelected(true);
                toast({
                    title: "Pŕestamo hecho",
                    description:
                        "El préstamo fue realizado con éxito. Puedes entregar el material.",
                });
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onClickDoLoan()}>
                            Realizar préstamo
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

type MaterialReservation = {
    id: number;
    userId: number;
    material: string;
    status: string;
    isActive: boolean;
    createdAt: Date;
    validUntil: Date;
};
