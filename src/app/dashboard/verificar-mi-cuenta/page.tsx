import { VerifyAccountForm } from "@/components/dashboard/verify-account/verify-account-form";

export default function VerifyAccountPage() {
    return (
        <div className="h-[80svh] space-y-3">
            <h1 className="text-3xl font-bold">Verifica tu cuenta</h1>
            <VerifyAccountForm />
        </div>
    );
}
