"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { readableDate } from "@/lib/utils/date";

export const ActiveLoansTable = ({
    materialDetails,
}: ActiveLoansTableProps) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-32 lg:w-2/5">Material</TableHead>
                <TableHead className="min-w-32">Inicio</TableHead>
                <TableHead className="min-w-32">Fin</TableHead>
                <TableHead className="w-12 text-center">Renovaciones</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {materialDetails?.length ? (
                materialDetails.map((details, idx) => {
                    return (
                        <TableRow key={idx}>
                            <TableCell className="text-sm">
                                {details.material}
                            </TableCell>
                            <TableCell className="w-48 text-sm">
                                {readableDate(details.createdAt)}
                            </TableCell>
                            <TableCell className="w-48 text-sm">
                                {readableDate(details.validUntil)}
                            </TableCell>
                            <TableCell className="text-center text-sm">
                                {details.renewedCount}
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
              renewedCount: number;
          }[]
        | null;
}
