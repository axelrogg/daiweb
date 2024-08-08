import { ActiveLoansTable } from "@/components/dashboard/materials/active-loans-table";
import { userActiveLoans } from "@/lib/actions/userActiveLoans";

export default async function Page() {
    const activeLoans = await userActiveLoans();

    if (!activeLoans) {
        return <p>nothing</p>;
    }

    return (
        <div>
            <h1 className="mb-5 text-4xl font-bold">Mis préstamos</h1>
            <ActiveLoansTable materialDetails={activeLoans} />
        </div>
    );
}
