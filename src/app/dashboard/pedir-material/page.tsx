import { BorrowMaterialForm } from "@/components/dashboard/materials/borrow-material-form";

export default function Page() {
    return (
        <div>
            <h1 className="mb-5 flex text-3xl font-bold">
                Préstamo de materiales
            </h1>
            <BorrowMaterialForm />
        </div>
    );
}
