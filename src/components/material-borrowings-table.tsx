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
import { dateToDMY } from "@/lib/date";

export const MaterialBorrowingsList = ({
    materialDetails,
}: MaterialBorrowingsTableProps) => (
    <Table>
        <TableCaption>Lista de préstamos activos</TableCaption>
        <TableHeader className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <TableRow>
                <TableHead className="w-[100px] font-bold text-white">
                    Material
                </TableHead>
                <TableHead className="font-bold text-white">
                    Empezó el
                </TableHead>
                <TableHead className="font-bold text-white">
                    Válido hasta
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {materialDetails.map((details, idx) => {
                const bgColor = idx % 2 == 0 ? "bg-gray-100" : "";
                return (
                    <TableRow key={idx} className={bgColor}>
                        <TableCell>{details.material}</TableCell>
                        <TableCell>{dateToDMY(details.createdAt)}</TableCell>
                        <TableCell>{dateToDMY(details.validUntil)}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
);

interface MaterialBorrowingsTableProps {
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
