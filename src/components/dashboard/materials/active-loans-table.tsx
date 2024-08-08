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
        <TableCaption>Lista de préstamos activos</TableCaption>
        <TableHeader className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <TableRow>
                <TableHead className="w-[100px] rounded-tl-md font-bold text-white">
                    Material
                </TableHead>
                <TableHead className="font-bold text-white">Inicio</TableHead>
                <TableHead className="rounded-tr-md font-bold text-white">
                    Fin
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {materialDetails.map((details, idx) => {
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
            })}
        </TableBody>
    </Table>
);

interface ActiveLoansTableProps {
    materialDetails: {
        id: number;
        userId: number;
        isActive: boolean;
        material: string;
        createdAt: Date;
        validUntil: Date;
        status: string;
    }[];
}
