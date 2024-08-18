"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Header,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/loading-spinner";

export function DataTable<TData, TValue>({
    columns,
    data,
    loading,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    function handleWidth(header: Header<TData, unknown>) {
        if (header.index === 0) {
            return "lg:w-3/4";
        }
        if (header.index === 1) {
            return "lg:w-2/5";
        }
        if (header.index === 2) {
            return "lg:w-12";
        }
        return "";
    }

    console.log(data);
    return (
        <div className="mb-5 rounded-md">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const columnWidth = handleWidth(header);
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={`${columnWidth}`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                <div className="flex w-full justify-center">
                                    <LoadingSpinner />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            if (!row.getIsSelected()) {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            } else {
                                return null;
                            }
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Nada que mostrar.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading: boolean;
}
