"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateToDMY } from "@/lib/utils/date";

export const ActiveLoansTable = ({
    materialDetails,
}: ActiveLoansTableProps) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[70px]">Material</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead className="rounded-tr-md">Fin</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {materialDetails?.length ? (
                materialDetails.map((details, idx) => {
                    const bgColor = idx % 2 == 0 ? "bg-gray-100" : "";
                    return (
                        <TableRow key={idx} className={bgColor}>
                            <TableCell className="text-sm">
                                {details.material}
                            </TableCell>
                            <TableCell className="text-sm">
                                {dateToDMY(details.createdAt)}
                            </TableCell>
                            <TableCell className="text-sm">
                                {dateToDMY(details.validUntil)}
                            </TableCell>
                        </TableRow>
                    );
                })
            ) : (
                <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                        No tienes ningún préstamo activo
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
);

interface ActiveLoansTableProps {
    materialDetails:
        | {
              id: number;
              userId: number;
              isActive: boolean;
              material: string;
              createdAt: Date;
              validUntil: Date;
              status: string;
          }[]
        | null;
}
