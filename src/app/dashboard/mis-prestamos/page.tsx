import { MaterialBorrowingsList } from "@/components/material-borrowings-table";
import { getMaterialBorrowings } from "@/lib/actions/getMaterialBorrowings";

export default async function Page() {
    const list = await getMaterialBorrowings();

    if (!list) {
        return <p>nothing</p>;
    }

    return (
        <div>
            <h1 className="mb-5 text-4xl font-bold">Mis préstamos</h1>
            <MaterialBorrowingsList materialDetails={list} />
        </div>
    );
}
