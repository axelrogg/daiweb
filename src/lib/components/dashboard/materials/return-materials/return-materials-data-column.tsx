"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { readableDate } from "@/lib/utils/date";
import { toast } from "@components/ui/use-toast";
import { newMaterialReturn } from "@/lib/actions/materials/new-material-return";
import { MaterialLoan } from "@/types/actions";

export const columns: ColumnDef<MaterialLoan>[] = [
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
                    newMaterialReturn(row.original.id);
                    row.toggleSelected(true);
                    toast({
                        title: "Material devuelto",
                        description: "El material fue devuelto con éxito.",
                    });
                } catch (error: any) {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description:
                            "No se pudo procesar la devolución. Por favor, inténtalo de nuevo más tarde",
                    });
                    return;
                }
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
                            Marcar devuelto
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
